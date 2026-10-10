import React, { createContext, useContext } from 'react';
import { useTripPlanner } from '../hooks/useTripPlanner';

const TripContext = createContext(null);

export function TripProvider({ children }) {
  const tripPlanner = useTripPlanner();

  return (
    <TripContext.Provider value={tripPlanner}>
      {children}
    </TripContext.Provider>
  );
}

export function useTripContext() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTripContext must be used within a TripProvider');
  }
  return context;
}
