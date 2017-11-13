import * as type from './mutations_types.js'
import { stoResults } from 'api/storage'

export default {
  [type.ADDPOST] (state, obj) {
    state.newid++
    obj.id = state.newid
    state.posts.unshift(obj)
    stoResults.set(state)
  }
}
