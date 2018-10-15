<template >
    <div @keyup.ctrl.83="save" class="textarea">
        <div class="texteditor">
            <p>Titre</p>
            <div contentEditable="true" class="title" @input="updateNoteTitle">
                {{ note[0].title }}
            </div>
            <div contentEditable="true" class="text" @input="updateNoteContent">
                {{ note[0].content }}
            </div>
            <p>Tags: (separated by comma)</p>
            <div contentEditable="true" class="tags" @input="updateNoteTag">
                {{ note[0].tags.toString() }}
            </div>
        </div>
        <button @click="deleteNote">Delete</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            modifiedNote : {},
            modifiedNoteTitle: '',
            modifiedNoteContent: '',
            modifiedNoteTag: []
        }
    },
    computed: {
        note: function () {
          return this.$store.getters.activeNote
        }
    },
    methods: {
        save: function () {
            let _note = {...this.note[0]};

            if (this.modifiedNoteContent === '') {
                this.modifiedNoteContent = _note.content;
            }
            if (this.modifiedNoteTitle === '') {
                this.modifiedNoteTitle = _note.title;
            }
            if (this.modifiedNoteTag.length === 0) {
                this.modifiedNoteTag = _note.tags
            }

            _note.title = this.modifiedNoteTitle,
            _note.content = this.modifiedNoteContent,
            _note.tags = this.modifiedNoteTag

            this.$store.dispatch('updateCurrentNote', { _note })
        }, 
        updateNoteContent: function (ev) {
            this.$emit('update', ev.target.innerText);
            this.modifiedNoteContent = ev.target.innerText;
        },
        updateNoteTag: function (ev) {
            this.$emit('update', ev.target.innerText);
            this.modifiedNoteTag = ev.target.innerText.split(',')
        },
        updateNoteTitle: function (ev) {
            this.$emit('update', ev.target.innerText);
            this.modifiedNoteTitle = ev.target.innerText;
        },
        deleteNote: function () {
            let _id = this.note._id
            this.$store.dispatch('deleteCurrentNote', { _id })
        }
    }
}
</script>

<style scoped>
    .textarea {
        height: 100vh;
        width: 100%;
    }
</style>
