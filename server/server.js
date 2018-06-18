//setup express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3005;

app.listen(port, () => {
    console.log('Listening on port ' + port);
})

app.use(bodyParser.json())

let exercises = require('./exercises')
let id = 6

let weight = require('./weight')
let id2 = 1
let date = require('./date')


app.get('/api/exercises', (req, res) => {
    res.send(exercises)
})

app.post('/api/exercises', (req, res) => {
    console.log(req.body)
    req.body.id = id
    console.log(req.body)
    id++
    exercises.push(req.body)
    res.send(exercises)
})

app.post('/api/weight', (req, res) => {
    const { type } = req.body
    const newWeight = { type, id2 }
    id2+=1
    weight.push(newWeight)
    res.send(weight)


})

app.post('/api/date', (req,res) =>{
    const { type } = req.body
    const newDate = { type }
    date.push( newDate )
    res.send(date)
})

app.put('/api/exercises/:id', (req, res) => {
   console.log('this is req.body:', req.body)
   console.log('this is req.params:', req.params)
   for(let i=0; i<exercises.length; i++){
    console.log(exercises[i].id)  
    if (exercises[i].id === Number(req.params.id)) {
        exercises[i].type = req.body.type
    }
   
   }
   res.send(exercises)
})


app.delete('/api/exercises/:id', (req, res) => {
    for(let i=0; i<exercises.length; i++){
        if (exercises[i].id === Number(req.params.id)){
            exercises.splice(i, 1);
        }
        
        
    } return res.send(exercises)
})