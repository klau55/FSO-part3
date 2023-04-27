require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))








app.get('/api/persons/:id', (request, response) => {

  Person.findById(request.params.id).then(person => {
    console.log(request.params.id)
    
    response.json(person)
  })
   
  //if (person) {
  //      response.json(person)
 //       
  //} else {
  //      response.status(404).end()
  //}
})

app.get('/info', (request, response) => {


    
    response.send(`
    <h4> Phonebook has info for ${persons.length} people </h4>
    <h4> ${new Date()} </h4>
    `)

})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      
      response.json(persons)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const getRandomId = (min, max) => {
  min = Math.ceil(1);
  max = Math.floor(1000);
  return Math.floor(Math.random() * (max - min) + min);
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  //const nameChecker = Object.values(names).includes(body.name)

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }// else if (nameChecker == true) {
   // return response.status(400).json({ 
   //   error: 'name already in phonebook!' 
   // })
  //}
  
  else if (!body.number){
    return response.status(400).json({ 
      error: 'number missing' 
  })
  }

  const person = new Person ({
    name: body.name,
    number: body.number,
    id: getRandomId(),
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})