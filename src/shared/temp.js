import moment from "moment";

const currentWeek = {
    "dates": [
        {
            "date": 30,
            "month": 4,
            "year": 2022,
            "jsDate": "5/30/2022, 12:00:00 AM"
        },
        {
            "date": 31,
            "month": 4,
            "year": 2022,
            "jsDate": "5/31/2022, 12:00:00 AM"
        },
        {
            "date": 1,
            "month": 5,
            "year": 2022,
            "jsDate": "6/1/2022, 12:00:00 AM"
        },
        {
            "date": 2,
            "month": 5,
            "year": 2022,
            "jsDate": "6/2/2022, 12:00:00 AM"
        },
        {
            "date": 3,
            "month": 5,
            "year": 2022,
            "jsDate": "6/3/2022, 12:00:00 AM"
        },
        {
            "date": 4,
            "month": 5,
            "year": 2022,
            "jsDate": "6/4/2022, 12:00:00 AM"
        },
        {
            "date": 5,
            "month": 5,
            "year": 2022,
            "jsDate": "6/5/2022, 12:00:00 AM"
        }
    ],
    "currentWeek": true,
    "year": 2022
}
const workingHours = [
    {
        "key": "1",
        "label": "monday",
        "start": "09:00:00",
        "end": "18:00:00"
    },
    {
        "key": "2",
        "label": "tuesday",
        "start": "09:00:00",
        "end": "18:00:00"
    },
    {
        "key": "3",
        "label": "wednesday",
        "start": "09:00:00",
        "end": "18:00:00"
    },
    {
        "key": "4",
        "label": "thursday",
        "start": "09:00:00",
        "end": "18:00:00"
    },
    {
        "key": "5",
        "label": "friday",
        "start": "09:00:00",
        "end": "18:00:00"
    },
    {
        "key": "6",
        "label": "saturday",
        "start": "09:00:00",
        "end": "18:00:00"
    },
    {
        "key": "0",
        "label": "monday",
        "start": "09:00:00",
        "end": "18:00:00"
    }
]
const schedule = {
    "2022-05-23": [
        {
            "start": "14:00:00",
            "end": "15:30:00"
        },
        {
            "start": "12:00:00",
            "end": "13:00:00"
        },
        {
            "start": "15:00:00",
            "end": "16:00:00"
        },
    ]
}
const calculateAvailableTimes = (currentWeek, workingHours, schedule) => {
    const times = [];
    currentWeek.dates.forEach(date => {
        const key = moment(date.jsDate).format('YYYY-MM-DD');
        console.log(key)
    })
}

const times = calculateAvailableTimes(currentWeek, workingHours, schedule);

// console.log(times);





function giveUtc(start) {
    var t = moment().format('YYYY-MM-DD');
    var t1 = t + ' ' + start;
    return moment(t1, 'YYYY-MM-DD h:mm A').format();
}

const timeRange = [
    {
        start: '9:00 AM',
        end: '10:00 AM',
    },
    {
        start: '12:00 PM',
        end: '2:00 PM',
    },
    {
        start: '5:00 PM',
        end: '7:00 PM',
    },
    {
        start: '11:00 AM',
        end: '3:00 PM',
    },
    {
        start: '6:00 PM',
        end: '9:00 PM',
    },
];

timeRange.sort((a, b) => {
    var utcA = giveUtc(a.start);
    var utcB = giveUtc(b.start);
    if (utcA < utcB) {
        return -1;
    }
    if (utcA > utcB) {
        return 1;
    }
    return 0;
});
const availableTimeArray = [];

let endTimeFarthest = moment(giveUtc('0.00 AM'));
let startTimeMinimum = moment(giveUtc('12.59 PM'));
timeRange.forEach((element, index) => {
    let currentEndTime = moment(giveUtc(element.end));
    const currentStartTime = moment(giveUtc(element.start));
    if (currentStartTime.isBefore(startTimeMinimum)) {
        startTimeMinimum = currentStartTime;
    }
    if (currentEndTime.isAfter(endTimeFarthest)) {
        endTimeFarthest = currentEndTime;
    }
    /* console.log(startTimeMinimum.format("h:mm A"), endTimeFarthest.format("h:mm A")) */
    if (index === timeRange.length - 1) {
        if (timeRange.length === 1) {
            availableTimeArray.push({
                start: '00:00 AM',
                end: currentStartTime.format('h:mm A'),
            });
        }
        availableTimeArray.push({
            //start: currentEndTime.format("h:mm A"),
            start: endTimeFarthest.format('h:mm A'),
            end: '11.59 PM',
        });
    } else {
        const nextBusyTime = timeRange[index + 1];
        const nextStartTime = moment(giveUtc(nextBusyTime.start));
        if (index === 0) {
            availableTimeArray.push({
                start: '00:00 AM',
                end: currentStartTime.format('h:mm A'),
            });
        }
        let endTimeToCompare = currentEndTime.isBefore(endTimeFarthest) ? endTimeFarthest : currentEndTime;
        if (endTimeToCompare.isBefore(nextStartTime)) {
            availableTimeArray.push({
                start: endTimeToCompare.format('h:mm A'),
                end: nextStartTime.format('h:mm A'),
            });
        }
    }
});
console.log(availableTimeArray);
