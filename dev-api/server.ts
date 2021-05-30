import path from 'path';
import cors from 'cors';
import Express from 'express';
import bodyParser from 'body-parser';
const operators = require('./data/operators.json');

const app = Express();

const paginate = (array: any[], page_size: number, page_number: number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

app.use(cors());
app.use(bodyParser.json());
app.use(Express.static(path.join(__dirname, '../build')));

app.get('/api/overview', (req: Express.Request, res: Express.Response) => {
  try {
    return res.json({
      operatorsCount: 100,
      validatorsCount: 1235,
      totalEth: 35000,
      totalUsd: 104434000,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        status: 500,
        message: 'Unable to retrieve overview stats',
        error,
      });
  }
});

/**
 * Paginated operators list
 */
app.get('/api/operators', (req: Express.Request, res: Express.Response) => {
  try {
    const perPage: number = parseInt(String(req.query.perPage ?? 10), 10);
    const page: number = parseInt(String(req.query.page ?? 1), 10);
    const operatorsList = paginate(operators, perPage, page);
    return res.json({
      operators: operatorsList,
      pagination: {
        page,
        pages: Math.ceil(operators.length / perPage),
        perPage,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        status: 500,
        message: 'Unable to retrieve operators',
        error,
      });
  }
});

/**
 * Get one operator with paginated validators of this operator
 */
app.get('/api/operators/:operator', (req: Express.Request, res: Express.Response) => {
  try {
    const operatorId = req.params.operator;
    const perPage: number = parseInt(String(req.query.perPage ?? 10), 10);
    const page: number = parseInt(String(req.query.page ?? 1), 10);

    // Input validation
    if (!operatorId) {
      return res
        .status(400)
        .json({
          status: 400,
          message: 'Operator Address is required',
        });
    }

    const operatorsList = operators.filter((op: any) => {
      return op.address === operatorId;
    });
    const operator = operatorsList.length ? ({ ...operatorsList[0] }) : null;
    const pages = Math.ceil(operator.validators.length / perPage);
    if (operator) {
      // Paginate operator validators
      operator.validators = paginate(operator.validators, perPage, page);
    }
    return res.json({
      operator,
      pagination: {
        page,
        pages,
        perPage,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        status: 500,
        message: 'Unable to retrieve operators',
        error,
      });
  }
});

app.listen(5000, () => {
  console.log(`Proxy server is listening on the port::${5000}`);
});
