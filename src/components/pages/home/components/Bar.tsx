import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';

type BarProps = {
    color: string;
    start: string;
    end: string;
    date: string;
    width: number;
    verticalPositionMap: any;
};

export default function Bar({ color, start, end, date, width, verticalPositionMap }: BarProps) {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [height, setHeight] = useState(0);
    const text = `${moment(start, ['HH:mm:ss']).format('H:mm A')} - ${moment(end, ['HH:mm:ss']).format('H:mm A')}`;

    useEffect(() => {
        const startValue = verticalPositionMap.find((item: { key: string; value: number; label: string }) => item.key === start).value;
        const endValue = verticalPositionMap.find((item: { key: string; value: number; label: string }) => item.key === end).value;
        const height = endValue - startValue;
        const dayOfDate = new Date(date).getDay() === 0 ? 6 : new Date(date).getDay() - 1; // Hanle sunday
        const xAxisValue = dayOfDate * width + dayOfDate; // + dayOfDate to adjust for the difference between cols
        setX(xAxisValue);
        setY(startValue);
        setHeight(height);
    }, [width]);

    return (
        <Rnd
            bounds='.schedule-container'
            style={{ top: 0, left: 0, display: 'absolute' }}
            size={{ width: width, height: height }}
            position={{ x: x, y: y }}
            enableResizing={false}
            disableDragging={true}
        >
            <div style={{ background: `rgba(${color},1)`, height: height, boxSizing: 'border-box', border: '1px solid var(--blue)', borderRadius: 5 }}>
                <div className="bar-text">{text}</div>
            </div>
        </Rnd>
    );
}
