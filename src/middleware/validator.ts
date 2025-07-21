import * as OpenApiValidator from 'express-openapi-validator';
import path from 'path'


export const openApiValidation = OpenApiValidator.middleware({
    apiSpec: path.join(__dirname,'../schemas/openapi.json'),
    validateRequests:true,
    validateResponses:true,
    validateApiSpec:true,
    ignorePaths: /\/api-docs/,
})