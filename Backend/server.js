import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';



// 5:18:50 resume here



//App config

const app = express();
const port = process.env.PORT || 4000
connectDb();
connectCloudinary()
//middlewares

app.use(express.json())
app.use(cors())


//api endpoints

app.use('/api/user', userRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)

app.get('/', (req,res) => {
    res.send("Api is working")
})


app.listen(port, () => {
    console.log("Server listening to port:", port);

})
