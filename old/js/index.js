function statistics() {
  let now = Date.now()
  // const marriageDate = '2021-10-02 12:00:00'
  const getLicenseDate = '2021-05-06 12:00:00'
  let past = Date.parse(getLicenseDate.replace(/-/g, '/'))
  let diff = now - past
  d.innerHTML = ~~(diff / 1000 / 60 / 60 / 24)
  h.innerHTML = ~~((diff / 1000 / 60 / 60) % 24)
  m.innerHTML = ~~((diff / 1000 / 60) % 60)
  s.innerHTML = ~~((diff / 1000) % 60)
  setTimeout(statistics, 1000)
}

statistics()
