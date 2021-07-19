const { Schema, model } = require('mongoose')

const caseModel = new Schema({
    date: {
        type: Date,
        required: true
    },
    caseName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    publicationCategory: {
        type: String,
        required: true
    },
    publicationType: {
        type: String,
        required: true
    },
    disponibility: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    ownerId: {
        type: Schema.Types.ObjectId
    }
})

module.exports = model('CaseModel', caseModel)