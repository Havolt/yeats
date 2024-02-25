

type ExerciseGroups = {
    shapes: boolean;
    threeShapes: boolean;
    lineTypes: boolean;
    drawingPrompts: boolean;
    gestureDescriptions: boolean;
    [key: string]: boolean;
}

type Props = {
    exerciseGroups: ExerciseGroups;
}

const updateExerciseGroup = () => {
    // Toggle the state of the ExerciseGroups
}

export default function ExerciseList({exerciseGroups}: Props) {
  return (
    <ul>
        {Object.keys(exerciseGroups).map((key) => (
        <li key={key}>
            <label htmlFor={key}>{key}</label>
            <input type="checkbox" name={key} checked={exerciseGroups[key]} onChange={updateExerciseGroup} />
        </li>
      ))}
    </ul>
  )
}