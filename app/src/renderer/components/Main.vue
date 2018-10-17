<template>
  <div id="wrapper">
    <sidebar></sidebar>
    <text-editor></text-editor>
  </div>
</template>

<script>
  import Sidebar from './Parts/Sidebar'
  import TextEditor from './Parts/TextEditor'

  export default {
    name: 'landing-page',
    components: { Sidebar,  TextEditor },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    display: flex;
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    width: 100vw;
  }

  button {
    border: none;
    background: #2d7ac2;
    border-bottom: 1px solid #226099;
    padding: 5px 10px 5px 10px;
    cursor: pointer;
    color: #fafafa;
    font-weight: bold;
    border-radius: 2px;
  }

</style>
