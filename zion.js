/*jshint esversion: 6 */
console.log('connected');

var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        page: 'dashboard', // dashboard, help, settings
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
        fullDate: ''
    },
    created: function(){
        this.loadMainStats();
        this.getCurrentDate();
    },
    methods: {
        loadMainStats: function() {
            console.log("loading stats...");
            var vm = this;
            axios.get("http://192.168.0.90/local/people-counter/.api?export-json&date=20200609&res=24h ").then(response => {
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
            // jul 16 2020
            var today = new Date();
            var day = today.getDate();
            var monthNumber = today.getMonth()
            var year = today.getFullYear();
            var month = this.getMonthToString(monthNumber);
            
            this.fullDate = `${month} ${day} ${year}`;
            // console.log('report date: ', this.reportDate);
            console.log(`full ${year} ${day} ${month}`);

        },
        DateSelected: function() {
            let year1 = this.reportDate.substr(0,4);
            let month1 = this.reportDate.substr(5,2);
            console.log(`month "${month1}" `, month1.length)
            var monthString = this.getMonthToString(Number(month1));
            console.log('month string val ', monthString)
            let day1 = this.reportDate.substr(8,2);
            console.log('month: ', month1);
            this.fullDate =  `${monthString} ${day1} ${year1}`;
            console.log(this.fullDate);
            console.log('monthstring', monthString);
        },
        getMonthToString: function(monthNumber) {
            console.log('in month function: ', monthNumber);
            var month = '';
            switch(monthNumber) {
                case 0:
                    month = 'Jan'; 
                    break;
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
            console.log('month: ', month);
            return month;
        }
    }

});