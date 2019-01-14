// Application bundle file
const $ = Clappr.$
const BUNNY = 'http://www.streambox.fr/playlists/x36xhzz/x36xhzz.m3u8'
const SINTEL = 'https://static.playmedia-cdn.net/resources/sample/h264_sintel_trailer-1080p.mp4'

let config = {
  parent: '.player',
  autoPlay: !Clappr.Browser.isMobile,
  disableKeyboardShortcuts: true,
  disableVideoTagContextMenu: true,
  autoSeekFromUrl: false,
  width: '100%',
  height: '100%',
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
  .addClass('button')
  .text('zap!')
  .on('click', function() {
    player.consent()
    requestSource(function(src){
      player.stop() // Will load media in Chromecast (if session initialized)
      player.load(src, null, true)
    })
  })

let timerButton = $('<button>')
  .addClass('button')
  .text('zap in 3 seconds!')
  .on('click', function() {
    player.consent()
    setTimeout(function() {
      player.stop()
      player.load(SINTEL, null, true)
    }, 3000)
  })

$('.buttons')
  .append(ajaxButton)
  .append(timerButton)
