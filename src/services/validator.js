import Validator from "validatorjs";
Validator.setMessages('en', {
  required: 'El campo :attribute es obligatorio',
  same: 'El campo :attribute no coincide',
  numeric: 'El campo :attribute sólo acepta números',
  digits: 'El campo :attribute debe tener una longitud mínima de 10',
  size: 'El campo :attribute debe tener :size caracteres'
})

const ValidatorService = {
  validate: (data, rules, customAttributesName) => {    
    let validator = new Validator(data, rules)
    validator.setAttributeNames(customAttributesName)
    let fails = validator.fails()
    let errors = validator.errors.all()
    return { fails, errors }
  }
}

export { ValidatorService }