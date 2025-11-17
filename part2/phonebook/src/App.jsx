import { useState, useEffect } from "react";
import personsService from "./service/persons";

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
const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id, person.name)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  // Fetch database entries
  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

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

    const existingPerson = persons.find(
      (person) => person.name === trimmedName
    );

    // If person already exists → confirm & update number
    if (existingPerson) {
      const ok = window.confirm(
        `${trimmedName} is already added to phonebook, replace the old number with a new one?`
      );
      if (!ok) return;

      const updatedPerson = { ...existingPerson, number: trimmedNumber };

      personsService
        .update(existingPerson.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== existingPerson.id ? person : returnedPerson
            )
          );
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          alert(
            `Information of ${trimmedName} has already been removed from the server`
          );
          setPersons(persons.filter((p) => p.id !== existingPerson.id));
        });

      return;
    }

    // Otherwise → create a brand new person
    const personObject = {
      name: trimmedName,
      number: trimmedNumber,
    };

    personsService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleDelete = (id, name) => {
    const ok = window.confirm(`Delete ${name}?`);
    if (!ok) return;

    personsService
      .remove(id)
      .then(() => {
        setPersons(
          persons.filter((person) => {
            return person.id !== id;
          })
        );
      })
      .catch((error) => {
        alert(`${name} has already been removed from the server`);
        setPersons(
          persons.filter((person) => {
            person.id !== id;
          })
        );
      });
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

      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
