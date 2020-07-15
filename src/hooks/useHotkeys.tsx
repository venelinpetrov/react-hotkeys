import { useEffect } from 'react';
import Mousetrap, { unbind } from 'mousetrap';

export interface ExtendedKeyboardEvent extends KeyboardEvent {
  returnValue: boolean; // IE returnValue
}
export interface KeyDescriptor {
  keys: string[];
  name?: string;
  description?: string;
  group?: string;
}

export interface KeyMap {
  [key: string]: KeyDescriptor;
}

export interface HandlerMap {
  [key: string]: (e: ExtendedKeyboardEvent) => any
}

export const useHotkeys = (keyMap: KeyMap, handlers: HandlerMap, el?: React.MutableRefObject<null>, ) => {
  useEffect(() => {
    const hotkeys = mapKeysToHandlers(keyMap, handlers, el);
    return () => hotkeys.forEach(k => unbind(k));
  }, [keyMap, handlers]);
}

function mapKeysToHandlers(keyMap: KeyMap, handlers: HandlerMap, el?: React.MutableRefObject<null>, ) {
  const hotkeys = [];

  for (const [actionName, descriptor] of Object.entries(keyMap)) {
    if (handlers.hasOwnProperty(actionName)) {
      hotkeys.push(descriptor.keys);
      Mousetrap(el?.current || document.body).bind(descriptor.keys, handlers[actionName]);
    }
  }
  return hotkeys;
}
