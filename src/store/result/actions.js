// import axios from 'axios'
//
// const root = 'https://jsonplaceholder.typicode.com'

export default {
  addResult: ({commit}, param) => commit('ADDRESULT', param),
  delResults: ({commit}, array) => commit('DELRESULTS', array),
  clearResults: ({commit}) => commit('CLEARRESULTS')
  // downPosts: ({commit}, param) => {
  //   axios.get(root + '/posts')
  //     .then((response) => {
  //       console.log(response.status)
  //       let posts = response.data.slice(0, param)
  //       commit('DOWNPOSTS', posts)
  //     })
  // }
}
