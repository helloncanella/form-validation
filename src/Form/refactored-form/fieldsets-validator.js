import fieldsets from './fieldsets.js'

class FieldsetsValidator {

    verifyIfThereIsInputEmpty(fieldsetsData) {
        let inputsData = []

        fieldsetsData.forEach(({ inputs }) => {
            for (let name in inputs) {
                if (!inputs[name]) throw 'one or more fields are empty'
            }
        })
    }

    validateEachField(data) {
        fieldsets.forEach(({ name, validator: validate }) => {
            const inputsData = data.filter(item => item.name === name)[0].inputs
            if (validate) validate(inputsData)
        })
    }

    validate(data) {
        this.verifyIfThereIsInputEmpty(data)
        this.validateEachField(data)
    }
}

export default FieldsetsValidator
