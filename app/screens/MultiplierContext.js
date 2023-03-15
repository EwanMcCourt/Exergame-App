import React from 'react';

const MultiplierContext = React.createContext({
  multiplier: 1,
  setMultiplier: () => {},
});

export default MultiplierContext;