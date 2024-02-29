import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Search from './Routes/Search';
import Home from './Routes/Home';
import Header from './Components/header';

function App() {
  return (
      <>
          <Header />
          <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/search/:movieName" element={<Search />}></Route>
          </Routes>
      </>
  );
}

export default App;
