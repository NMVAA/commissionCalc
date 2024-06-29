const constantsJs = require('./constants');

const getCashInConf = async () => {
  try {
    const respond = await fetch(constantsJs.CASH_IN_API_URI);
    const data = await respond.json();
    return data;
  } catch (error) {
    throw Error(error);
  }
};
const getCashOutNaturalConf = async () => {
  try {
    const respond = await fetch(constantsJs.CASH_OUT_NATURAL_API_URI);
    const data = await respond.json();
    return data;
  } catch (error) {
    throw Error(error);
  }
};
const getCashOutJuridicalConf = async () => {
  try {
    const respond = await fetch(constantsJs.CASH_OUT_JURIDICAL_API_URI);
    const data = await respond.json();
    return data;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  getCashInConf,
  getCashOutNaturalConf,
  getCashOutJuridicalConf,
};
