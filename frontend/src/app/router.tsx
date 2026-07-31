import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Scan } from '../pages/Scan';
import { Result } from '../pages/Result';
import { NotFoundPage } from '../pages/NotFound';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scan" element={<Scan />} />
      <Route path="/result" element={<Result />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
