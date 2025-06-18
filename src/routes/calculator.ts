import { Request, Response, Router } from 'express';
import { logger, validateCalculatorRequest } from '../middleware';
import { CalculatorRequestBody } from '../types';

export const router = Router();

router.use(logger);

router.get('/', (req: Request, res: Response) => {
    res.json({
        message: "Get all calculations",
        timestamp: req.timestamp,
        data: [
            { id: 1, result: 1 },
            { id: 2, result: 2 }
        ],
    });
});

router.get('/:id', (req: Request, res: Response) => {
    const request = req.params.id;
    res.json({
        message: 'Get calculation by ID',
        timestamp: req.timestamp,
        id: req.params.id,
        result: 1
    })
});

router.post('/',validateCalculatorRequest,(req:Request<{},any,CalculatorRequestBody>,res)=>{
    const {operator,operand1,operand2} = req.body;
    let result:number|string;
    result =0;
    switch(operator){
        case "+":
            result = operand1 + operand2
            break;
        case "-":
            result = operand1 - operand2;
            break;
        case "*":
            result = operand1 * operand2;
            break;
        case "/":
            result = operand1 / operand2;
            break;
        default:
            result='Invalid operator'
            break;
    }
    res.send({
        message:'Create new Calculation',
        timestamp:req.timestamp,
        data:result
    })
});