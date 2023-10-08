const yup = require('yup');

const PASSWORD_REGEX = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/

let createUserSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().matches(PASSWORD_REGEX, 'password must contain uppercase and lowercase letters, a number and a special character. Plus be at least 8 characters long').required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "the confirmation password doesn't match the password of your input")
}).required();

let editUserSchema = yup.object({
    id: yup.number().required().positive().integer(),
    oldpassword: yup.string().required(),
    password: yup.string().matches(PASSWORD_REGEX, 'new password must contain uppercase and lowercase letters, a number and a special character. Plus be at least 8 characters long').required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "the confirmation password doesn't match the password of your input")
}).required();

let loginSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
}).required();

module.exports = {
    createUserSchema,
    editUserSchema,
    loginSchema
}