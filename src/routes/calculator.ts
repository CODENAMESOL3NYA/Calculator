import { Request, Response, Router } from 'express';
import { CalculatorCommandDto,CalculatorResultDto } from '../types';
import { NotFoundError } from '../error';

export const router = Router();

const mockResults:CalculatorResultDto[]=[
    {
        id:'1',
        result:1,
        operator:'+',
        operand1:1,
        operand2:0,
        timestamp:1688612539479
    },
    {
        id:'2',
        result:10,
        operator:'-',
        operand1:20,
        operand2:10,
        timestamp:1843612559479
    },
    {
        id:'3',
        result:6,
        operator:'*',
        operand1:2,
        operand2:3,
        timestamp:1188212539479
    },
    {
        id:'4',
        result:5,
        operator:'/',
        operand1:10,
        operand2:2,
        timestamp:1788612539479
    },
    {
        id:'5',
        message:'Division by zero',
        operator:'/',
        operand1:1,
        operand2:0,
        timestamp:1288612539479
    },
]

/**
 * @openapi
 * /calculator:
 *   get:
 *     description: Get all calculations
 *     operationId: getAllCalculations
 *     tags:
 *       - calculator
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CalculatorResult'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */


router.get('/', (req: Request<{},CalculatorResultDto[]>, res: Response) => {
    res.send(mockResults);
});

/**
 * @openapi
 * /calculator/{id}:
 *   parameters:
 *     - $ref: '#/components/parameters/CalculatorId'
 *   get:
 *     description: Get calculation by ID
 *     operationId: getAllCalculationById
 *     tags:
 *       - calculator
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CalculatorResult'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

router.get('/:id', (req: Request<{id:string},CalculatorResultDto>, res: Response) => {
    const result = mockResults.find((r)=> r.id===req.params.id);
    if(!result){
        throw new NotFoundError(`Calculaion not found for ID ${req.params.id}`)
    }
    res.send([result]);
});

/**
 * @openapi
 * /calculator/{id}:
 *   parameters:
 *     - $ref: '#/components/parameters/CalculatorId'
 *   delete:
 *     description: Delete calculation by Id
 *     operationId: deleteCalculationById
 *     tags:
 *     - calculator
 *     responses:
 *       '204':
 *         description: Deleted
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

router.delete('/:id',(req:Request<{id:string}>,res:Response)=>{
    const deleteIndex = mockResults.findIndex((r)=>r.id ===req.params.id);

    if(deleteIndex === -1){
        throw new NotFoundError(`Calculaion not found for ID ${req.params.id}`)
    }
    mockResults.splice(deleteIndex,1)
    res.status(204).end();
})

/**
 * @openapi
 * /calculator:
 *   post:
 *     description: Create a calculation
 *     operationId: createCalculation
 *     tags:
 *       - calculator
 *     requestBody:
 *       $ref: '#/components/requestBodies/CalculatorCommand'
 *     responses:
 *       '201':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CalculatorResult'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

router.post('/',(req:Request<{},CalculatorResultDto,CalculatorCommandDto>,res)=>{
    const {operator,operand1,operand2} = req.body;
    let result:number|undefined;
    let message:string|undefined;
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
            if(operand2===0){
                message="Division by zero";
            }else{
                result = operand1 / operand2;       
            }
            break;
    }
    const newId = mockResults.length+1;
    const newCalculation:CalculatorResultDto={
        id:`${newId}`,
        operator,
        operand1,
        operand2,
        timestamp:req.timestamp!,
        message,
        result:result,
    };

    mockResults.push(newCalculation);
    res.status(201).send(newCalculation);
});

/**
 * @openapi
 * /calculator/{id}:
 *   parameters:
 *      - $ref: '#/components/parameters/CalculatorId'
 *   put:
 *     description: Update a calculation
 *     operationId: updateCalculation
 *     tags:
 *       - calculator
 *     requestBody:
 *       $ref: '#/components/requestBodies/CalculatorCommand'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CalculatorResult'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put('/:id',(req:Request<{id:string},CalculatorResultDto,CalculatorCommandDto>,res:Response)=>{
    const updateIndex = mockResults.findIndex((r)=> r.id===req.params.id);
    if(updateIndex === -1){
        throw new NotFoundError(`Calculaion not found for ID ${req.params.id}`)
    }
    const {operator,operand1,operand2} = req.body;
    let result:number|undefined;
    let message:string|undefined;
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
            if(operand2===0){
                message="Division by zero";
            }else{
                result = operand1 / operand2;       
            }
            break;
    }
    const updatedCalculation:CalculatorResultDto={
        id:req.params.id,
        operator,
        operand1,
        operand2,
        timestamp:req.timestamp!,
        message,
        result:result,
    };

    mockResults[updateIndex]=updatedCalculation;
    res.status(200).send(updatedCalculation)
    

})