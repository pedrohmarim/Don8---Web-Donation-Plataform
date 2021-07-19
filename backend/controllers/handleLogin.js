const SignUpModel = require('../Models/SignUpModels')
const CompanySignUpModel = require('../Models/CompanySignUp')

module.exports = {
    async loginCheck(request, response) {

        const req = request.headers

        if (req.documenttocheck.length > 14) {
            var result = await CompanySignUpModel.findOne({
                'cnpj': request.headers['documenttocheck'],
                'password': request.headers['passwordtocheck']
            })

            if (result) {
                const { _id } = result
                return response.json({ id: _id, type: 'cnpj' })
            } else {
                return response.json({ id: null })
            }

        } else {
            var result = await SignUpModel.findOne({
                'cpf': request.headers['documenttocheck'],
                'password': request.headers['passwordtocheck']
            })

            if (result) {
                const { _id } = result
                return response.json({ id: _id, type: 'cpf' })
            } else {
                return response.json({ id: null })
            }
        }
    }
}