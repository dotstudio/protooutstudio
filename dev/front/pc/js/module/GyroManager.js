const OPTION = {
  throttle: 1000 / 60
};

class _GyroManager {
  constructor(option) {
    this.option = Object.assign({}, OPTION, option);
    this.orientation = {
      x: 0,
      y: 0,
      z: 0
    };
    this.onDeviceorientation = (e) => {
      this._onDeviceorientationHandler(e);
    };
  }
  init() {
    window.addEventListener('deviceorientation', this.onDeviceorientation);
  }
  getGyro() {
    return this.orientation;
  }
  _onDeviceorientationHandler(e) {
    this.orientation = {
      x: e.beta - 45,
      y: e.gamma,
      z: e.alpha
    };
  }
}

let instance = null;

function GyroManager(option) {
  if (!instance) instance = new _GyroManager(option);
  return instance;
}

export default GyroManager;
