import { faCalendarWeek, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Tooltip } from '../../../shared/Tooltip';

export const Header = () => {
    return (
        <div className='flex justify-between align-center'>
            <div className='text-30 bold color-white'>Weekly Schedule</div>
            <div className='flex'>
                <Tooltip content='select hours'>
                    <div className='default-button' style={{ marginRight: 10 }}>
                        <FontAwesomeIcon icon={faClock} />
                    </div>
                </Tooltip>
                <Tooltip content='select week'>
                    <div className='default-button'>
                        <FontAwesomeIcon icon={faCalendarWeek} />
                    </div>
                </Tooltip>
            </div>
        </div>
    );
};
