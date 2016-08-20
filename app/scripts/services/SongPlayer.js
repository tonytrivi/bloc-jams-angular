(function() {
     function SongPlayer($rootScope, Fixtures) {
         var SongPlayer = {};
         
         /**
         * @desc stores the album
         * @type {Object}
         */
         var currentAlbum = Fixtures.getAlbum();
         
         /**
         * @desc returns the index of a given song
         * @type number
         */
         var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         }
         
         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;
         
         /**
         * @function playSong
         * @scope private
         * @desc Plays a song by playing the currentBuzzObject
         * @param {Object} song
         */
         var playSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.play();
                song.playing = true;
            }
         };
         
         /**
         * @function stopSong
         * @scope private
         * @desc stops a song
         * @param {Object} song
         */
         var stopSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                song.playing = null;
            }
         };
         
         /**
         * @function setSong
         * @scope private
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
             
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                })
            });
        

            SongPlayer.currentSong = song;
        };
         
        /**
        * @desc Tracks the selected song
        * @type {Object}
        */
        SongPlayer.currentSong = null;
         
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
         
        /**
        * @desc Song volume
        * @type {Number}
        */
        SongPlayer.volume = null;
         
        /**
        * @desc Max volume
        * @type {Number}
        */
        SongPlayer.maxVolume = 100;
        
        /**
        * @function SongPlayer.play
        * @scope public
        * @desc Plays a the same song, or a new song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            //second option used when called from player bar
            song = song || SongPlayer.currentSong; 
            
            if (SongPlayer.currentSong !== song) {
                 setSong(song);
                 playSong(song);

            } else if (SongPlayer.currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     playSong(song);
                 }
            }
        };
         
        /**
        * @function SongPlayer.pause
        * @scope public
        * @desc Pauses the playing song
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.stop();
            song.playing = false;
        };
         
        /**
        * @desc subtract song index by 1
        * @type void
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if(currentSongIndex < 0){
                stopSong(SongPlayer.currentSong);
                //currentBuzzObject.stop();
                //SongPlayer.currentSong.playing = null;
            } else {
                //get the new song, set it and play it
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong();
            }
        };
         
        /**
        * @desc adds 1 to song index
        * @type void
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            // last song is reached
            if(currentSongIndex >= currentAlbum.songs.length) {
                stopSong(SongPlayer.currentSong);
                //currentBuzzObject.stop();
                //SongPlayer.currentSong.playing = null;
            } else {
                //get the new song, set it and play it
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong();
            }
        };
         
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
            currentBuzzObject.setTime(time);
            }
        };
         
        /**
        * @function setVolume
        * @desc Set volume of the playing song
        * @param {Number} volume
        */
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
            currentBuzzObject.setVolume(volume);
            }
        };
        
        return SongPlayer;
}
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
