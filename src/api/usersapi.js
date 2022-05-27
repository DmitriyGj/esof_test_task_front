import {apibaseurl} from '../config';


class UsersAPI {

    baseURL = `${apibaseurl}/users`

    auth = async (userinfo) => {
        const body = JSON.stringify(userinfo);
        const res = await fetch(`${this.baseURL}/authorize`, {
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json'
            },
            body
        })
        const parsed = await res.json();
        return parsed;
    }

    getUsers = async (token) => {
        console.log(token)
        const res = await fetch(`${this.baseURL}`, {
            method:'GET',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
        const parsed = await res.json();
        return parsed;
    }
}

export  default new UsersAPI();