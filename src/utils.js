const calcCashInCommission = (amount, config) => {
  const commission = (amount * config.percents) / 100;
  return Math.min(commission, config.max.amount);
};
const calcCashOutNaturalCommission = (amount, weeklyTotalsAmount, config) => {
  if (weeklyTotalsAmount.current < config.week_limit.amount) return 0;
  const amountToCommission = amount
    - (weeklyTotalsAmount.last < config.week_limit.amount
      ? config.week_limit.amount
      : 0);
  const commission = (amountToCommission * config.percents) / 100;
  return commission;
};
const calcCashOutJuridicalCommission = (amount, config) => {
  const commission = (amount * config.percents) / 100;
  return Math.max(commission, config.min.amount);
};

module.exports = {
  calcCashInCommission,
  calcCashOutNaturalCommission,
  calcCashOutJuridicalCommission,
};
