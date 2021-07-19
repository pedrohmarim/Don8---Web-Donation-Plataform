const CompanySignUpModel = require('../Models/CompanySignUp');

module.exports = {
    async store(request, response) {
        const { userName, cnpj, ie, password, rep: { name, email, cel } } = request.body

        CompanySignUpModel.find({ cnpj: cnpj }).then((res) => {

            if (res.length === 0) {
                CompanySignUpModel.create({
                    userName,
                    cnpj,
                    ie,
                    password,
                    rep: {
                        name,
                        email,
                        cel
                    }
                }).then(() => {
                    return response.json({ message: 'success' })
                });
            } else {
                return response.json({ message: 'cnpj' })
            }
        })
    },

    async addAddress(request, response) {
        const { id, zipCode, number, street, block, city, uf } = request.body

        CompanySignUpModel.findOneAndUpdate({ _id: id },
            {
                $push: {
                    address: { zipCode, number, street, block, city, uf }
                }
            })
            .then((res) => {
                return response.json(res)
            })
    }
}