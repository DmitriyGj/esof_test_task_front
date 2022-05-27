import {useState,useEffect, useContext} from 'react';
import { TaskCard } from '../../components/TaskCard/TaskCard';
import TasksAPI from '../../api/tasksapi';
import { UserContext } from '../../context/usercontext';
import style from './Tasks.module.scss';
import {Button, FormLabel} from '@mui/material';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import { TaskForm } from '../../forms/TaskForm/TaskForm';

const taskSortiong = {
    all: 'getTasks',
    today:'ontoday',
    onweek:'onweek',
    onfuture:'onfuture',
    forsupervisor:'byemployes'
}

const initTaskFields = {
    title:'',
    executor_id:'',
    status:'',
    priority:'',
    start_date: new Date(),
    end_date: new Date()
}

export const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [taskFetchFunc, setFetchFunc] = useState(taskSortiong.all)
    const {user} =useContext(UserContext);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
            (async() => {
                    const fetchedTasks = await TasksAPI[taskFetchFunc](user.jwt);
                    setTasks(fetchedTasks);
                }
            )()
    },[taskFetchFunc])


    return(
        <div className={style.Main}>
            <div className = {style.OptionsBlock}>
                <FormLabel>
                    Options
                </FormLabel>
                <div className={style.Buttons}>
                    <Button variant = 'contained' onClick={()=>setFetchFunc(taskSortiong.all)}>All</Button>
                    <Button variant = 'contained' onClick={()=>setFetchFunc(taskSortiong.today)}>On today</Button>
                    <Button variant = 'contained' onClick={()=>setFetchFunc(taskSortiong.onweek)}>On week</Button>
                    <Button variant = 'contained' onClick={()=>setFetchFunc(taskSortiong.onfuture)}>On future</Button>
                    {user.role.role_name ==='Руководитель' && <Button variant = 'contained' onClick={()=>setFetchFunc(taskSortiong.forsupervisor)}>Grouped by executors</Button>}
                </div>
            </div>
            <div className={style.CardsBlock}>
                {tasks.map(task => <TaskCard key={'task' + task.task_id} {...task}/>)}
                <Button variant='contained'>Add new task</Button>
            </div>
            <ModalWindow visible={showModal} 
                        title='Создание новой задачи' 
                        onClose = {() => setShowModal(false)} >
                <TaskForm  />
            </ModalWindow>
        </div>)

}