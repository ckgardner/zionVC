/*jshint esversion: 8 */
//console.log('connected');

var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        page: 'dashboard', // dashboard, reports, fileTransfer, ipAddress, help
        drawer: false,
        visitorInPeople: "",
        visitorOutPeople: "",
        dailyTotalPeople: '',
        occupancyPeople: '',
        reportTimeIntervalList: ['15 min', '1 hour', '24 hour total'],
        reportTimeInterval: '15 min',
        currentIP: "190.168.1.90",
        stateArrowImage: 'icons/downArrow.png',
        DatePickerPopUp: false,
        reportDate: '',
        tableDate: '',
        fullDate: '',
        date: '',
        MinuteHeaders: [
            { text: 'Time', align: 'start', value: 'time' },
            { text: 'In', value: 'peopleIn'},
            { text: 'Out', value: 'peopleOut'}
        ],
        HourHeaders: [
            { text: 'Time', align: 'start', value: 'time' },
            { text: 'In', value: 'peopleIn'},
            { text: 'Out', value: 'peopleOut'}
        ],
        DayHeaders: [
            { text: 'Day', align: 'start', value: 'day' },
            { text: 'In', value: 'peopleIn'},
            { text: 'Out', value: 'peopleOut'}
        ],

        minuteTimes: [],
        HourTimes: [],
        DayTimes: [],
    },
    created: function(){
        this.getCurrentDate();
        this.loadMainStats();
    },
    methods: {
        loadMainStats: async function() {
            console.log("loading stats...");
            var url = "http://192.168.0.90/local/people-counter/.api?export-json&date=" + this.currentDate + "&res=24h";
            await $.get( url, function( ) {},'jsonp')
            .then(response => {
                var Data = response.data;
                console.log(Data);
                for (var i in Data){
                    var peopleIn = Data[i][0];
                    var peopleOut = Data[i][1];                    
                    this.visitorInPeople = peopleIn;
                    this.visitorOutPeople = peopleOut;
                    this.dailyTotalPeople = peopleIn + peopleOut;
                    this.occupancyPeople = peopleIn - peopleOut;
                    this.DayTimes.timeIn = peopleIn;
                    this.DayTimes.timeout = peopleOut;
                    console.log(this.visitorInPeople, this.visitorOutPeople);
                }
            })
            .done(function() {
                console.log( "success" );
            })
            .fail(function() {
                console.log( "error" );
            });
        },
        reportsLoad: async function(){
            console.log("Loading with new date", this.date);
            this.DayTimes =[];
            this.HourTimes = [];
            this.minuteTimes = [];
            let hour = 12;
            let min = 0;
            let timePass = null;
            let TOD = "AM";
            let url = "http://192.168.0.90/local/people-counter/.api?export-json&date=" + this.date + "&res=15m";
            await $.get( url, function( ) {},'jsonp')
            .then(response => {
                var Data = response.data;
                for (var i in Data){
                    min += 15;
                    if (min == 60){
                        min = 0;
                        hour += 1;
                    }
                    var passingMin = min;
                    if (min == 0){
                        passingMin = "00";
                    }
                    if (hour == 13){
                        hour = 1;
                    }
                    if (hour == 12 && min == 0){
                        if (TOD == "AM"){
                            TOD = "PM";
                        }else{
                            TOD = "AM";
                        }
                    }
                    timePass = hour + ":" + passingMin + " " + TOD;
                    var peopleInPass = Data[i][0];
                    var peopleOutPass = Data[i][1];         
                    this.minuteTimes.push({"time": timePass, "peopleIn": peopleInPass, "peopleOut": peopleOutPass});
                }
            })
            .done(function() {
                console.log( "success" );
            })
            .fail(function() {
                console.log( "error" );
            });

            let hour2 = 1;
            let timePass2 = null;
            let TOD2 = "AM";
            let url2 = "http://192.168.0.90/local/people-counter/.api?export-json&date=" + this.date + "&res=1h";
            await $.get( url2, function( ) {
            },'jsonp').then(response => {
                var Data = response.data;
                for (var i in Data){
                    if (hour2 == 13){
                        hour2 = 1;
                    }
                    if (hour2 == 12){
                        if (TOD2 == "AM"){
                            TOD2 = "PM";
                        }else{
                            TOD2 = "AM";
                        }
                    }
                    timePass2 = hour2 + ":" + "00" + " " + TOD2;
                    hour2 += 1;
                    var peopleInPass = Data[i][0];
                    var peopleOutPass = Data[i][1];         
                    this.HourTimes.push({"time": timePass2, "peopleIn": peopleInPass, "peopleOut": peopleOutPass});
                }
            })
            .done(function() {
                console.log( "success" );
            })
            .fail(function() {
                console.log( "error" );
            });
    
            let timePass3 = null;
            let url3 = "http://192.168.0.90/local/people-counter/.api?export-json&date=" + this.date + "&res=24h";
            await $.get( url3, function( ) {},'jsonp')
            .then(response => {
                var Data = response.data;
                for (var i in Data){
                    timePass3 = this.tableDate;
                    console.log(timePass3);
                    var peopleInPass = Data[i][0];
                    var peopleOutPass = Data[i][1];         
                    this.DayTimes.push({"day": timePass3, "peopleIn": peopleInPass, "peopleOut": peopleOutPass});
                }
                console.log(this.DayTimes);
            })
            .done(function() {
                console.log( "success" );
            })
            .fail(function() {
                console.log( "error" );
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
            var monthNumber = today.getMonth();
            var year = today.getFullYear();
            var month = this.getMonthToString(monthNumber);
            this.fullDate = `${month} ${day}, ${year}`;
            var monthActual = monthNumber + 1;
            if(monthActual < 10){
                monthActual = "0" + monthActual;
            }
            this.tableDate = monthNumber + "/" + day;
            this.date = year.toString()+monthActual.toString()+day.toString();
            this.currentDate = this.date;
            console.log(this.date);
        },
        DateSelected: function() {
            let year1 = this.reportDate.substr(0,4);
            let month1 = this.reportDate.substr(5,2);
            var monthString = this.getMonthToString(Number(month1 -1) );
            let day1 = this.reportDate.substr(8,2);
            this.fullDate =  `${monthString} ${day1}, ${year1}`;
            this.date = year1.toString()+month1.toString()+day1.toString();
            this.tableDate = month1 + "/" + day1;
            console.log(this.date);
            this.reportsLoad();
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
            this.reportTimeInterval = '15 min';
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            window.setInterval(() => {
                this.loadMainStats();
            },10000);
        });
    }

});