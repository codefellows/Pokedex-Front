import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import LoginButton from './components/LoginButton.js';
import Profile from './components/Profile.js';
import PokemonList from './components/PokemonList.js';
import './App.css';

class App extends React.Component {
    constructor() {
    super();
    this.state = {
      pokemon: [],
    }
  }

  componentDidMount() {
    let name = '';
    let abilities = [];
    let image_url = '';
    axios.get('https://pokeapi.co/api/v2/pokemon')
    .then(response => response.data.results.forEach(pokemon => {
      axios.get(pokemon.url)
      .then((pokemonDetails => {
        name = pokemon.name;
        abilities = pokemonDetails.data.abilities.map(ability => ability.ability.name);
        image_url = pokemonDetails.data.sprites.other['official-artwork']['front_default'];
        this.setState({ pokemon: [...this.state.pokemon, {name,  abilities, image_url }] }, () => console.log(this.state));
      }))
    }))
  }

  addToPokedex = async () => {
    // TODO: send a request to the backend that adds a pokemon to the users Pokedex 
  }

  render() {
    return (
      <div className="App">
        <Jumbotron>
          <h1>Welcome to the Pokedex!</h1>
          <p>
            click button below to login
          </p>
          <div>
            <LoginButton variant="primary">Learn more</LoginButton>
            { this.props.auth0.isAuthenticated
            ? <Profile />
            : this.props.auth0.isLoading
              ? '...loading'
              : null }
          </div>
        </Jumbotron>
        <PokemonList callback={this.addToPokedex} monsters={this.state.pokemon} />
      </div>
    );
  }
}

export default withAuth0(App);
