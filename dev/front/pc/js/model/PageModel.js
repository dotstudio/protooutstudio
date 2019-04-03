class PageModel {
  constructor(){
    this.host = `${location.protocol}//${location.host}` + window.__GLOBAL.root;
  }

  /**
   * Ajaxで取得
   * @param path
   * @returns {null}
   */
  fetch(path) {
    this.abort();
    return new Promise((resolve, reject) => {
      this.rq = $.ajax({
        type: 'GET',
        url: path,
        headers: {
          "X-Requested-With":"XMLHttpRequest",
        }
      })
      .then((res) => {
        this.rq = null;
        resolve(res);
      },(res) => {
        this.rq = null;
        reject(res);
      });
    });
  }

  /**
   * Ajaxのキャンセル
   */
  abort(){
    if(this.rq){
      this.rq.abort();
    }
  }
}

export default PageModel;
