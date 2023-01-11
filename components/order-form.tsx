import { useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';

import HCaptcha from '@hcaptcha/react-hcaptcha';

import { OrderFormSchema } from '../utils/schemas/order-form-schema';

import Alert, { AlertProps } from './alert';

import FormGroup from './form-elements/form-group';
import Input from './form-elements/input';
import Textarea from './form-elements/textarea';
import Checkbox from './form-elements/checkbox';
import SubmitButton from './form-elements/submit-button';

interface OrderFormProps {}

export interface OrderFormValues {
  // Choose Occasions
  anniversary: boolean;
  anniversaryDate?: string;
  birthday: boolean;
  birthdayDate?: string;
  mothersday: boolean;

  // Customer Information
  customerFirstName: string;
  customerLastName: string;
  customerPhoneNumber: string;
  customerEmail: string;

  // Recipient Information
  recipientFirstName: string;
  recipientLastName: string;
  recipientPhoneNumber: string;
  recipientEmail: string;

  deliveryAddress: string;
  deliveryState: string;
  deliveryCity: string;
  deliveryZipCode: string;

  // Note Cards
  valentinesdayNote?: string;
  mothersdayNote?: string;
  anniversaryNote?: string;
  birthdayNote?: string;
}

const initialValues: OrderFormValues = {
  // Choose Occasions
  anniversary: false,
  anniversaryDate: '',
  birthday: false,
  birthdayDate: '',
  mothersday: false,

  // Your Information
  customerFirstName: '',
  customerLastName: '',
  customerPhoneNumber: '',
  customerEmail: '',

  // Recipient Information
  recipientFirstName: '',
  recipientLastName: '',
  recipientPhoneNumber: '',
  recipientEmail: '',

  deliveryAddress: '',
  deliveryState: '',
  deliveryCity: '',
  deliveryZipCode: '',

  // Note Card
  valentinesdayNote: '',
  mothersdayNote: '',
  anniversaryNote: '',
  birthdayNote: '',
};

const OrderForm: React.FC<OrderFormProps> = () => {
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [captchaAlert, setCaptchaAlert] = useState<AlertProps | null>(null);
  const [token, setToken] = useState('');

  const [submitted, setSubmitted] = useState(false);

  const recaptchaResponse = (token: string) => {
    if (token) {
      setToken(token);
      setCaptchaAlert(null);
    }
  };

  const handleSubmit = async (values: OrderFormValues, actions: FormikHelpers<OrderFormValues>) => {
    // Verify reCaptcha response
    if (!token) {
      setCaptchaAlert({ status: 'alert', message: 'Please validate your submission by checking the box above.' });
      actions.setSubmitting(false);
      return;
    }
    // Send post request to submit an order
    const response = await fetch('/api/place-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...values,
        captchaToken: token,
      }),
    });

    const { success, message, data } = await response.json();

    console.log('Response from order form page:', { success, message, data });

    if (!success) {
      actions.setSubmitting(false);
      return;
    }

    // Display success message and reset the form
    actions.resetForm();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="px-12 py-8 text-center bg-gray-200">
        <p className="text-4xl font-bold uppercase text-primary">Congrats hero, you did it!</p>
        <p className="mt-4 text-2xl text-primary">Your order has been submitted. Please stand by, we&apos;ll be calling to confirm the details.</p>
      </div>
    );
  }

  return (
    <Formik initialValues={initialValues} validationSchema={OrderFormSchema} onSubmit={handleSubmit}>
      {({ values, errors, isSubmitting }) => (
        <Form name="Be Her Hero Subscription Form">
          {/* Select Occassions */}
          <FormGroup
            heading="Choose Occassions"
            message="Choose up to TWO more occasions. Valentine's Day is already included in your subscription."
            note="PLEASE NOTE: If the date of occasion you select falls on a Sunday, we will deliver the Saturday prior."
          >
            {/* Valentine' Day */}
            <div className="relative flex items-start my-2">
              <div className="flex items-center h-5">
                <input type="checkbox" id="valentines-day" name="valentines-day" className="w-4 h-4 border-gray-600 rounded text-primary focus:ring-primary" checked />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="valentines-day" className="font-bold text-primary">
                  Valentine&apos;s Day
                </label>
                {/* <p className="text-xs text-primary">{description}</p> */}
              </div>
            </div>

            {/* Anniversary */}
            <Checkbox label="Anniversary" name="anniversary" />
            {values.anniversary ? <Input label="Anniversary Date" name="anniversaryDate" type="date" /> : null}

            {/* Birthday */}
            <Checkbox label="Birthday" name="birthday" />
            {values.birthday ? <Input label="Birthday Date" name="birthdayDate" type="date" /> : null}

            {/* Mother's Day */}
            <Checkbox label="Mother's Day (Sunday May 24, 2023)" name="mothersday" description="Note: Mother's Day orders will be delivered on Saturday, May 23rd." />
          </FormGroup>

          {/* Customer Information */}
          <FormGroup heading="Your Information" note="A Gibby Floral Professional will be calling you to confirm your subscription, and take your payment over the phone.">
            {/* First Name */}
            <Input label="First Name" name="customerFirstName" type="text" placeholder="First" />

            {/* Last Name */}
            <Input label="Last Name" name="customerLastName" type="text" placeholder="Last" />

            {/* Phone Number */}
            <Input label="Phone number" name="customerPhoneNumber" type="tel" placeholder="555-555-5555" />

            {/* Email */}
            <Input label="Email" name="customerEmail" type="email" placeholder="example@email.com" />
          </FormGroup>

          {/* Recipient Information */}
          <FormGroup heading="Your HERO Delivery Goes To:" note="A Gibby Floral Professional will call to confirm availability prior to delivery.">
            {/* First Name */}
            <Input label="First Name" name="recipientFirstName" type="text" placeholder="First" />

            {/* Last Name */}
            <Input label="Last Name" name="recipientLastName" type="text" placeholder="Last" />

            {/* Phone Number */}
            <Input label="Phone number" name="recipientPhoneNumber" type="tel" placeholder="555-555-5555" />

            {/* Email */}
            <Input label="Email" name="recipientEmail" type="email" placeholder="example@email.com" />

            {/* Address */}
            <Input label="Street Address" name="deliveryAddress" type="text" placeholder="123 Street Name" />
            <Input label="City" name="deliveryCity" type="text" placeholder="Roy" />
            <Input label="State" name="deliveryState" type="text" placeholder="Utah" />
            <Input label="ZIP / Postal code" name="deliveryZipCode" type="text" placeholder="84067" />
          </FormGroup>

          {/* Note Cards */}
          <FormGroup
            heading="Note Cards"
            message="We recommend keeping your message simple. Your sentiments will be included in all of your HERO deliveries. If you’re not sure what to say, not to worry! When we call you to confirm your BE HER HERO subscription, we’ll help you!"
          >
            {/* Valentine's Day Note */}
            <Textarea label="Valentine's Day" name="valentinesdayNote" />

            {/* Anniversary Note */}
            {values.anniversary ? <Textarea label="Anniversary" name="anniversaryNote" /> : null}

            {/* Mother's Day Note */}
            {values.mothersday ? <Textarea label="Mother's Day" name="mothersdayNote" /> : null}

            {/* Birthday Note */}
            {values.birthday ? <Textarea label="Birthday" name="birthdayNote" /> : null}
          </FormGroup>

          <div className="px-8 mt-2 space-y-4">
            <HCaptcha sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!} onVerify={recaptchaResponse} />

            {alert && <Alert status={alert.status} message={alert.message} link={alert.link} />}
            {JSON.stringify(errors) !== '{}' && <Alert status="alert" message="Invalid fields. Please fill out each field correctly before submitting your order." />}
            {captchaAlert && <Alert status={captchaAlert.status} message={captchaAlert.message} link={captchaAlert.link} />}

            <SubmitButton submitting={isSubmitting} submitText="Submit my Order" />
          </div>

          {/* <p>Values</p>
          {JSON.stringify(values, null, 2)}
          <p>Errors</p>
          {JSON.stringify(errors, null, 2)} */}
        </Form>
      )}
    </Formik>
  );
};

export default OrderForm;
