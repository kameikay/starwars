import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Container } from './styles';

export function PageLayout() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
