declare module 'reactour' {
  import { ReactNode } from 'react';

  interface TourProps {
    steps: Array<{
      selector?: string;
      content: ReactNode | string;
      position?: string;
      [key: string]: any;
    }>;
    isOpen: boolean;
    onRequestClose: () => void;
    nextButton?: ReactNode;
    prevButton?: ReactNode;
    closeButton?: ReactNode;
    lastStepNextButton?: ReactNode;
    customComponents?: {
      [key: string]: any;
    };
    styles?: {
      options?: {
        backgroundColor?: string;
        textColor?: string;
        arrowColor?: string;
        [key: string]: any;
      };
      [key: string]: any;
    };
    [key: string]: any;
  }

  export default function Tour(props: TourProps): JSX.Element;
} 