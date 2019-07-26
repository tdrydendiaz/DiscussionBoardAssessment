const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateUserInput(data) {
console.log(data);

    let errors = {};

    // if these values are not present in the data object we are validating then they will be set to empty strings for the Validator.isEmpty
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    //User validation rules
    if (Validator.isEmpty(data.username)) {
        errors.username = "username field is required";
    }


    if (!Validator.isAlphanumeric(data.username)) {
        errors.username = "Username is invalid";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "email field is required";
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (!Validator.isLength(data.email, { min: 3, max: 320 })) {
        errors.email = "email in invalid";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};