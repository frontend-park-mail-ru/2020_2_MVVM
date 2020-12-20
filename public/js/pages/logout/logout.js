export default class Logout {
  constructor(onsubmit) {
    this.onsubmit = onsubmit;
  }

  render() {
    const notePopup = document.getElementById('notes-list');
    notePopup.innerHTML = '';
    this.onsubmit();
  }
}