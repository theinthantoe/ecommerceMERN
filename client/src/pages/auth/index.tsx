import {useState , SyntheticEvent} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { UserError } from '../../errors';
import {useCookies} from 'react-cookie';
export const AuthPage =()=>{
    return (
        <div className="">
            <Register/> <Login/>
        </div>
    )
}

const Register = ()=>{
    const [username,setUsername] = useState<string>("");
    const [password,setPassword] = useState<string>("");

    const handleSubmit = async(event : SyntheticEvent )=>{
        event.preventDefault();
        try{
            await axios.post("http://localhost:8001/user/register",{
                username,
                password
            });
            alert("Registration Completed ! Now Login.")
        }catch(err){
            if(err.response.data.type === UserError.USERNAME_ALREADY_EXISTS){
                alert ("Error : user already in use.")
            }else{
                alert("Error : somthing went wrong")
            }
        }
    }

    return (
        <div className="flex justify-center m-auto my-7 w-80 bg-slate-100">
            <form action="" onSubmit={handleSubmit}>
                <h1>Registeration Form</h1>
                <div className="">
                    <label htmlFor="username"> Username :</label>
                    <input type="text" id="username" className="outline-none border border-blue-300 ml-5 rounded-sm" 
                    value={username}
                    onChange={(event)=>{setUsername(event.target.value)}}
                    />
                </div>
                <div className="">
                    <label htmlFor="password"> Password :</label>
                    <input type="password" id="password" className="outline-none border border-blue-300 ml-5 rounded-sm"
                    value={password}
                    onChange={(event)=>{ setPassword(event.target.value)}}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )

}

const Login = ()=>{
    const [username,setUsername] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const[_, setCookies] =useCookies(["access-token"])
    const navigate = useNavigate()

     const LoginHandler = async(event : SyntheticEvent)=>{
        event.preventDefault();
        try{
            const result = await axios.post('http://localhost:8001/user/login',{username,password});
            setCookies("access-token",result.data.token)
            localStorage.setItem("userID",result.data.userID)
            navigate('/')

        }catch(err){
            let errorMessage : string = "";
            switch(err.response.data.type){
                case UserError.NO_USER_FOUND :
                    errorMessage = "user doesn't exist"
                    break;
                case UserError.WRONG_CREDENTIALS :
                    errorMessage = "wrong username/password combination"
                    break;
                default :
                errorMessage = "Something went wrong"
            }
            alert("Error :" + errorMessage )
        }

     }
    return (
        <div className="">
            <form action="" onSubmit={LoginHandler}>
                <h1>Login Form</h1>
                <div className="">
                    <label htmlFor="username">Username :</label>
                    <input type="text" id='username' 
                    value={username}
                    onChange={(event)=>{setUsername(event.target.value)}}
                    />
                </div>
                <div className="">
                    <label htmlFor="password">Password :</label>
                    <input type="password" id='password' 
                    value={password}
                    onChange={(event)=>{setPassword(event.target.value)}}
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )

}