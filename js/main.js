// 'use strict';
//
// import b from './whyCall.js'
// console.log(a);
// console.log(b);

$(function(){
  $('#testinput').keydown(function(event){
    console.log('keyCode =', event.keyCode)
  })
  $('#testBtn').click(() => {
    console.log(parseInt($('#testinput').val()));
    console.log('click');
    if(!isNaN(parseInt($('#testinput').val()))){
      console.log('is Number');
    }else {
      console.log('no Number');
    };
    console.log(_check_Number(0, 1, $('#testinput').val()));
    console.log($('#testBtn').length);
    console.log('testinput.lengt =', cl.length);
    console.log($('.no a'));
  })
  var day = new Date('2018-09-27 00:00:00').getDay();
  $('#day_text').text( $('#day_text').text() + new Date('2018-09-27 00:00:00').getDay());
  $('#day_text').append('<br>')
  $('#day_text').text( $('#day_text').text() + day);
  $('#day_text').append('<br>')
  if (isNaN(day)) { day = new Date(('2018-09-27 00:00:00').replace(/-/g, '/')).getDay(); }
  $('#day_text').text( $('#day_text').text() + ('2018-09-27 00:00:00').replace(/-/g, '/'));
  $('#day_text').append('<br>')
  $('#day_text').text( $('#day_text').text() + day);
  $('#day_text').append('<br>')
})

function _check_Number(num)
{
  var re = RegExp('[^0-9]+');
  console.log('re =', re);
  console.log('num.toString() =', num.toString());
  if(re.test(num.toString()))
  {
    return true;
  }
  else
  {
    return false;
  }
}
var cl = $('#testinput');



/************************
 * MVC test
 ************************/

function Model(value) {
    this._value = typeof value === 'undefined' ? '' : value;
    this._listeners = [];
}
Model.prototype.set = function (value) {
    var self = this;
    self._value = value;
    setTimeout(function() {
        self._listeners.forEach(function (listener) {
            listener.call(self, value);
        });
    });
};
Model.prototype.watch = function (listener) {
    this._listeners.push(listener);
};
Model.prototype.bind = function (node) {
    this.watch(function (value) {
        node.innerHTML = value;
    });
};
function Controller(callback) {
    var models = {};
    var views = Array.prototype.slice.call(document.querySelectorAll('[bind]'), 0);
    views.forEach(function (view) {
        var modelName = view.getAttribute('bind');
        (models[modelName] = models[modelName] || new Model()).bind(view);
    });
    callback.call(this.models);
};


(function () {
    var model = new Model();
    var divMVC = document.getElementById('MVC-V');
    function setTime() {
        let now = new Date();
        model.watch(function (value) {
            divMVC.innerHTML = value;
        });
        model.set('現在時間為： ' + now);
    };
    setTime();
    setInterval(setTime, 1000);
})();
