<template>
    <div class="box">
        <h3 class="box-title">Error while fetching data</h3>
        <p class="box-content">It seem that we can't get your data :(<br>[DEV ONLY] Go to lveteau/grizzly-app and check instructions. If you think everythink is correct, please open an issue. </p>

    </div>
</template>

<script>
export default {
    name: 'probleme-box'
}
</script>

<style scoped>
    .box {
        width: 60vw;
        height: 70vh;
        position: absolute;
        top: calc(35vw - 50%);
        left: calc(50% - 30vw);
        background: #f1f1f1;
        border: 1px solid #e1e1e1;
        border-radius: 2px;
        padding: 15px;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }
    .box * {
        width: 100%;
    }

    .box-title {
        color: #8f8f8f;
        font-size: 48px;
    }

    .box-content {
        color:#b6b6b6;
    }
</style>
