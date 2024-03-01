type Exercise = {
    name: string
    active: boolean
    completed: boolean,
    time: number,
    [key: string]: string | boolean | number
}
  
export type ExerciseGroups = {
    shapes: Exercise
    threeShapes: Exercise
    lineTypes: Exercise
    drawingPrompts: Exercise
    gestureDescriptions: Exercise
    [key: string]: Exercise
}
  
export type ExerciseListProps = {
    exerciseGroups: ExerciseGroups
    updateActiveExercises: (exercise: string) => void
}

export type ExerciseJson = {
    shapes: string[],
    threeShapes: string[],
    lineTypes: string[],
    drawingPrompts: string[],
    gestureDescriptions: string[],
    [key: string]: string[]
}