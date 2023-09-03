import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css'
import './App.css'
import MapView from './pages/MapView';
import Home from './pages/Home';
import Location from './pages/Location';


function App() {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MapView">
          <Route path="city/:city" element={<MapView />} />
          <Route path="name/:name" element={<Location />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>

  )
}

export default App
