const { Schema, model } = require('mongoose');

const signUpTemplate = new Schema({
    userName: {
        type: String,
        required: true
    },
    cpf: {
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
    },
    password: {
        type: String,
        required: true
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

module.exports = model('UserSignUp', signUpTemplate)