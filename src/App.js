
import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [pokemonNames, setPokemonNames] = useState([]);

  // se carga los nombres de los Pokémon
  const fetchPokemon = async () => {
    try {
      let allPokemonNames = [];
      let nextUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20'; 

      // se obtiene  todos los nombres hasta el Pokémon 807
      while (allPokemonNames.length < 807) {
        const response = await axios.get(nextUrl);
        const pokemonData = response.data.results;

        // se extrae los  nombres de los Pokémon de la página actual
        const names = pokemonData.map(pokemon => pokemon.name);
        allPokemonNames = [...allPokemonNames, ...names];

        nextUrl = response.data.next;
        
        // Si no hay más páginas, salir del bucle
        if (!nextUrl) break;
      }

      // se corta la lista a 807 nombres si se obtienen más
      allPokemonNames = allPokemonNames.slice(0, 807);

      // se actualiza el estado con todos los nombres de los Pokémon
      setPokemonNames(allPokemonNames);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchPokemon}>Fetch Pokemon</button>
        <ul>
          {pokemonNames.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
