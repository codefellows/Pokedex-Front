import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class UpdatePokedex extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      image_url: '',
      abilities: [],
    }
  }



  render() {
    return (
      <>
        <Button>
          UpdatePokemon
        </Button>
        <Form>

        </Form>
      </>
    )
  }
}

export default UpdatePokedex;
