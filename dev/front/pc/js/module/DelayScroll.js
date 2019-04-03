const OPTION = {
  minDiff: -50,
  defaultRate: 0.5,
  defaultDisplacement: 1,
  defaultDirection: 1
};

class DelayScroll {
  constructor(target, option) {
    this.$target = $(target);
    this.$window = $(window);
    this.option = $.extend({}, OPTION, option);
    this.winH = window.innerHeight;
    this.init();
  }

  /**
   * 初期化
   */
  init() {
    this.setDataArray();
    this.update(this.$window.scrollTop());
  }

  /**
   * Data Arrayを用意する
   */
  setDataArray() {
    this.dataArray = [];
    for (let i = 0; i < this.$target.length; i++) {
      let _$target = this.$target.eq(i);
      this.dataArray.push(this.getTargetData(_$target));
    }
  }

  /**
   * ターゲットのデータを取得する
   * @param $target
   * @returns {{$target: *, isMove: boolean, start: Window, current: number, endPosition: number, speed: *, rate: *, distance: number, height: *}}
   */
  getTargetData($target) {
    let data = {
      $target: $target,
      isMove: false,
      start: $target.offset().top - this.winH - 100,
      rate: $target.data('rate') || this.option.defaultRate,
      direction: $target.data('direction'),
      type: $target.data('type') || null,
      current: 0,
      h: $target.height()
    };
    data.end = data.start + this.winH + data.h + 100;
    data.prog = data.end - data.start;
    data.basePosition = (data.start - this.winH) * data.rate * -1;
    return data;
  }

  /**
   * データをアップデート
   * @param scroll {number} スクロールの値
   */
  update(scroll) {
    this.dataArray.forEach((v, i) => {
      this.updateTarget(scroll, i);
    });
  }

  /**
   * ターゲットのアップデート
   * @param index {number} インデックスの値を渡す
   */
  updateTarget(scroll, index) {
    let data = this.dataArray[index];
    data.isMove = this.juageTarget(scroll, data.start, data.end);
    if (data.isMove) {
      data.current = data.direction ? -(scroll - data.start) * data.rate : (scroll - data.start) * data.rate;
      // console.log(data.current);
      TweenMax.set(data.$target, {
        y: data.current
      });
    }
  }
  juageTarget(scroll, posIn, posOut) {
    return (posIn < scroll && scroll < posOut) ? true : false;
  }
  resize() {
    this.winH = window.innerHeight;
    this.setDataArray();
  }
}

export default DelayScroll;
