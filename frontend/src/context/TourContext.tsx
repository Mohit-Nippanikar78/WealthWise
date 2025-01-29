import { createContext, useContext, useState, ReactNode } from 'react';

interface TourContextType {
  openTour: () => void;
  closeTour: () => void;
  isTourOpen: boolean;
}

const TourContext = createContext<TourContextType>({
  openTour: () => {},
  closeTour: () => {},
  isTourOpen: false,
});

export const useTour = () => useContext(TourContext);

interface TourProviderProps {
  children: ReactNode;
}

export const TourProvider = ({ children }: TourProviderProps) => {
  const [isTourOpen, setIsTourOpen] = useState(false);

  const openTour = () => setIsTourOpen(true);
  const closeTour = () => setIsTourOpen(false);

  return (
    <TourContext.Provider value={{ openTour, closeTour, isTourOpen }}>
      {children}
    </TourContext.Provider>
  );
};

export default TourContext; 