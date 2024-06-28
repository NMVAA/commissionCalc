const { calcCashInCommission, calcCashOutJuridicalCommission, calcCashOutNaturalCommission } = require('../src/utils')

test('Cash in commission calculation', () => {
    const config = { percents: 0.03, max: { amount: 5 } };
    expect(calcCashInCommission(200, config)).toBe(0.06);
    expect(calcCashInCommission(20000, config)).toBe(5);
});

test('Cash out commission calculation for natural persons', () => {
    const config = { percents: 0.3, week_limit: { amount: 1000 } };
    expect(calcCashOutNaturalCommission(200, { last: 0, current: 200 }, config)).toBe(0);
    expect(calcCashOutNaturalCommission(30000, { last: 0, current: 30000 }, config)).toBe(87);
    expect(calcCashOutNaturalCommission(1000, { last: 30000, current: 31000 }, config)).toBe(3);
    expect(calcCashOutNaturalCommission(100, { last: 31000, current: 31100 }, config)).toBe(0.30);
    expect(calcCashOutNaturalCommission(100, { last: 31100, current: 31200 }, config)).toBe(0.30);

});

test('Cash out commission calculation for juridical persons', () => {
    const config = { percents: 0.3, min: { amount: 0.5 } };
    expect(calcCashOutJuridicalCommission(200, config)).toBe(0.60);
    expect(calcCashOutJuridicalCommission(100, config)).toBe(0.50);
});
