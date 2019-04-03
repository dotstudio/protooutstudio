/**
 * SplitSpan
 * spanで括りたい要素にsplitSpanクラスをつければ1文字ずつspanで括る
 * 特定のelementを括りたい場合はoptionでelementを渡す
 * callbackもつけているが、promiseにしていいのか相談してみる
 */

const OPTION = {
    element: '.js-split-span',
    addWrap: false,
    callback: null
}

class SplitSpan{
    constructor(options){
        this.option = $.extend({},OPTION,options);
        if(this.option.element === undefined) return;
        this.element = document.querySelectorAll(this.option.element);
        this.dataSpanArray = [];
        this.init();
    }
    init(){
        this._split().then(() => {
            if(this.option.callback !== null){
                this.option.callback();
            }
        });
    }
    _split(){
        return new Promise((resolve,reject) => {
            let target,brTarget,textArray,brArray,sliceNum;
            for(let i = 0; i < this.element.length; i++){
                target = this.element[i];
                brTarget = this.element[i];
                target.classList.add('split-hide');
                textArray = target.innerHTML.replace(/^\s*(.*?)\s*$/, "$1").replace(/<br>/g, "").split('');
                brArray = brTarget.innerHTML.split('');
                sliceNum = brArray.indexOf('<');
                target.innerHTML = '';
                this._set(textArray,target,sliceNum);
            }
            $(this.option.element).addClass('js-split-span-on');
            $(this.option.element).removeClass('js-split-span');
            resolve();
        });
    }
    _set(array,element,slice){
        for(let j = 0; j < array.length; j++){
            if(slice === j){
                element.innerHTML += '<br>';
            }
            if(this.option.addWrap){
                element.innerHTML += '<div><span data-text="' + array[j] + '">'+array[j]+'</span></div>';
            } else {
              // console.log(array[j]);
              if(array[j] === ' '){
                element.innerHTML += '<span style="width: 6px;" class="space" data-text="' + array[j] + '">'+array[j]+'</span>';
              } else {
                element.innerHTML += '<span data-text="' + array[j] + '">'+array[j]+'</span>';
              }
            }
        }
        element.classList.remove('split-hide');
    }
}

export default SplitSpan;
