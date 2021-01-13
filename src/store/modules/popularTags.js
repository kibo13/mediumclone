import popularTagsApi from '@/api/popularTags'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getPopularTagsStart: '[popularTags] Get popular tags start',
  getPopularTagsSuccess: '[popularTags] Get popular tags success',
  getPopularTagsFailure: '[popularTags] Get popular tags failure'
}

export const actionTypes = {
  getPopularTags: '[popularTags] Get popular tags'
}

const mutations = {
  [mutationTypes.getPopularTagsStart](state) {
    state.isLoading = true
    state.date = null
  },

  [mutationTypes.getPopularTagsSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },

  [mutationTypes.getPopularTagsFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getPopularTags](context) {
    context.commit(mutationTypes.getPopularTagsStart)
    return new Promise(resolve => {
      popularTagsApi
        .getPopularTags()
        .then(tags => {
          context.commit(mutationTypes.getPopularTagsSuccess, tags)
          resolve(tags)
        })
        .catch(() => {
          context.commit(mutationTypes.getPopularTagsFailure)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
