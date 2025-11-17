import Weather from "./Weather";

const CountryDetails = ({ country }) => {
  // Defensive coding to not break anything
  if (!country) return null;

  const capital =
    country.capital && country.capital.length > 0 ? country.capital[0] : "N/A";

  const languages = country.languages ? Object.values(country.languages) : [];

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital: {capital}</p>
      <p>area: {country.area}</p>

      {/* Map over countries for full language selection */}
      <h3>Languages</h3>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags?.png || country.flags?.svg}
        alt={country.flags?.alt || `Flag of ${country.name.common}`}
      />

      {capital !== "N/A" && <Weather capital={capital} />}
    </div>
  );
};

export default CountryDetails;
