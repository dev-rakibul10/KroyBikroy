import express from 'express'
import cors from 'cors'
import 'dotenv/config'



// 5:18:50 resume here



//App config

const app = express();
const port = process.env.PORT || 4000

//middlewares

app.use(express.json())
app.use(cors())


//api endpoints

app.get('/', (req,res) => {
    res.send("Api is working")
})


app.listen(port, () => {
    console.log("Server listening to port:", port);
    
})
