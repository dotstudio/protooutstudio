class NoopController {
  constructor(){
    this.$window = $(window);
  }
  onInit(){
    __GLOBAL.currentPage = '';
  }
  onFetchStart(){
    __GLOBAL.currentPage = '';
  }
  onFetchEnd(){
  }
  onExit(){
  }
}

export default NoopController;
