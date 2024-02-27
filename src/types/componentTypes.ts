type Exercise = {
    name: string;
    active: boolean;
};
  
export type ExerciseGroups = {
    shapes: Exercise;
    threeShapes: Exercise;
    lineTypes: Exercise;
    drawingPrompts: Exercise;
    gestureDescriptions: Exercise;
    [key: string]: Exercise;
};
  
export type ExerciseListProps = {
    exerciseGroups: ExerciseGroups;
    updateExerciseGroup: (exercise: string) => void;
};
  