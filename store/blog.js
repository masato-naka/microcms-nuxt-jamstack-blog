export const state = () => ({
  blog: []
})

export const getters = {
  list (state) {
    return state.blog
  }
}

export const mutations = {
  setList (state, data) {
    state.blog = data
  }
}

export const actions = {
  async fetch ( $config ) {
    return await this.$axios.$get(
      $config.apiRoot + '/blog/',
      {
        headers:{ 'X-API-KEY' : $config.apiKey }
      }      
    )
      .catch(err => {
        console.log(err)
      })
  }
}