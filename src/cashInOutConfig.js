
const constantsJs = require('./constants.js')
const getCashInConf = async () => {
    try {
        let respond = await fetch(constantsJs.CASH_IN_API_URI)
        let data = await respond.json()
        return data
    } catch (error) {
        throw Error(error)
    }
}
const getCashOutNaturalConf = async () => {
    try {
        let respond = await fetch(constantsJs.CASH_OUT_NATURAL_API_URI)
        let data = await respond.json()
        return data
    } catch (error) {
        throw Error(error)
    }
}
const getCashOutJuridicalConf = async () => {
    try {
        let respond = await fetch(constantsJs.CASH_OUT_JURIDICAL_API_URI)
        let data = await respond.json()
        return data
    } catch (error) {
        throw Error(error)
    }
}

module.exports = {
    getCashInConf,
    getCashOutNaturalConf,
    getCashOutJuridicalConf
}

