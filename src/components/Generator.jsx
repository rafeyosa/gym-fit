import React, { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { SCHEMES, WORKOUTS } from "../utils";
import Button from "./Button";

export default function Generator(props) {
  const {
    workoutType,
    setWorkoutType,
    muscles,
    setMuscles,
    goal,
    setGoal,
    updateWorkout,
  } = props;
  const [showModal, setShowModal] = useState(false);

  function updateMuscles(muscleGroup) {
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter((val) => val !== muscleGroup));
      return;
    }

    if (muscles.length >= 3) {
      return;
    }

    if (workoutType !== "individual") {
      setMuscles([muscleGroup]);
      setShowModal(false);
      return;
    }

    const newMuscleGroup = [...muscles, muscleGroup];
    setMuscles(newMuscleGroup);
    if (newMuscleGroup.length === 3) {
      setShowModal(false);
    }
  }

  return (
    <SectionWrapper
      id={"generate"}
      header={"generate your workout"}
      title={["It's", "Huge", "o'clock"]}
    >
      <Header
        index={"01"}
        title={"Pick your poison"}
        description={"Select the workout you wish to endure."}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(WORKOUTS).map((type, typeIndex) => {
          return (
            <button
              key={typeIndex}
              className={
                "bg-slate-950 border hover:border-blue-600 py-3 rounded-lg duration-200 px-4 " +
                (type === workoutType ? "border-blue-600" : "border-blue-400")
              }
              onClick={() => {
                setWorkoutType(type);
                setMuscles([]);
              }}
            >
              <p className="capitalize">{type.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>
      <Header
        index={"02"}
        title={"Lock on targets"}
        description={"Select the muscles judged for annihilation."}
      />
      <div className="bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col">
        <button
          className="relative flex item-center justify-center p-3"
          onClick={() => setShowModal(!showModal)}
        >
          <p className={muscles.length === 0 ? "" : "capitalize"}>
            {muscles.length === 0 ? "Select muscle groups" : muscles.join(", ")}
          </p>
          <i className="fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2" />
        </button>
        {showModal && (
          <div className="flex flex-col px-3 pb-3">
            {(workoutType === "individual"
              ? WORKOUTS[workoutType]
              : Object.keys(WORKOUTS[workoutType])
            ).map((muscleGroup, muscleGroupIndex) => {
              return (
                <button
                  key={muscleGroupIndex}
                  className={
                    "hover:text-blue-400 duration-200 " +
                    (muscles.includes(muscleGroup) ? "text-blue-400" : "")
                  }
                  onClick={() => updateMuscles(muscleGroup)}
                >
                  <p className="uppercase">
                    {muscleGroup.replaceAll("_", " ")}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>
      <Header
        index={"03"}
        title={"Become Juggernaut"}
        description={"Select your ultimate objective."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
          return (
            <button
              key={schemeIndex}
              className={
                "bg-slate-950 border hover:border-blue-600 py-3 rounded-lg duration-200 px-4 " +
                (scheme === goal ? "border-blue-600" : "border-blue-400")
              }
              onClick={() => setGoal(scheme)}
            >
              <p className="capitalize">{scheme.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>
      <Button text="Formulate" func={updateWorkout} />
    </SectionWrapper>
  );
}

function Header(props) {
  const { index, title, description } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 justify-center">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">
          {index}
        </p>
        <h4 className="text-xl sm:text-2xl md:text-3xl">{title}</h4>
      </div>
      <p className="text-sm sm:text-base mx-auto">{description}</p>
    </div>
  );
}
