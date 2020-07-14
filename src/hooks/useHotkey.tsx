import { useEffect } from 'react';
import { bind } from 'mousetrap';

export const useHotkey = (
  keys: string | string[],
  handler: (e?: ExtendedKeyboardEvent, combo?: string) => any,
  options?: {}
) => {
  useEffect(() => {
    bind(keys, handler);
  }, [keys, handler]);
}