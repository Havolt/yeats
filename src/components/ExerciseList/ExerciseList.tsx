

type ExerciseGroups = {
    shapes: boolean;
    threeShapes: boolean;
    lineTypes: boolean;
    drawingPrompts: boolean;
    gestureDescriptions: boolean;
}

type Props = {
    exerciseGroups: ExerciseGroups;
}

export default function ExerciseList({exerciseGroups}: Props) {
  return (
    <div>ExerciseList</div>
  )
}