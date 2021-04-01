function Model () {
  var that = this;
  var text = "hello";
  this.listeners = [];
  Object.defineProperty(that, 'text', {
    get: function() {
      return text;
    },
    set: function (val) {
      text = val;
      that.notify();
    }
  })
}

Model.prototype.subscribe = function(listener) {
  this.listeners.push(listener)
}
Model.prototype.notify = function(value) {
  var that = this;
  this.listeners.forEach(function (listener) {
    listener.call(that,value)
  })
}

function View (controller) {
  var that = this;
  this.controller = controller;
  var elements = document.querySelectorAll('dsadsad');
  elements.forEach(function(element) {
    if (element.type === "button") {
      element.innerHTML = controller.getModelByKey("text");
      that.call = function(data) {
        element.innerText = data.text;
      };
      element.addEventListener("click", controller)
    }
  })
  this.controller.model.subscribe(this);
}