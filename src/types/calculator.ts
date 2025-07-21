import { components } from "../schemas";

export type CalculatorCommandDto = components['schemas']['CalculatorCommand']

export type CalculatorResultDto = components['schemas']['CalculatorResult']
export interface CalculatorRequestBody{
    operator:'+'|'-'|'*'|'/';
    operand1:number;
    operand2:number;
}