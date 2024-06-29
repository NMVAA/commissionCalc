/**
 * Calculates the cash in commission based on the amount and configuration.
 *
 * @param {number} amount - The amount for which commission is calculated
 * @param {object} config - The configuration object containing percents and max amount
 * @return {number} The calculated cash in commission
 */
const calcCashInCommission = (amount, config) => {
  const commission = (amount * config.percents) / 100;
  return Math.min(commission, config.max.amount);
};
/**
 * Calculates the natural person's cash out commission based on the amount,
 *  weekly totals amount, and configuration.
 *
 * @param {number} amount - The amount for which commission is calculated
 * @param {object} weeklyTotalsAmount - The object containing the current
 * and last weekly totals amount
 * @param {object} config - The configuration object containing week_limit and percents
 * @return {number} The calculated cash out commission
 */
/**
 * Calculates the cash out commission for a natural person based on the amount,
 *  weekly totals amount, and configuration.
 *
 * @param {number} amount - The amount for which commission is calculated
 * @param {object} weeklyTotalsAmount - An object containing the currents
 * and last weekly totals amount
 * @param {object} config - The configuration object containing week_limit and percents
 * @return {number} The calculated cash out commission
 */

const calcCashOutNaturalCommission = (amount, weeklyTotalsAmount, config) => {
  // If the current weekly total amount is less than the weekly limit, return 0
  if (weeklyTotalsAmount.current < config.week_limit.amount) return 0;
  // Calculate the amount to apply commission to
  // If the last weekly total amount is less than the weekly limit, subtract the weekly limit
  // Otherwise, subtract 0
  const amountToCommission = amount
    - (weeklyTotalsAmount.last < config.week_limit.amount
      ? config.week_limit.amount
      : 0);
  // Calculate the commission by multiplying the amount to commission by the percents
  const commission = (amountToCommission * config.percents) / 100;
  // Return the calculated commission
  return commission;
};

/**
 * Calculates the cash out commission for a juridical person based on the amount and configuration.
 *
 * @param {number} amount - The amount for which commission is calculated.
 * @param {object} config - The configuration object containing percents and min.amount.
 * @return {number} The calculated cash out commission.
 */

/**
 * Calculates the cash out commission for a juridical person based on the amount and configuration.
 *
 * @param {number} amount - The amount for which commission is calculated.
 * @param {object} config - The configuration object containing percents and min.amount.
 * @return {number} The calculated cash out commission.
 */
const calcCashOutJuridicalCommission = (amount, config) => {
  const commission = (amount * config.percents) / 100;
  return Math.max(commission, config.min.amount);
};

module.exports = {
  calcCashInCommission,
  calcCashOutNaturalCommission,
  calcCashOutJuridicalCommission,
};
