/**
 * Created by thierryderuyttere on 6/09/15.
 */
angular.module('ScannerCtrl.controller', [])

    .controller("scannerCtrl", function($scope, $cordovaBarcodeScanner, $state, $ionicPopup) {

        $scope.scanBarcode = function() {
            $cordovaBarcodeScanner.scan().then(function(imageData) {
                if(!imageData.cancelled) {
                    displayInfo(imageData, $scope, $ionicPopup, $state);
                    //$state.go('app.download', {downloadUrl: imageData.text}, {location: replace});
                }
                else {
                    console.log("Cancelled");
                    $state.go('app.browse',{}, {location: 'replace'} );
                }
            }, function(error) {
                console.log("An error happened -> " + error);
            });
        };

        $scope.$on('$ionicView.enter', function() {
            console.log("Entered: scannerCtrl");
            $scope.scanBarcode();
        });
    });


function displayInfo(imageData, $scope, $ionicPopup, $state){
    var link;

    var json = JSON.parse((imageData.text).replace(/\\"/g, '"'));
    //console.log(json);
    link = json.link;


    //Show message
    $scope.data = {version: json.appVersion, title: json.title, author: json.author};

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
        template: '<b>Title</b>: {{data.title}}<br/><b>Author</b>: {{data.author}}, <br/><b>Version</b>: {{data.version}}',
        title: 'Do you wish to download this Appy?',
        scope: $scope,
        buttons: [
            { text: 'No' },
            {
                text: '<b>Yes</b>',
                type: 'button-positive',
                onTap: function(e) {
                    console.log("tapped");
                    console.log(link);
                    $state.go('app.download', {downloadUrl: link});
                }
            }
        ]
    });

}
