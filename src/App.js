import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import 'aos/dist/aos.css';

import Layout from './layout/Layout';
import Home from './pages/Home';
import Form from './pages/Form';

const App = () => {
  return (
    <HelmetProvider>
      < Helmet titleTemplate='%s| Water Quality Predictor' defaultTitle='Water Quality Predictor' />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/form' element={<Form />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;