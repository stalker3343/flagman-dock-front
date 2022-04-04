export const state = () => {
  return {}
}

export const mutations = {
  SET_STATES(state, payload) {
    const keys = Object.keys(payload)
    keys.forEach((key) => {
      state[key] = payload[key]
    })
  },
}

export const actions = {
  nuxtClientInit() {},
}

export const getters = {}
