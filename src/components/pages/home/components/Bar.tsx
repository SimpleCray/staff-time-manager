import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { hourToTimes } from '../../../../shared/utils';

type BarProps = {
    color: string;
    start: string;
    end: string;
    date: string;
    width: number;
    verticalPositionMap: any;
    startTime: string;
    endTime: string;
};

export default function Bar({ color, start, end, date, width, verticalPositionMap, startTime, endTime }: BarProps) {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [height, setHeight] = useState(0);
    const text = `${moment(start, ['HH:mm:ss']).format('H:mm A')} - ${moment(end, ['HH:mm:ss']).format('H:mm A')}`;
    const [display, setDisplay] = useState(false);
    const bgColor = `repeating-linear-gradient(-45deg, rgba(${color},1), rgba(${color},1) 24px, rgba(${color},0.4) 24px, rgba(${color},0.4) 48px)`;

    useEffect(() => {
        let startValue = 0;
        let endValue = 0;
        const barStartTime = hourToTimes(start);
        const barEndTime = hourToTimes(end);
        const calendarStartTime = hourToTimes(startTime);
        const calendarEndTime = hourToTimes(endTime);
        if (barStartTime < calendarStartTime) startValue = 0;
        else if (barStartTime > calendarEndTime)  startValue = verticalPositionMap.at(-1).value;
        else startValue = verticalPositionMap.find((item: { key: string; value: number; label: string }) => item.key === start).value;

        if (barEndTime > calendarEndTime) endValue = verticalPositionMap.at(-1).value;
        else if (barEndTime > calendarStartTime)
            endValue = verticalPositionMap.find((item: { key: string; value: number; label: string }) => item.key === end).value;
        const height = endValue - startValue;
        if (height === 0) {
            setDisplay(false);
        } else {
            const dayOfDate = new Date(date).getDay() === 0 ? 6 : new Date(date).getDay() - 1; // Hanle sunday
            // const pageHeight = document.querySelector('.home-page')?.scrollHeight || 0;
            // const clientHeight = document.documentElement.clientHeight;
            // const delta = pageHeight > clientHeight ? -1.5*dayOfDate : dayOfDate; // Adjust for the difference between cols
            const xAxisValue = dayOfDate * width + dayOfDate;
            setX(xAxisValue);
            setY(startValue);
            setHeight(height);
            setDisplay(true);
        }
    }, [width, startTime, endTime]);

    return display ? (
        <Rnd
            bounds='.schedule-container'
            style={{ top: 0, left: 0, display: 'absolute' }}
            size={{ width: width, height: height }}
            position={{ x: x, y: y }}
            enableResizing={false}
            disableDragging={true}
        >
            <div style={{ background: bgColor, height: height, boxSizing: 'border-box', border: '1px solid var(--blue)', borderRadius: 5 }}>
                <div className='bar-text'>{text}</div>
            </div>
        </Rnd>
    ) : null;
}
