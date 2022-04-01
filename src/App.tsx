import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLayout } from './components/PageLayout';
import CharacterPage from './pages/CharacterPage';
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
    </Routes>
  );
}

export default App;
