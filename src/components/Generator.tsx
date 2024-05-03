import { useState } from "react";
import { SCHEMES, WORKOUTS } from "../utils/swoldier";
import SectionWrapper from "./SectionWrapper";

function Header(props: any) {
  const { index, title, description } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-400">
          {index}
        </p>
        <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">{title}</h4>
      </div>
      <p className="text-sm sm:bse mx-auto">{description}</p>
    </div>
  );
}

const Generator = () => {
  const [showModal, setShowModal] = useState(false);
  const [poison, setPoison] = useState("individual"); // Fix the initial state type
  const [muscles, setMuscles] = useState<string[]>([]); // Fix the initial state type
  const [goals, setGoals] = useState("strength_power");

  function toggleModal() {
    setShowModal(!showModal);
  }

 function updateMuscles(muscleGroup: string[]) {
   if (muscles.length > 3) {
     return;
   }
   if (poison !== "individual") {
     setMuscles([...muscles, ...muscleGroup]); // Spread the muscleGroup array
     setShowModal(false)
   } else if (muscles.some((m) => muscleGroup.includes(m))) {
     // Use some to check if any muscleGroup elements are already in muscles
     setMuscles(muscles.filter((val) => !muscleGroup.includes(val))); // Remove muscleGroup elements from muscles
   } else {
     setMuscles([...muscles, ...muscleGroup]); // Spread the muscleGroup array
   }
 }


  return (
    <SectionWrapper
      header={"generate your workout"}
      title={["It's", "Huge", "o'clock"]}
    >
      <Header
        index={"01"}
        title={"pick your poison"}
        description={"select the workout"}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(WORKOUTS).map((type: any, typeIndex) => {
          return (
            <button
              onClick={() => {
                setPoison(type);
              }}
              className={
                "bg-slate-950 border-[1px] py-3 rounded-lg duration-200 hover:border-blue-600" +
                (type === poison ? "border-blue-600" : " border-blue-400")
              }
              key={typeIndex}
            >
              <p className="capitalize">{type.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>
      <Header
        index={"02"}
        title={"Lock on target"}
        description={"Select the muscle judged for annihilation"}
      />
      <div className="bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col">
        <button
          onClick={toggleModal}
          className="relative  p-3  flex items-center justify-center"
        >
          <p>Select muscle groups</p>
          <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-down-long"></i>
        </button>
        {showModal && (
          <div className="flex flex-col p-3">
            {(poison === "individual"
              ? WORKOUTS[poison]
              : Object.keys(WORKOUTS[poison])
            ).map((muscleGroup: any, muscleGroupIndex: any) => {
              return (
                <button
                  onClick={() => {
                    updateMuscles(muscleGroup)
                  }}
                  className={
                    "hover:text-blue-400 duration-200" +
                    (muscles.includes(muscleGroup) ? "text-blue-400 " : "")
                  }
                  key={muscleGroupIndex}
                >
                  <p className="uppercase">{muscleGroup}</p>
                </button>
              );
            })}
          </div>
        )}
      </div>
      <Header
        index={"03"}
        title={"Become Juggernaut"}
        description={"select your ultimate objectives"}
      />
      <div className="grid grid-cols-3 gap-4">
        {Object.keys(SCHEMES).map((scheme: any, schemeIndex) => {
          return (
            <button
              onClick={() => {
                setGoals(scheme);
              }}
              className={
                "bg-slate-950 border-[1px] py-3 rounded-lg duration-200 hover:border-blue-600" +
                (scheme === goals ? "border-blue-600" : " border-blue-400")
              }
              key={schemeIndex}
            >
              <p className="capitalize">{scheme.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default Generator;
