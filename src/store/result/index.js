import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'
import { stoResults } from 'src/api/storage'

const state = stoResults.get() || {
  results: [
    // {
    //   id: 1,
    //   pm_no: '',
    //   npv: '',
    //   photo_src: '',
    //   reading: 0,
    //   comment: ''
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
