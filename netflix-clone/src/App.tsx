import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Search from './Routes/Search';
import Tv from './Routes/Tv';
import Home from './Routes/Home';
import Header from './Components/header';

function App() {
  return (
      <>
          <Header />
          <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/tv" element={<Tv />}></Route>
              <Route path="/search" element={<Search />}></Route>
          </Routes>
      </>
  );
}

export default App;
