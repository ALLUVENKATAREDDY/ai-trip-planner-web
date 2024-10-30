// src/components/ui/button.jsx
import React from 'react';

export const Button = ({ children }) => {
  return (
    <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-foreground transition-all">
      {children}
    </button>
  );
};
