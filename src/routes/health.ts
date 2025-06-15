import {Request, Response, Router} from 'express';

export const router = Router();

router.get('/',(req:Request,res:Response)=>{
    
    res.json({message:'OK',timestamp:req.timestamp})
});
