import 'reflect-metadata';
import 'dotenv/config'
import express, { NextFunction, Request, response, Response } from 'express'
import 'express-async-errors';
import cors from 'cors'
import { errors } from "celebrate";
import routes from './routes' 
import '@shared/infra/typeorm'
import '@shared/container'
import AppError from '@shared/errors/AppError';
import upload from '@config/upload';
import { pagination } from "typeorm-pagination";
import rateLimiter from './middlewares/rateLImiter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(pagination)
app.use('/files', express.static(upload.directory))
app.use(routes);
app.use(errors())

//tratando exception.
app.use((error: Error, request: Request, resposne: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return resposne.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error.',
    })
})

app.listen(3333, () => {
    console.log('Server started on port 3333');
    
});