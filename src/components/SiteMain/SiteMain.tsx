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


  return (
    <div className="site-main">
      <ExerciseList exerciseGroups={exerciseList} updateExerciseGroup={updateExerciseGroup} />
    </div>
  )
}

export default SiteMain