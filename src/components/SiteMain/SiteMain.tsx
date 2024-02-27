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
  const [exerciseInProgress, setExerciseInProgress] = useState(false);

  const updateExerciseGroup = (exercise: string): void => {
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

  const exerciseSetup = <div className='site-main__setup'>
    <ExerciseList exerciseGroups={exerciseList} updateExerciseGroup={updateExerciseGroup} />
    <button onClick={start}>Start Exercises</button>
  </div>

  const exerciseMain = <div>Started!</div>


  return (
    <div className="site-main">
      {exerciseInProgress ? exerciseMain : exerciseSetup}
    </div>
  )
}

export default SiteMain