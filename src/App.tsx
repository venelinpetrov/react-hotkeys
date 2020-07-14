import React from 'react';
import './App.css';
import { useHotkey } from './hooks/useHotkey';

function App() {
  useHotkey('del', () => alert('del'))
  useHotkey('backspace', () => alert('backspace'))
  return (
    <div>
      <input type="text"/>
    </div>
  );
}

export default App;
