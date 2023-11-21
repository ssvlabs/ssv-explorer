const crypto = require('crypto');

const randomValueHex = (len) => {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString('hex')
    .slice(0, len);
};

const getRandomArbitrary = (min, max, round) => {
  const rand = Math.random() * (max - min) + min;
  if (round) {
    return Math.ceil(rand);
  }
  return rand;
};

function genOperators() {
  const operators = [];
  for (let i = 0; i < 100; i += 1) {
    const operator = {
      address: `0x${randomValueHex(32)}`,
      name: `Name${randomValueHex(5)}`,
      status: getRandomArbitrary(0, 1) > 0.3 ? 'active' : 'inactive',
      validatorsCount: 0,
      performance: {
        '24h': parseFloat(getRandomArbitrary(80, 100).toFixed(2)),
        'all': parseFloat(getRandomArbitrary(80, 100).toFixed(2)),
      },
      validators: [],
    };
    for (let j = 0; j < getRandomArbitrary(20, 50, true); j += 1) {
      const validator = {
        publicKey: `0x${randomValueHex(32)}`,
      };
      operator.validators.push(validator);
    }
    operator.validatorsCount = operator.validators.length;
    operators.push(operator);
  }
  console.log(JSON.stringify(operators, null, '  '));
}

// function genValidators() {
//   const validators = [];
//   for (let i = 0; i < 30; i += 1) {
//     const validator = {
//       publicKey: `0x${randomValueHex(32)}`,
//       status: getRandomArbitrary(0, 1) > 0.3 ? 'active' : 'inactive',
//       operators: [],
//       duties: [],
//     };
//     for (let j = 0; j < getRandomArbitrary(3, 6); j += 1) {
//       validator.operators.push({
//         address: `0x${randomValueHex(32)}`,
//         name: `Name${randomValueHex(5)}`,
//         performance: {
//           '24h': parseFloat(getRandomArbitrary(80, 100).toFixed(2)),
//           'all': parseFloat(getRandomArbitrary(80, 100).toFixed(2)),
//         },
//       });
//     }
//     for (let k = 0; k < getRandomArbitrary(1000, 10000, true); k += 1) {
//       const duty = {
//         epoch: getRandomArbitrary(12345, 1234567, true),
//         slot: getRandomArbitrary(123450, 912567, true),
//         duty: getRandomArbitrary(0, 1) ? 'attestation' : 'proposal',
//         status: getRandomArbitrary(0, 1) ? 'success' : 'failed',
//         operators: [],
//       };
//       for (let m = 0; m < getRandomArbitrary(3, 6, true); m += 1) {
//         duty.operators.push({
//           address: `0x${randomValueHex(32)}`,
//           name: `Name${randomValueHex(5)}`,
//           status: getRandomArbitrary(0, 1) > 0.3 ? 'success' : 'failed',
//         });
//       }
//       validator.duties.push(duty);
//     }
//     validators.push(validator);
//   }
//   console.log(JSON.stringify(validators, null, '  '));
// }

function main() {
  genOperators();
  // genValidators();
}

main();
