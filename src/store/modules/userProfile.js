import userProfileApi from '@/api/userProfile'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getUserProfileStart: '[userProfile] Get user profile start',
  getUserProfileSuccess: '[userProfile] Get user profile success',
  getUserProfileFailure: '[userProfile] Get user profile failure'
}

export const actionTypes = {
  getUserProfile: '[userProfile] Get user profile'
}

const mutations = {
  [mutationTypes.getUserProfileStart](state) {
    state.isLoading = true
    state.date = null
  },

  [mutationTypes.getUserProfileSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },

  [mutationTypes.getUserProfileFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getUserProfile](context, {slug}) {
    context.commit(mutationTypes.getUserProfileStart)
    return new Promise(resolve => {
      userProfileApi
        .getUserProfile(slug)
        .then(userProfile => {
          context.commit(mutationTypes.getUserProfileSuccess, userProfile)
          resolve(userProfile)
        })
        .catch(() => {
          context.commit(mutationTypes.getUserProfileFailure)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
