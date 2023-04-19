const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
 
   
  if (person) {
        response.json(person)
  } else {
        response.status(404).end()
  }
})

app.get('/info', (request, response) => {

    const idMax = Math.max(...persons.map (person => person.id))
    const responseText = "Phonebook contains numbers of ${idMax} people"
    
    response.send(`
    <h4> Phonebook has info for ${idMax} people </h4>
    <h4> ${new Date()} </h4>
    `)

})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
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
  console.log(body.name)
  const names = persons.map(person => person.name)
  const nameChecker = Object.values(names).includes(body.name)
  console.log(nameChecker)
  console.log(names)

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  } else if (nameChecker == true) {
    return response.status(400).json({ 
      error: 'name already in phonebook!' 
    })
  }
  
  else if (!body.number){
    return response.status(400).json({ 
      error: 'number missing' 
  })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: getRandomId(),
  }

  persons = persons.concat(person)

  response.json(person)
})