VueRangedatePicker.default.install(Vue);

Vue
    .component('counter', {
        props: ['initialCountValue', 'sharedDate'],
        template: '<div id="counter-component">' +
            '<input v-model="initialCountValue">'+
            '<button @click="increment">Increment</button>'+
            '<button @click="decrement">Decrement</button>'+
            '<input v-model="sharedDate">'+
            '<vue-rangedate-picker @selected="onDateSelected"></vue-rangedate-picker>' +
            '</div>',
        data: function () {
            return {
                countValue: this.initialCountValue,
                formDate: this.sharedDate
            }
        },
        plugins: VueRangedatePicker,
        watch: {
            initialCountValue: function (update) {
                this.countValue = update;
                this.countUpdated();
            },
            sharedDate: function (update){
                this.formDate = new Date(update);
            }
        },
        methods: {
            increment: function () {
                this.countValue += 1;
                this.$emit('increment', this.countValue);
            },
            decrement: function () {
                this.countValue -= 1;
                this.$emit('decrement', this.countValue);
            },
            countUpdated: function () {
                this.$emit('countupdated', this.countValue);
            },
            onDateSelected: function (daterange) {
                console.log(daterange);
                this.$emit('selected', daterange);
              }
        }
    });

// Create anglar module + directive wrapper
angular.module('myApp.component', ['ngVue.plugins'])
    .directive('counterWrapper', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, elem) {
                // Set starting simple-counter value
                scope.countValue = 0;
                scope.date = new Date();

                // Our Vue root instance
                scope.vue = new Vue({
                    el: elem[0].querySelector('[ng-non-bindable]'),
                    data: {
                        initialCountValue: scope.countValue,
                        sharedDate: scope.date
                    },
                    methods: {
                        updateCountValue: function (countValue) {
                            scope.$apply(function () {
                                scope.countValue = countValue;
                            });
                        },
                        updateDate: function (date) {
                            scope.$apply(function () {
                                scope.date = date.start || date.end;
                            });
                        }
                    }
                });

                // Send updates from angular to vue component
                scope.incrementCount = function () {
                    scope.vue.initialCountValue = scope.countValue + 10;
                }

                scope.decrementCount = function () {
                    scope.vue.initialCountValue = scope.countValue - 10;
                }
                scope.changeDate = function () {
                    scope.vue.sharedDate = scope.date;
                }
            }
        }
    });