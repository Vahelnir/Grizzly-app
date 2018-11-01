import Axios from 'axios';

const state = {
  tagList: [],
  notesFromTags: [],
  activeNote: [],
  activeTagName: ''
}

const mutations = {
  FETCH_TAGS (state, {data}) {
    state.tagList = data;
  },
  FETCH_FROM_TAG (state, { data }) {
    state.notesFromTags = data;
  },
  SET_ACTIVE_NOTE(state, { data }) {
    state.activeNote = data;
  },
  SET_ACTIVE_TAG(state, { tagName }) {
    state.activeTagName = tagName;
  }
}

const actions = {
  fetchTags ({ commit }) {
    Axios.get('http://localhost:3000/tags')
      .then(res => {
        const data = res.data
        commit('FETCH_TAGS', { data })
        return res.data;
      })
      .catch(err => {
        console.log(err)
        return null;
      })
  },
  fetchFromTag({ commit }, {tagName}) {
    return Axios.get(`http://localhost:3000/note/${tagName}`)
    .then(res => {
      const data = res.data;
      commit('FETCH_FROM_TAG', { data })
      console.log(state)
      return res.data;
    })
    .catch(err => {
      console.log(err)
      return null;
    })
  },
  setActiveNoteID({ commit }, {noteID}) {
    const data = state.notesFromTags.filter(obj => {
      return obj._id === noteID
    })
    commit('SET_ACTIVE_NOTE', { data })
  },
  updateCurrentNote({ commit }, {_note}) {
    let data = _note
    Axios.put(`http://localhost:3000/note/${data._id}`, data)
    .then(res => {
        commit('SET_ACTIVE_NOTE', { data })
        return res.data;
      })
      .catch(err => {
        console.log(err)
        return null;
      })
  },
  createNote({ commit }, { tagName }) {
    const data = {
      title: 'An awesome title',
      content: 'Some content',
      tags: [tagName]
    }
    console.log(tagName)
    return Axios.post('http://localhost:3000/note/', data)
    .then(res => {
      console.log(data)
        commit('SET_ACTIVE_NOTE', { data })
        commit('FETCH_FROM_TAG', { tagName })
        console.log(res)
        return res.data;
      })
      .catch(err => {
        console.log(err)
        return null;
      })
  },
  setActiveTag({ commit }, { tagName }) {
    commit('SET_ACTIVE_TAG', { tagName })
  },
  deleteCurrentNote({ commit }, { _id }) {
    const tagName = state.activeTagName;

    Axios.delete(`http://localhost:3000/note/${_id}`)
    .then(res => {
      console.log('es')
    })
    .catch(err => {
      console.log(err);
      return err;
    })  
    return commit('FETCH_FROM_TAG', { tagName })
  }
}

const getters = {
  tag: state => {
    return state.tagList
  },
  note: state => {
    return state.notesFromTags
  },
  activeNote: state => {
    return state.activeNote
  },
  activeTag: state => {
    return state.activeTagName
  }
}


export default {
  state,
  mutations,
  actions,
  getters
}
