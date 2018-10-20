<template>
  <div class="d-flex">
    <div class="dark-bg">
      <ul class="taglist" id="tag">
        <li @click="fetchTag(tag); selected = index" class="tag" :class="{highlight:index == selected}" v-for="(tag, index) in this.$store.getters.tag">
          <span class="sharp"># </span> {{ tag }}
        </li>
      </ul>
    </div>
    <div class="notes">
      <input class="searchinput" type="text" placeholder="searching">
      <ul class="taglist" id="tag">
        <li @click="fetchNoteContent(note._id); noteSelected = index" class="note" :class="{noteHighlight:index == noteSelected}" v-for="(note, index) in this.$store.getters.note">
          {{ note.title }} <br>
          <p class="note-desc">{{ note.content.substring(0, 20) }}...</p> 
        </li>
        <button class="addnote-btn" @click="createNote">+ Add a note</button>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        selected: undefined,
        noteSelected: undefined
      }
    },
    created: function () {
      this.$store.dispatch('fetchTags')
    },
    mounted: function () {
    },
    methods: {
      fetchTag: function(tagName) {
        this.activeTagName = tagName;
        console.log(this.activeTagName)
        this.$store.dispatch('setActiveTag', { tagName })
        this.$store.dispatch('fetchFromTag', { tagName })
      },
      fetchNoteContent: function(noteID) {
        this.$store.dispatch('setActiveNoteID', { noteID })
      },
      createNote: function () {
        const tagName = this.activeTagName;
        this.$store.dispatch('createNote', { tagName }).then(() => {
          this.fetchTag(this.activeTagName)
          this.$forceUpdate();
        })
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

  .note {
    cursor: pointer;
    list-style-type: none;
    padding-bottom: 4px;
    border-bottom: 1px solid #e1e1e1;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  
  .note-desc {
    color: #adadad;
    font-size: 14px;
    font-weight: normal;
  }

  .taglist {
    padding: 15px;
    font-weight: bold;
  }

  .notes { 
    border-right: 1px solid #e1e1e1;
    height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
    min-width: 250px;
    width: 250px;
  }

  .sharp {
    color: #505050;
  }
  
  .searchinput {
    margin: 15px 0 0 15px;
    width: 85%;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #e1e1e1;
  }

  .addnote-btn {
    margin-top: 15px;
    width: 100%;
  }

  .highlight {
    background: #111;
  }

  .noteHighlight {
    border-left: 5px solid #2d7ac2;
  }
</style>
