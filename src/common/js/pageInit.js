import fastclick from 'fastclick'
import browser from './browser'
export default {
  init({ title = document.title } = {}) {
    browser.setTitle(title)
    this.initFastClick()
  },
  initFastClick() {
    fastclick.attach(document.body)
  }
}
