import { useEffect, useState } from "react";
import axios from "axios";
import CountryList from "./components/CountryList";
import CountryDetails from "./components/CountryDetails";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Turn into service module (?)
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSelectedCountry(null); // reset manual selection when user types
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  const filteredCountries =
    filter === ""
      ? []
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(filter.toLowerCase())
        );

  const renderCountries = () => {
    if (filter === "" && !selectedCountry) {
      return <p>Type a country name to start searching.</p>;
    }

    // If user clicked "show", always show that specific country
    if (selectedCountry) {
      return <CountryDetails country={selectedCountry} />;
    }

    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }

    if (filteredCountries.length === 0) {
      return <p>No matches found</p>;
    }

    if (filteredCountries.length === 1) {
      return <CountryDetails country={filteredCountries[0]} />;
    }

    return (
      <CountryList countries={filteredCountries} onShow={handleShowCountry} />
    );
  };

  return (
    <div>
      <h1>Country information</h1>
      <div>
        find countries
        <input value={filter} onChange={handleFilterChange} />
      </div>

      <div style={{ marginTop: "1rem" }}>{renderCountries()}</div>
    </div>
  );
};

export default App;
