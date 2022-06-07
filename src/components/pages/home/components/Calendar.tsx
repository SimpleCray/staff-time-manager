import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import useWindowSize from '../../../../hook/useWindowSize';
import { thunkSendMessage } from '../../../../redux/app/app.actions';
import {
    AVAILABLE_COLOR,
    CALENDAR_SHOW_TYPE,
    CALENDAR_STEP_HEIGHT,
    CALENDAR_STEP_WIDTH,
    DAYS_OF_WEEK,
    DAYS_OF_WEEK_SHORTEN,
    SCHEDULE_COLOR,
} from '../../../../shared/constants';
import { calculateAvailableTimes, getMonday, getScheduleOfWeek, getTimesArray, getWeekNumber, getWeeksOfYear } from '../../../../shared/utils';
import Bar from './Bar';

export const Calendar = () => {
    const dispatch = useDispatch();
    const [availableTimes, setAvailableTimes] = useState([]);
    const [widthOfDay, setWidthOfDay] = useState(0);
    const { startTime, endTime, selectedDay, workingHours, schedule, showType } = useSelector((state: any) => state.app);
    const selectedDate = new Date(selectedDay);
    const currentYear = selectedDate.getFullYear();
    const weeks = useMemo(() => getWeeksOfYear(currentYear), [currentYear]);
    const selectedWeekNumber = getWeekNumber(selectedDate.getMonth() + 1, selectedDate.getDate(), selectedDate.getFullYear());
    const selectedWeek = weeks[selectedWeekNumber - 1];
    const hours = useMemo(() => getTimesArray(startTime, endTime, 30), [startTime, endTime]);
    const getVerticalPositionMap = (hours: Array<string>) =>
        hours.map((hour, index) => ({
            key: moment(hour, ['hh:mm']).format('HH:mm:ss'),
            value: index * CALENDAR_STEP_HEIGHT,
            label: moment(hour, ['hh:mm']).format('H:mm A'),
        }));
    const verticalPositionMap = useMemo(() => getVerticalPositionMap(hours), [hours]);
    const calendarHeight = verticalPositionMap.length * CALENDAR_STEP_HEIGHT + 100;
    const windowSize = useWindowSize();

    useEffect(() => {
        if (!workingHours) dispatch<any>(thunkSendMessage());
    }, [workingHours, dispatch]);

    useEffect(() => {
        if (selectedWeek && workingHours && schedule) {
            const times: any =
                showType === CALENDAR_SHOW_TYPE.AVAILABLE_TIME
                    ? calculateAvailableTimes(selectedWeek, workingHours, schedule)
                    : getScheduleOfWeek(selectedWeek, schedule);
            setAvailableTimes(times);
        }
    }, [selectedWeek, workingHours, schedule, showType]);

    useEffect(() => {
        if (document.querySelector('.day')) {
            setWidthOfDay(document.querySelector('.day')?.getBoundingClientRect().width || 0);
        }
    }, [windowSize]);

    return verticalPositionMap ? (
        <div className='calendar-container'>
            <div className='hours-container'>
                {/* <div className='hour' style={{ height: 50, borderBottom: '1px solid var(--lighterBlue)' }} /> */}
                {verticalPositionMap.map((hour, hourIndex) => (
                    <React.Fragment key={hourIndex}>
                        <div
                            className='hour'
                            key={hourIndex}
                            style={{
                                height: CALENDAR_STEP_HEIGHT + (hourIndex === verticalPositionMap.length - 1 ? 2 : 0),
                                fontWeight: hour.label.includes('30') ? 'normal' : 'bold',
                            }}
                        >
                            <span>{hour.label}</span>
                        </div>
                        <hr className='hour-horizontal-line' />
                    </React.Fragment>
                ))}
            </div>
            <div className='days-container'>
                {selectedWeek.dates.map((day: any, dayIndex: number) => (
                    <React.Fragment key={dayIndex}>
                        <div className='day' style={{ width: 'calc(100%/7)' }}>
                            <div className='number'>{new Date(day.jsDate).getDate()}</div>
                            <div className='text'>{DAYS_OF_WEEK_SHORTEN[new Date(day.jsDate).getDay()]}</div>
                        </div>
                        {dayIndex !== selectedWeek.dates.length - 1 && <hr className='day-vertical-line' style={{ height: calendarHeight }} />}
                    </React.Fragment>
                ))}
            </div>
            <div className='schedule-container' id='schedule-container'>
                {availableTimes.map((day: { key: string; array: [] }) =>
                    day.array.map((time: { start: string; end: string }, index: number) => (
                        <Bar
                            key={`${time.start}-${time.end}-${index}`}
                            color={showType === CALENDAR_SHOW_TYPE.AVAILABLE_TIME ? AVAILABLE_COLOR : SCHEDULE_COLOR}
                            start={time.start}
                            end={time.end}
                            date={day.key}
                            width={widthOfDay}
                            verticalPositionMap={verticalPositionMap}
                            startTime={startTime}
                            endTime={endTime}
                        />
                    ))
                )}
            </div>
        </div>
    ) : null;
};
