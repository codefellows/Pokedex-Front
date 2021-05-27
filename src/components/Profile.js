import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card';
import PokemonList from './PokemonList.js';
import UpdatePokedex from './UpdateForm.js';
import axios from 'axios';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      username: '',
      pokedex: [],
    }
  }

  componentDidMount() {
    if (this.props.auth0.isAuthenticated) {
      // TODO: when the user is authenticated
      this.props.auth0.getIdTokenClaims()
        .then(results => {
          //  We need to use Auth0 to grab the token
          const token = results.__raw;

          //  Use the token to send a request for profile data
          const profileRequest = {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
            url: 'http://localhost:3001/profile'
          }

          axios(profileRequest).then(response => this.setState({
            email: response.data.email,
            username: response.data.username,
            pokedex: response.data.pokedex,
          }));
        });
    }
  }

  removePokemon = async () => {
    // TODO: Allow pokemon to be removed from your current pokedex

    // Grabs the users token
    // configure an HTTP request that will send the token, and an identifier for the pokemon that should be removed.
  }

  updatePokemon = async (index, pokemonObject) => {
    if (this.props.auth0.isAuthenticated) {
      // TODO: when the user is authenticated
      this.props.auth0.getIdTokenClaims()
        .then(results => {
          //  We need to use Auth0 to grab the token
          const token = results.__raw;

          //  Use the token to send a request for profile data
          const profileRequest = {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}` },
            url: `http://localhost:3001/pokedex/${index}`,
            data: pokemonObject,
          }

          axios(profileRequest).then(response => {
            let updatedPokedex = response.data;
            this.setState({ pokedex: updatedPokedex });
          });
        });
    }
  }

  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>{this.state.username}</Card.Title>
          <Card.Text>Your Pokedex</Card.Text>
          <PokemonList
            buttonCallBack={this.removePokemon}
            monsters={this.state.pokedex}
            pokemonCardButtonText={'Remove from Pokedex'}
          />
          <UpdatePokedex formCallback={this.updatePokemon} pokedex={this.state.pokedex} />
        </Card.Body>
      </Card>
    )
  }
}

export default withAuth0(Profile);
