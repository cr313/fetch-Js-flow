importScripts('/node_modules/chai/chai.js')
importScripts('/node_modules/mocha/mocha.js')

mocha.setup('tdd')
self.assert = chai.assert

importScripts('/node_modules/promise-polyfill/promise.js')
importScripts('/node_modules/abortcontroller-polyfill/dist/abortcontroller-polyfill-only.js')
importScripts('/dist/fetch.umd.js')
importScripts('/test/test.js')

function title(test) {
  return test.fullTitle().replace(/#/g, '')
}

function reporter(runner) {
  runner.on('pending', function(test) {
    self.postMessage({name: 'pending', title: title(test)})
  })

  runner.on('pass', function(test) {
    self.postMessage({name: 'pass', title: title(test)})
  })

  runner.on('fail', function(test, err) {
    self.postMessage({
      name: 'fail',
      title: title(test),
      message: err.message,
      stack: err.stack
    })
  })

  runner.on('end', function() {
    self.postMessage({name: 'end'})
  })
}

mocha.reporter(reporter).run()
