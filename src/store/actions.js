import * as types from './mutation-types'

export const addToCart = ({ commit }, product) => {
  if (product.inventory > 0) {	// 库存大于0的话
    commit(types.ADD_TO_CART, {	// 执行 ADD_TO_CART 带上参数 pid(定义在 cart 和 products 模块中)
      id: product.id
    })
  }
}
