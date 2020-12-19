
const TIMEOUT = 3000;

let intervalId = null;


export const startMessPolling = () => {
  if (intervalId) {
    return;
  }

  intervalId = setInterval(() => {


  }, TIMEOUT);
};

export const stopMessPolling = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

export const initMessPolling = (path) => {
  if (path==='/chats') {
    startMessPolling();
  } else {
    stopMessPolling();
  }
};
