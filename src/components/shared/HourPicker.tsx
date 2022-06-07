import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setStartEndTime } from '../../redux/app/app.actions';
import { showMessage } from '../../redux/message/message.actions';

const HourPicker = () => {
    const dispatch = useDispatch();
    const { startTime, endTime } = useSelector((state: any) => state.app);
    const [start, setStart] = useState(startTime);
    const [end, setEnd] = useState(endTime);

    const setTime = () => {
        const startMinute = (start.split(':')[1]);
        const endMinute = (end.split(':')[1]);
        if (!['30', '00'].includes(startMinute) || !['30', '00'].includes(endMinute)) {
            dispatch(showMessage('Please select 30 minutes step', 'error'));
        } else dispatch(setStartEndTime(start, end));
    }

    return (
        <div className='flex-col'>
            <div>Select start time:</div>
            <input type='time' step="1800" value={start} onChange={(e) => setStart(e.target.value)}/>
            <div>Select end time:</div>
            <input type='time' step="1800" value={end} onChange={(e) => setEnd(e.target.value)}/>
            <button className='default-button' style={{ marginTop: 10 }} onClick={setTime}>
                Apply
            </button>
        </div>
    );
};

export default HourPicker;
