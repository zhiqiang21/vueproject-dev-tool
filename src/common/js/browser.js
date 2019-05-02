function setTitle(title, vm) {
  if (typeof vm === 'object' && vm.setTitle) {
    vm.setTitle({ title })
  } else {
    document.title = title
    const iframe = document.createElement('iframe')
    iframe.style.visibility = 'hidden'
    iframe.style.display = 'none'
    iframe.style.width = '0'
    iframe.style.height = '0'
    iframe.style.border = 'none'
    iframe.src = '//static.99taxis.mobi/pay_intl_passenger/common/static/1px.png'
    iframe.onload = () => {
      setTimeout(() => {
        document.body.removeChild(iframe)
      }, 0)
    }
    document.body.appendChild(iframe)
  }
}

function dynamicSet() {
  const width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth || 0
  let fontSize = (width * 20) / 375

  if (fontSize > 25) {
    fontSize = 25
  }

  if (dynamicSet.cacheWidth === undefined || dynamicSet.cacheWidth !== width) {
    dynamicSet.cacheWidth = width
    document.documentElement.style.fontSize = `${fontSize}px`
  }
}

function setRootFontSize() {
  let count = 5
  dynamicSet()
  const timer = setInterval(() => {
    if (!count) clearInterval(timer)
    dynamicSet()
    count -= 1
  }, 200)
  window.removeEventListener('resize', dynamicSet)
  window.addEventListener('resize', dynamicSet)
}

function getScript(url, cbFn) {
  const sc = document.createElement('script')
  sc.type = 'text/javascript'

  let timeOut = false
  let timer = 0

  function load() {
    if (!this.readyState || /^(loaded|complete)$/.test(this.readyState)) {
      if (!timeOut) {
        clearTimeout(timer)
        cbFn()
      }
      sc.onload = null
      sc.onreadystatechange = null
    }
  }

  sc.onload = load
  sc.onreadystatechange = load

  sc.onerror = () => {
    if (!timeOut) {
      clearTimeout(timer)
      cbFn()
    }
    sc.onerror = null
  }

  sc.src = url

  timer = setTimeout(() => {
    timeOut = true
    cbFn()
  }, 3000)

  document.getElementsByTagName('head')[0].appendChild(sc)
}

export default {
  setTitle,
  setRootFontSize,
  getScript
}
