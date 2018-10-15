<template>
  <div class="d-flex">
    <div class="dark-bg">
      <ul class="taglist" id="tag">
        <li @click="fetchTag(tag)" class="tag" v-for="tag in tags">
          # {{ tag }}
        </li>
      </ul>
    </div>
    <div class="notes">
      <ul class="taglist" id="tag">
        <li @click="fetchNoteContent(note._id)" class="note" v-for="note in notes">
          # {{ note.title }}
        </li>
        <button @click="createNote">Add a note</button>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeTagName: ''
      }
    },
    computed: {
        tags: function () {
          return this.$store.getters.tag
        },
        notes: function () {
          return this.$store.getters.note
        }
    },
    created: function () {
      this.$store.dispatch('fetchTags')
    },
    methods: {
      fetchTag: function(tagName) {
        this.activeTagName = tagName;
        console.log(this.activeTagName)
        this.$store.dispatch('fetchFromTag', { tagName })
      },
      fetchNoteContent: function(noteID) {
        this.$store.dispatch('setActiveNoteID', { noteID })
      },
      createNote: function () {
        const tagName = this.activeTagName;
        this.$store.dispatch('createNote', { tagName })
      }
    }
  }
</script>

<style scoped>
  .d-flex { 
    display: flex;
  }
  .dark-bg {
    background: #333;
    min-width: 150px;
    height: 100vh;
  }

  .tag {
    color: #e1e1e1;
    cursor: pointer;
    list-style-type: none;
    padding-bottom: 4px;
  }
  
  .taglist {
    padding: 15px;
  }

  .notes { 
    border-right: 1px solid #e1e1e1;
    height: 100vh;
    min-width: 250px;
  }
</style>
