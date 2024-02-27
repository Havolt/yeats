import './ExerciseList.scss'

type Exercise = {
  name: string,
  active: boolean
}

type ExerciseGroups = {
  shapes: Exercise
  threeShapes: Exercise
  lineTypes: Exercise
  drawingPrompts: Exercise
  gestureDescriptions: Exercise
  [key: string]: Exercise
}

type Props = {
    exerciseGroups: ExerciseGroups;
    updateExerciseGroup: Function;
}


export default function ExerciseList({exerciseGroups, updateExerciseGroup}: Props) {
  return (
    <>
      <h3>What drawing exercises would you like to do today?</h3>
      <ul className="exercise-list">
          {Object.keys(exerciseGroups).map((key) => (
          <li key={key}>
              <label htmlFor={key}>{exerciseGroups[key].name}</label>
              <input type="checkbox" name={key} checked={exerciseGroups[key].active} onChange={() => updateExerciseGroup(key)} />
          </li>
        ))}
      </ul>
    </>
  )
}