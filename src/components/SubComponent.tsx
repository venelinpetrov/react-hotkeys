import React, { useRef } from 'react';
import { useHotkeys, KeyMap, HandlerMap } from '../hooks/useHotkeys';

export const SubComponent = () => {
  const ref = useRef(null);
  const keyMap: KeyMap = {
    TEST: { keys: ['ctrl+z'] }
  };

  const handlerMap: HandlerMap = {
    TEST: (e: Event) => {alert('test'); e.stopPropagation()}
  };

  useHotkeys(keyMap, handlerMap, ref);

  return <div tabIndex={2} ref={ref}>Sub</div>
};
