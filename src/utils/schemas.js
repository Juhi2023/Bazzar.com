import * as Yup from "yup";

export const signUpValidation = ()=>{
    return Yup.object({
        firstName: Yup.string().min(4, '*Please enter atleast 4 characters.').max(15, '*First Name cannot contain more than 15 characters.').required('*First Name is required.'),
        lastName: Yup.string().min(4, '*Please enter atleast 4 characters.').max(15, '*Last Name cannot contain more than 15 characters.').required('*Last Name is required.'),
        phoneNo: Yup.string().length(10, '*Please enter 10 digits').required('*Please enter 10 digits'),
        email: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "*Please enter valid email address").required("*Please enter email address"),
        password: Yup.string()
            .required("*Password is required")
            .matches(/^[\S]+$/ , "*Password cannot contain spaces")
            .matches(/^[^_]+$/, "*Password cannot contain underscores")
            .min(8, "*Password must be at least 8 characters long")
            .max(255, "*Password must be no more than 255 characters long")
            .matches( /[a-z]/, "*Password must contain at least 1 lowercase letter.")
            .matches( /[A-Z]/, "*Password must contain at least 1 uppercase letter.")
            .matches( /[0-9]/, "*Password should contain altleast 1 digit.")
            .matches(  /[!@#$%^&*]/, "*Password should contain altleast 1 special character."),
    })
} 

export const loginValidation = ()=>{
    return Yup.object({
        email: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "*Please enter valid email address").required("*Please enter email address"),
        password: Yup.string()
            .required("*Password is required")
           
    })
} 

export const forgotPasswordValidation = ()=>{
    return Yup.object({
        email: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "*Please enter valid email address").required("*Please enter email address"),           
    })
} 

export const resetPasswordValidation = ()=>{
    return Yup.object({
        password: Yup.string()
            .required("*New password is required")
            .matches(/^[\S]+$/ , "*Password cannot contain spaces")
            .matches(/^[^_]+$/, "*Password cannot contain underscores")
            .min(8, "*Password must be at least 8 characters long")
            .max(255, "*Password must be no more than 255 characters long")
            .matches( /[a-z]/, "*Password must contain at least 1 lowercase letter.")
            .matches( /[A-Z]/, "*Password must contain at least 1 uppercase letter.")
            .matches( /[0-9]/, "*Password should contain altleast 1 digit.")
            .matches(  /[!@#$%^&*]/, "*Password should contain altleast 1 special character."),
           
    })
} 

export const profileUpdateValidation = ()=>{
    return Yup.object({
        profile_pic: Yup.string(),
        firstName: Yup.string().min(4, '*Please enter atleast 4 characters.').max(15, '*First Name cannot contain more than 15 characters.').required('*First Name is required.'),
        lastName: Yup.string().min(4, '*Please enter atleast 4 characters.').max(15, '*Last Name cannot contain more than 15 characters.').required('*Last Name is required.'),
        phoneNo: Yup.string().length(10, '*Please enter 10 digits').required('*Please enter 10 digits'),
        email: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "*Please enter valid email address").required("*Please enter email address"),
    })
} 

export const passwordUpdateValidation = ()=>{
    return Yup.object({
        oldPassword: Yup.string().required("*Old password is required"),
        newPassword: Yup.string()
            .required("*New password is required")
            .matches(/^[\S]+$/ , "*Password cannot contain spaces")
            .matches(/^[^_]+$/, "*Password cannot contain underscores")
            .min(8, "*Password must be at least 8 characters long")
            .max(255, "*Password must be no more than 255 characters long")
            .matches( /[a-z]/, "*Password must contain at least 1 lowercase letter.")
            .matches( /[A-Z]/, "*Password must contain at least 1 uppercase letter.")
            .matches( /[0-9]/, "*Password should contain altleast 1 digit.")
            .matches(  /[!@#$%^&*]/, "*Password should contain altleast 1 special character."),
        confirmPassword:    Yup.string()
            .oneOf([Yup.ref('newPassword'), null], "Passwords doesn't match").required()
    })
} 

export const addressUpdateValidation = ()=>{
    return Yup.object({
        country: Yup.string().required('*Country Name is required.'),
        city: Yup.string().required('*City Name is required.'),
        state: Yup.string().required('*State Name is required.'),
        address: Yup.string().required('*Address is required.'),
        locality: Yup.string().required('*Locality is required.'),
        pinCode: Yup.string().min(6, 'Not a valid pin code.').required('*Pin Code Name is required.'),
    })
} 

export const paymentValidation = ()=>{
    return Yup.object({
        cardNumber: Yup.string().required('*Card number is required'),
        expiryDate: Yup.string().required('*Expiry Date is required.')            
            .matches(/^(0[1-9]|1[0-2])\/(19|20)\d{2}$/ , "*Invalid Expiry Date"),
        cvv: Yup.string().min(3, 'Not a valid CVV.').required('*CVV is required'),
    })
} 

export const createProductValidation = () => {
  return Yup.object({
    name: Yup.string()
      .trim()
      .min(4, `Name must be at least 4 characters.`)
      .max(40, 'Name cannot exceed 40 characters.')
      .required('*Product Name is required.'),

    description: Yup.string()
      .trim()
      .min(4, `Description must be at least 4 characters.`)
      .required('*Product Description is required.'),

    price: Yup.number()
      .moreThan(100, 'Price must be greater than 100.')
      .required('*Price is required.'),

    images: Yup.array()
      .of(Yup.string().required('*Image is required.'))
      .min(1, '*At least one image is required.')
      .required('*Images are required.'),

    category: Yup.string()
      .trim()
      .min(4, `Category must be at least 4 characters.`)
      .max(25, 'Category cannot exceed 25 characters.')
      .required('*Category is required.'),

    discountPercentage: Yup.number()
      .min(0, 'Discount cannot be less than 0')
      .max(1000, 'Discount cannot exceed 1000')
      .optional(),

    stock: Yup.number()
      .min(0, 'Stock cannot be less than 0')
      .max(1000, 'Stock cannot exceed 1000')
      .required('*Stock is required.'),
  });
};
