import {useState,useEffect, useContext} from 'react';
import { TaskCard } from '../../components/TaskCard/TaskCard';
import TasksAPI from '../../api/tasksapi';
import { UserContext } from '../../context/usercontext';
import style from './Tasks.module.scss';

const taskSortiong = {
    all:TasksAPI.getTasks,
    today:TasksAPI.ontoday,
    onweek:TasksAPI.onweek,
    onfuture:TasksAPI.onfuture,
    forsupervisor:TasksAPI.byemployes
}

export const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [taskFetchFunc, setFetchFunc] = useState(taskSortiong.all)
    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(false);
    const {user} =useContext(UserContext);

    useEffect(() => {
        if(!fetching && loading){
            (async() => {
                    setFetching(true)
                    const fetchedTasks = await TasksAPI.getTasks(user.jwt);
                    setTasks(fetchedTasks);
                    setFetching(false)
                }
            )()
            setLoading(false);
        }
    },[loading, taskFetchFunc, fetching])

    return(
        <div className={style.Main}>
            <div className={style.CardsBlock}>
                {tasks.map(task => <TaskCard key={'task' + task.task_id} {...task}/>)}
            </div>
        </div>)

}