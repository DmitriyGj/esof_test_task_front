import { useContext, useEffect, useState } from "react"
import {Card} from '@mui/material'
import {FormLabel} from '@mui/material';
import style from './TaskCard.module.scss'
import cn from 'classnames';
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { TaskForm } from "../../forms/TaskForm/TaskForm";
import tasksapi from "../../api/tasksapi";
import { UserContext } from "../../context/usercontext";

const excludetoshow = ['creation_date'];

export const TaskCard = (props) => {
    const {user} = useContext(UserContext);
    const completed = props.status === "Звершено";
    const {status, end_date} = props;
    const failed = (new Date(end_date) < new Date() )
        && (status !== 'Завершено') 
        && (status !== 'Отменена');
    
        useEffect(() => {
            console.log(props.executor)
        })
    
    const [showEditModal, setShowEdit] = useState(false);

    const editHandler = (token) => {
        return async (values) => {
            try{
                await tasksapi.puttask(values, token)
            }
            catch(e){
                console.log(e);
            }
        }
    }


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
                
            <TaskForm submit={() => editHandler(user.jwt)} 
                        additionalOnSubmit={() => setShowEdit(false)}
                        {...props}
                        />
        </ModalWindow>}
        </Card>)
}