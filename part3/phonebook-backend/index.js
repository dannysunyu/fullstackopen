const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
const mongoose = require("mongoose");

const app = express();
app.use(express.static('dist'));
app.use(cors());
app.use(express.json());

morgan.token('request-body', function getRequestBody(req) {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'));

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
];

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.json(result);
  });
});

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p>${new Date()}<p></p>`);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});


app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedPerson => {
    response.json(person);
  });

});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});