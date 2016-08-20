 (function() {
     function PlayerBarCtrl($scope, Fixtures, SongPlayer) {
         this.albumData = Fixtures.getAlbum();
         this.songPlayer = SongPlayer;
         
         SongPlayer.controllerScope = $scope;
         
    
     }
 
     angular
         .module('blocJams')
         .controller('PlayerBarCtrl', ['$scope', 'Fixtures', 'SongPlayer', PlayerBarCtrl]);
 })();