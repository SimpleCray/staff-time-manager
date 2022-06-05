import mock from '../mock';

let staffDB = {
    workingHours: [
        {key: '1', label: 'monday', start: '09:00:00', end: '18:00:00'},
        {key: '2', label: 'tuesday', start: '09:00:00', end: '18:00:00'},
        {key: '3', label: 'wednesday', start: '09:00:00', end: '18:00:00'},
        {key: '4', label: 'thursday', start: '09:00:00', end: '18:00:00'},
        {key: '5', label: 'friday', start: '09:00:00', end: '18:00:00'},
        {key: '6', label: 'saturday', start: '09:00:00', end: '18:00:00'},
        {key: '0', label: 'monday', start: '09:00:00', end: '18:00:00'},
    ],
    schedule: {
        '2022-05-23': [
            {start: '14:00:00', end: '15:30:00'},
            {start: '15:00:00', end: '16:00:00'},
            {start: '12:00:00', end: '13:00:00'},
        ],
        '2022-06-05': [
            {start: '10:00:00', end: '12:30:00'},
            {start: '16:00:00', end: '16:30:00'},
            {start: '13:00:00', end: '15:00:00'},
        ],
    }
};

mock.onGet('/api/staff/staff-data').reply(() => {
    return [200, staffDB];
});

