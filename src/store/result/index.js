import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'
import { stoResults } from 'src/api/storage'

const state = stoResults.get() || {
  results: [
    // {
    //   id: 1,
    //   pm_no: '',
    //   npv: 1,
    //   photo_src: '',
    //   reading: 0,
    //   comment: '',
    //   timestamp: 0
    // }
  ],
  newid: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
