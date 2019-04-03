const OPTION = {
    defaultTriggerPosition: 1,
    defaultTriggerOffset: 100
};

class SwitchScroll {
    constructor(target = '.js-switch-scroll', option){
        this.option = $.extend({}, OPTION, option);
        this.$window = $(window);
        this.$target = $(target);
        this.isActiveAll = false;

        this.onResize = () => this._onResize();

        this.init();
    }
    init(){
        this.setWindowLength();
        this.setDataArray();

        this.$window.on('resize', this.onResize);
    }
    setWindowLength(){
        this.windowWidth = this.$window.width();
        this.windowHeight = this.$window.height();
    }
    setDataArray(){
        this.dataArray = [];
        for(let i = 0; i < this.$target.length; i++){
            this.dataArray.push(this._getDataArray(i));
        }
    }
    _getDataArray(index){
        let $target = this.$target.eq(index);
        let data = {
            $target: $target,
            offsetTop: $target.offset().top,
            triggerPosition: $target.data('trigger-position') || this.option.defaultTriggerPosition,
            triggerOffset:  $target.data('trigger-offset') || this.option.defaultTriggerOffset,
            isActive: false
        };
        return data;
    }
    update(scroll){
        if(this.isActiveAll) return;
        let _isActiveAll = true;

        this.dataArray.forEach((v, i) => {
            if(v.isActive) return;
            if(this.isTargetActive(scroll, v)){
                this.dataArray[i].isActive = true;
                v.$target.addClass('is-active');
            }else{
                _isActiveAll = false;
            }
        });

        this.isActiveAll = _isActiveAll;
    }
    isTargetActive(scroll, data){
        if(data.offsetTop < scroll + this.windowHeight * data.triggerPosition + data.triggerOffset){
            return true;
        }
        return false;
    }
    _onResize(){
        this.setWindowLength();
        this.setDataArray();
    }
    destroy(){
        this.$window.off('resize', this.onResize);
    }
};

export default SwitchScroll;
