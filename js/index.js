function countdown() {
  let now = Date.now()
  let time = '2021-10-01 01:03:14'
  let future = Date.parse(time.replace(/-/g, '/'))
  let diff = future - now
  d.innerHTML = ~~(diff / 1000 / 60 / 60 / 24)
  h.innerHTML = ~~(diff / 1000 / 60 / 60 % 24)
  m.innerHTML = ~~(diff / 1000 / 60 % 60)
  s.innerHTML = ~~(diff / 1000 % 60)
  setTimeout(countdown, 1000)
}

countdown()
