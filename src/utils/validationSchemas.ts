import * as yup from 'yup'

export const loginSchema = yup.object({
  email: yup.string().required('Email is required').email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = yup.object({
  userName: yup
    .string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be less than 50 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
})

export type LoginFormData = yup.InferType<typeof loginSchema>
export type RegisterFormData = yup.InferType<typeof registerSchema>
