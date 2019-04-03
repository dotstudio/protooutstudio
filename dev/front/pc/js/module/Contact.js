import ContactManager from '../module/ContactManager';
import ScrollCanceler from '../util/ScrollCanceler';

class Contact {
  constructor() {
    this.$body = $('body');
    this.$contact = $('#js-contact');
    this.$contactToggle = $('.js-contact-toggle');
    this.$formWrap = $('.p-contact');

    this.scrollCanceler = new ScrollCanceler();

    this.click = (e) => this._click(e);

    this.init();
  }
  init() {

    this.contactManager = new ContactManager();
    this.contactManager.init();

    let container = document.querySelectorAll('.js-scrollbar');
    this.psArray = [];
    for (let i = 0; i < container.length; i++) {
      this.psArray.push({
        target: new PerfectScrollbar(container[i])
      });
      this.psArray[i].target.update();
    }

    this.$contactToggle.on('click', this.click);
  }
  _click(e) {
    e.preventDefault();
    this.$body.toggleClass('is-contact');
    this.$contact.toggleClass('is-active');

    if (this.$body.hasClass('is-contact')) {
      this.scrollCanceler.cancel();
      TweenMax.to('.p-contact', 0.2, {
        scrollTo: {
          y: 0,
          autoKill: false
        },
        ease: Power4.easeOut
      });
    } else {
      if (window.__GLOBAL.send) {
        window.__GLOBAL.send = false;
        this.$formWrap.removeClass('is-complete');
        this.$formWrap.addClass('is-input');
        $('.c-table__input').removeClass('is-hide');
        $('.c-table__result').addClass('is-hide');
        $('.p-contact__form input').prop('checked', false);
        $('.p-contact__form input,.p-contact__form textarea').val('');
        $('.c-table__result').html('');
        $('.error').text('');
        this.contactManager._changeContent(0, $(e.delegateTarget));
      }
      setTimeout(() => {
        this.scrollCanceler.arrow();
      }, 300);
    }

  }
  destory() {
    this.$contactToggle.off('click');
  }
}

export default Contact;
