const yup = require('yup');

let favoriteSchema = yup.object({
    userid: yup.number().required().positive().integer(),
    articleid: yup.number().required().positive().integer()
}).required();

module.exports = {
    favoriteSchema
}