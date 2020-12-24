import defaultVac from "Img/defaultVac.png";
import defaultRes from "Img/defaultRes.png";
import {convertDate} from "Js/libs/convertDate";
import {responsesStatus} from "Js/libs/constants";
import {chatsListDesktop, chatsListPhone} from "Js/pages/chats/chats";

export const changeAvatar = (user_type, list) => {
  const chatAvatars = document.getElementsByClassName('chat-lists-single__photo');
  const friendDefPhoto = user_type === 'candidate' ? defaultVac : defaultRes;
  if (list) {
    list.forEach((item, i) => {
      const photo = item.avatar ? item.avatar : friendDefPhoto;
      chatAvatars[i].style.background = `no-repeat  0 0/cover url(${photo})`;
    });
  }
  return list;
}

export const changeDate = (list) => {
  if (list) {
    list.forEach( (item) => {
      item.message.date_create = convertDate(item.message.date_create);
      if (item.type==='technical') {
        item.message.response_status = responsesStatus[item.message.response_status];
      }
    })
  }
  return list;
}

export const checkoutChatPages = (chatClass, is_mobile, need_checkout, list) => {
  const chatsList = document.getElementById('chatsList');
  const defaultChat = document.getElementById('defaultChat');
  const singleChat = document.getElementById('singleChat');


  if (is_mobile) {
    if (need_checkout) {
      defaultChat.classList.add('hide');
      chatsList.classList.add('max-width');
      singleChat.classList.add('hide');
    }
    chatsListPhone(chatClass,list, singleChat, chatsList);
  } else {
    if (need_checkout) {
      singleChat.classList.add('hide');
    }
    chatsListDesktop(chatClass,list, defaultChat, singleChat, need_checkout);
  }
}