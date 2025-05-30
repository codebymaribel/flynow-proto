import { useState } from 'react';

export interface UseCountReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  changeCount: (newCount: number) => void;
}

/**
 * Custom hook for managing a counter state
 * @param initialValue - The initial value for the counter (default: 0)
 * @returns Object containing count value and functions to manipulate it
 */
export const useCount = (minValue: number = 0): UseCountReturn => {
  const [count, setCount] = useState<number>(minValue);

  const increment = () => setCount(prev => prev + 1);
  
  const decrement = () => {
    if (count > minValue) {
      setCount(prev => prev - 1);
    }
  };
  
  const reset = () => setCount(minValue);

  const changeCount = (newCount: number) => setCount(newCount);

  return {
    count,
    increment,
    decrement,
    reset,
    changeCount
  };
};

export default useCount;