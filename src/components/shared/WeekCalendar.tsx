import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setSelectedDay } from '../../redux/app/app.actions';
import { getMonday, getWeekNumber, getWeeksOfYear } from '../../shared/utils';
import { Tooltip } from './Tooltip';

const WeekCalendar = () => {
    const dispatch = useDispatch();
    const [direction, setDirection] = useState('none');
    const { selectedDay } = useSelector((state: any) => state.app);
    const selectedDate = new Date(selectedDay);
    const currentYear = selectedDate.getFullYear();
    const selectedWeek = getWeekNumber(selectedDate.getMonth() + 1, selectedDate.getDate(), selectedDate.getFullYear());
    const [weeks, setWeeks] = useState(getWeeksOfYear(currentYear));
    const [year, setYear] = useState(currentYear);
    const monday = getMonday(new Date());
    const currentWeek = getWeekNumber(monday.getMonth() + 1, monday.getDate(), monday.getFullYear());

    useEffect(() => {
        const newWeeks = getWeeksOfYear(year);
        setWeeks(newWeeks);
    }, [year]);
    return (
        <div className="week-calendar">
            <div className='year-container'>
                <div className='year'>{year}</div>
                <div className='arrow-container'>
                    <div className='arrow-item'
                        onClick={() => {
                            setDirection('up');
                            setTimeout(() => {
                                setYear(year - 1);
                                setDirection('none');
                            }, 300);
                        }}
                    >
                        <Tooltip content={`Previous year ${year - 1}`} position="top">
                            <FontAwesomeIcon className='arrow' icon={faArrowUp}/>
                        </Tooltip>
                    </div>
                    <div className='arrow-item'
                        onClick={() => {
                            setDirection('down');
                            setTimeout(() => {
                                setYear(year + 1);
                                setDirection('none');
                            }, 300);
                        }}
                    >
                    <Tooltip content={`Previous year ${year - 1}`} position="top">
                        <FontAwesomeIcon className='arrow' icon={faArrowDown}/>
                    </Tooltip>
                    </div>
                </div>
            </div>
            <div className='week-container'>
                {weeks.map((week, index) => 
                    <div
                        key={index}
                        className='week-item'
                        style={index + 1 === selectedWeek && year === currentYear ? { backgroundColor: '#A1CCE7'} : {}}
                        onClick={() => dispatch(setSelectedDay(new Date(week.dates[0].year, week.dates[0].month, week.dates[0].date)))}>
                        {index + 1}
                        {week.currentWeek && index + 1 !== selectedWeek && <div className='circle-current-week'/>}
                    </div>
                )}
            </div>
            <div 
                className={(currentWeek !== selectedWeek || year !== (new Date()).getFullYear()) ? 'footer-text' : 'footer-text-disabled'}
                onClick={() => {
                    if (year !== (new Date()).getFullYear()) {
                        setDirection('down');
                        setTimeout(() => {
                            setYear((new Date()).getFullYear());
                            dispatch(setSelectedDay(monday));
                            setDirection('none');
                        }, 300);
                    }
                    if (currentWeek !== selectedWeek) dispatch(setSelectedDay(monday));
                }}
            >Go to current week</div>
        </div>
    )
};

export default WeekCalendar;
