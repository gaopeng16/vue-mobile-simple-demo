const AnimationFrame = {
  requestAnimationFrame: window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (callback) {
      //为了使setTimteout的尽可能的接近每秒60帧的效果
      window.setTimeout(callback, 1000 / 60)
    },
  cancelAnimationFrame: window.cancelAnimationFrame ||
    Window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.msCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    function (id) {
      //为了使setTimteout的尽可能的接近每秒60帧的效果
      window.clearTimeout(id)
    }
}
export default AnimationFrame
// 简化版
window.requestAnimationFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function (callback) {
    //为了使setTimteout的尽可能的接近每秒60帧的效果
    window.setTimeout(callback, 1000 / 60)
  }

window.cancelAnimationFrame = window.cancelAnimationFrame ||
  Window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.msCancelAnimationFrame ||
  window.oCancelAnimationFrame ||
  function (id) {
    //为了使setTimteout的尽可能的接近每秒60帧的效果
    window.clearTimeout(id)
  };

(function () {
  var lastTime = 0
  var vendors = ['webkit', 'moz', 'ms', 'o']
  for (var x = 0; x < vendors.length; ++x) {
    if (window.requestAnimationFrame && window.cancelAnimationFrame) {
      break
    }
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime()
      var timeToCall = Math.max(0, 16 - (currTime - lastTime))
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall)
      }, timeToCall)
      lastTime = currTime + timeToCall
      return id
    }
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id)
    }
  }
}())
