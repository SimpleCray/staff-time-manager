/// <reference path='../modules/dates-generator.d.ts' />
import moment from 'moment';
import { datesGenerator } from 'dates-generator';

export const getTimesArray = (start: string, end: string, length: number) => {
    let startMinute: number = parseInt(start.split(':')[0]) * 60 + parseInt(start.split(':')[1]);
    let endMinute: number = parseInt(end.split(':')[0]) * 60 + parseInt(start.split(':')[1]);
    let times = [];

    while (startMinute <= endMinute) {
        let mins = startMinute % 60;
        let hours = Math.floor(startMinute / 60);
        let timeString = hours.toString() + ':' + mins.toString().padStart(2, '0');
        times.push(timeString);
        startMinute += length;
    }
    return times;
};

export const getWeekNumber = (month: number, day: number, year: number) => {
    const date = `${day}-${month}-${year}`;
    var weeknumber = moment(date, 'DMYYYY').isoWeek();
    return weeknumber;
};

export const calculateFinalDates = (array: any, getCurrentWeekIndex = false) => {
    let currentWeekIndex = null;
    for (let i = 0; i < array.length - 1; i++) {
        const lastWeek1 = array[i].dates.length - 1;
        const lastDay1 = array[i].dates[lastWeek1][0]['date'];
        const lastDay2 = array[i + 1].dates[0][0]['date'];
        if (lastDay1 === lastDay2) {
            array[i + 1].dates.splice(0, 1);
        }
    }
    const finalDates = [];
    for (let i = 0; i < array.length; i++) {
        finalDates.push(...array[i].dates);
    }
    if (getCurrentWeekIndex) {
        const now = new Date();
        const currentDay = now.getDate();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const tempFinalDates = JSON.parse(JSON.stringify(finalDates));
        tempFinalDates.shift();
        for (let i = 0; i < tempFinalDates.length; i++) {
            if (tempFinalDates[i].some((item: any) => item.date === currentDay && item.month === currentMonth && item.year === currentYear)) {
                currentWeekIndex = i;
                break;
            }
        }
    }
    const start = new Date(array[0].dates[0][0]['year'], array[0].dates[0][0]['month'], array[0].dates[0][0]['date']);
    const lastIndexWeekEnd = array[array.length - 1].dates.length - 1;
    const end = new Date(
        array[array.length - 1].dates[lastIndexWeekEnd][6]['year'],
        array[array.length - 1].dates[lastIndexWeekEnd][6]['month'],
        array[array.length - 1].dates[lastIndexWeekEnd][6]['date']
    );
    return { finalDates, start, end, currentWeekIndex };
};

export const hourToTimes = (hour: string) => new Date(moment(hour, 'HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')).getTime();

export const getWeeksOfYear = (currentYear = new Date().getFullYear()) => {
    const array = new Array(12);
    array[0] = datesGenerator({ month: 0, year: currentYear, startingDay: 1 });
    for (let i = 1; i < array.length; i++) {
        array[i] = datesGenerator({ month: array[i - 1].nextMonth, year: array[i - 1].nextYear, startingDay: 1 });
    }
    const { finalDates, currentWeekIndex } = calculateFinalDates(array, true /* getCurrentWeekIndex */);
    finalDates.shift();
    const tempWeeks = [];
    for (let i = 0; i < finalDates.length; i++) {
        if (currentWeekIndex === i) {
            tempWeeks.push({ dates: finalDates[i], currentWeek: true, year: currentYear });
        } else {
            tempWeeks.push({ dates: finalDates[i], year: currentYear });
        }
    }
    return tempWeeks;
};

export const getMonday = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(date.setDate(diff));
};

type Schedule = {
    [k: string]: Array<Object>;
};

export const calculateAvailableTimes = (currentWeek: any, workingHours: Array<Object>, schedule: Schedule) => {
    const times: { key: string; array: []; }[] = [];
    currentWeek.dates.forEach((date: { date: number; month: number; year: number; jsDate: string }) => {
        const key = moment(date.jsDate).format('YYYY-MM-DD');
        const scheduleOnDate: any = schedule[key];
        if (scheduleOnDate) {
            const sortedScheduleOnDate = scheduleOnDate.sort((a: any, b: any) => (hourToTimes(a.start) < hourToTimes(b.start) ? -1 : 1));
            const availableTimeArray: any = [];
            const dayData: any = workingHours.find((day: any) => parseInt(day.key) === moment(key, 'YYYY-MM-DD').day());
            let minStart = hourToTimes(dayData.start);
            let maxEnd = hourToTimes(dayData.end);
            sortedScheduleOnDate.forEach((element: any, index: number) => {
                let currentEndTime = hourToTimes(element.end);
                const currentStartTime = hourToTimes(element.start);
                if (currentStartTime > minStart && currentEndTime <= maxEnd) {
                    availableTimeArray.push({
                        start: moment(minStart).format('HH:mm:ss'),
                        end: moment(currentStartTime).format('HH:mm:ss'),
                    });
                    minStart = currentEndTime;
                }
            });
            const lastEndTime = hourToTimes(availableTimeArray.at(-1).end);
            if (lastEndTime < maxEnd) {
                availableTimeArray.push({
                    start: availableTimeArray.at(-1).end,
                    end: dayData.end,
                });
            }
            times.push({key, array: availableTimeArray});
        }
    });
    return times;
};
