class Cookie {
  constructor(){

  }
  getCookie(name){
    if (!name || !this.hasItem(name)) { return null; }
    return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
  }
  setCookie(name, value, end, path, domain, secure) {
    if (!name || /^(?:expires|max\-age|path|domain|secure)$/i.test(name)) { return; }
    var expires = "";
    if (end) {
      switch (end.constructor) {
        case Number:
          expires = end === Infinity ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + end;
          break;
        case String:
          expires = "; expires=" + end;
          break;
        case Date:
          expires = "; expires=" + end.toGMTString();
          break;
      }
    }
    document.cookie = escape(name) + "=" + escape(value) + expires + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "") + (secure ? "; secure" : "");
  }
  hasItem(name) {
    return (new RegExp("(?:^|;\\s*)" + escape(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  }
  removeItem (name, path) {
    if (!name || !this.hasItem(name)) { return; }
    document.cookie = escape(name) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (path ? "; path=" + path : "");
  }
  keys () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = unescape(aKeys[nIdx]); }
    return aKeys;
  }
}

export default Cookie;