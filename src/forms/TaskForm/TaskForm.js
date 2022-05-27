import { Formik } from "formik";
import { taskValidtaionSchema } from "../../utils/validationScmea";
import {Button, TextField, FormControl, MenuItem } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import style from './TaskForm.module.scss'
import {useState, useEffect, useContext} from 'react';
import UsersAPI from "../../api/usersapi";
import { UserContext } from "../../context/usercontext";

const statusSelectOptions = ['"К выполнению"', '"Выполняется"', '"Выполнена"', '"Отменена"'];
const prioritySelectOptions = ['"Низкий"', '"Средний"', '"Высокий"'];


export const TaskForm = ({ additionalOnSubmit, submit, ...rest}) => {
    const [fetchSelectOptions, setFetchSelectOprions] = useState(true);
    const [executors, setExecutors] = useState([]);
    const {user} = useContext(UserContext);
    const initvalues = {...rest, executor_id:rest.executor.user_details_id || fetchSelectOptions[0].user_details_id}

    useEffect(() => {
        console.log(rest)
        if(fetchSelectOptions){
            (async () => {
                const res = await UsersAPI.getUsers(user.jwt)
                setExecutors(res);
                setFetchSelectOprions(false);
            })()
        }

    },[fetchSelectOptions]);


    return(<Formik initialValues={initvalues}
        validationSchema={taskValidtaionSchema}
        onSubmit={ values => {submit(values);
                            additionalOnSubmit()}}>
        {({errors, touched, values, handleChange, handleBlur, handleSubmit})=>
        <form className={style.Main} onSubmit={handleSubmit}>
            <FormControl className={style.Form}>
                    <TextField
                            name='title'
                            id='title'
                            key='title'
                            label='Title' 
                            error={touched.title && Boolean(errors.title)}
                            type='text'
                            helperText={touched.title ? errors.title: ''}
                            value={values.title} 
                            onChange={handleChange} 
                            onBlur={handleBlur} />
                    <TextField name='status'
                            id='status'
                            key='status'
                            label='Status' 
                            select={true}
                            error={touched.status && Boolean(errors.status)}
                            type='text'
                            helperText={touched.status ? errors.status: ''}
                            value={values.status} 
                            onChange={handleChange} 
                            onBlur={handleBlur}>
                            {statusSelectOptions.map(item => (
                                <MenuItem key={item}
                                        value={item}>
                                    {item}
                                </MenuItem>))
                            }  
                    </TextField>
                    <TextField name='priority'
                            id='priority'
                            key='priority'
                            label='Priority' 
                            select={true}
                            error={touched.priority && Boolean(errors.priority)}
                            type='text'
                            helperText={touched.priority ? errors.priority: ''}
                            value={values.priority} 
                            onChange={handleChange} 
                            onBlur={handleBlur}>
                            {prioritySelectOptions.map(item => (
                                <MenuItem key={item}
                                        value={item}>
                                    {item}
                                </MenuItem>))
                            }  
                    </TextField>
                    <TextField name='executor_id'
                            id='executor_id'
                            key='executor_id'
                            label='Executor' 
                            select={true}
                            error={touched.executor_id && Boolean(errors.executor_id)}
                            type='text'
                            helperText={touched.executor_id ? errors.executor_id: ''}
                            value={values.executor_id} 
                            onChange={handleChange} 
                            onBlur={handleBlur}>
                            {executors.map(item => (
                                <MenuItem key={item.user_details_id}
                                        value={item.user_details_id}>
                                    {item.name} {item.last_name} {item.patronymic}
                                </MenuItem>))
                            }  
                    </TextField>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                                renderInput={(props) => (<TextField onChange={handleChange} value={values.start_date} {...props} />)}
                                label = 'Start date'
                                name = 'start_date'
                                onBlur = {handleBlur}
                                id='start_date'
                                value={values.start_date}
                                onChange={handleChange}/>

                    <DateTimePicker label='End date'
                                    onBlur={handleBlur}
                                    onChange={handleChange}  
                                    value={values.end_date} 
                                    renderInput={(props) => <TextField  {...props}/> }/>
                    </LocalizationProvider>
                <Button type='submit' variant='contained' >Ok</Button>
            </FormControl>
        </form>}
    </Formik>)
}