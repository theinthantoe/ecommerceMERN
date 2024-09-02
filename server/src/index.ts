import express from 'express'
import cors from 'cors'
import bodypaser from 'body-parser'
import mongoose from 'mongoose'
import { userRouter } from './routes/user';
import { productRouter } from './routes/product';

const PORT = 8001;

const app = express();

app.use(express.json());
app.use(bodypaser.json())
app.use(cors());

app.use('/user',userRouter)
app.use('/product',productRouter)


mongoose.connect("mongodb+srv://imloyd24:ecommerce@ecommerce.awjah.mongodb.net/");




app.listen(PORT, ()=> console.log(`Server is listening on ${PORT}`))
