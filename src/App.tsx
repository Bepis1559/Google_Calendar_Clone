import "./App.css";
import { type ReactElement } from "react";
import { Calendar } from "./components/Calendar";
import { useEventsLocalStorage } from "./hooks/useEventsLocalStorage";

function App(): ReactElement {
  useEventsLocalStorage();

  return (
    <>
      <Calendar />
    </>
  );
}

export default App;
