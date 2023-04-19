import { register } from 'register-service-worker'

/* if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
} */
var isMobile = /Mobi/i.test(window.navigator.userAgent)

if (!isMobile) {
  alert('pc임당')
  register(`${process.env.BASE_URL}firebase-messaging-sw.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
              'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated (registration) {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })

  if (navigator.serviceWorker) {
    const agent = window.navigator.userAgent.toLowerCase()
    let safariYn = false
    switch (true) {
      case agent.indexOf('safari') > -1:
        safariYn = true
        break
    }
    if (!safariYn) {
      navigator.serviceWorker.addEventListener('controllerchange', function () {
        console.log(true)
      })
      navigator.registerProtocolHandler(
        'web+test', // protocal
        '/?source=%s', // url
        { type: 'service-worker', navigation: 'none' } // new option object
      )
      document.addEventListener('swUpdated', function (e) {
        console.log(e)
      })
    }
  }
}
