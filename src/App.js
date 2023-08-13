// Import modules and components
import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, gql, ApolloProvider, useQuery } from '@apollo/client';
import CountryCard from './CountryCard'; // Importing a custom card component
import './App.css';

// Creating an Apollo Client instance
const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/', // GraphQL API endpoint
  cache: new InMemoryCache() // Client-side caching for better performance
});

// Defining the GraphQL query
const COUNTRIES_QUERY = gql`
  query GetCountries {
    countries {
      name
      emoji
      capital
      currency
      languages {
        name
      }
      continent {
        name
      }
    }
  }
`;

// Main component of the application
function App() {
  // Use the useQuery hook to fetch data from the GraphQL server
  const { loading, error, data } = useQuery(COUNTRIES_QUERY);
  
  // State to keep track of selected country and search query
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Display loading message while data is being fetched
  if (loading) return <p>Loading...</p>;
  
  // Display error message if there's an issue with fetching data
  if (error) return <p>Error :(</p>;

  // Handler for clicking on a country card
  const handleCountryClick = country => {
    setSelectedCountry(country === selectedCountry ? null : country);
  };

  // Filter countries based on search query
  const filteredCountries = data.countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render the main UI of the application
  return (
    <div className="app">
      <div className="top">
        {/* Input field for searching countries */}
        <input
          placeholder="Search Countries Here"
          type="text"
          name="text"
          className="input"
          value={searchQuery} 
          onChange={e => setSearchQuery(e.target.value)} 
        />
        <div className="h1-container">
          {/* Title */}
          <h1 className="app-title">Global Countries Database</h1>
        </div>
      </div>
      <ul className="country-list">
        {/* Render a list of country cards */}
        {filteredCountries.map(country => (
          <CountryCard
            key={country.name}
            country={country}
            selected={selectedCountry === country}
            onClick={handleCountryClick}
          />
        ))}
      </ul>
    </div>
  );
}

// Wrapper component that provides Apollo Client to App component
function AppWrapper() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

// Export the wrapped App component as the default export
export default AppWrapper;
