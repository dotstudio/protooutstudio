const OPTION = {
  targetClass: '.js-inview',
  toggleClass: 'is-active'
};

class WayPointManager {
  constructor(options){
    this.option = window.__GLOBAL.Util.extend(OPTION,options);
    this.targets = document.querySelectorAll(this.option.targetClass);
    this.array = [];

    if(this.targets.length === 0) return;

    this.init();
  }
  init(){
    for(let i = 0; i < this.targets.length; i++){
      this.array.push({
       waypoint: this.set(this.targets[i])
      });
      this.array[i].waypoint.state = false;
    }
  }
  add(element){
      let obj = {
          waypoint: this.set(element)
      }
      obj.waypoint.state = false;
      this.array.push(obj);
  }
  set(el){
    let self = this;
    if(this.option.targetClass === '.js-enter'){
      return new Waypoint.Inview({
        element: el,
        enter: function(d){
          if(this.state) return;
          if(d === 'down'){
            this.state = true;
            self.onAnimation(this.element);
          }
        }
      })
    } else {
      return new Waypoint.Inview({
        element: el,
        enter: function(d){

        },
        entered: function(d){

        },
        exit: function(d){

        },
        exited: function(d){

        }
      })
    }
  }
  onAnimation(element){
    element.classList.add(this.option.toggleClass);
  }
  offAnimation(element){
    element.classList.remove(this.option.toggleClass);
  }
  destory(){
    if(this.array.length === 0) return;
    for(let i = 0; i < this.array.length; i++){
      this.array[i].waypoint.destroy();
    }
  }
}

export default WayPointManager;
