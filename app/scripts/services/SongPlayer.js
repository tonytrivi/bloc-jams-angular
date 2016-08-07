(function() {
     function SongPlayer() {
         var SongPlayer = {};
         
         /**
         * @desc Tracks the selected song
         * @type {Object}
         */
         var currentSong = null;
         
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
                currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
        };
        
        /**
        * @function SongPlayer.play
        * @scope public
        * @desc Plays a the same song, or a new song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
             if (currentSong !== song) {
                 setSong(song);
                 playSong(song);

            } else if (currentSong === song) {
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
             currentBuzzObject.stop();
             song.playing = false;
        };
        
        return SongPlayer;
}
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
})();
