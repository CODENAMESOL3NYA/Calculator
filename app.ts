import  express from "express";
import { healthRouter, calculatorRouter, apiDocsRouter } from "./src/routes";
import { addTimestamp, errorHandler, logger, openApiValidation } from "./src/middleware";

const app =express();
const port = 3000;


app.use(addTimestamp);
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(openApiValidation)

app.use('/api-docs',apiDocsRouter)
app.use('/health',healthRouter);
app.use('/calculator',calculatorRouter);

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`The application server is listening on http://localhost:${port} `);
});