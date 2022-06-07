import { faCalendarWeek, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { TeachingBubble } from '../../../shared/TeachingBubble';
import { Tooltip } from '../../../shared/Tooltip';
import WeekCalendar from '../../../shared/WeekCalendar';

export const Header = () => {
    return (
        <div className='flex justify-between align-center' style={{position: 'relative', zIndex: 5}}>
            <div className='text-30 bold color-white'>Weekly Schedule</div>
            <div className='flex'>
                <TeachingBubble content={<WeekCalendar />} position='bottom'>
                    <Tooltip content='select hours' position='top'>
                        <div className='default-button' style={{ marginRight: 10 }}>
                            <FontAwesomeIcon icon={faClock} />
                        </div>
                    </Tooltip>
                </TeachingBubble>
                <TeachingBubble content={<WeekCalendar />} position='bottom'>
                    <Tooltip content='select week' position='top'>
                        <div className='default-button'>
                            <FontAwesomeIcon icon={faCalendarWeek} />
                        </div>
                    </Tooltip>
                </TeachingBubble>
            </div>
        </div>
    );
};
