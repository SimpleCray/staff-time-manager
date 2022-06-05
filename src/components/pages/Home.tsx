import React from 'react';
import { useSelector } from 'react-redux';
import { getWeekNumber } from '../../shared/utils';
import { Calendar } from './Calendar';
import { Header } from './Header';

export const Home = () => {
    const { selectedDay } = useSelector((state: any) => state.app);
    const selectedDate = new Date(selectedDay);
    const selectedWeekNumber = getWeekNumber(selectedDate.getMonth() + 1, selectedDate.getDate(), selectedDate.getFullYear());
    return (
        <div className="radial-background home-page">
            <div className="main-container">
                <Header/>
                <div className='text-26 bold color-white' style={{textAlign: 'center', marginTop: 50, textDecoration: 'italic'}}>Week {selectedWeekNumber}</div>
                <Calendar/>
            </div>
        </div>
    );
}

