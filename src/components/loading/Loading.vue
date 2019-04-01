<template>
  <div class="no-touch" v-if="showLoading">
    <div class="loading-box">
      <div id="vue-loading">
        <div class="loader"></div>
        <div class="text">加载中...</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      showLoading: false,
      showToast: false
    }
  }
</script>

<style scoped>
  .no-touch {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    touch-action: none;
  }

  .loading-box {
    touch-action: none;
    width: 26%;
    height: 10em;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0, 0, 0, .5);
    border-radius: 5px;
  }

  #vue-loading {
    width: 100%;
    height: 100%;
  }

  .text {
    width: 100%;
    position: absolute;
    bottom: 1em;
    left: 0;
    text-align: center;
    color: #ffffff;
    font-size: 14px;
  }

  .loader {
    position: absolute;
    width: 2.5em;
    height: 2.5em;
    transform: rotate(165deg);
  }

  .loader:before, .loader:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 0.5em;
    height: 0.5em;
    border-radius: 0.25em;
    transform: translate(-50%, -50%);
  }

  .loader:before {
    animation: before 2s infinite;
  }

  .loader:after {
    animation: after 2s infinite;
  }

  @keyframes before {
    0% {
      width: 0.5em;
      box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
    }
    35% {
      width: 2.5em;
      box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75), 0 0.5em rgba(111, 202, 220, 0.75);
    }
    70% {
      width: 0.5em;
      box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75), 1em 0.5em rgba(111, 202, 220, 0.75);
    }
    100% {
      box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
    }
  }

  @keyframes after {
    0% {
      height: 0.5em;
      box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
    }
    35% {
      height: 2.5em;
      box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75), -0.5em 0 rgba(233, 169, 32, 0.75);
    }
    70% {
      height: 0.5em;
      box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75), -0.5em 1em rgba(233, 169, 32, 0.75);
    }
    100% {
      box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
    }
  }

  /**
   * Attempt to center the whole thing!
   */
  html,
  body {
    height: 100%;
  }

  .loader {
    position: absolute;
    top: calc(50% - 1.25em);
    left: calc(50% - 1.25em);
  }
</style>
