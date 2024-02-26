import { useState } from 'react'

import ExerciseList from '../ExerciseList/ExerciseList'

import EXERCISES from '../../json/exercises.json'
import './SiteMain.scss'

type Props = {}

type ExerciseGroups = {
  shapes: boolean
  threeShapes: boolean
  lineTypes: boolean
  drawingPrompts: boolean
  gestureDescriptions: boolean
  [key: string]: boolean
}


function SiteMain({}: Props) {

  const [exerciseList, setExerciseList] = useState(EXERCISES.groups)

  const updateExerciseGroup = (exercise: string): void => {
    setExerciseList((prevExerciseList: ExerciseGroups) => {
      return { ...prevExerciseList, [exercise]: !prevExerciseList[exercise] }
    })
  }


  return (
    <div className="site-main">
      <ExerciseList exerciseGroups={exerciseList} updateExerciseGroup={updateExerciseGroup} />
    </div>
  )
}

export default SiteMain