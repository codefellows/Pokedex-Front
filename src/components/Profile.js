import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card';
import PokemonList from './PokemonList.js';
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

  removePokemon = () => {
    // TODO: Allow pokemon to be removed from your current pokedex

    // Grabs the users token
    // configure an HTTP request that will send the token, and an identifier for the pokemon that should be removed.
  }

  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>{this.state.username}</Card.Title>
          <Card.Text>Your Pokedex</Card.Text>
          <PokemonList
            callback={this.removePokemon}
            monsters={this.state.pokedex}
            pokemonCardButtonText={'Remove from Pokedex'}
          />
        </Card.Body>
      </Card>
    )
  }
}

export default withAuth0(Profile);
