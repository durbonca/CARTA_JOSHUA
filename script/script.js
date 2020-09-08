var app = new Vue({

    el: "#app",
    data: {
        seen_food: true,
        seen_cool: false,
        seen_beer: false,
        seen_no_alcohol: false,
        seen_alcohol: false,
        seen_hot: false
    },
    methods: {
        menu_food: function() {
            if (!this.seen_food) {
                this.seen_food = true
                this.seen_hot = false
                this.seen_beer = false
                this.seen_alcohol = false
                this.seen_no_alcohol = false
                this.seen_cool = false
            }
        },
        menu_cool: function() {
            if (!this.seen_cool) {
                this.seen_food = false
                this.seen_hot = false
                this.seen_beer = false
                this.seen_alcohol = false
                this.seen_no_alcohol = false
                this.seen_cool = true
            }
        },
        menu_hot: function() {
            if (!this.seen_hot) {
                this.seen_food = false
                this.seen_hot = true
                this.seen_beer = false
                this.seen_alcohol = false
                this.seen_no_alcohol = false
                this.seen_cool = false
            }
        },
        menu_alcohol: function() {
            if (!this.seen_alcohol) {
                this.seen_food = false
                this.seen_hot = false
                this.seen_beer = false
                this.seen_alcohol = true
                this.seen_no_alcohol = false
                this.seen_cool = false
            }
        },
        menu_no_alcohol: function() {
            if (!this.seen_no_alcohol) {
                this.seen_food = false
                this.seen_hot = false
                this.seen_beer = false
                this.seen_alcohol = false
                this.seen_no_alcohol = true
                this.seen_cool = false
            }
        },
        menu_beer: function() {
            if (!this.seen_beer) {
                this.seen_food = false
                this.seen_hot = false
                this.seen_beer = true
                this.seen_alcohol = false
                this.seen_no_alcohol = false
                this.seen_cool = false
            }
        },
    }

})