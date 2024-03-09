import { useState, useEffect } from 'react'

// components
import ExerciseList from '../ExerciseList/ExerciseList'
import TimeBar from '../TimeBar/TimeBar'
// types
import { ExerciseGroups, ExerciseJson, CurrentExercise} from '../../types/componentTypes'
// extra
import EXERCISES from '../../json/exercises.json'
import './SiteMain.scss'

const exercisesJson: ExerciseJson = EXERCISES.exercises
const BREAK_TIME_AMOUNT = 30

type Props = {}

function SiteMain({}: Props) {

  const [exerciseList, setExerciseList] = useState<ExerciseGroups>(EXERCISES.groups)
  const [exerciseInProgress, setExerciseInProgress] = useState(false)
  const [currentExercise, setCurrentExercise] = useState<CurrentExercise>({key: '', text: ''})
  const [showExerciseDescription, setShowExerciseDescription] = useState(false)
  const [exerciseTimeRemaining, setExerciseTimeRemaining] = useState(-1)
  const [breakInProgress, setBreakInProgress] = useState(false)

  let exerciseTimeTimeout: ReturnType<typeof setTimeout>

  // Controls the timer
  useEffect(() => {
    if(exerciseTimeRemaining > 0) { // Step timer down a second
      exerciseTimeTimeout = setTimeout(() => {
        setExerciseTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 1)
      }, 1000)
    } else if(exerciseTimeRemaining === 0) { // Handle logic for when a timer reaches zero
      clearTimeout(exerciseTimeTimeout)
      if(!breakInProgress) { // Mark the current exercise as complete and set break timer
        setExerciseList((prevState) => {
          return {
            ...prevState,
            [currentExercise.key] : {
              ...prevState[currentExercise.key],
              completed: true,
            }
          }
        })
        setExerciseTimeRemaining(BREAK_TIME_AMOUNT)
      } else { // Build the next exercise
        buildCurrentExercise()
      }
      setBreakInProgress((prevState) => !prevState)
    }
  
    return () => {
      clearTimeout(exerciseTimeTimeout)
    }
  }, [exerciseTimeRemaining])

  const hasSelectedExercises = () => {
    for(let exerciseKey of Object.keys(exerciseList)) {
      if(exerciseList[exerciseKey].active) { return true }
    }
    return false
  }

  // Set the current active exercise
  const updateActiveExercises = (exercise: string): void => {
    setExerciseList((prevExerciseList: ExerciseGroups) => {
      return {
        ...prevExerciseList,
        [exercise]: {
          ...prevExerciseList[exercise],
          active: !prevExerciseList[exercise].active 
        }
      }
    })
  }

  const start = (): void => {
    buildCurrentExercise()
    setExerciseInProgress(true)
  }

  const isExerciseAvailable = (exercise: string) => { 
    return exerciseList[exercise] &&
    exerciseList[exercise].active &&
    !exerciseList[exercise].completed &&
    +exercisesJson[exercise].length > 0
  }

  const buildCurrentExercise = () => { // Build out the current exercise based on the first one not set as completed
    if(!hasSelectedExercises()) { return }

    for(let exerciseKey of Object.keys(exerciseList)) {
      const exercisesActiveAndIncomplete = isExerciseAvailable(exerciseKey)

      if (exercisesActiveAndIncomplete) {
        const addExtraText = /^(shapes|threeShapes|lineTypes)$/.test(exerciseKey);
        const exerciseListLength = exercisesJson[exerciseKey].length-1
        const randomExercise = Math.floor(Math.random() * exerciseListLength)
        
        // Set all the necessary state for the current exercise 
        setShowExerciseDescription(addExtraText)
        setCurrentExercise(() => {
          return {
            key: exerciseKey,
            text: `${exercisesJson[exerciseKey][randomExercise]}`
          }
        })
        setExerciseTimeRemaining(exerciseList[exerciseKey].time)
        break;
      }
    }
  };

  // This function calculates the remaining time percentage for the current exercise or break.
  const timeRemaingPercentage = () => {
    // If a break is in progress, calculate the percentage of the break time remaining.
    if(breakInProgress || exerciseList[currentExercise.key]) {
      const timeToDivide = breakInProgress ? BREAK_TIME_AMOUNT : exerciseList[currentExercise.key].time
      return Math.floor(exerciseTimeRemaining / timeToDivide * 100)
    } else {
      return 0
    }
  }

  // Initial setup elements
  const exerciseSetup = <div className='site-main__setup'>
    <ExerciseList exerciseGroups={exerciseList} updateActiveExercises={updateActiveExercises} />
    <button disabled={!hasSelectedExercises ()} onClick={start} type="submit">Start Exercises</button>
  </div>

  // Exercise elements
  const exerciseMain = <div>
    { !breakInProgress && 
      <>
        <h2>Current Excercise</h2>
        { showExerciseDescription && <div className="site-main__description">
          <h3>Draw as many of the following as possible within the time limit:
            <span className="site-main__exercise">{`${currentExercise.text}`}</span>
          </h3>
        </div> }
      </>
    }
    { breakInProgress && <h2>Break Time</h2> }
    <TimeBar progress={timeRemaingPercentage()} timeRemaining={exerciseTimeRemaining} />
  </div>


  return (
    <div className="site-main">
      {exerciseInProgress ? exerciseMain : exerciseSetup}
    </div>
  )
}

export default SiteMain