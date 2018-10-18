<template >
    <div @keyup.ctrl.83="save" class="textarea">
        <div class="texteditor">
            <div class="titlearea">
                <h1 class="indicator">h1 </h1>
            <div contentEditable="true" class="note-title" @input="updateNoteTitle">
                {{ note[0].title }}
            </div>
            </div>
            <div contentEditable="true" class="text" @input="updateNoteContent">
                {{ note[0].content }}
            </div>
            <div class="tagarea">
                <p>Tags: (separated by comma) (temporary)</p>
                <div contentEditable="true" class="tags" @input="updateNoteTag">
                    {{ note[0].tags.toString() }}
                </div>
                <button @click="deleteNote">Delete</button>
                <button @click="save">Save</button>
            </div>
        </div>
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
            const _id = this.note[0]._id
            this.$store.dispatch('deleteCurrentNote', { _id })
        }
    }
}
</script>

<style scoped>
    .textarea {
        height: 100vh;
        width: 100%;
        padding: 15px;
    }

    .note-title {
        font-size: 25px;
        font-weight: bold;
        color: #4e4e4e;
        padding-left: 5px;
    }

    .titlearea {
        display: flex;
        align-items: center;
    }

    .titlearea > .indicator {
        color: #e1e1e1;
        font-size: 16px;
    }

    .text {
        font-weight: normal;
    }

    .tagarea {
        border-top: 1px solid #e1e1e1;
        position: absolute;
        bottom: 0px;
        left: 400px;
        min-width: calc(100% - 400px);
        padding: 15px;
    }
</style>
