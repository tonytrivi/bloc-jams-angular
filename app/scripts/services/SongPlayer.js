(function() {
     function SongPlayer(Fixtures) {
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

            SongPlayer.currentSong = song;
        };
         
        /**
        * @desc Tracks the selected song
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        
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
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                //get the new song, set it and play it
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong();
            }
        };
        
        return SongPlayer;
}
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
})();
