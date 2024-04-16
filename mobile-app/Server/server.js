import classInfoRouter from './routes/classInfoRouter.js'
import manageIOTRouter from './routes/manageIOTRouter.js'
import micRouter from './routes/micRouter.js'
import profileRouter from './routes/profileRouter.js'
import registerClassRouter from './routes/registerClassRouter.js'
import loginRouter from './routes/loginRouter.js'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app  = express()
//server config
const port = 3000
app.use(cors({
    origin : 'exp://localhost:8081'
}));

//test
app.get('/',(req,res)=>{
    res.send('hi')
})

// app.listen(port,()=>{
//     console.log('Example app listening on port ',port)
// })

//add route

app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));
app.use(bodyParser.text({ limit: '200mb' }));

app.use('/api/classInfo',classInfoRouter)
app.use('/api/manageIOT',manageIOTRouter)
app.use('/api/mic',micRouter)
app.use('/api/profile',profileRouter)
app.use('/api/registerClass',registerClassRouter)
app.use('/api/login',loginRouter)


app.listen(port,()=>{
    console.log('hello')
})