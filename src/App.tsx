import React from 'react';
import './App.css';
import {
  useHotkeys,
  KeyMap,
  ExtendedKeyboardEvent
} from './hooks/useHotkeys';
import { HotKeysSidebar } from './components/HotkeysList';

const keyMap: KeyMap = {
  UNDO: {
    name: 'Undo',
    description: 'Perform undo operation',
    group: 'Edit',
    keys: ['ctrl+z', 'command+z']
  },
  REDO: {
    name: 'Redo',
    description: 'Perform redo operation',
    group: 'Edit',
    keys: ['ctrl+shift+z', 'command+shift+z']
  },
  OPEN: {
    name: 'Open File',
    description: 'Opens a file',
    group: 'File',
    keys: ['ctrl+o']
  }
}

function App() {
  const undo = () => alert('undo');
  const redo = () => alert('redo');
  const open = (e: ExtendedKeyboardEvent)=> {
    e.preventDefault();
    alert('open');
  }

  const handlersMap = {
    UNDO: undo,
    REDO: redo,
    OPEN: open,
  };

  useHotkeys(keyMap, handlersMap);

  return (
    <div>
      <input type="text"/>
      <HotKeysSidebar keyMap={keyMap} />
    </div>
  );
}

export default App;
