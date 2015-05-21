app.controller('newsFeedController', function ($scope, $location, $route, security, infoService, users) {

    var startPost = '';

    $scope.feedData = [];

    $scope.getNewsFeed = function () {
        users.getNewsFeed(startPost).then(
            function (data) {
                if(data.length > 0) {
                    $scope.feedData = $scope.feedData.concat(data);
                    startPost = data[data.length - 1].id;
                }
            },
            function (error) {
                infoService.error(error.message);
            }
        );
    };


    $scope.getNewsFeed();

    $(window).scroll(function(){

        var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();
        var  scrolltrigger = 1;

        if  ((wintop/(docheight-winheight)) == scrolltrigger) {
            $scope.getNewsFeed();
            console.log('Getting next')
        }
    });

});