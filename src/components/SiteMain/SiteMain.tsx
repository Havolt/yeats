import { useState } from 'react'

// components
import ExerciseList from '../ExerciseList/ExerciseList'
// types
import { ExerciseGroups} from '../../types/componentTypes';
// extra
import EXERCISES from '../../json/exercises.json'
import './SiteMain.scss'


type Props = {}

function SiteMain({}: Props) {

  const [exerciseList, setExerciseList] = useState(EXERCISES.groups)
  const [exerciseInProgress, setExerciseInProgress] = useState(false)
  const [currentExercise, setCurrentExercise] = useState('')

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
    setExerciseInProgress(true)
  }

  const buildCurrentExercise = () => {

  }

  const exerciseSetup = <div className='site-main__setup'>
    <ExerciseList exerciseGroups={exerciseList} updateActiveExercises={updateActiveExercises} />
    <button onClick={start}>Start Exercises</button>
  </div>

  const exerciseMain = <div>
    <h2>Current Excercise</h2>
    <h3>{currentExercise}</h3>
  </div>


  return (
    <div className="site-main">
      {exerciseInProgress ? exerciseMain : exerciseSetup}
    </div>
  )
}

export default SiteMain