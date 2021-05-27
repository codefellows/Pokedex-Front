import React from 'react';
import Pokemon from './Pokemon.js';

class PokemonList extends React.Component {
  render() {
    if (this.props.monsters) {
      return this.props.monsters.map((pokemon => {
        return <Pokemon buttonClick={this.props.callback} name={pokemon.name} image_url={pokemon.image_url} abilities={pokemon.abilities}/>
      }));
    }
    return (
      <p>List is empty</p>
    )
  }
}

export default PokemonList;
