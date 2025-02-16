import { useState } from "react";
import { MedicineForm } from "./components/MedicineForm";
import "./App.css";

function App() {
  return (
    <>
      <main>
        <h1>Medicine Calendar</h1>
        <p>
          Medicine Calendar allows you to add medications with reminders and
          link them to the calendar for their application.
        </p>
      </main>
      <MedicineForm />
    </>
  );
}

export default App;
