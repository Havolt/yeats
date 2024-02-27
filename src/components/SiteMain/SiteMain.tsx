import { useState } from 'react'

import ExerciseList from '../ExerciseList/ExerciseList'

import EXERCISES from '../../json/exercises.json'
import './SiteMain.scss'

type Props = {}

type Exercise = {
  name: string,
  active: boolean
}

type ExerciseGroups = {
  shapes: Exercise
  threeShapes: Exercise
  lineTypes: Exercise
  drawingPrompts: Exercise
  gestureDescriptions: Exercise
  [key: string]: Exercise
}

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