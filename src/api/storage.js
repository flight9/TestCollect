const Storage = function (item) {
  this.get = function () {
    return localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : ''
  }
  this.set = function (obj) {
    localStorage.setItem(item, JSON.stringify(obj))
  }
  this.clear = function () {
    localStorage.removeItem(item)
  }
}

export const stoResults = new Storage('results')
