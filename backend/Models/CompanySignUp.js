const { Schema, model } = require('mongoose');

const companySignUpTemplate = new Schema({
    userName: {
        type: String,
        required: true
    },
    cnpj: {
        type: String,
        required: true
    },
    ie: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rep: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        cel: {
            type: String,
            required: true
        }
    },
    address: [{
        zipCode: {
            type: String,
            required: false
        },
        number: {
            type: String,
            required: false
        },
        street: {
            type: String,
            required: false
        },
        block: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        uf: {
            type: String,
            required: false
        }
    }]
})

module.exports = model('CompanySignUp', companySignUpTemplate)