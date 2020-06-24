/*jshint esversion: 6 */
console.log('connected');

var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        page: 'reports', // dashboard, reports, fileTransfer, ipAddress, help
        drawer: false,
        visitorInPeople: 69,
        visitorOutPeople: 88,
        dailyTotalPeople: 642,
        occupancyPeople: 42,
        reportTimeIntervalList: ['15 min', '1 hour', '24 hour total'],
        reportTimeInterval: '15 min',
        currentIP: "190.168.1.90",
        stateArrowImage: 'icons/downArrow.png',
        DatePickerPopUp: false,
        reportDate: '',
        fullDate: '',
        currentIP: "192.168.1.90",
        MinuteHeaders: [
            { text: 'Time', align: 'start', value: 'time' },
            { text: 'In', value: 'timeIn'},
            { text: 'Out', value: 'timeOut'}
        ],
        HourHeaders: [
            { text: 'Time', align: 'start', value: 'time' },
            { text: 'In', value: 'timeIn'},
            { text: 'Out', value: 'timeOut'}
        ],
        DayHeaders: [
            { text: 'Day', align: 'start', value: 'day' },
            { text: 'In', value: 'timeIn'},
            { text: 'Out', value: 'timeOut'}
        ],

        minuteTimes: [
            { time: '8:00 am', timeIn: 22, timeOut: 16 },
            { time: '8:15 am', timeIn: 134, timeOut: 200 },
            { time: '8:30 am', timeIn: 38, timeOut: 37 },
            { time: '8:45 am', timeIn: 105, timeOut: 4 },
            { time: '9:00 pm', timeIn: 56, timeOut: 58 },
            { time: '9:15 pm', timeIn: 101, timeOut: 70 },
            { time: '9:30 pm', timeIn: 0, timeOut: 205 },
            { time: '9:45 pm', timeIn: 113, timeOut: 101 }
        ],
        HourTimes: [
            { time: '8 am', timeIn: 19, timeOut: 16 },
            { time: '9 am', timeIn: 134, timeOut: 200 },
            { time: '10 am', timeIn: 38, timeOut: 37 },
            { time: '11 am', timeIn: 105, timeOut: 4 },
            { time: '12 pm', timeIn: 56, timeOut: 58 },
            { time: '1 pm', timeIn: 101, timeOut: 70 },
            { time: '2 pm', timeIn: 0, timeOut: 205 },
            { time: '3 pm', timeIn: 113, timeOut: 101 }
        ],
        DayTimes: [
            { day: '07/16', timeIn: 137, timeOut: 126 },
        ]
    },
    created: function(){
        this.loadMainStats();
        this.getCurrentDate();
    },
    methods: {
        loadMainStats: function() {
            console.log("loading stats...");
            var vm = this;
            axios.get("http://192.168.0.90/local/people-counter/.api?export-json&date=20200611&res=24h").then(response => {
                vm.visitorInPeople = response.data;
                console.log(vm.visitorInPeople, "People Read In");
            });
        },
        sideDrawer: function() {
            this.drawer = ! this.drawer;
        },
        submitIp: function(currentIp){
            this.currentIP = currentIp;
            this.page = 'dashboard';
        },
        switchArrow: function() {
            if(this.stateArrowImage == 'icons/downArrow.png'){
                this.stateArrowImage = 'icons/upArrow.png';
            } else{
                this.stateArrowImage = 'icons/downArrow.png';
            }
        },
        resetArrow: function() {
            this.stateArrowImage = 'icons/downArrow.png';
        },
        closeDatePicker: function() {
            this.DatePickerPopUp = false;
        },
        openDatePicker: function() {
            this.DatePickerPopUp = true;
        },
        getCurrentDate: function() {
            var today = new Date();
            var day = today.getDate();
            var monthNumber = today.getMonth()
            var year = today.getFullYear();
            var month = this.getMonthToString(monthNumber);
            this.fullDate = `${month} ${day} ${year}`;
        },
        DateSelected: function() {
            let year1 = this.reportDate.substr(0,4);
            let month1 = this.reportDate.substr(5,2);
            var monthString = this.getMonthToString(Number(month1 -1) );
            let day1 = this.reportDate.substr(8,2);
            this.fullDate =  `${monthString} ${day1} ${year1}`;
        },
        getMonthToString: function(monthNumber) {
            var month = '';
            switch(monthNumber) {
                case 0: month = 'Jan'; break;
                case 1: month = 'Feb'; break;
                case 2: month = 'Mar'; break;
                case 3: month = 'April'; break;
                case 4: month = 'May'; break;
                case 5: month = 'Jun'; break;
                case 6: month = 'Jul'; break;
                case 7: month = 'Aug'; break;
                case 8: month = 'Sept'; break;
                case 9: month = 'Oct'; break;
                case 10: month = 'Nov'; break;
                case 11: month = 'Dec'; break;
            }
            return month;
        }
    },
    watch: {
        page: function() {
            this.reportTimeInterval = '15 min'
        }
    }

});