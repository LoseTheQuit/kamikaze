'use strict';

console.log("OUTSIDE twitterService");

angular.module("mainModule")
    .service('twitterService', function ($http) {

        console.log("INSIDE twitterService");

        this.getTwitter = function (callback) {

            $http({
                url: '/userTimeLineQuery',
                method: "POST",
                data: {
                    screen_name: 'twitter',
                    count: 10
                }
            })

            .then(callback);

        };

    });