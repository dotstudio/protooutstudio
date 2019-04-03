/**
 * ビューに追加するときのライブラリ
 */
class BaseView {
  constructor(containerID, nextContainerID){
    this.containerID = containerID;
    this.nextContainerID = nextContainerID;
  }
  render(text){
    this.$container = $(this.containerID);
    this.$nextContainer = $(this.nextContainerID);
    if(this.$nextContainer.length >= 0){
      this.$nextContainer.remove();
    }
    //現在のコンテナとタイトルタグを取得
    //this.title = document.querySelector('title');
    this.title = document.querySelector('title');
    this.nextContainer = document.createElement('div');
    this.nextContainer.id = this.nextContainerID.replace('#', '');
    this.nextContainer.className = 'p-container';
    //新たなコンテナとタグをDOM内に突っ込む
    let div = document.createElement('html');
    div.innerHTML = text;
    this.title.innerHTML = div.querySelector('title').innerHTML;
    this.nextContainer.innerHTML = div.querySelector(this.containerID).innerHTML;
    this.$container.after(this.nextContainer);
  }
  changeView(){
    this.container = $(this.containerID);
    this.nextContainer = $(this.nextContainerID);
    this.container.remove();
    this.nextContainer.attr('id', this.containerID.replace('#', ''));
  }
}

export default BaseView;