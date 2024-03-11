import './ExerciseList.scss'

import { ExerciseListProps } from '../../types/componentTypes';


export default function ExerciseList({exerciseGroups, updateActiveExercises}: ExerciseListProps) {
  return (
    <>
      <h3>What drawing exercises would you like to do today?</h3>
      <ul className="exercise-list">
        <li>
          <span>Exercise Type</span>
          <span>Enabled</span>
        </li>
          {Object.keys(exerciseGroups).map((key) => (
          <li key={key}>
              <label htmlFor={key}>{exerciseGroups[key].name}</label>
              <input type="checkbox" name={key} checked={exerciseGroups[key].active} onChange={() => updateActiveExercises(key)} />
          </li>
        ))}
      </ul>
    </>
  )
}