const CountryList = ({ countries, onShow }) => {
  return (
    <ul>
      {countries.map((country) => (
        // In case of country code missing
        <li key={country.cca3 || country.name.common}>
          {country.name.common}
          {/* Receives complete country object to differentiate exact countries */}
          <button onClick={() => onShow(country)}>show</button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
