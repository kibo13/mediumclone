import feedApi from '@/api/feed'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getFeedStart: '[feed] Get feed start',
  getFeedSuccess: '[feed] Get feed success',
  getFeedFailure: '[feed] Get feed failure'
}

export const actionTypes = {
  getFeed: '[feed] Get feed'
}

const mutations = {
  [mutationTypes.getFeedStart](state) {
    state.isLoading = true
    state.date = null
  },

  [mutationTypes.getFeedSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },

  [mutationTypes.getFeedFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getFeed](context, {apiUrl}) {
    context.commit(mutationTypes.getFeedStart)
    return new Promise(resolve => {
      feedApi
        .getFeed(apiUrl)
        .then(response => {
          context.commit(mutationTypes.getFeedSuccess, response.data)
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getFeedFailure)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
