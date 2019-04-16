const gpEffect = {
  /**
   * 匀速运动
   * @param t 当前时间time=null,每隔10ms走一次 time+=10
   * @param b 起始值begin
   * @param c 总距离change
   * @param d 总时间duration
   * @returns {*} 返回元素所在的位置
   * @constructor
   */
  Linear: function (t, b, c, d) {
    return c * t / d + b
  },
  //二次方的缓动（t^2）；
  Quad: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t + b
    },
    easeOut: function (t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b
      return -c / 2 * ((--t) * (t - 2) - 1) + b
    }
  },
  //三次方的缓动（t^3）
  Cubic: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t * t + b
    },
    easeOut: function (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t + b
      return c / 2 * ((t -= 2) * t * t + 2) + b
    }
  },
  //四次方的缓动（t^4）；
  Quart: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t * t * t + b
    },
    easeOut: function (t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b
    }
  },
  //5次方的缓动（t^5）；
  Quint: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b
    },
    easeOut: function (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
    }
  },
  //正弦曲线的缓动（sin(t)）
  Sine: {
    easeIn: function (t, b, c, d) {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
    },
    easeOut: function (t, b, c, d) {
      return c * Math.sin(t / d * (Math.PI / 2)) + b
    },
    easeInOut: function (t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
    }
  },
  //指数曲线的缓动（2^t）；
  Expo: {
    easeIn: function (t, b, c, d) {
      return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
    },
    easeOut: function (t, b, c, d) {
      return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
    },
    easeInOut: function (t, b, c, d) {
      if (t == 0) return b
      if (t == d) return b + c
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
    }
  },
  //圆形曲线的缓动（sqrt(1-t^2)）；
  Circ: {
    easeIn: function (t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
    },
    easeOut: function (t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
    }
  },
  //指数衰减的正弦曲线缓动；
  Elastic: {
    easeIn: function (t, b, c, d, a, p) {
      if (t == 0) return b
      if ((t /= d) == 1) return b + c
      if (!p) p = d * .3
      if (!a || a < Math.abs(c)) {
        a = c
        var s = p / 4
      } else {
        var s = p / (2 * Math.PI) * Math.asin(c / a)
      }
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
    },
    easeOut: function (t, b, c, d, a, p) {
      if (t == 0) return b
      if ((t /= d) == 1) return b + c
      if (!p) p = d * .3
      if (!a || a < Math.abs(c)) {
        a = c
        var s = p / 4
      } else {
        var s = p / (2 * Math.PI) * Math.asin(c / a)
      }
      return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b)
    },
    easeInOut: function (t, b, c, d, a, p) {
      if (t == 0) return b
      if ((t /= d / 2) == 2) return b + c
      if (!p) p = d * (.3 * 1.5)
      if (!a || a < Math.abs(c)) {
        a = c
        var s = p / 4
      } else {
        var s = p / (2 * Math.PI) * Math.asin(c / a)
      }
      if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b
    }
  },
  //超过范围的三次方缓动（(s+1)*t^3 - s*t^2）；
  Back: {
    easeIn: function (t, b, c, d, s) {
      if (s == undefined) s = 1.70158
      return c * (t /= d) * t * ((s + 1) * t - s) + b
    },
    easeOut: function (t, b, c, d, s) {
      if (s == undefined) s = 1.70158
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
    },
    easeInOut: function (t, b, c, d, s) {
      if (s == undefined) s = 1.70158
      if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b
      return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b
    }
  },
  //指数衰减的反弹缓动。
  Bounce: {
    easeIn: function (t, b, c, d) {
      return c - gpEffect.Bounce.easeOut(d - t, 0, c, d) + b
    },
    easeOut: function (t, b, c, d) {
      if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b
      } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b
      } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b
      } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b
      }
    },
    easeInOut: function (t, b, c, d) {
      if (t < d / 2) {
        return gpEffect.Bounce.easeIn(t * 2, 0, c, d) * .5 + b
      } else {
        return gpEffect.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b
      }
    }
  }
}
/**
 * @type {boolean} true:标准浏览器，false说明当前的浏览器是IE6~8
 */
const flag = 'getComputedStyle' in window
/**
 * 获取dom元素的样式
 * @param attr
 */
export const getStyle = (curEle, attr) => {
  let val = null, reg = null
  if (flag) {
    val = window.getComputedStyle(curEle, null)[attr]
  } else {
    if (attr == 'opacity') {
      val = curEle.currentStyle['filter']
      reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i
      val = reg.test(val) ? reg.exec(val[1]) / 100 : 1
    } else {
      val = curEle.currentStyle[attr]
    }
  }
  reg = /^-?\d+(\.\d+)?(px|pt|rem|em)?$/i
  if (reg.test(val)) {
    return parseFloat(val)
  } else {
    return val
  }
}
/**
 * 设置dom元素的样式
 * @param attr
 */
export const setStyle = (curEle, attr, value) => {
  if (attr === 'float') {
    curEle['style']['cssFloat'] = value
    curEle['style']['styleFloat'] = value
    return
  }
  if (attr === 'opacity') {
    curEle['style']['opacity'] = value
    curEle['style']['filter'] = 'alpha(opacity=' + value * 100 + ')'
    return
  }
  var reg = /^(width|height|top|bottom|left|right|((margin|padding)(Top|Bottom|Left|Right)?))$/
  if (reg.test(attr)) {
    if (!isNaN(value)) {//说明是有效数字
      value += 'px'
    }
  }
  curEle['style'][attr] = value
}

/**
 * 设置或者获取css,模仿jQ的css()
 * @param curEle
 */
export const handleCss = (curEle, ...args) => {
  let argTwo = args[0]
  if (typeof argTwo === 'string') {
    if (typeof args[1] === 'undefined') {
      return getStyle(curEle, args[0])
    } else {
      setStyle(curEle, args[0], args[1])
    }
  }
  argTwo = argTwo || 0
  if (argTwo.toString() === '[object Object]') {
    for (let key in argTwo) {
      if (argTwo.hasOwnProperty(key)) {
        setStyle(curEle, key, argTwo[key])
      }
    }
  }
}

/**
 * 实现多方向的运动动画
 * @param curEle 当前动画的元素
 * @param target 目标值{left:xxx,top:xxx}
 * @param duration 当前动画的总时间
 * @effect 运动方式
 *          默认是Linear
 *          如果effect是一个数组["Quad","easeIn"] 相当于是 gpEffect.Quad.easeIn
 * @param callback 执行完动画执行回调
 */
export const gpAnimate = (curEle, target, duration, effect = 'Linear', callback) => {
  window.clearInterval(curEle.timer)

  //判断不同参数的情况
  if (effect instanceof Function) {
    callback = effect
    effect = 'Linear'
  }

  let tempEffect = gpEffect[effect]
  if (Array.isArray(effect)) {
    tempEffect = effect.length >= 2 ? gpEffect[effect[0]][effect[1]] : gpEffect[effect[0]]
  }
  // 根据target获取每一个方向的起始值begin和总距离change
  let begin = {}, change = {}
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      begin[key] = handleCss(curEle, key)
      change[key] = target[key] - begin[key]
    }
  }

  let time = 0
  curEle.timer = setInterval(function () {
    time += 10
    if (time >= duration) {
      handleCss(curEle, target)
      window.clearInterval(curEle.timer)
      // 动画执行完，执行回调,并让回调函数中的this变为当前元素
      callback && callback.call(curEle)
      return
    }
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        let curPos = tempEffect(time, begin[key], change[key], duration)
        handleCss(curEle, key, curPos)
      }
    }
  }, 10)
}
