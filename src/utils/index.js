import {Toast} from 'mint-ui'
import {MessageBox} from 'mint-ui'

// 轻提示
export function gpToast (message, type) {
  var iconClass = ''
  switch (type) {
    case 'success':
      iconClass = 'iconfont icon-duihao'
      break
    case 'error':
      iconClass = 'iconfont icon-chacha'
      break
    case 'warning':
      iconClass = 'iconfont icon-tanhao'
      break
  }
  Toast({
    message: message,
    iconClass: iconClass
  })
}

//


