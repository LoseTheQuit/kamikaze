'use strict';

console.log("OUTSIDE alloyController");

angular.module("mainModule")
    .controller('alloyController', function ($scope, instagramService, twitterService, sidebarService, alloy) {

        console.log("INSIDE alloyController");

        $scope.onSwipeLeft = function (ev) {
            alert('You swiped left!!');
        };
        $scope.onSwipeRight = function (ev) {
            alert('You swiped right!!');
        };


        $scope.windowInfoWithToken = instagramService.getWindowInfo();
        $scope.getTwitterDropDownNumberIndex = sidebarService.getTwitterDropDownNumberIndex();

        $scope.getIgandTwitterApiData = function () {

            if ($scope.inputSearchTweetsAndInstagramQuery.length >= 1) {

                instagramService.tapInstaExtended($scope.windowInfoWithToken, $scope.inputSearchTweetsAndInstagramQuery, function (response) {

                    // console.info(response.data);
                    $scope.instagramData = response.data;

                });

                alloy.getSpotifyDATA({

                    q: $scope.inputSearchTweetsAndInstagramQuery,
                    count: 20

                }, function (response) {

                    $scope.spotifyData = response.data;

                    console.log("_________________________________");
                    console.log("SPOTIFY response.DATA: ");
                    console.info(response.data);
                    console.log("SPOTIFY response: ");
                    console.info(response);
                    console.log("_________________________________");

                });

                sidebarService.getTwitterData($scope.inputSearchTweetsAndInstagramQuery, function (response) {

                    // for user timelines   var tweets = response;
                    // for tags var tweets = response.data;
                    var tweets = response;
                    if (sidebarService.getTwitterDropDownNumberIndex() === 1) {

                        tweets = response;
                    } else {
                        tweets = response.data;

                    }
                    console.log(tweets);

                    $scope.twitterData = tweets;

                });
            }

        };

        $scope.tagQuery = function (instaQuery) {

            instagramService.tapInstaExtended($scope.windowInfoWithToken, instaQuery, function (response) {

                $scope.instagramData = response.data;

            });

        };

        $scope.twitterTagQuery = function (twitterTagSearch) {
            sidebarService.setTwitterDropDownNumberIndex(2);

            sidebarService.getTwitterData(twitterTagSearch, function (response) {

                // for user timelines   var tweets = response;
                // for tags var tweets = response.data;

                var tweets = response;
                tweets = response.data;

                console.log("_________________________________");
                console.log("twitterTagQuery response.DATA: ");
                console.info(response.data);
                console.log("_________________________________");
                $scope.twitterData = tweets;

            });

        };

        $scope.hideThisDiv = false;

        $scope.customOverFlow = function (value) {

            if ($scope.hideThisDiv) {

                return {
                    "overflow": 'auto'
                }

            } else {

                return {
                    "overflow": 'hidden'
                }

            }
        }

        $scope.changeThisSearchTweets = function () {

            alloy.getTwitterAndInstagramDataByTags({

                q: $scope.inputSearchTweetsAndInstagramQuery,
                count: 25

            }, function (response) {

                var tweets = response.data;
                console.log(tweets);
                $scope.twitterData = tweets;
            });

        };

        twitterService.getTwitter(function (response) {

            var tweets = response.data;
            console.log(tweets);
            console.log($scope.hideThisDiv);
            $scope.twitterData = {};
            $scope.twitterData.data = tweets;

        });

        alloy.getSpotify($scope.windowInfoWithToken, function (response) {

            $scope.spotifyData = response.data;
            console.info('getSPOTIFY:');
            console.info(response.data);
            console.info('getSPOTIFY:');


        });

        instagramService.tapInsta($scope.windowInfoWithToken, function (response) {

            $scope.instagramData = response.data;

            // debugger;

            if (!response.data.access_token == undefined) {

                $scope.instagramDataWithToken = response.data.access_token;

            } else {
                $scope.hideThisDiv = true;
            }

            console.warn('tapInsta:');
            console.info(response.data);
            console.warn('tapInsta:');

        });


    });