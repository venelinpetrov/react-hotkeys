import React, { useState, useCallback, useMemo } from 'react';
import './App.css';
import {
  useHotkeys,
  KeyMap,
  ExtendedKeyboardEvent,
  HandlerMap
} from './hooks/useHotkeys';
import { HotKeysSidebar } from './components/HotkeysList';

// This object can be pulled out of the component and instead being imported
const keyMap: KeyMap = {
  UNDO: {
    name: 'Undo',
    description: 'Simplest example',
    group: 'Edit',
    keys: ['ctrl+z', 'command+z']
  },
  REDO: {
    name: 'Redo',
    description: 'Simplest example',
    group: 'Edit',
    keys: ['ctrl+shift+z', 'command+shift+z']
  },
  OPEN: {
    name: 'Open File',
    description: 'Example with preventing the default browser behavior',
    group: 'File',
    keys: ['ctrl+o']
  },
  MISC: {
    name: 'Open File',
    description: 'Example with preventing handler from executing',
    // group: '', // No group case test
    keys: ['shift+w', 'shift+e']
  }
};

function App() {
  // Simplest example
  const undo = () => alert('undo');
  const redo = () => alert('redo');

  // Example with preventing the default browser behavior
  const open = (e: ExtendedKeyboardEvent) => {
    e.preventDefault();
    alert('open');
  }

  const misc = () => alert('should only fire if not prevented');
  const [prevent, setPrevent] = useState(false);
  const handlePrevent = useCallback(() => setPrevent(prevValue => !prevValue), [prevent]);

  const handlersMap: HandlerMap = useMemo(() => ({
    UNDO: undo, // Simplest example
    REDO: redo, // Simplest example
    OPEN: open, // Example with preventing the default browser behavior
    MISC: () => !prevent && misc() // Example with preventing handler from executing
  }), [prevent]);

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
