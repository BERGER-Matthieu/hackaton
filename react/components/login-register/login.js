import {React, useState} from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Login = () => {

    const [form, setForm] = useState({nameOrEmail : "", password : ""})
    const cookies = new Cookies();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const submitForm = (e) => {
        e.preventDefault();
        fetch("http://localhost/hackaton-b3/login.php",{
            method:"POST",
            headers:{'content-type':'application/json'},
            body: JSON.stringify(form)
        })
        .then(response => {
            if(!response.ok){
                throw new Error("nuh huh")
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            alert(data["message"])
            if (data['isLoggedIn'] === true) {
                cookies.set('userId', data["id"], { path: '/', maxAge : '86400'});
                window.location.reload();
            }

        })
        .catch(err => console.log(err))
    }

    if (cookies.get('userId') !== undefined) {
        return <Navigate to="/home"/>
    }

    return (
        <>
        <div className="login">
            <form onSubmit={(e) => submitForm(e)}>
                <input type="text" name="nameOrEmail" placeholder='username-email' onChange={(e)=> handleChange(e)}/>
                <input type="password" name="password" placeholder='password' onChange={(e)=> handleChange(e)}/>
                <input type="submit" value="submit"/>
            </form>
        </div>
        </>
    );
}

export default Login;
