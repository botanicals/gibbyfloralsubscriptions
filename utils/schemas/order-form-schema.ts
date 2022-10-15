import * as Yup from 'yup'; // Yup documentation can be found here: https://github.com/jquense/yup

export const OrderFormSchema = Yup.object().shape({
  // Choose Occassions
  anniversary: Yup.boolean().notRequired(),
  anniversaryDate: Yup.string().when('anniversary', {
    is: true,
    then: schema => schema.required('Required'),
  }),
  birthday: Yup.boolean().notRequired(),
  birthdayDate: Yup.string().when('birthday', {
    is: true,
    then: schema => schema.required('Required'),
  }),
  mothersday: Yup.boolean().notRequired(),

  // Customer Information
  customerFirstName: Yup.string().min(2, 'Must be more than 2 characters').max(70, 'Must be less than 70 characters').required('Required'),
  customerLastName: Yup.string().min(2, 'Must be more than 2 characters').max(70, 'Must be less than 70 characters').required('Required'),
  customerPhoneNumber: Yup.string()
    .matches(/\(?\b[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}\b/, { message: 'Please use a valid phone number format (xxx-xxx-xxxx)', excludeEmptyString: true })
    .required('Required'),
  customerEmail: Yup.string().email('Invalid email').required('Required'),

  // Recipient Information
  recipientFirstName: Yup.string().min(2, 'Must be more than 2 characters').max(70, 'Must be less than 70 characters').required('Required'),
  recipientLastName: Yup.string().min(2, 'Must be more than 2 characters').max(70, 'Must be less than 70 characters').required('Required'),
  recipientPhoneNumber: Yup.string()
    .matches(/\(?\b[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}\b/, { message: 'Please use a valid phone number format (xxx-xxx-xxxx)', excludeEmptyString: true })
    .required('Required'),
  recipientEmail: Yup.string().email('Invalid email').required('Required'),
  deliveryAddress: Yup.string().required('Required'),
  deliveryCity: Yup.string().required('Required'),
  deliveryState: Yup.string().required('Required'),
  deliveryZipCode: Yup.string().required('Required'),

  // Note Cards
  valentinesdayNote: Yup.string().notRequired(),
  mothersdayNote: Yup.string().notRequired(),
  anniversaryNote: Yup.string().notRequired(),
  birthdayNote: Yup.string().notRequired(),
});
