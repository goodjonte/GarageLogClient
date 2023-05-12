import NavBar from '../Components/NavBar';
import '../App.css';
import React from 'react';
import Cookies from 'universal-cookie';
import Config from '../Config';


export default function Login(){

    const [displayRegister, setDisplayRegister] = React.useState(true);
    const [registerMessage, setRegisterMessage] = React.useState("");
    const cookies = new Cookies();
    
    //Login Submit Function
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
            response = await fetch(Config.getApiUrl() + 'User/login', {
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
        }catch(err){
            setRegisterMessage("Error");
            console.log(err);
        }

    }

    //Register Submit Function
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
            response = await fetch(Config.getApiUrl() + 'User/register', {  
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
        }catch(err){
            setRegisterMessage("Error");
            console.log(err);
        }

        setDisplayRegister(false);
    }

    return (
        <div className='Page'>
            <NavBar onLoginPage={true} />
            <div className='loginPage'>
                <div className={ displayRegister ? "loginBox" : "loginBoxAfterRegistration"}>
                    <h2 className='text-color'>Login</h2>
                    <h6 className={displayRegister ? "hidden" : "text-success"}>{registerMessage === "User Created Please Login" ? registerMessage : ""}</h6>
                    <form className='LoginForm' method="post" onSubmit={LoginSubmit}>
                        
                        <div className="input-group inputLoginPage">
                            <span className='input-group-text'>Username: </span>
                            <input className='form-control' type="text" name="userNameLogin" id="userNameLogin" />
                        </div>

                        <div className="input-group inputLoginPage">
                            <span className='input-group-text'>Password: </span>
                            <input className='form-control' type="password" name="passwordLogin" id="passwordLogin" />
                        </div>
                        
                        <button type='submit' className='btn btn-outline-dark'>Submit</button>
                    </form>
                </div>

                <div className={ displayRegister ? "borderBox" : "hidden"}>
                    <div className="borderDiv"></div>
                </div>

                <div className={ displayRegister ? "registerBox" : "hidden"}>
                    <h2 className='text-color'>Register</h2>
                    <form className='LoginForm' method="post" onSubmit={RegisterSubmit}>

                        <div className="input-group inputLoginPage">
                            <span className='input-group-text'>Username:   </span>
                            <input className='form-control' type="text" name="userName" id="userName" />
                        </div>

                        <div className="input-group inputLoginPage">
                            <span className='input-group-text'>Password:    </span>
                            <input className='form-control' type="password" name="password" id="password" />
                        </div>

                        <button type='submit' className='btn btn-outline-dark' >Submit</button>

                        <h6 className='text-danger' >{registerMessage}</h6>
                    </form>
                </div>
                
            </div>
        </div>
    )
}