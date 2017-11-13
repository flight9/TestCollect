import * as type from './mutations_types.js'
import { stoResults } from 'api/storage'

export default {
  [type.ADDRESULT] (state, obj) {
    state.newid++
    obj.id = state.newid
    state.results.unshift(obj)
    stoResults.set(state)
  },
  [type.DELRESULTS] (state, obj) {
    if (obj instanceof Array) {
      obj.forEach(function (id) {
        state.posts.some(function (d, index, theArray) {
          if (id === d.id) {
            theArray.splice(index, 1)
            return true
          }
        })
      })
      stoResults.set(state)
    }
  },
  [type.CLEARRESULTS] (state, obj) {
    state.results = []
    state.newid = 0
    stoResults.clear()
  }
}
