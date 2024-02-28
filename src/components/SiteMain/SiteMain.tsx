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
    Object.keys(exerciseList).forEach((key: string) => {
      // todo: add a breaker when it matches the first one
      if (exerciseList[key] && !exerciseList[key].completed && +exercisesJson[key].length > 0) {
        setCurrentExercise(() => `${exercisesJson[key][0]}`);
      }
    });
  };

  

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