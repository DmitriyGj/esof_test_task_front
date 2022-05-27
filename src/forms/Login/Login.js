import React, {useContext} from 'react'
import {Formik} from 'formik';
import style from './Login.module.scss';
import { LoginValidationSchema } from '../../utils/validationScmea';
import { FormControl, TextField, Button } from '@mui/material';
import UsersAPI from '../../api/usersapi';
import { UserContext } from '../../context/usercontext';
import jwtDecode from 'jwt-decode';

export const LoginForm = () => {
    const {loginUser} = useContext(UserContext);

    const loginHandler = async(values) => {
        try{
            console.log(values)
            const res = await UsersAPI.auth(values)
            if(res.message){
                alert(res.message)
                return;
            }
            const userinfo = jwtDecode(res).info;
            const towritecontext = {...userinfo, jwt:res, password:'' }
            loginUser(towritecontext);
        }
        catch(e){
            console.log(e);
        }
    }

    return(
        <Formik initialValues={{login:'', password:''}}
                validationSchema={LoginValidationSchema}
                onSubmit = {values => loginHandler(values) }>
                {({errors, touched, values, handleChange, handleBlur, handleSubmit}) =>
                <form className={style.main} onSubmit={handleSubmit}>
                    <FormControl className={style.Form}>
                                <TextField className={style.input} 
                                    label='Login'
                                    id='login' 
                                    name="login" 
                                    type="text"
                                    error ={touched.login && Boolean(errors.login)}
                                    helperText={touched.login && errors.login} 
                                    onBlur={handleBlur}
                                    onChange={handleChange} 
                                    value={values.login} 
                                    />
                                <TextField className={style.input}
                                    error ={ touched.password && Boolean(errors.password)}
                                    helperText={ touched.password && errors.password}
                                    label='Password'
                                    id='password' 
                                    name="password" 
                                    type="password" 
                                    onChange={handleChange} 
                                    value={values.password} 
                                    />
                            <Button type='submit' variant='contained' >Login</Button>
                        </FormControl>
                    </form>}
            </Formik>
    );
}