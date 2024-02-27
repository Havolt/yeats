import './ExerciseList.scss'

import { ExerciseListProps } from '../../types/componentTypes';


export default function ExerciseList({exerciseGroups, updateExerciseGroup}: ExerciseListProps) {
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