import VideoBase from '../video/VideoBase';
import ScrollCanceler from '../util/ScrollCanceler';


class VideoSP extends VideoBase {
  constructor (option) {
    super(option);
    this.scrollCanceler = new ScrollCanceler();
  }
  init () {
    super.init();
  }
  /**
   * メディアデータの再生を再開することができる状態の時
   * @param e
   * @private
   */
  _onCanplay (e) {
  }

  /**
   * 再生中の時
   * @param e
   * @private
   */
  _onPlay (e) {
    window.scrollTo(0, 0);
    this.scrollCanceler.cancel();
    $('#js-reel, .visual, .index-visual, .l-header, .l-landscape').addClass('is-play');
    $('.l-site-menu-button').addClass('is-none');
  }

  /**
   * 一時停止中の時
   * @param e
   * @private
   */
  _onPause (e) {
    this.scrollCanceler.arrow();
    $('#js-reel, .visual, .index-visual, .l-header, .l-landscape').removeClass('is-play');
    $('.l-site-menu-button').removeClass('is-none');
  }
}

export default VideoSP;