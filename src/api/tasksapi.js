import {apibaseurl} from '../config';

class TasksAPI {

    baseURL = `${apibaseurl}/tasks`

    getTasks = async(token) => {
        const res = await fetch(`${this.baseURL}/`, {
            method:'GET',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':token
            }
        })
        const parsed = await res.json();
        return parsed;
    }

    postTask = async(taskinfo, token) => {
        const res = await fetch(`${this.baseURL}`, {
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':token
            },
            body: JSON.stringify(taskinfo)
        })
        const parsed = await res.json();
        return parsed;
    }

    puttask = async(taskinfo, token) => {
        const res = await fetch(`${this.baseURL}/${taskinfo.task_id}`, {
            method:'PUT',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':token
            },
            body: JSON.stringify(taskinfo)
        })
        const parsed = await res.json();
        return parsed;
    }

    deleteTask = async(taskinfo, token) => {
        const res = await fetch(`${this.baseURL}/${taskinfo.task_id}`, {
            method:'DELETE',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':token
            },
        })
        const parsed = await res.json();
        return parsed;
    }

    ontoday = async (token) => {
        const res = await fetch(`${this.baseURL}/today`, {
            method:'GET',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':token
            }
        })
        const parsed = await res.json();
        return parsed;
    }

    onweek = async (token) => {
        const res = await fetch(`${this.baseURL}/onweek`, {
            method:'GET',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':token
            }
        })
        const parsed = await res.json();
        return parsed;
    }

    onfuture = async (token) => {
        const res = await fetch(`${this.baseURL}/onfuture`, {
            method:'GET',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':token
            }
        })
        const parsed = await res.json();
        return parsed;
    }

    byemployes = async (token) => {
        const res = await fetch(`${this.baseURL}/forsupervisor`, {
            method:'GET',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':token
            }
        })
        const parsed = await res.json();
        return parsed;
    } 
}

export  default new TasksAPI();