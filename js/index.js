function statistics() {
  let now = Date.now()
  let time = '2021-10-02 12:00:00'
  let past = Date.parse(time.replace(/-/g, '/'))
  let diff = now - past
  d.innerHTML = ~~(diff / 1000 / 60 / 60 / 24)
  h.innerHTML = ~~(diff / 1000 / 60 / 60 % 24)
  m.innerHTML = ~~(diff / 1000 / 60 % 60)
  s.innerHTML = ~~(diff / 1000 % 60)
  setTimeout(statistics, 1000)
}

statistics()
