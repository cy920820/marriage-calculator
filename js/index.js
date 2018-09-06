function countdown() {
  let now = Date.now()
  let future = new Date('2021-10-1 00:00:00').getTime()
  let diff = future - now
  d.innerHTML = ~~(diff / 1000 / 60 / 60 / 24)
  h.innerHTML = ~~(diff / 1000 / 60 / 60 % 24)
  m.innerHTML = ~~(diff / 1000 / 60 % 60)
  s.innerHTML = ~~(diff / 1000 % 60)
  setTimeout(countdown, 1000)
}

countdown()
