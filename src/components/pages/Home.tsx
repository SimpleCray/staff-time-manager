import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { showMessage } from '../../redux/message/message.actions';
import { Header } from './Header';

export const Home = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: any) => state);
    console.log('state');
    console.log(state);
    return (
        <div className="radial-background home-page">
            <div className="main-container">
                <Header/>
            </div>
        </div>
    );
}

