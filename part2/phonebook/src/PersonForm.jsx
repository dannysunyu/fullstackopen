
const PersonForm = ({ name, number, onNameChange, onNumberChange, onSubmitPerson }) => {
  return (
    <form onSubmit={onSubmitPerson}>
      <div>
        name: <input value={name} onChange={onNameChange} />
      </div>
      <div>number: <input value={number} onChange={onNumberChange} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;