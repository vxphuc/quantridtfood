import { useState } from "react";

export const useXuly = (state) => {
  const [states, setStates] = useState(state);
  const increment = (newvalue) => {
    setStates(newvalue);
  };
  return {
    states,
    increment,
  };
};

// import { useState } from 'react';

// // Đây là một custom hook hợp lệ
// export const useXuly = (initialState) => {
//   const [states, setStates] = useState(initialState);

//   const updateState = (newValue) => {
//     setStates(newValue);
//   };

//   return { states, updateState };
// };
