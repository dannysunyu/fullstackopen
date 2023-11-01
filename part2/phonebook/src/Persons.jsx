
const Person = ({ name, number }) => {
  return (
    <div key={name}>{name} {number}</div>
  );
};


const Persons = ({ persons }) => {
  return (
    persons.map(person => {
      return (
        <Person key={person.name}
          name={person.name}
          number={person.number} />
      );
    })
  );
};

export default Persons;