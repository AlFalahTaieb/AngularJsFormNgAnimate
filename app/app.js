var myNinjaApp = angular.module("myNinjaApp", ['ngRoute','ngAnimate']);





myNinjaApp.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {

    //Partie de Routing

    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/home',{
            templateUrl:'views/home.html',
            controller:'NinjaController'
        })
        .when('/contact',{
            templateUrl:'views/contact.html',
            controller:'ContactController'
        })

        .when('/contact-success',{
            templateUrl:'views/contact-success.html',
            controller:'ContactController'
        })



        .when('/directory',{
            templateUrl:'views/directory.html',
            controller:'NinjaController'
        }).otherwise({
        redirectTo:'/home'
    })
}]);

myNinjaApp.directive('randomNinja',[function() {
    return{
        restrict: 'E',
        scope: {
        ninjas:'=',
            title:'='

        },
        template:'<img ng-src="{{ninjas[random].thumb}}">',
        controller:function ($scope) {
        $scope.random= Math.floor(Math.random()*5);
        }

    };
}]);

myNinjaApp.controller('NinjaController',['$scope','$http', function($scope,$http){


    $scope.removeNinja=function (ninja) {
        var removedNinja=$scope.ninjas.indexOf(ninja);
        $scope.ninjas.splice(removedNinja,1);
    }

    $scope.addNinja=function () {
        $scope.ninjas.push({
            name: $scope.newninja.name,
            belt: $scope.newninja.belt,
            available:true
        });

        $scope.newninja.name ="";
        $scope.newninja.belt ="";


    };

    $scope.removeAll=function(){
        $scope.ninjas=[];

    }



$http.get('data/ninjas.json').sucess(function (data) {
    $scope.ninjas=data;
})
}]);

myNinjaApp.controller('ContactController',['$scope','$location',function ($scope,$location) {
    $scope.sendMessage=function () {
    $location.path('/contact-success')
    };
}]);
