import { useState } from "react";

export const useModal = initial => {
  const [isShowing, setIsShowing] = useState(initial || false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return {
    isShowing,
    toggle
  };
};
