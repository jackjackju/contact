import React from 'react';
import { Link } from 'react-router-dom';

const home = () => (
    <div className='container'>
        <div className='mt-5 p-5 bg-light'>
            <h1 className='display-4'>Welcome to Contact</h1>
            <p className='lead'>
                Stomble Contact Application
            </p>
            <hr className='my-4' />
            <p>Click the button below to start</p>
            <Link className='btn btn-primary btn-lg' to='/login'>Start</Link>
        </div>
    </div>
);

export default home;
