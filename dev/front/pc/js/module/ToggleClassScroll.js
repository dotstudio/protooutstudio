const OPTION = {
    minDiff: 1,
    defaultSpeed: 0.1,
    defaultRate: 1,
    defaultDisplacement: 1
};

class ToggleClassScroll {
    constructor(target, option){
        this.$target = $(target);
        this.$window = $(window);
        this.option = $.extend({}, OPTION, option);
        this.winH = window.innerHeight;
        this.init();
    }

    /**
     * 初期化
     */
    init(){
        this.setDataArray();
        this.update(this.$window.scrollTop());
    }

    /**
     * Data Arrayを用意する
     */
    setDataArray(){
        this.dataArray = [];
        for(let i = 0; i < this.$target.length; i++){
            let _$target = this.$target.eq(i);
            this.dataArray.push(this.getTargetData(_$target));
        }
    }

    /**
     * ターゲットのデータを取得する
     * @param $target
     * @returns {{$target: *, isMove: boolean, startOffsetTop: Window, currentPosition: number, endPosition: number, speed: *, moveRate: *, distance: number, height: *}}
     */
    getTargetData($target){
        let data = {
            $target: $target,
            isMove: false,
            startOffsetTop: $target.offset().top + 300,
            speed: $target.data('speed') || this.option.defaultSpeed,
            moveRate: $target.data('rate') || this.option.defaultRate,
            displacement: $target.data('displacement') || this.option.defaultDisplacement,
            distance: 0,
            height: $target.height()
        };
        data.basePosition = (data.startOffsetTop - (this.winH) + data.displacement)  * data.moveRate * -1;
        data.currentPosition = 0;
        data.endPosition = data.startOffsetTop * data.moveRate;
        return data;
    }

    /**
     * データをアップデート
     * @param scroll {number} スクロールの値
     */
    update(scroll){
        this.dataArray.forEach((v, i) => {
            this.updateTarget(scroll, i);
        });
    }

    /**
     * ターゲットのアップデート
     * @param index {number} インデックスの値を渡す
     */
    updateTarget(scroll, index){
        let data = this.dataArray[index];

        data.endPosition = Math.ceil(scroll * data.moveRate) + data.basePosition;

        if(data.endPosition > 0){
            data.$target.addClass('is-show');
            this.dataArray.splice(index, 1);
        }
    }
    resize(){
        this.winH = window.innerHeight;
        this.setDataArray();
    }
    destroy(){

    }
}

export default ToggleClassScroll;
