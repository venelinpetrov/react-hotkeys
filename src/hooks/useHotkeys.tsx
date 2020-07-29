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
  [key: string]: (e: ExtendedKeyboardEvent, combo?: string) => any
}

export const useHotkeys = (
  keyMap: KeyMap,
  handlers: HandlerMap,
  ref?: React.MutableRefObject<null>,
  stopCallback?: (e: ExtendedKeyboardEvent, element: Element, combo: string) => boolean) => {
  useEffect(() => {
    const hotkeys:string[][] = [];

    const MousetrapInstance = Mousetrap(ref?.current || document.body);
    for (const [actionName, descriptor] of Object.entries(keyMap)) {
      if (handlers.hasOwnProperty(actionName)) {
        hotkeys.push(descriptor.keys);

        MousetrapInstance.bind(descriptor.keys, handlers[actionName]);
      }
    }
    Mousetrap.stopCallback = stopCallback || Mousetrap.prototype.stopCallback

    return () =>{
      hotkeys.forEach(k => {
        MousetrapInstance.unbind(k);
      });
    };
  }, [keyMap, handlers]);
};

