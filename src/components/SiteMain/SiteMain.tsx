import { useState } from 'react'

import ExerciseList from '../ExerciseList/ExerciseList'

import EXERCISES from '../json/exercises.json'
import './SiteMain.scss'

type Props = {}


function SiteMain({}: Props) {

  const [exerciseList, setExerciseList] = useState(EXERCISES.groups);


  return (
    <div className="site-main">
      <ExerciseList exerciseGroups={exerciseList} />
    </div>
  )
}

export default SiteMain