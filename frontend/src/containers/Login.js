import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import {Alert, Paper} from '@mui/material';


const Login = ({ login, token }) => {
    const [message, setMessage] = useState();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


    //Submit login request
    const onSubmit = async (e) => {
        try{
            e.preventDefault();
            const ret = await login(username, password);
            setMessage(ret);
        }
        catch (err){
            setMessage("Error when logging in");
        }
    };

    //Redirection when logged in
    if (token)
        return <Redirect to='/contact'/>;

    return (
        <div className='container mt-5'>
            <Paper style={{ padding: "40px 20px",marginTop: 10 }}>
                <h1>Login</h1>
                <p>Sign into your Contact account</p>
                {message && <Alert severity="error">{message}</Alert>}
                <form onSubmit={e => onSubmit(e)}>
                    <div className='form-group'>
                        <label className='form-label'>Username: </label>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Username*'
                            name='username'
                            onChange={e => onChange(e)}
                            value={username}
                            required
                        />
                    </div>
                    <br/>
                    <div className='form-group'>
                        <label className='form-label mt-3'>Password: </label>
                        <input
                            className='form-control'
                            type='password'
                            placeholder='Password*'
                            name='password'
                            onChange={e => onChange(e)}
                            value={password}
                            minLength='6'
                            required
                        />
                    </div>
                    <br />
                    <button className='btn btn-primary mt-3' type='submit'>Login</button>
                </form>
                <p className='mt-3'>
                    Don't have an Account? <Link to='/register'>Register</Link>
                </p>
            </Paper>
        </div>
    );
};

const mapStateToProps = state => ({
    token: state.auth.token
});

export default connect(mapStateToProps, {login})(Login);
