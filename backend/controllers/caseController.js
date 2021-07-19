const caseModel = require('../Models/CaseModel')

module.exports = {
    store(request, response) {
        const { caseName, description, publicationCategory, publicationType, disponibility, ownerId, image } = request.body

        caseModel.create({
            date: new Date(),
            caseName,
            description,
            publicationCategory,
            publicationType,
            disponibility,
            ownerId,
            image
        }).then(() => {
            return response.json({ message: 'Caso criado' })
        })
    },
    async selectPosts(request, response) {
        try {
            const result = await caseModel.find();
            return response.json(result)
        } catch {
            return response.json('error')
        }
    },
    async selectByPostId(request, response) {
        try {
            const result = await caseModel.findById({
                _id: request.headers['_id'],
            });
            return response.json(result)
        } catch {
            return response.json('error')
        }
    }
}