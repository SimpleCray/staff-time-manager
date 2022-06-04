import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMonday, getTimesArray, getWeekNumber, getWeeksOfYear } from '../../shared/utils';

export const Calendar = () => {
    const { startTime, endTime, selectedDay } = useSelector((state: any) => state.app);
    const selectedDate = new Date(selectedDay);
    const currentYear = selectedDate.getFullYear();
    const selectedWeek = getWeekNumber(selectedDate.getMonth() + 1, selectedDate.getDate(), selectedDate.getFullYear());
    const [weeks, setWeeks] = useState(getWeeksOfYear(currentYear));
    console.log(weeks)
    const [year, setYear] = useState(currentYear);
    const monday = getMonday(new Date());
    const hours = useMemo(() => getTimesArray(startTime, endTime, 30), [startTime, endTime]);
    console.log('hours')
    console.log(hours.map(item => moment(item, ['HH']).format('hh:mm A')))
    return (
        <div>Calendar</div>
    );
};
