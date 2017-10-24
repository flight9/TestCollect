import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state
// 格式: [{ id, quantity }]
const state = {
  added: [],
  checkoutStatus: null
}

// getters
const getters = {
  checkoutStatus: state => state.checkoutStatus
}

// actions
const actions = {
  checkout ({ commit, state }, products) {	//这里 products 是带具体名称/价格/数量的区别 state.added 是不带名称等的。
    const savedCartItems = [...state.added]
    commit(types.CHECKOUT_REQUEST)
    shop.buyProducts(		//模拟异步操作(可能成功也可能失败)
      products,
      () => commit(types.CHECKOUT_SUCCESS),
      () => commit(types.CHECKOUT_FAILURE, { savedCartItems })
    )
  }
}

// mutations
const mutations = {
  [types.ADD_TO_CART] (state, { id }) {
    state.lastCheckout = null 	//lastCheckout 应该为 checkoutStatus
    const record = state.added.find(p => p.id === id)	//找到购物车里之前有没有这个 pid
    if (!record) {		//如果没有
      state.added.push({
        id,
        quantity: 1
      })
    } else {			//如果有
      record.quantity++
    }
  },

  [types.CHECKOUT_REQUEST] (state) {
    // 清空 cart 了
    state.added = []
    state.checkoutStatus = null
  },

  [types.CHECKOUT_SUCCESS] (state) {
    state.checkoutStatus = 'successful'
  },

  [types.CHECKOUT_FAILURE] (state, { savedCartItems }) {
    // rollback to the cart saved before sending the request
	// 把购物车的 added 数据恢复回来
    state.added = savedCartItems
    state.checkoutStatus = 'failed'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
