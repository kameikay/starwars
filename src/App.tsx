import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLayout } from './components/PageLayout';
import CharacterPage from './pages/CharacterPage';
import Films from './pages/Films';
import FilmPage from './pages/FilmsPage';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/characters/:id" element={<PageLayout />}>
        <Route index element={<CharacterPage />} />
      </Route>
      <Route path="/films" element={<PageLayout />}>
        <Route index element={<Films />} />
        <Route path="/films/:id" element={<FilmPage />} />
      </Route>
    </Routes>
  );
}

export default App;
