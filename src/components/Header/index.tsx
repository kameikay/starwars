import React from 'react';
import { Link } from 'react-router-dom';
import {
  MdHome,
  MdPersonSearch,
  MdMovie,
  MdDirectionsCarFilled,
} from 'react-icons/md';
import { IoMdJet } from 'react-icons/io';
import { Container } from './styles';
import logo from '../../../public/images/logo.svg';

export function Header() {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Logo Star Wars" />
      </Link>

      <nav>
        <Link to="/">
          <MdHome size={20} />
          Home
        </Link>

        <Link to="/people">
          <MdPersonSearch size={20} />
          Personagens
        </Link>

        <Link to="/movies">
          <MdMovie size={20} />
          Filmes
        </Link>
        <Link to="/starships">
          <IoMdJet size={20} />
          Naves Espaciais
        </Link>
        <Link to="/vehicles">
          <MdDirectionsCarFilled size={20} />
          Veículos
        </Link>
      </nav>
    </Container>
  );
}
