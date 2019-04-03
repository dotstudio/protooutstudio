const OPTION = {
  target: '.js-toggle-scroll',
};

class ToggleScroll{
  constructor(option){
    this.option = $.extend({}, OPTION, option);
    this.$target = $(this.option.target);
    if(!this.option.toggleTarget){
      this.option.toggleTarget = this.option.target;
    }
    this.toggleArray = [];
    this.init();
  }
  init(){
    this.toggleArray = [];
    this.$target.each((index,value) => {
      this.toggleArray.push({
        target: $(value),
        top: $(value).offset().top - window.innerHeight,
        bottom: $(value).offset().top + $(value).height() - window.innerHeight,
        height: $(value).height(),
        state: false
      })
    });
  }
  update(scroll){
    this.toggleArray.forEach((value) => {
      value.state = value.top < scroll && scroll < value.bottom ? true : false;
      if(!value.target.hasClass('is-active') && value.state){
        value.target.addClass('is-active');
        if(this.option.toggleTarget){
          $(this.option.toggleTarget).addClass('is-active');
        }
      }

      if(value.target.hasClass('is-active') && !value.state) {
        value.target.removeClass('is-active');
        if(this.option.toggleTarget){
          $(this.option.toggleTarget).removeClass('is-active');
        }
      }
    });
  }
  destory(){

  }
}

export default ToggleScroll;
