
import ElementUI from 'element-ui';
export default {
  myMessage(message) {

    ElementUI.Message({
      message: message.message,
      center: true,
      type: message.type,
      offset: 100
    });
  }
}

