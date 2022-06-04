import mock from '../mock';

let staffDB = {
    workingHours: [
        {key: 'monday', start: '09:00:00', end: '18:00:00'},
        {key: 'tuesday', start: '09:00:00', end: '18:00:00'},
        {key: 'wednesday', start: '09:00:00', end: '18:00:00'},
        {key: 'thursday', start: '09:00:00', end: '18:00:00'},
        {key: 'friday', start: '09:00:00', end: '18:00:00'},
        {key: 'saturday', start: '09:00:00', end: '18:00:00'},
        {key: 'sunday', start: '09:00:00', end: '18:00:00'},
    ],
    schedule: {
        '2022-05-23': [
            {start: '14:00:00', end: '15:30:00'},
            {start: '15:00:00', end: '16:00:00'},
            {start: '12:00:00', end: '13:00:00'},
        ]
    }
};

mock.onGet('/api/staff/working-hours').reply(() => {
    return [200, staffDB.workingHours];
});

mock.onGet('/api/staff/schedule').reply(() => {
    return [200, staffDB.schedule];
});
