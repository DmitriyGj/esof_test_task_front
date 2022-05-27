import { useContext, useEffect, useState, useCallback } from "react"
import {Card} from '@mui/material'
import {FormLabel} from '@mui/material';
import style from './TaskCard.module.scss'
import cn from 'classnames';
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { TaskForm } from "../../forms/TaskForm/TaskForm";
import TasksAPI from "../../api/tasksapi";
import { UserContext } from "../../context/usercontext";

const excludetoshow = ['creation_date', 'creator'];

export const TaskCard = (props) => {
    const completed = props.status === '"Выполнена"';
    const {user} = useContext(UserContext);
    const {status, end_date} = props;
    const failed = (new Date(end_date) < new Date() )
        && (status !== 'Завершено') 
        && (status !== 'Отменена');
    
    const [showEditModal, setShowEdit] = useState(false);

    const editHandler = useCallback(async(values) => {
        try{    
            const rest = await TasksAPI.puttask(values, user.jwt )
        }
        catch(e){
            console.log(e);
        }
    },[props])

    console.log(completed)


    return(<Card  onClick = {() => setShowEdit(true)} 
                className = {cn(style.Card, 
                            {[style._completed]: completed}, 
                            {[style._failed]:failed })}>
            {Object.entries(props).map(([key,value]) => {
                return(!excludetoshow.includes(key) && 
                    <div key={key} className={cn(style.Wrapper, 
                                            style[key])}>
                        
                        <FormLabel className={style.Label} >
                            {key}:
                        </FormLabel> 
                            <>
                                {key === 'executor' ? 
                                    `${value.name} ${value.last_name} ${value.patronymic}` : 
                                    value
                                } 
                            </>
                    </div>)
                })
            }
        {showEditModal && <ModalWindow visible={showEditModal} 
            title={`Редактирование задачи №${props.task_id}`} 
            onClose={() => setShowEdit(false)}>
                
            <TaskForm submit={values =>editHandler(values)} 
                        additionalOnSubmit={() => setShowEdit(false)}
                        {...props}
                        />
        </ModalWindow>}
        </Card>)
}