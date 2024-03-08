
import express from 'express';
import dotenv from 'dotenv';
//import products from './data/products.js';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cors from 'cors';
import connectDB from './config/db.js';
import orderRoutes from './routes/orderRoutes.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js';
 

const app = express();
app.use(express.json())

dotenv.config();
connectDB();
app.use(cors());

const Port = process.env.PORT || 5000;



app.get('/', (req, res) => {
    res.send('API is running!');
});


app.use('/api/products', productRoutes)

app.use('/api/orders', orderRoutes)

app.use('/api/product/:id', productRoutes)

app.use('/api/user', userRoutes)

app.use('/api/users/:id', userRoutes)

app.use(notFound)
app.use(errorHandler)
    

app.listen(Port, 
    console.log(`server is running ${process.env.NODE_ENV} http://localhost:5000`));


//Run app, then load http://localhost:port in a browser to see the output.