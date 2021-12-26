import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../actions/auth';
import {Alert, Paper} from '@mui/material';

const Register = ({ register, token }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        re_password: '',
        email: ''
    });

    const [message, setMessage] = useState();

    const { username, password, re_password, email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    //Submit sign up request
    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== re_password){
            setMessage("Inconsistent password");
            return;
        }

        try{
            const ret = await register(username, password, email);
            setMessage(ret);
        }
        catch (err){
            setMessage("Error when signing up user");
        }
    };

    //Redirection to info page when logged in
    if (token)
        return <Redirect to='/contact'/>;

    return (
        <div className='container mt-5'>
            <Paper style={{ padding: "40px 20px",marginTop: 10 }}>
            <h1>Register for Contact</h1>
            <p>Create an account with Contact application</p>
            {message && <Alert severity="info">{message}</Alert>}
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
                <div className='form-group'>
                    <label className='form-label mt-3'>Confirm Password: </label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        onChange={e => onChange(e)}
                        value={re_password}
                        minLength='6'
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3'>Email: </label>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email*'
                        name='email'
                        onChange={e => onChange(e)}
                        value={email}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary mt-3' type='submit'>Register</button>
            </form>
            <p className='mt-3'>
                Already have an Account? <Link to='/login'>Login</Link>
            </p>
            </Paper>
        </div>
    );
};

const mapStateToProps = state => ({
    token: state.auth.token
});

export default connect(mapStateToProps, {register})(Register);
