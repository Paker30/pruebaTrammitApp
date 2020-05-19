VueRangedatePicker.default.install(Vue);

Vue
    .component('counter', {
        props: ['initialCountValue', 'sharedDate'],
        template: '<div id="counter-component">' +
            '<input v-model="sharedDate">'+
            '<vue-rangedate-picker @selected="onDateSelected" :initRange="initRange"></vue-rangedate-picker>' +
            '</div>',
        data: function () {
            return {
                formDate: this.sharedDate,
                initRange: {
                    'start': new Date(),
                    'end': new Date()
                }
            }
        },
        plugins: VueRangedatePicker,
        watch: {
            sharedDate: function (update){
                this.formDate = new Date(update);
            }
        },
        methods: {
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
                scope.date = new Date();

                // Our Vue root instance
                scope.vue = new Vue({
                    el: elem[0].querySelector('[ng-non-bindable]'),
                    data: {
                        sharedDate: scope.date
                    },
                    methods: {
                        updateDate: function (date) {
                            scope.$apply(function () {
                                scope.date = date.start || date.end;
                            });
                        }
                    }
                });

                // Send updates from angular to vue component
                scope.changeDate = function () {
                    scope.vue.sharedDate = scope.date;
                }
            }
        }
    });