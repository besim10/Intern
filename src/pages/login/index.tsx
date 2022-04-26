
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import './style.css'
const Login : FC = ()=>{

    const navigate = useNavigate()

    const sendInfoToServer = (data: any) =>{
        console.log(data)
        fetch(`http://reimusabelli-001-site1.itempurl.com/api/authentication/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.Message) {
          alert(data.Message);
        } else {
          localStorage.setItem('token', data.token)
        }
      });
    }
    
    const handleSubmit = (e: any) =>{
        e.preventDefault()
        const userName =  e.target.username.value
        const password = e.target.password.value
        const data = {
            userName,
            password
        }
        sendInfoToServer(data)
    }
    
    const handleClick = () =>{
        navigate('/register')
    }

    return(
        <main className="main-wrapper">
            <div className="main-container">
                <h1 className="title">Login</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    <label>
                        Username:
                        <input type="text" name="username" required/>
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" required/>
                    </label>
                    <input type="submit" value="Login" className="submit-btn" />
                </form>
                <p onClick= {handleClick} className="dont-have-account">Don't have an account? Register Now!</p>
            </div>
        </main>
    )
}

export default Login