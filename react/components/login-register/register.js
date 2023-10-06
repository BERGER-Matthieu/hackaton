import {React, useState} from 'react';

const Register = () => {

    const [form, setForm] = useState({email : "", username : "", password : "", confirmPassword : ""})

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const submitForm = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(form))
        fetch("http://localhost/hackaton-b3/register.php",{
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
        })
        .catch(err => console.log(err))
    }

    return (
        <>
        <div className="register">
            <form onSubmit={(e) => submitForm(e)}>
                <input type="email" name="email" placeholder="email" onChange={(e)=> handleChange(e)}/>
                <input type="text" name="username" placeholder='username' onChange={(e)=> handleChange(e)}/>
                <input type="password" name="password" placeholder='password' onChange={(e)=> handleChange(e)}/>
                <input type="password" name="confirmPassword" placeholder='confirm password' onChange={(e)=> handleChange(e)}/>
                <input type="submit" value="submit"/>
            </form>
        </div>
        </>
    )
}

export default Register;