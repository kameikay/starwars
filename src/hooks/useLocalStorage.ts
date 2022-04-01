import { useEffect, useState } from 'react';

interface ILocalStorage {
  key: string;
  initialValue: any;
}

export function useLocalStorage({ key, initialValue }: ILocalStorage) {
  const [state, setState] = useState(() => {
    try {
      const serializedState = localStorage.getItem(key);
      if (serializedState === null) {
        return initialValue;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(key, serializedState);
    } catch {}
  }, [key, state]);

  return [state, setState];
}
