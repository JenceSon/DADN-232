import classInfoRouter from './routes/classInfoRouter.js'
import manageIOTRouter from './routes/manageIOTRouter.js'
import micRouter from './routes/micRouter.js'
import profileRouter from './routes/profileRouter.js'
import registerClassRouter from './routes/registerClassRouter.js'
import express from 'express'
const app  = express()
const port = 3000

//test
app.get('/',(req,res)=>{
    res.send('hi')
})

// app.listen(port,()=>{
//     console.log('Example app listening on port ',port)
// })

//add route

app.use(express.json());

app.use('/api/classInfo',classInfoRouter)
app.use('/api/manageIOT',manageIOTRouter)
app.use('/api/mic',micRouter)
app.use('/api/profile',profileRouter)
app.use('/api/registerClass',registerClassRouter)

app.listen(port,()=>{
    console.log('hello')
})