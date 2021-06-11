export const setCookie = (name, value, daysTillExpiry) => {
  const d = new Date()
  d.setTime(d.getTime() + (daysTillExpiry * 24 * 60 * 60 * 1000))
  const expires = 'expires=' + d.toUTCString()
  document.cookie = `${name}=${value};${expires};path=/`
}

export const getCookie = (cname) => {
  const name = cname + '='
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i]
    console.log(`cookie: ${cookie}`)
    while (cookie.charAt(0) === ' ') {
      // wtf is this
      cookie = cookie.substring(1)
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length)
    }
  }
  return ''
}
