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

app.put('/api/exercises/:type', (req, res) => {
    
    for(let i=0; i<exercises.length; i++){
        if (exercises[i].type !== req.params.type){
            exercises[i].type = req.body.type
        }
        
    }return res.send(exercises)
})

app.delete('/api/exercises/:id', (req, res) => {
    for(let i=0; i<exercises.length; i++){
        if (exercises[i].id === Number(req.params.id)){
            exercises.splice(i, 1);
        }
        
        
    } return res.send(exercises)
})