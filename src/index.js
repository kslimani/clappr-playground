// Application bundle file
import Clappr from 'clappr'
import ChromecastPlugin from 'clappr-chromecast-plugin'

const $ = Clappr.$

const BUNNY = 'http://www.streambox.fr/playlists/x36xhzz/x36xhzz.m3u8'
const JELLY = 'http://wowza.jwplayer.com/live/jelly.stream/playlist.m3u8'

let config = {
  parent: '.player',
  autoPlay: !Clappr.Browser.isMobile,
  disableKeyboardShortcuts: true,
  disableVideoTagContextMenu: true,
  autoSeekFromUrl: false,
  width: 640,
  height: 360,
}

// Configure playback
config.playback = {
  playInline: true,
  recycleVideo: true,
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

function requestSource(cb) {
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

let ajaxButton = $('<button>')
  .text('zap!')
  .css({ width: 640, height: 100 })
  .on('click', function() {
    player.consent()
    requestSource(function(src){
      player.stop() // Will load media in Chromecast (if session initialized)
      player.load(src, null, true)
    })
  })

let timerButton = $('<button>')
  .text('zap in 3 seconds!')
  .css({ width: 640, height: 100 })
  .on('click', function() {
    player.consent()
    setTimeout(function() {
      player.stop()
      player.load(JELLY, null, true)
    }, 3000)
  })

$('.app')
  .append(ajaxButton)
  .append(timerButton)
