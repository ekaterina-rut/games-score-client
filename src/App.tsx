import React from 'react';
import './App.css';
import { CounterReader } from './components/CounterReader/CounterReader';
import { CounterWriter } from './components/CounterWriter/CounterWriter';

function App() {
  return (
    <div>
      <CounterReader />
      <CounterWriter />
    </div>
  );
}

export default App;
