import { faCalendarWeek, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const Header = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: any) => state);
    console.log('state');
    console.log(state);
    return (
        <div className="flex justify-between align-center">
            <div className="text-30 bold color-white">Weekly schedule</div>
            <div className="flex">
                <div className="default-button" style={{marginRight: 10}}>
                    <FontAwesomeIcon icon={faClock}/>
                </div>
                <div className="default-button">
                    <FontAwesomeIcon icon={faCalendarWeek}/>
                </div>
            </div>
        </div>
    );
}

