import React from 'react';
import { Container } from './styles';

export function Footer() {
  return (
    <Container>
      <p>
        Desenvolvido por
        {' '}
        <a href="https://www.linkedin.com/in/kameikay/">Victor Kamei Kay</a>
        .
        {' '}
        <br />
        Todos os dados foram obtidos do
        {' '}
        <a href="https://swapi.dev/">SWAPI</a>
        .
      </p>
    </Container>
  );
}
