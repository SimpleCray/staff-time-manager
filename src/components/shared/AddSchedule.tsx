import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveSchedule } from '../../redux/app/app.actions';
import { showMessage } from '../../redux/message/message.actions';

const AddSchedule = () => {
    const dispatch = useDispatch();
    const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const onSave = () => {
        const startMinute = start.split(':')[1];
        const endMinute = end.split(':')[1];
        if (!['30', '00'].includes(startMinute) || !['30', '00'].includes(endMinute)) {
            dispatch(showMessage('Please select 30 minutes step', 'error'));
        } else dispatch<any>(saveSchedule(date, { start: moment(start, ['hh:mm']).format('HH:mm:ss'), end: moment(end, ['hh:mm']).format('HH:mm:ss') }));
    };

    return (
        <div className='flex-col' style={{ textAlign: 'left' }}>
            <div>Select schedule date:</div>
            <input type='date' value={date} onChange={(e) => setDate(e.target.value)} />
            <div style={{ marginTop: 10 }}>Select start time:</div>
            <input type='time' step='1800' value={start} onChange={(e) => setStart(e.target.value)} />
            <div style={{ marginTop: 10 }}>Select end time:</div>
            <input type='time' step='1800' value={end} onChange={(e) => setEnd(e.target.value)} />
            <button className='default-button' style={{ marginTop: 10, textAlign: 'center', width: '100%' }} onClick={onSave}>
                Save
            </button>
        </div>
    );
};

export default AddSchedule;
