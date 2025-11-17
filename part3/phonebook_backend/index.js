const express = require('express')
const app = express()

// Middleware to parse JSON bodies
app.use(express.json())

// Hardcoded data (phonebook entries)
let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/', (req, res) => {
  res.send('<h1>Phonebook backend</h1>')
})

// 3.1: Return all persons as JSON
// GET http://localhost:3001/api/persons
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// 3.2: Info page
// GET http://localhost:3001/info
app.get('/info', (req, res) => {
  const count = persons.length
  const time = new Date()

  res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${time}</p>
  `)
})

// 3.3: Get a single person by id
// GET http://localhost:3001/api/persons/:id
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find((p) => p.id === id)

  if (!person) {
    return res.status(404).json({ error: 'person not found' })
  }

  res.json(person)
})

// 3.4: Delete a person by id
// DELETE http://localhost:3001/api/persons/:id
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter((p) => p.id !== id)

  // 204 No Content: successful delete, no body
  res.status(204).end()
})

// Helper to generate a new id
// Using Math.random with a large range (as required)
const generateId = () => {
  let id
  do {
    id = Math.floor(Math.random() * 1000000)
  } while (persons.find((p) => p.id === id))
  return id
}

// 3.5 & 3.6: Add a new person with POST
// POST http://localhost:3001/api/persons
app.post('/api/persons', (req, res) => {
  const body = req.body

  // 3.6: validate name & number presence
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  // 3.6: validate name uniqueness
  const nameExists = persons.find((p) => p.name === body.name)
  if (nameExists) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  res.status(201).json(person)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
