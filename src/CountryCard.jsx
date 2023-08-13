import React from 'react';

// Defining a functional component named CountryCard
const CountryCard = ({ country, selected, onClick }) => {

  return (
    <div className={`country ${selected ? 'active' : ''}`} onClick={() => onClick(country)}>
      {/* Container for country information */}
      <div className="country-content">
        {/* Header containing emoji and country name */}
        <div className="country-header">
          <span className="country-emoji">{country.emoji}</span>
          <h3>{country.name}</h3>
        </div>
        {/* Details about the country */}
        <div className="country-details">
          <p>Capital: {country.capital}</p>
          <p>Currency: {country.currency}</p>
        </div>
        {/* Render additional details if the country is selected */}
        {selected && (
          <div className="country-details">
            <p>Languages: {country.languages.map(lang => lang.name).join(', ')}</p>
            <p>Continent: {country.continent.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Export the CountryCard component as the default export
export default CountryCard;
