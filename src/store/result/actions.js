var root = 'https://jsonplaceholder.typicode.com'

import axios from 'axios'
export default {
  addPost: ({commit}, param) => commit('ADDPOST', param),
  downPosts: ({commit}, param) => {
    axios.get(root + '/posts')
      .then((response) => {
        console.log(response.status)
        let posts = response.data.slice(0, param)
        commit('DOWNPOSTS', posts)
      })
  }
}
