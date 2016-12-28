function http(options) {

  const paserJson = (dataString) => JSON.parse

  const parseString = (json) => JSON.stringify

  
  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest()
    xhr.open(options.method, options.url)

    function ResponseError(status, message) {
      this.status = status
      this.message = message
    }

    function addHeaders(headers) {
      if (headers) {
        Object.keys(headers).forEach(function(key) {
          xhr.setRequestHeader(key, headers[key])
        })
      }
    }

    xhr.onload = function onload() {
      if (this.status >= 200 && this.status < 300) {
        return resolve(paserJson(xhr.response))
      }
      return reject(new ResponseError(this.status, xhr.statusText))
    }

    xhr.onerror = function onerror() {
      return reject(new ResponseError(this.status, xhr.statusText))
    }

    addHeaders(options.headers)
    xhr.send(parseString(options.data))
  })
}
