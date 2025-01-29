import { useEffect } from "react";
import Tour from "reactour";
import { useUser } from "@clerk/clerk-react";
import { useTour } from "../context/TourContext";

interface DashboardTourProps {
  children: React.ReactNode;
}

const DashboardTour = ({ children }: DashboardTourProps) => {
  const { user } = useUser();
  const { isTourOpen, openTour, closeTour } = useTour();

  // Check if we should show the tour on mount
  useEffect(() => {
    if (user?.lastSignInAt) {
      const lastSignInTime = new Date(user.lastSignInAt).getTime();
      const lastTourTime = localStorage.getItem("lastTourTime");
      
      // Show tour if this is a new sign in (lastTourTime is before lastSignInTime)
      if (!lastTourTime || new Date(lastTourTime).getTime() < lastSignInTime) {
        openTour();
        // Update the last tour time
        localStorage.setItem("lastTourTime", new Date().toISOString());
      }
    }
  }, [user, openTour]);

  const steps = [
    {
      selector: ".tour-logo",
      content: "Welcome to WealthWise! This is your personal financial dashboard.",
    },
    {
      selector: ".tour-portfolio",
      content: "View your portfolio overview, including total assets, investments, and performance metrics.",
    },
    {
      selector: ".tour-my-data",
      content: "Manage your financial data, including assets, liabilities, and income streams.",
    },
  ];

  return (
    <>
      {isTourOpen && (
        <Tour
          steps={steps}
          isOpen={isTourOpen}
          onRequestClose={closeTour}
          nextButton={
            <button style={{ padding: "8px 16px", backgroundColor: "#4F46E5", color: "#FFF" }}>
              Next →
            </button>
          }
          prevButton={
            <button style={{ padding: "8px 16px", backgroundColor: "#4F46E5", color: "#FFF" }}>
              ← Prev
            </button>
          }
          closeButton={
            <button
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                background: "transparent",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
              }}
              onClick={closeTour}
            >
              ✕
            </button>
          }
          lastStepNextButton={
            <button
              onClick={closeTour}
              style={{
                padding: "8px 16px",
                backgroundColor: "#4F46E5",
                color: "#FFF",
              }}
            >
              Finish Tour
            </button>
          }
          customComponents={{
            Navigation: ({ currentStep, stepsLength }: { currentStep: number; stepsLength: number }) => (
              <div style={{ marginTop: "16px", textAlign: "center" }}>
                {currentStep + 1} of {stepsLength}
              </div>
            ),
          }}
          styles={{
            options: {
              backgroundColor: user?.publicMetadata?.darkMode ? "#1F2937" : "#FFFFFF",
              textColor: user?.publicMetadata?.darkMode ? "#F3F4F6" : "#1F2937",
              arrowColor: "#4F46E5",
            },
          }}
        />
      )}
      {children}
    </>
  );
};

export default DashboardTour;
