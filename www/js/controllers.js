angular.module('starter.controllers', [])

    .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };
    })


    .controller("scannerCtrl", function($scope, $cordovaBarcodeScanner, $state, $timeout, $route) {


        // console.log("Starting scan...");
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            $state.go('app.download', {downloadUrl: imageData.text});

        }, function(error) {
            console.log("An error happened -> " + error);
        });

    })

    .controller("downloadCtrl", function($scope, $stateParams,  $cordovaFileTransfer, $ionicPopup, $timeout) {

        var url = $stateParams.downloadUrl;
        var targetPath = cordova.file.documentsDirectory + "testImage.png";
        var trustHosts = true;
        var options = {};

        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
            .then(function(result) {
                // Success!
                var progressPopup = $ionicPopup.alert({
                    title: 'Download finished',
                    template: 'The appy has been downloaded!'
                });
                progressPopup.then(function(res) {
                    console.log('Accepted');
                    // Send user to Appy

                });

            }, function(err) {
                // Error
                alert("Error");
            }, function (progress) {
                $timeout(function () {
                    // Show progress
                    $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                })
            });
    })

    .controller("storeCtrl", function($scope) {
        $scope.test = 3;
    });
