import React from 'react';
import robotNotFound from '../../assets/images/robotNotFound.png'
import LoginImage from '../../assets/images/logo.png'
import MetaData from '../../components/MetaData';
import './NotFound.scss'

const NotFound = () => {
    return (
        <div className='notFoundContainer'>
            <MetaData title={`BAZZAR.com`} />
            <div className='imgContainer'>
                <span className='logo'><img className='logoImage' width={"40px"} src={LoginImage} alt='' />  BAZZAR.com</span>
                <div className='roboDiv'>
                    <img className='roboImage' src={robotNotFound} alt='' />
                </div>
            </div>
            <div className='textContainer'>
                <div className='errorMainDiv'>
                    <h4>Page not found</h4>
                </div>
                <div className='errorSubText'>
                    <p>We're sorry, but the page you're looking for cannot be found.</p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;