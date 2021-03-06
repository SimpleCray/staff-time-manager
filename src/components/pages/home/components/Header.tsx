import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
import { faCalendarWeek, faClock, faClockFour, faHourglass, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCalendarShowType } from '../../../../redux/app/app.actions';
import { CALENDAR_SHOW_TYPE } from '../../../../shared/constants';
import AddSchedule from '../../../shared/AddSchedule';
import HourPicker from '../../../shared/HourPicker';
import { TeachingBubble } from '../../../shared/TeachingBubble';
import ToggleButton from '../../../shared/ToggleButton';
import { Tooltip } from '../../../shared/Tooltip';
import WeekPicker from '../../../shared/WeekPicker';

export const Header = () => {
    const dispatch = useDispatch();
    const { showType } = useSelector((state: any) => state.app);
    return (
        <div className='header-container'>
            <div className='app-name'>Weekly Schedule</div>
            <div className='flex' style={{width: '80%', justifyContent: 'flex-end'}}>
                <TeachingBubble content={<AddSchedule />} position='bottom' hasCloseButton={true}>
                    <Tooltip content='Add schedule' position='top'>
                        <div className='default-icon-button'>
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </div>
                    </Tooltip>
                </TeachingBubble>
                <TeachingBubble content={<WeekPicker />} position='bottom' hasCloseButton={false}>
                    <Tooltip content='select week' position='top'>
                        <div className='default-icon-button' style={{ marginLeft: 10 }}>
                            <FontAwesomeIcon icon={faCalendarWeek} />
                        </div>
                    </Tooltip>
                </TeachingBubble>
                <TeachingBubble content={<HourPicker />} position='bottom' hasCloseButton={true}>
                    <Tooltip content='select hours' position='top'>
                        <div className='default-icon-button' style={{ marginLeft: 10 }}>
                            <FontAwesomeIcon icon={faClock} />
                        </div>
                    </Tooltip>
                </TeachingBubble>
                <Tooltip content={showType === CALENDAR_SHOW_TYPE.SCHEDULE ? 'showing schedule' : 'showing available time'} position='top'>
                    <ToggleButton
                        toggle={showType === CALENDAR_SHOW_TYPE.SCHEDULE}
                        onClick={() => dispatch(setCalendarShowType(showType === CALENDAR_SHOW_TYPE.SCHEDULE ? CALENDAR_SHOW_TYPE.AVAILABLE_TIME : CALENDAR_SHOW_TYPE.SCHEDULE ))}
                        LeftIcon={() => <FontAwesomeIcon icon={faHourglass} style={{color: showType === CALENDAR_SHOW_TYPE.AVAILABLE_TIME ? 'white' : 'var(--blue)'}}/>}
                        RightIcon={() => <FontAwesomeIcon icon={faCalendarCheck}  style={{color: showType === CALENDAR_SHOW_TYPE.SCHEDULE ? 'white' : 'var(--blue)'}}/>}
                        onMouseOver={() => false}
                        styles={{ marginLeft: 10 }}
                    />
                </Tooltip>
            </div>
        </div>
    );
};
