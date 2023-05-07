import NavBar from '../Components/NavBar';
import '../App.css';
import React from 'react';
import Cookies from 'universal-cookie';


export default function Login(){

    const [displayRegister, setDisplayRegister] = React.useState(true);
    const [registerMessage, setRegisterMessage] = React.useState("");

    

    const cookies = new Cookies();
    cookies.set('myCat', 'Pacman', { path: '/' });
    

    async function LoginSubmit(event){
        event.preventDefault();
        let userName = event.target.userNameLogin.value;
        let password = event.target.passwordLogin.value;
        let userObj = {
            "username": userName,
            "password": password
        }

        var response;
        try{
            response = await fetch('https://localhost:7018/api/User/login', {
                method: 'POST',
                body: JSON.stringify(userObj),
                headers: {
                'accept' : 'application/json',
                'Content-Type' : 'application/json',
                }
            });
            if(response.status === 400){
                setRegisterMessage("Incorrect Usernae or Password!");
                return;
            }else{
                let token = await response.json();
                console.log("token set");
                cookies.set('JWT_Token', token, { path: '/' });
                window.location.reload();
            }
        }catch{
            setRegisterMessage("Error");
        }

    }

    async function RegisterSubmit(event){
        event.preventDefault();
        let userName = event.target.userName.value;
        let password = event.target.password.value;
        let userObj = {
            "username": userName,
            "password": password
        }

        var response;
        try{
            response = await fetch('https://localhost:7018/api/User/register', {
                method: 'POST',
                body: JSON.stringify(userObj),
                headers: {
                'accept' : 'application/json',
                'Content-Type' : 'application/json',
                }
            });
            if(response.status === 400){
                setRegisterMessage("Username is taken!");
                return;
            }else{
                setRegisterMessage("User Created Please Login");
                console.log("User Created");
            }
        }catch{
            setRegisterMessage("Error");
        }

        setDisplayRegister(false);
    }

    return (
        <div className='Page'>
            <NavBar />
            <div className='loginPage'>
                <div className={ displayRegister ? "loginBox" : "loginBoxAfterRegistration"}>
                    <h2>Login</h2>
                    <h6 className={displayRegister ? "hidden" : "text-success"}>{registerMessage === "User Created Please Login" ? registerMessage : ""}</h6>
                    <form method="post" onSubmit={LoginSubmit}>
                        <label>Username: </label>
                        <input type="text" name="userNameLogin" id="userNameLogin" />
                        <label>Password: </label>
                        <input type="password" name="passwordLogin" id="passwordLogin" />
                        <button type='submit' >Submit</button>
                    </form>
                </div>

                <div className={ displayRegister ? "borderBox" : "hidden"}>
                    <div className="borderDiv"></div>
                </div>

                <div className={ displayRegister ? "registerBox" : "hidden"}>
                    <h2>Register</h2>
                    <form method="post" onSubmit={RegisterSubmit}>
                        <label>Username:   </label>
                        <input type="text" name="userName" id="userName" />
                        <label>Password:    </label>
                        <input type="password" name="password" id="password" />
                        <button type='submit' >Submit</button>
                        <h6 className='text-danger'>{registerMessage}</h6>
                    </form>
                </div>
                
            </div>
        </div>
    )
}