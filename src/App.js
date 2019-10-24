import React from 'react';
import './App.css';
import DepartureList from './DepartureList.js';

function App() {
  document.title = "MBTA Departures Board";
  return (
    <div className="App">
      <header className="App-header">
        <DepartureList title="North Station" id="North Station"/>
        <DepartureList title="South Station" id="South Station"/>
      </header>
    </div>
  );
}

export default App;
