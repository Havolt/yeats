import { useState, useEffect } from 'react'

// components
import ExerciseList from '../ExerciseList/ExerciseList'
// types
import { ExerciseGroups, ExerciseJson, CurrentExercise} from '../../types/componentTypes';
// extra
import EXERCISES from '../../json/exercises.json'
import './SiteMain.scss'

const exercisesJson: ExerciseJson = EXERCISES.exercises

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
        setExerciseTimeRemaining(30)
      } else { // Build the next exercise
        buildCurrentExercise();
      }
      setBreakInProgress((prevState) => !prevState)
    }
  
    return () => {
      clearTimeout(exerciseTimeTimeout)
    }
  }, [exerciseTimeRemaining])
  


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

  const buildCurrentExercise = () => { // Build out the current exercise based on the first one not set as completed
    for(let exerciseKey of Object.keys(exerciseList)) {
      const exercisesActiveAndIncomplete = exerciseList[exerciseKey] &&
       exerciseList[exerciseKey].active &&
       !exerciseList[exerciseKey].completed && 
       +exercisesJson[exerciseKey].length > 0

      if (exercisesActiveAndIncomplete) {
        const addExtraText = exerciseKey === 'shapes' || exerciseKey === 'threeShapes' || exerciseKey === 'lineTypes'
        setShowExerciseDescription(addExtraText)
        setCurrentExercise(() => {
          return {
            key: exerciseKey,
            text: `${exercisesJson[exerciseKey][0]}`
          }
        })
        setExerciseTimeRemaining(exerciseList[exerciseKey].time)
        break;
      }
    }
  };

  

  // Initial setup elements
  const exerciseSetup = <div className='site-main__setup'>
    <ExerciseList exerciseGroups={exerciseList} updateActiveExercises={updateActiveExercises} />
    <button onClick={start}>Start Exercises</button>
  </div>

  // Exercise elements
  const exerciseMain = <div>
    { !breakInProgress && 
      <>
        <h2>Current Excercise</h2>
        { showExerciseDescription && <h3>Draw as many of the following as possible within the time limit:</h3> }
        <h3>{currentExercise.text}</h3>
      </>
    } 
    { breakInProgress && 
      <>
        <h2>Break Time</h2>
      </>
    }
    <h4>Time Remaining: { exerciseTimeRemaining }</h4>
  </div>


  return (
    <div className="site-main">
      {exerciseInProgress ? exerciseMain : exerciseSetup}
    </div>
  )
}

export default SiteMain