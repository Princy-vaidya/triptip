import * as Yup from 'yup';

export const Validate = Yup.object().shape({
  email: Yup.string()
    .email('Not a valid email !')
    .required('Email is required !'),
  firstname: Yup.string()
    .min(3, 'Must be at least 3 character long !')
    .required('Firstname is required !'),
  lastname: Yup.string()
    .min(3, 'Must be at least 3 character long !')
    .required('Lastname is required !'),
  phone: Yup.number()
    .min(10, 'Phone number must be 10 digit !'),
  password: Yup.string()
    .min(5, 'Choose a strong password !')
    .required('Password is required !'),
  location: Yup.string()
    .required('Location is required !'),
  terms: Yup.string()
    .oneOf(['true'], 'You must accept terms and condition to proceed !'),
  cpassword: Yup.string()
    .required('Confirm password is required !')
    .oneOf(
      [Yup.ref('password'), null],
       'Passwords must match',
     )
});
