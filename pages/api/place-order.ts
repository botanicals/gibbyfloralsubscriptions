// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { DynamicEmail, StaticEmail } from '../../lib/sendgrid';
import { subscriptions } from '../../lib/airtable';
import { verifyCaptchaToken } from '../../lib/hcaptcha';

import { DynamicTemplates } from '../../utils/maps';

import { OrderFormValues } from '../../components/order-form';

type ResponseData = {
  success: boolean;
  message: string;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  // If not a post request, send 405 Method Not Allowed response
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Only POST requests are allowed.' });
    return;
  }

  // Verify captchaToken
  const success = await verifyCaptchaToken(req.body.captchaToken);

  if (!success) {
    res.status(422).json({ success: false, message: 'An hCaptcha validation error occurred. Please try again, or place your order by phone.' });
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL!;
  const ordersEmail = process.env.ORDERS_EMAIL!;
  const isProduction = process.env.NODE_ENV === 'production';

  // Generate current date and order number
  const currentDate = new Date().toLocaleDateString();
  const orderNumber = Math.random().toString(36).slice(2, 6) + '-' + Math.random().toString(36).slice(8, 16);

  // Process order and send confirmation and order submission emails

  const formValues: OrderFormValues = req.body;

  const templateData = {
    ...formValues,
    captchaToken: '', // Already used, don't need to save it
    orderPlacedOn: currentDate,
    orderNumber: orderNumber.toUpperCase(),
  };

  // Save template data to AirTable for future analysis and use

  let recordCreated: any;

  try {
    recordCreated = await new Promise((resolve, reject) => {
      subscriptions.create(
        {
          'Order Number': orderNumber.toUpperCase(),
          'Order Created': currentDate,
          'Customer First Name': templateData.customerFirstName,
          'Customer Last Name': templateData.customerLastName,
          'Customer Email': templateData.customerEmail,
          'Customer Phone Number': templateData.customerPhoneNumber,
          'Recipient First Name': templateData.recipientFirstName,
          'Recipient Last Name': templateData.recipientLastName,
          'Recipient Email': templateData.recipientEmail,
          'Recipient Phone Number': templateData.recipientPhoneNumber,
          'Recipient Address': `${templateData.deliveryAddress}, ${templateData.deliveryCity}, ${templateData.deliveryState} ${templateData.deliveryZipCode}`,
          'Subscription Details': JSON.stringify(templateData),
          'Test Submission': isProduction ? '' : 'YES',
        },
        { typecast: true },
        (error, record) => {
          if (error || !record) {
            reject(error);
            return;
          }
          resolve(record);
        }
      );
    });

    recordCreated = {
      success: true,
      recordId: recordCreated.getId(),
    };
  } catch (error) {
    recordCreated = {
      success: false,
      error,
    };
  }

  // Create and send order submission email
  const order = new DynamicEmail({
    to: {
      email: ordersEmail,
      name: 'Gibby Floral Orders',
    },
    from: {
      email: 'forms@gibbyfloral.com',
      name: 'gibbyfloral.com',
    },
    replyTo: {
      email: adminEmail,
      name: 'Gibby Floral Admin',
    },
    templateId: DynamicTemplates.SubscriptionSubmission,
    dynamicTemplateData: templateData,
  });

  const orderSuccess = await order.send();

  // Send back error if the order submission email was unsuccessfull
  if (!orderSuccess) {
    // Create and send fail notification email to admin
    const notification = new StaticEmail({
      to: {
        email: adminEmail,
        name: 'Gibby Floral Admin',
      },
      from: {
        email: 'forms@gibbyfloral.com',
        name: 'gibbyfloral.com',
      },
      replyTo: {
        email: adminEmail,
        name: 'Gibby Floral Admin',
      },
      subject: `Incomplete order alert`,
      content: [
        {
          type: 'text/plain',
          value: `

  An order was attempted but the order submission email was not properly sent.

  Order Number: ${templateData.orderNumber}

  Submission email: ${orderSuccess ? 'Sent' : 'Failed'}

  ${!orderSuccess ? JSON.stringify(order.error, null, 2) : ''}

  AirTable Record Creation: ${recordCreated ? 'Succeeded' : 'Failed'}

  ${!recordCreated.success ? JSON.stringify(recordCreated.error, null, 2) : ''}

        `,
        },
      ],
      substitutions: {},
    });

    const notificationSuccess = await notification.send();

    res.status(500).json({
      success: false,
      message: 'An error occurred submitting your order. Please try again later, or place your order by phone.',
      data: {
        orderSubmissionEmail: { success: orderSuccess, error: order.error },
        notificationEmail: { success: notificationSuccess },
        recordCreated: recordCreated,
      },
    });
    return;
  }

  // Create and send order confirmation email
  const confirmation = new DynamicEmail({
    to: {
      email: isProduction ? templateData.customerEmail : adminEmail,
      name: templateData.customerFirstName + ' ' + templateData.customerLastName,
    },
    from: {
      email: ordersEmail,
      name: 'Gibby Floral Orders',
    },
    replyTo: {
      email: ordersEmail,
      name: 'Gibby Floral Orders',
    },
    templateId: DynamicTemplates.SubscriptionConfirmation,
    dynamicTemplateData: templateData,
  });

  const confirmationSuccess = await confirmation.send();

  // Create the response data object
  const metadata = {
    confirmationEmailSent: confirmationSuccess,
    orderSubmissionEmailSent: orderSuccess,
    recordCreated,
  };

  // Create success notification email for admin
  const notification = new StaticEmail({
    to: {
      email: adminEmail,
      name: 'Gibby Floral Admin',
    },
    from: {
      email: 'forms@gibbyfloral.com',
      name: 'gibbyfloral.com',
    },
    replyTo: {
      email: adminEmail,
      name: 'Gibby Floral Admin',
    },
    subject: `Successful order notification`,
    content: [
      {
        type: 'text/plain',
        value: `

  ${process.env.NODE_ENV === 'development' ? 'DEVELOPMENT MODE' : ''}

  An order was placed on gibbyfloralsubscriptions.com.

  Order Number: ${templateData.orderNumber}

  Metadata:

  ${JSON.stringify(metadata, null, 2)}

          `,
      },
    ],
    substitutions: {},
  });

  const notificationSuccess = await notification.send();

  res.status(200).json({
    success: true,
    message: confirmationSuccess
      ? 'Order successfully placed. Please check your email for your order confirmation, and expect to be contacted within one business day.'
      : 'Your order was recieved, but an error occurred sending you your confirmation email. If you would like to confirm your order, you may contact us by phone, or wait for us to contact you.',
    data: {
      metadata,
      adminNotified: notificationSuccess,
    },
  });
}
