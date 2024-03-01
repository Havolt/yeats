import { useState } from 'react'

// components
import ExerciseList from '../ExerciseList/ExerciseList'
// types
import { ExerciseGroups, ExerciseJson} from '../../types/componentTypes';
// extra
import EXERCISES from '../../json/exercises.json'
import './SiteMain.scss'

const exercisesJson: ExerciseJson = EXERCISES.exercises

type Props = {}

function SiteMain({}: Props) {

  const [exerciseList, setExerciseList] = useState<ExerciseGroups>(EXERCISES.groups)
  const [exerciseInProgress, setExerciseInProgress] = useState(false)
  const [currentExercise, setCurrentExercise] = useState('')
  const [showExerciseDescription, setShowExerciseDescription] = useState(false)
  const [exerciseTimeRemaining, setExerciseTimeRemaining] = useState(0)

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

  const buildCurrentExercise = () => {
    for(let exerciseKey of Object.keys(exerciseList)) {
      const exercisesExistAndIncomplete = exerciseList[exerciseKey] && !exerciseList[exerciseKey].completed && +exercisesJson[exerciseKey].length > 0

      if (exercisesExistAndIncomplete) {
        const addExtraText = exerciseKey === 'shapes' || exerciseKey === 'threeShapes' || exerciseKey === 'lineTypes'
        setShowExerciseDescription(addExtraText)
        setCurrentExercise(() => `${exercisesJson[exerciseKey][0]}`)
        setExerciseTimeRemaining(exerciseList[exerciseKey].time)
        break;
      }
    }
  };

  

  const exerciseSetup = <div className='site-main__setup'>
    <ExerciseList exerciseGroups={exerciseList} updateActiveExercises={updateActiveExercises} />
    <button onClick={start}>Start Exercises</button>
  </div>

  const exerciseMain = <div>
    <h2>Current Excercise</h2>
    { showExerciseDescription && <h3>Draw as many of the following as possible within the time limit:</h3> }
    <h3>{currentExercise}</h3>
    <h4>Time Remaining: { exerciseTimeRemaining }</h4>
  </div>


  return (
    <div className="site-main">
      {exerciseInProgress ? exerciseMain : exerciseSetup}
    </div>
  )
}

export default SiteMain