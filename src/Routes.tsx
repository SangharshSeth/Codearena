import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/Landing";
import FindMatch from "./pages/FindMatch";
import { Applayout } from "./layouts/AppLayout";
import HackerQuiz from "./pages/StartMatch";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <h1>Error</h1>,
  },
  {
    path: "/app",
    element: <Applayout />,
    children: [
      {
        path: "find-match",
        element: <FindMatch />
      },
      {
        path: "start-match",
        element: <HackerQuiz />
      }
    ]
  }
]);
