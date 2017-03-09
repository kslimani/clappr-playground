// Application bundle file
import Clappr from 'clappr'
import ChromecastPlugin from 'clappr-chromecast-plugin'

const $ = Clappr.$

const BUNNY = 'http://www.streambox.fr/playlists/x36xhzz/x36xhzz.m3u8'
const JWP_JELLY = 'http://wowza.jwplayer.com/live/jelly.stream/playlist.m3u8'

let config = {
  parent: '.player',
  autoPlay: true,
  disableKeyboardShortcuts: true,
  disableVideoTagContextMenu: true,
  autoSeekFromUrl: false,
  width: 640,
  height: 360,
}

// iOS stuff
config.playback = {
  playInline: true,
  airPlay: true,
}

// Add Chromecast support
config.plugins = [ChromecastPlugin]
config.chromecast = {
  appId: '9DFB77C0', // Clappr default app.
  media: {
    type: ChromecastPlugin.None,
    title: 'Live',
  }
}

config.source = BUNNY

let player = new Clappr.Player(config)

let getSource = function(cb) {
  $.ajax({
    type: 'GET',
    url: '/source.json',
    dataType: 'json',
    success: function(data) {
      console.log('data', data)
      cb(data.source)
    }.bind(this),
    error: function(xhr, type) {
      console.log('Request failed!', xhr, type)
      cb('request.failed')
    }
  })
}

let button = $('<button>')
  .text('zap!')
  .css({ width: 640, height: 100 })
  .on('click', function() {
    player.consent()
    getSource(function(src){
      player.load(src, null, true)
    })
  })

$('.app').append(button)

// setTimeout(function() {
//   player.consent()
//   player.load(JWP_JELLY, null, true)
// }, 8000)
