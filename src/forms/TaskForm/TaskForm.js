import {Button, TextField, FormControl, MenuItem } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import style from './TaskForm.module.scss'
import {useState, useEffect, useContext} from 'react';
import UsersAPI from "../../api/usersapi";
import { UserContext } from "../../context/usercontext";
import { isAfter, isBefore, parseISO } from 'date-fns';


const statusSelectOptions = ['"К выполнению"', '"Выполняется"', '"Выполнена"', '"Отменена"'];
const prioritySelectOptions = ['"Низкий"', '"Средний"', '"Высокий"'];


export const TaskForm = ({ additionalOnSubmit, submit, ...rest}) => {
    const [fetchSelectOptions, setFetchSelectOprions] = useState(true);
    const [executors, setExecutors] = useState([]);
    const [needInit, setNeedInit] = useState(false);
    const {user} = useContext(UserContext);
    const [Task, setTask] = useState({...rest,executor_id:rest.executor.user_details_id});
    const canedit = rest.creator?.user_id === user.user_id || user.role.role_name === 'Руководитель';
    const caneditstatus = !(rest.creator?.user_id === user.user_details.supervisor?.user_id 
        || rest.creator?.user_id === user.user_id || user.role.role_name === 'Руководитель');

    useEffect(() => {
        if(fetchSelectOptions || needInit){
            (async () => {
                const res = await UsersAPI.getUsers(user.jwt)
                setExecutors(res);
                setFetchSelectOprions(false);
            })()

            if(needInit){
                setTask({...rest, executor_id: fetchSelectOptions[0].user_details_id ,
                    status:rest.status || statusSelectOptions[0], 
                    priority: rest.priority || prioritySelectOptions[0]});
            }
        }

    },[fetchSelectOptions, needInit]);

    const sendHandler = async () =>{ 
        if(validate() ){
            try{
                const res = await submit(Task);
                additionalOnSubmit();
                window.location.reload();
            }
            catch(e){
                alert('что-то пошло не так')
            }
            return;
        }
        alert('Корреткно заполните поля');
    }

    const validate = () => {
        return (!!Task.title && isAfter(parseISO(Task.end_date), parseISO(Task.start_date)) )
    }

    const changeHandler = ({target}) => setTask({...Task, [target.name]:target.value }) 

    return(!needInit ? <form className={style.Main}>
            <FormControl className={style.Form} >
                    <TextField disabled={!canedit}
                            error={!Task.title}
                            helperText={!Task.title && 'Название не может быть пустым'}
                            name='title'
                            id='title'
                            key='title'
                            label='Title' 
                            type='text'
                            value={Task.title} 
                            onChange={changeHandler}/>
                    <TextField disabled={caneditstatus}
                            name='status'
                            id='status'
                            key='status'
                            label='Status' 
                            select={true}
                            type='text'
                            value={Task.status} 
                            onChange={changeHandler}>
                            {statusSelectOptions.map(item => (
                                <MenuItem key={item}
                                        value={item}>
                                    {item}
                                </MenuItem>))
                            }  
                    </TextField>
                    <TextField disabled={!canedit}
                            name='priority'
                            id='priority'
                            key='priority'
                            label='Priority' 
                            select={true}
                            type='text'
                            value={Task.priority} 
                            onChange={changeHandler} >
                            {prioritySelectOptions.map(item => (
                                <MenuItem key={item}
                                        value={item}>
                                    {item}
                                </MenuItem>))
                            }  
                    </TextField>
                    <TextField disabled={!canedit} 
                            name='executor_id'
                            id='executor_id'
                            key='executor_id'
                            label='Executor' 
                            select={true}
                            type='text'
                            value={Task.executor_id} 
                            onChange={changeHandler}>
                            {executors.map(item => (
                                <MenuItem key={item.user_details_id}
                                        value={item.user_details_id}>
                                    {item.name} {item.last_name} {item.patronymic}
                                </MenuItem>))
                            }  
                    </TextField>
                    
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker disabled={!canedit}
                                label = 'Start date'
                                name = 'start_date'
                                id='start_date'
                                value={Task.start_date}
                                onChange={date => {
                                    if(date){
                                        setTask({...Task, start_date:date})
                                    }
                                }}
                                renderInput={(props) => (<TextField
                                        {...props} />)}/>
                    </LocalizationProvider> 
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker disabled={!canedit} 
                                label = 'End date'
                                name = 'end_date'
                                id='end_date'
                                value={Task.end_date}
                                onChange={date => {
                                    if(date){
                                        setTask({...Task, end_date:date})
                                    }
                                }}
                                renderInput={(props) => (<TextField {...props} />)}/>
                    </LocalizationProvider> 
                <Button onClick={() => sendHandler()} variant='contained'>Ok</Button>
            </FormControl>
        </form>: <>loading</>)
}