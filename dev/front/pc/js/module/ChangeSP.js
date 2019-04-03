class ChangeSP{
  constructor(){
    this.$body = $('body');
  }
  resize(){
    if(window.innerWidth <= 800){
      window.__GLOBAL.isSP = true;
      this.$body.addClass('is-sp');
    } else {
      window.__GLOBAL.isSP = false;
      this.$body.removeClass('is-sp');
    }
  }
}

export default ChangeSP;
