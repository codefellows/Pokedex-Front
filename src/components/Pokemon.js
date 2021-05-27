import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class Pokemon extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Card>
        <Card.Img variant="top" src={this.props.image_url} />
        <Card.Body>
          <Card.Title>{this.props.name}</Card.Title>
          {this.props.abilities.length && this.props.abilities.map(ability => (
            <Card.Text>
              {ability}
            </Card.Text>
          ))}
          <Button
            onClick={() => {
              this.props.buttonClick({
                name: this.props.name,
                image_url: this.props.image_url,
                abilities: this.props.abilities
              }
              )
            }}
            variant="primary">{this.props.buttonText}</Button>
        </Card.Body>
      </Card>
    )
  }
}

export default Pokemon;
