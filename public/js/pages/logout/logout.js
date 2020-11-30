export default class Logout {
  constructor(onsubmit) {
    this.onsubmit = onsubmit;
  }

  render() {
    this.onsubmit();
  }
}