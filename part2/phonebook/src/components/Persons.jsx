const Persons = ({ persons, deletePerson }) => {
  return (
    persons.map(person => {
      return (
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
        </div>
      );
    })
  );
};

export default Persons;