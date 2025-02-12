const fs = require('node:fs');
const path = require('node:path');
const { getWeek } = require('date-fns');

const {
  getCashInConf,
  getCashOutNaturalConf,
  getCashOutJuridicalConf,
} = require('./src/apiConfig');
const {
  calcCashInCommission,
  calcCashOutJuridicalCommission,
  calcCashOutNaturalCommission,
} = require('./src/utils');

const processOperations = async (operations = []) => {
  const cashInConfig = await getCashInConf();
  const cashOutNaturalConfig = await getCashOutNaturalConf();
  const cashOutJuridicalConfig = await getCashOutJuridicalConf();

  const userWeeklyTotalsAmount = {};

  operations.forEach((opLog) => {
    let commission = 0;
    if (opLog.type === 'cash_in') {
      commission = calcCashInCommission(opLog.operation.amount, cashInConfig);
    }
    if (opLog.type === 'cash_out' && opLog.user_type === 'natural') {
      const transactionWeek = getWeek(opLog.date, { weekStartsOn: 1 });
      if (
        userWeeklyTotalsAmount[`${opLog.user_id}_${transactionWeek}`]
        === undefined
      ) {
        userWeeklyTotalsAmount[`${opLog.user_id}_${transactionWeek}`] = {
          last: 0,
          current: parseInt(opLog.operation.amount, 10),
        };
      } else {
        userWeeklyTotalsAmount[`${opLog.user_id}_${transactionWeek}`].last = userWeeklyTotalsAmount[`${opLog.user_id}_${transactionWeek}`].current;
        userWeeklyTotalsAmount[`${opLog.user_id}_${transactionWeek}`].current
          += parseInt(opLog.operation.amount, 10);
      }
      commission = calcCashOutNaturalCommission(
        opLog.operation.amount,
        userWeeklyTotalsAmount[`${opLog.user_id}_${transactionWeek}`],
        cashOutNaturalConfig,
      );
    }
    if (opLog.type === 'cash_out' && opLog.user_type === 'juridical') {
      commission = calcCashOutJuridicalCommission(
        opLog.operation.amount,
        cashOutJuridicalConfig,
      );
    }
    console.log(commission.toFixed(2));
  });
};

const main = async () => {
  const inputFilePath = process.argv[2];
  if (!inputFilePath) {
    console.error('Please provide the input file path as an argument.');
    process.exit(1);
  }
  const inputFile = path.resolve(inputFilePath);
  const rawData = fs.readFileSync(inputFile);
  const operations = JSON.parse(rawData);

  await processOperations(operations);
};

main();
