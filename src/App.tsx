import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLayout } from './components/PageLayout';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
