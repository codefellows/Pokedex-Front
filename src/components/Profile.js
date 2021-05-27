import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card';
import PokemonList from './PokemonList.js';

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
      //  We need to use Auth0 to grab the token
      //  Use the token to send a request for profile data
    }
  }

  removePokemon = () => {
    // TODO: Allow pokemon to be removed from your current pokedex
  }

  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>{this.state.username}</Card.Title>
          <PokemonList monsters={this.state.pokedex}/>
        </Card.Body>
      </Card>
    )
  }
}

export default withAuth0(Profile);
