import GMapCore from './GMapCore';
import gMapStyle from './gMapStyle';
import gMapMarker from './gMapMarker';

const OPTION = {
  center: {
    lat: 35.645447,
    lng: 139.701619
  },
  zoom: 20,
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  scrollwheel: false,
  draggable: true,
  disableDoubleClickZoom: true
};

/**
 * ベースとなるクラス
 * @param base
 * @returns {GMapStyle}
 */
class GMap extends gMapStyle(gMapMarker(GMapCore)) {
  constructor(target, option) {
    super();
    this.$window = $(window);
    this.target = document.getElementById(target);
    this.option = $.extend({}, OPTION, option);
    this.map = new google.maps.Map(this.target, this.option);
    this.onResize = () => this._onResize();
    this.init();
  }
  init() {
    this.$window.on('resize', this.onResize);

    this.addMarker('pin');
    this.renderMarker('pin');
  }
  _onResize() {
    let center = this.map.getCenter();
    google.maps.event.trigger(this.map, 'resize');
    this.map.setCenter(center);
  }
  destroy() {
    this.$window.on('resize', this.onResize);
  }
}

export default GMap;
