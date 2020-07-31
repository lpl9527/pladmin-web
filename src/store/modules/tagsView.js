/*
    标签视图（导航条上显示的页面视图名称）状态管理*/

const state = {
  visitedViews: [],   //显示的视图标签数组
  cachedViews: []     //缓存的标签视图名称数组
}

//操作state
const mutations = {
  ADD_VISITED_VIEW: (state, view) => {    //添加视图到标签视图中
    //如果已经在其中的不添加
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  DEL_VISITED_VIEW: (state, view) => {    //删除视图列表中指定视图
    //遍历，删除
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  DEL_OTHERS_VISITED_VIEWS: (state, view) => {    //删除指定视图之外的其他视图
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  },
  DEL_ALL_VISITED_VIEWS: state => {   //删除所有的标签
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
    state.visitedViews = affixTags
  },
  UPDATE_VISITED_VIEW: (state, view) => {   //更新指定视图
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  },

  ADD_CACHED_VIEW: (state, view) => {   //添加视图到缓存列表
    //缓存列表中包含此视图名称不添加
    if (state.cachedViews.includes(view.name)) return
    //如果当前视图没有缓存，则添加
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  DEL_CACHED_VIEW: (state, view) => {   //删除缓存列表中指定视图
    for(const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews.splice(index, 1)
        break
      }
    }
  },
  DEL_OTHERS_CACHED_VIEWS: (state, view) => {   //删除指定视图之外的视图缓存
    for (const item of state.cachedViews) {
      if (item === view.name) {
        const index = state.cachedViews.indexOf(item)
        state.cachedViews = state.cachedViews.splice(index, index + 1)
        break
      }
    }
  },
  DEL_ALL_CACHED_VIEWS: state => {    //删除所有缓存视图
    state.cachedViews = []
  }
}

//异步方法
const actions = {
  addView({dispatch}, view) {   //添加视图
    //转发调用其他action
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({commit}, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView({commit}, view) {
    commit('ADD_CACHED_VIEW', view)
  },

  delView({dispatch, state}, view) {    //删除视图
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delVisitedView({commit, state}, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  delCachedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },

  delOthersViews({ dispatch, state }, view) {   //删除视图之外的其他视图
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view)
      dispatch('delOthersCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delOthersVisitedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  delOthersCachedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_VIEWS', view)
      resolve([...state.cachedViews])
    })
  },

  delAllViews({ dispatch, state }, view) {    //删除所有视图
    return new Promise(resolve => {
      dispatch('delAllVisitedViews', view)
      dispatch('delAllCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delAllVisitedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedViews])
    })
  },
  delAllCachedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  },

  updateVisitedView({ commit }, view) {   //更新视图
    commit('UPDATE_VISITED_VIEW', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
