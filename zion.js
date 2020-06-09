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

        currentIP: "190.168.1.90",
    },
    created: function(){
        this.loadStats();
    },
    methods: {
        loadStats: function() {
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
    }
});