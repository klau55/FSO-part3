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


app.get('/api/persons/:id', (request, response, next) => {

  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))


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

  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
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

  const person = new Person ({
    name: body.name,
    number: body.number,
    id: getRandomId(),
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)