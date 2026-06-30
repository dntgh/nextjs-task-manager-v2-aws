import { useEffect, useRef, useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void, boolean] {
  const hasLoadedRef = useRef(false);
  const initialValueRef = useRef(initialValue);
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValueRef.current);
      } catch (error) {
        console.error(`Error parsing localStorage key "${key}":`, error);
        setStoredValue(initialValueRef.current);
      } finally {
        hasLoadedRef.current = true;
        setIsLoaded(true);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [key]);

  useEffect(() => {
    if (!hasLoadedRef.current) {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const setValue = (value: T | ((val: T) => T)) => {
    hasLoadedRef.current = true;
    setStoredValue((prev) => (typeof value === "function" ? (value as Function)(prev) : value));
  };

  return [storedValue, setValue, isLoaded];
}

export default useLocalStorage;
