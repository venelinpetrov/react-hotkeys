import React, { useState, useCallback } from 'react';
import './App.css';
import {
  useHotkeys,
  KeyMap,
  ExtendedKeyboardEvent,
  HandlerMap
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
  },
  MISC: {
    name: 'Open File',
    description: 'Test the prevent functionality',
    // group: '', // No group case test
    keys: ['shift+w']
  }
}

function App() {
  // Simplest example
  const undo = () => alert('undo');
  const redo = () => alert('redo');

  // Example with preventing the default browser behavior
  const open = (e: ExtendedKeyboardEvent)=> {
    e.preventDefault();
    alert('open');
  }

  const misc = () => alert('should not fire');
  const [prevent, setPrevent] = useState(false);
  const handlePrevent = useCallback(() => setPrevent(prevValue => !prevValue), [prevent]);

  const handlersMap: HandlerMap = {
    UNDO: undo,
    REDO: redo,
    OPEN: open,
    MISC: () => !prevent && misc() // Example how to prevent handler from executing
  };

  useHotkeys(keyMap, handlersMap);

  return (
    <div>
      <input type="text"/>
      <button onClick={handlePrevent}>
        Prevent {JSON.stringify(prevent)}
      </button>
      <HotKeysSidebar keyMap={keyMap} />
    </div>
  );
}

export default App;
