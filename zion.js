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
        occupancyPeople: 42
    },
    methods: {
        sideDrawer: function() {
            this.drawer = ! this.drawer;
        }
    }
});