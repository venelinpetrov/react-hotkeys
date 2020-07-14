import { useEffect } from 'react';
import { bind } from 'mousetrap';

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
  useEffect(() => mapKeysToHandlers(keyMap, handlers), [keyMap, handlers]);
}

function mapKeysToHandlers(keyMap: KeyMap, handlers: HandlerMap) {
  for (const [actionName, descriptor] of Object.entries(keyMap)) {
    if (!(actionName in handlers)) {
      throw `${actionName} has no handler`;
    } else {
      bind(descriptor.keys, handlers[actionName]);
    }
  }
}
