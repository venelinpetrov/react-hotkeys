import { useEffect } from 'react';
import { bind, unbind } from 'mousetrap';

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

export const useHotkeys = (keyMap: KeyMap, handlers: HandlerMap) => {
  useEffect(() => {
    const hotkeys = mapKeysToHandlers(keyMap, handlers)
    return () => hotkeys.forEach(k => unbind(k));
  }, [keyMap, handlers]);
}

function mapKeysToHandlers(keyMap: KeyMap, handlers: HandlerMap) {
  const hotkeys = [];

  for (const [actionName, descriptor] of Object.entries(keyMap)) {
    if (handlers.hasOwnProperty(actionName)) {
      hotkeys.push(descriptor.keys)
      bind(descriptor.keys, handlers[actionName]);
    }
  }
  return hotkeys;
}
