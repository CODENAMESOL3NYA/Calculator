import { Request, Response, Router } from 'express';
import { logger } from '../middleware';

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

router.post('/',(req:Request,res)=>{
    console.log(req.body);
    res.send({
        message:'Create new Calculation',
        timestamp:req.timestamp,
        data:req.body
    })
});