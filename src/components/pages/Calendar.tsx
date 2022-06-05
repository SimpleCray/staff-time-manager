import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { CALENDAR_STEP_HEIGHT, CALENDAR_STEP_WIDTH, DAYS_OF_WEEK } from '../../shared/constants';
import { getMonday, getTimesArray, getWeekNumber, getWeeksOfYear } from '../../shared/utils';

export const Calendar = () => {
    const { startTime, endTime, selectedDay } = useSelector((state: any) => state.app);
    const selectedDate = new Date(selectedDay);
    const currentYear = selectedDate.getFullYear();
    const weeks = useMemo(() => getWeeksOfYear(currentYear), [currentYear]);
    const selectedWeekNumber = getWeekNumber(selectedDate.getMonth() + 1, selectedDate.getDate(), selectedDate.getFullYear());
    const selectedWeek = weeks[selectedWeekNumber - 1];
    const [year, setYear] = useState(currentYear);
    const monday = getMonday(new Date());
    const hours = useMemo(() => getTimesArray(startTime, endTime, 30), [startTime, endTime]);
    const getVerticalPositionMap = (hours: Array<string>) =>
        hours.map((hour, index) => ({ key: hour, value: index * CALENDAR_STEP_HEIGHT, label: moment(hour, ['hh:mm']).format('H:mm A') }));
    const verticalPositionMap = useMemo(() => getVerticalPositionMap(hours), [hours]);
    const calendarHeight = verticalPositionMap.length * CALENDAR_STEP_HEIGHT + 100;
    return (
        verticalPositionMap ? (<div className='calendar-container'>
            <div className='hours-container'>
                <div className='hour' style={{ height: 50, borderBottom: '1px solid var(--lighterBlue)' }} />
                {verticalPositionMap.map((hour, hourIndex) => (
                    <React.Fragment key={hourIndex}>
                        <div className='hour' key={hourIndex} style={{ height: CALENDAR_STEP_HEIGHT, fontWeight: hour.label.includes('30') ? 'normal' : 'bold' }}>
                            <span>{hour.label}</span>
                        </div>
                        <hr className='hour-horizontal-line' />
                    </React.Fragment>
                ))}
            </div>
            <div className='days-container'>
                {selectedWeek.dates.map((day: any, dayIndex: number) => (
                    <React.Fragment key={dayIndex}>
                        <div className='day' style={{ width: 'calc(100%/7)', minWidth: CALENDAR_STEP_WIDTH }}>
                            <div className='number'>{new Date(day.jsDate).getDate()}</div>
                            <div className='text'>{DAYS_OF_WEEK[new Date(day.jsDate).getDay()]}</div>
                        </div>
                        {dayIndex !== selectedWeek.dates.length - 1 && <hr className='day-vertical-line' style={{height: calendarHeight}}/>}
                    </React.Fragment>
                ))}
            </div>
            <div className='schedule-container' id='schedule-container' 
            // style={{ height: calendarHeight }}
            >
                
            </div>
        </div>) : null
    );
};
