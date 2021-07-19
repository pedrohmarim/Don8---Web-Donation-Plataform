const SignUpModel = require('../Models/SignUpModels');

module.exports = {
    async store(request, response) {
        const { userName, email, cel, cpf, password } = request.body

        SignUpModel.find({ cpf: cpf }).then((res) => {

            if (res.length === 0) {
                SignUpModel.create({
                    userName,
                    email,
                    cel,
                    cpf,
                    password,
                    address: []
                }).then(() => {
                    return response.json(
                        { message: 'success' })
                });
            } else {
                return response.json({ message: 'cpf' })
            }
        })
    },

    async addAddress(request, response) {
        const { id, zipCode, number, street, block, city, uf } = request.body

        SignUpModel.findOneAndUpdate({ _id: id },
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