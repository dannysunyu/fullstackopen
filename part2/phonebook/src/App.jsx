import { useState, useEffect } from 'react';
import personService from './services/persons';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('error');

  const addPerson = (event) => {
    event.preventDefault();

    const foundPerson = persons.find(person => person.name === newName);
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (!foundPerson) {
      personService
        .create(personObject)
        .then(person => {
          setPersons(persons.concat(person));
          setNewName('');
          setNewNumber('');

          setMessage(`Added ${person.name}`);
          setMessageType('success');

          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    } else if (foundPerson.number === newNumber) {
      alert(`${newName} is already added to phonebook`);
    } else if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      updateNumber(foundPerson.id, personObject);
    }
  };

  const updateNumber = (id, person) => {
    personService
      .update(id, person)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson));
        setNewName('');
        setNewNumber('');

        setMessage(`Changed ${person.name}`);
        setMessageType('success');
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch(() => {
        setMessage(`Information of ${person.name} has already been removed from server`);
        setMessageType('error');

        setPersons(persons.filter(person => person.id !== id));

        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const handleDelete = (id, name) => {
    if (confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  }

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons);
      });
  }, []);

  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={message}
        type={messageType}
      />
      <Filter
        filterValue={filter}
        onFilterChange={handleFilterChange}
      />
      <h3>add a new</h3>
      <PersonForm
        onSubmitPerson={addPerson}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={filteredPersons}
        deletePerson={handleDelete}
      />
    </div>
  )
}

export default App;