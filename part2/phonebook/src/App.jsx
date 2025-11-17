import { useState } from "react";

// Filter component
const Filter = ({ filterName, handleFilterChange }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={filterName} onChange={handleFilterChange}></input>
    </div>
  );
};

// Form for adding a new person
const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

// List of persons in the phonebook
const Persons = ({ personsToShow }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  // Handlers for state & logic
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  // Event listener for adding a new person to the phonebook
  // Checks for duplicates and empty submissions
  const addPerson = (event) => {
    event.preventDefault();

    const trimmedName = newName.trim();
    const trimmedNumber = newNumber.trim();

    if (trimmedName === "" || trimmedNumber === "") return;

    const nameAlreadyExists = persons.some(
      (person) => person.name === trimmedName
    );

    if (nameAlreadyExists) {
      alert(`${trimmedName} is already in the phonebook!`);
      return;
    }

    const personObject = {
      name: trimmedName,
      number: trimmedNumber,
      id: persons.length + 1,
    };
    console.log(personObject);

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const personsToShow =
    filterName.trim() === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterName.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
