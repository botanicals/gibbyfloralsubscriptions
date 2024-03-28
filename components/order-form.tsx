import { Fragment, useEffect, useRef, useState } from 'react';
import { Formik, Form, FormikHelpers, validateYupSchema, FormikProps } from 'formik';

import HCaptcha from '@hcaptcha/react-hcaptcha';

import { OrderFormSchema } from '../utils/schemas/order-form-schema';

import Alert, { AlertProps } from './alert';

import FormGroup from './formik-elements/form-group';
import Input from './formik-elements/input';
import Textarea from './formik-elements/textarea';
import Checkbox from './formik-elements/checkbox';
import SubmitButton from './formik-elements/submit-button';
import { CheckCircleIcon } from '@heroicons/react/solid';

interface OrderFormProps {
  mothersday: boolean;
  valentinesday: boolean;
  anniversary: boolean;
  birthday: boolean;
  occasion4: boolean;
  occasion5: boolean;
}

export interface OrderFormValues {
  // Choose Occasions
  anniversary: boolean;
  anniversaryDate?: string;
  birthday: boolean;
  birthdayDate?: string;
  mothersday: boolean;
  valentinesday: boolean;
  occasion4: boolean;
  occasion4Date?: string;
  occasion4Type?: string;
  occasion4Color?: string;
  occasion5: boolean;
  occasion5Date?: string;
  occasion5Type?: string;
  occasion5Color?: string;

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
  occasion4Note?: string;
  occasion5Note?: string;
}

const OrderForm: React.FC<OrderFormProps> = ({ mothersday, valentinesday, birthday, anniversary, occasion4, occasion5 }) => {
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [captchaAlert, setCaptchaAlert] = useState<AlertProps | null>(null);
  const [token, setToken] = useState('');
  const formRef = useRef<FormikProps<OrderFormValues>>(null);

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.setFieldValue('mothersday', mothersday);
    }
  }, [mothersday, valentinesday, birthday, anniversary, occasion4, occasion5]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.setFieldValue('valentinesday', valentinesday);
    }
  }, [valentinesday]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.setFieldValue('birthday', birthday);
    }
  }, [birthday]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.setFieldValue('anniversary', anniversary);
    }
  }, [anniversary]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.setFieldValue('occasion4', occasion4);
    }
  }, [occasion4]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.setFieldValue('occasion5', occasion5);
    }
  }, [occasion5]);

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
    <Formik
      initialValues={
        {
          // Choose Occasions
          anniversary: anniversary,
          anniversaryDate: '',
          birthday: birthday,
          birthdayDate: '',
          mothersday: mothersday,
          valentinesday: valentinesday,
          occasion4: occasion4,
          occasion4Date: '',
          occasion4Type: '',
          occasion4Color: '',
          occasion5: occasion5,
          occasion5Date: '',
          occasion5Type: '',
          occasion5Color: '',

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
          occasion4Note: '',
          occasion5Note: '',
        } as OrderFormValues
      }
      validationSchema={OrderFormSchema}
      onSubmit={handleSubmit}
      innerRef={formRef}
    >
      {({ values, errors, isSubmitting }) => {
        return (
          <Form name="Be Her Hero Subscription Form">
            <FormGroup
              heading="Choose Dates"
              message="If you want to change your occasion selection, please do so above."
              note="PLEASE NOTE: If the date of occasion you select falls on a Sunday, we will deliver the Saturday prior."
            >
              {/* Mother's Day */}
              {values.mothersday ? (
                <h5 className="flex items-center mt-6 mb-2 font-bold text-primary">
                  <CheckCircleIcon className="w-5 h-5 mr-2" /> Mother&apos;s Day (Sunday, May 12, 2024)
                </h5>
              ) : null}

              {/* Valentine's Day */}
              {values.valentinesday ? (
                <h5 className="flex items-center mt-6 mb-2 font-bold text-primary">
                  <CheckCircleIcon className="w-5 h-5 mr-2" /> Valentine&apos;s Day (Friday, February 14, 2025)
                </h5>
              ) : null}

              {/* Anniversary */}
              {values.anniversary ? (
                <Fragment>
                  <h5 className="flex items-center mt-6 mb-2 font-bold text-primary">
                    <CheckCircleIcon className="w-5 h-5 mr-2" /> Anniversary (Select date)
                  </h5>
                  <Input label="Anniversary Date" name="anniversaryDate" type="date" />
                </Fragment>
              ) : null}

              {/* Birthday */}
              {values.birthday ? (
                <Fragment>
                  <h5 className="flex items-center mt-6 mb-2 font-bold text-primary">
                    <CheckCircleIcon className="w-5 h-5 mr-2" /> Birthday (Select date)
                  </h5>
                  <Input label="Birthday Date" name="birthdayDate" type="date" />
                </Fragment>
              ) : null}

              {/* Occasion #4 */}
              {values.occasion4 ? (
                <Fragment>
                  <h5 className="flex items-center mt-6 mb-2 font-bold text-primary">
                    <CheckCircleIcon className="w-5 h-5 mr-2" /> Subscriber&apos;s Choice (Select date and type)
                  </h5>
                  <Input label="Occasion Date" name="occasion4Date" type="date" />
                  <Input label="Type of Occasion" name="occasion4Type" type="text" />
                  <Input label="Request a Favorite Color" name="occasion4Color" type="text" />
                </Fragment>
              ) : null}

              {/* Occasion #5 */}
              {values.occasion5 ? (
                <Fragment>
                  <h5 className="flex items-center mt-6 mb-2 font-bold text-primary">
                    <CheckCircleIcon className="w-5 h-5 mr-2" /> Subscriber&apos;s Choice (Select date and type)
                  </h5>
                  <Input label="Occasion Date" name="occasion5Date" type="date" />
                  <Input label="Type of Occasion" name="occasion5Type" type="text" />
                  <Input label="Request a Favorite Color" name="occasion5Color" type="text" />
                </Fragment>
              ) : null}
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
              {/* Mother's Day Note */}
              {values.mothersday ? <Textarea label="Mother's Day" name="mothersdayNote" /> : null}

              {/* Anniversary Note */}
              {values.anniversary ? <Textarea label="Anniversary" name="anniversaryNote" /> : null}

              {/* Birthday Note */}
              {values.birthday ? <Textarea label="Birthday" name="birthdayNote" /> : null}

              {/* Valentine's Day Note */}
              {values.valentinesday ? <Textarea label="Valentine's Day" name="valentinesdayNote" /> : null}

              {/* Occasion #4 Note */}
              {values.occasion4 ? <Textarea label={values.occasion4Type || "Subscriber's Choice Occasion"} name="occasion4Note" /> : null}

              {/* Occasion #5 Note */}
              {values.occasion5 ? <Textarea label={values.occasion5Type || "Subscriber's Choice Occasion"} name="occasion5Note" /> : null}
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
        );
      }}
    </Formik>
  );
};

export default OrderForm;
