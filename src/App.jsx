import { useState } from "react";
import Generator from "./components/Generator";
import Hero from "./components/Hero";
import Workout from "./components/Workout";
import { generateWorkout } from "./utils/helper";

function App() {
  const [workout, setWorkout] = useState(null);
  const [workoutType, setWorkoutType] = useState("individual");
  const [muscles, setMuscles] = useState([]);
  const [goal, setGoal] = useState("strength_power");

  function updateWorkout() {
    if (muscles.length < 1) {
      console.log("clicked 0");
      return;
    }

    let newWorkout = generateWorkout({ workoutType, muscles, goal });
    setWorkout(newWorkout);

    setTimeout(() => {
      window.location.href = "#workout";
    }, 100);
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base">
      <Hero />
      <Generator
        workoutType={workoutType}
        setWorkoutType={setWorkoutType}
        muscles={muscles}
        setMuscles={setMuscles}
        goal={goal}
        setGoal={setGoal}
        updateWorkout={updateWorkout}
      />
      {workout && <Workout workout={workout} />}
    </main>
  );
}

export default App;
