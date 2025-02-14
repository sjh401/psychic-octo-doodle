import { useState } from "react"
import { Link } from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './Login.css'

const navHamburgerCSS = makeStyles((theme) => ({
    button: {
        backgroundColor: '#1d7dc2',
        margin: '2px',
        '&:hover': {
            backgroundColor: '#f8f7ff',
            color: '#1d7dc2'
        },
    },
    buttonDark: {
    backgroundColor: '#3f4045',
    margin: '2px',
    '&:hover': {
        backgroundColor: '#30292f',
        color: '#d4cdc3'
    },
    }
}));

export default function Login(props) {
    const [ formData, setFormData ] = useState({
        username: '',
        password: ''
    })
    const { handleLogin, darkMode } = props;
    const { username, password } = formData;
    const classes = navHamburgerCSS();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }
    // {(darkMode === true) ? "dark-" : 
    return (
        <div className="login-grid">
            <div className="login-logo-container">
                <img src={(darkMode === true) ? "https://i.imgur.com/eyLImzQ.png" : "https://i.imgur.com/xLr5h9x.png"} alt="destination hot dog logo" className="login-logo"/>
            </div>
            <div className={(darkMode === true) ? "login-container container-dark" : "login-container"}>
                <form 
                    className={(darkMode === true) ? "login-form form-dark" : "login-form"}
                    onSubmit={(e) => {
                    e.preventDefault()
                    handleLogin(formData)
                    }}
                >
                    <h2 className={(darkMode === true) ? "login-register register-dark" : "login-register"}>Login</h2>
                    <br/>
                    <TextField 
                        required 
                        label="Username"
                        name="username"
                        variant="outlined" 
                        value={username}
                        onChange={handleChange}/>
                    <br/>
                    <TextField 
                        required 
                        type="password"
                        label="Password" 
                        name="password"
                        variant="outlined"
                        value={password}
                        onChange={handleChange} />
                    <br/>
                    <div>
                        <Link to="/register" className="home-link">
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    className={(darkMode === true) ? classes.buttonDark : classes.button}
                                    style={{margin:'5px'}}>
                                    Register
                                </Button>
                            </Link>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                className={(darkMode === true) ? classes.buttonDark : classes.button} 
                                type="submit"
                            >
                                Submit
                            </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}