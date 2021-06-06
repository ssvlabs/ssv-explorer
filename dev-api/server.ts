import path from 'path';
import cors from 'cors';
import Express from 'express';
import bodyParser from 'body-parser';
const operators = require('./data/operators.json');
const validators = require('./data/validators.json');

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

app.get('/api/search', (req: Express.Request, res: Express.Response) => {
  try {
    const search = req.query.query ?? '';
    if (!search || String(search).length < 3) {
      return res.json({
        operators: [],
        validators: [],
      });
    }

    const operatorsList: any[] = operators.filter((operator: any) => {
      if (operator.name.startsWith(search) || operator.address.startsWith(search)) {
        return operator;
      }
      return null;
    });

    const validatorsList: any[] = validators.filter((validator: any) => {
      if (validator.publicKey.startsWith(search)) {
        return validator;
      }
      return null;
    });

    return res.json({
      operators: operatorsList.slice(0, 5),
      validators: validatorsList.slice(0, 5),
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        status: 500,
        message: 'Unable to perform search',
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
        total: operators.length,
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
 * Paginated validators list
 */
app.get('/api/validators', (req: Express.Request, res: Express.Response) => {
  try {
    const perPage: number = parseInt(String(req.query.perPage ?? 10), 10);
    const page: number = parseInt(String(req.query.page ?? 1), 10);
    const validatorsList = paginate(validators, perPage, page);
    return res.json({
      validators: validatorsList,
      pagination: {
        page,
        pages: Math.ceil(validators.length / perPage),
        perPage,
        total: validators.length,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        status: 500,
        message: 'Unable to retrieve validators',
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

    if (!operator) {
      return res
        .status(404)
        .json({
          status: 404,
          message: 'Can not find operator',
        });
    }

    const pages = Math.ceil(operator.validators.length / perPage);
    const total = operator?.validators?.length || 0;
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
        total,
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
app.get('/api/validators/:validator', (req: Express.Request, res: Express.Response) => {
  try {
    const validatorId = req.params.validator;
    const perPage: number = parseInt(String(req.query.perPage ?? 10), 10);
    const page: number = parseInt(String(req.query.page ?? 1), 10);

    // Input validation
    if (!validatorId) {
      return res
        .status(400)
        .json({
          status: 400,
          message: 'Validator Address is required',
        });
    }

    const validatorsList = validators.filter((op: any) => {
      return op.publicKey === validatorId;
    });
    const validator = validatorsList.length ? ({ ...validatorsList[0] }) : null;

    if (!validator) {
      return res
        .status(404)
        .json({
          status: 404,
          message: 'Can not find validator',
        });
    }

    const pages = Math.ceil(validator.duties.length / perPage);
    const total = validator?.duties?.length || 0;
    if (validator) {
      // Paginate validator duties
      validator.duties = paginate(validator.duties, perPage, page);
    }
    return res.json({
      validator,
      pagination: {
        page,
        pages,
        perPage,
        total,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        status: 500,
        message: 'Unable to retrieve validator',
        error,
      });
  }
});

app.listen(5000, () => {
  console.log(`Proxy server is listening on the port::${5000}`);
});
