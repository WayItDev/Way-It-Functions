import { isEmail, isEmpty } from './helperFunctions'

const validateSignupData = (data) => {
    const errors = {}

    if (isEmpty(data.email)) {
        errors.email = 'Must not be empty'
    } else if (!isEmail(data.email)) {
        errors.email = 'Must be a valid email address'
    }

    if (isEmpty(data.password)) errors.password = 'Must not be empty'
    if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords must match'
    if (isEmpty(data.username)) errors.username = 'Must not be empty'

    return {
        errors,
        valid: Object.keys(errors).length === 0,
    }
}

const validateLoginData = (data) => {
    const errors = {}

    if (isEmpty(data.email)) errors.email = 'Must not be empty'
    if (isEmpty(data.password)) errors.password = 'Must not be empty'

    return {
        errors,
        valid: Object.keys(errors).length === 0,
    }
}

const reduceUserDetails = (data) => {
    const userDetails = {}

    if (!isEmpty(data.gender.trim())) userDetails.gender = data.gender
    return userDetails
}

export { validateSignupData, validateLoginData, reduceUserDetails }
