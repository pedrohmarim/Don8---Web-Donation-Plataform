const CompanySignUpModel = require('../Models/CompanySignUp')
const SignUpModel = require('../Models/SignUpModels')

module.exports = {
    async selectCompany(request, response) {
        try {
            result = await CompanySignUpModel.findOne({
                _id: request.headers['_id'],
            });

            return response.json(result);
        } catch {
            return response.json({ loginToken: false, _id: null })
        }
    },
    async selectUser(request, response) {
        try {
            result = await SignUpModel.findOne({
                _id: request.headers['_id'],
            });

            return response.json(result);
        } catch {
            return response.json({ loginToken: false, _id: null })
        }
    },

    async selectAllUsers(request, response) {
        try {
            const result = [];
            result.push(await SignUpModel.find());
            result.push(await CompanySignUpModel.find());

            const allUsers = [];
            result.forEach(cpfCnpj => {
                cpfCnpj.forEach(element => {
                    allUsers.push(element)
                });
            });

            return response.json(allUsers);
        } catch {
            return response.json({ loginToken: false, _id: null })
        }
    }
}