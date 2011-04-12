module.exports = function (object) {

  var data = [],

    unshift_or_push = function (obj, ary, action) {
      if (action === 'unshift') {
        ary.unshift(obj);
      } else {
        ary.push(obj);
      }
    },

    merge_object_in_array = function (obj, ary, action) {
      var i, temp = [], pair;

      if (obj instanceof Array) {
        for (i = 0; i < obj.length; i += 1) {
          if (obj[i] instanceof Array) {
            unshift_or_push(obj[i], ary, action);
          } else {
            temp.push(obj[i]);
          }
        }
        if (temp.length > 0) {
          unshift_or_push(temp, data, action);
        }
      } else {
        for (name in obj) {
          if (typeof obj[name] !== 'function') {
            pair = [name, obj[name]];
            unshift_or_push(pair, ary, action);
          }
        }
      }
    };

  merge_object_in_array(object, data, 'push');

  this.assoc = function (key) {
    var i;
    for (i = 0; i < data.length; i += 1) {
      if (key === data[i][0]) {
        return data[i][1];
      }
    }
  };

  this.rassoc = function (value) {
    var i;
    for (i = 0; i < data.length; i += 1) {
      if (value === data[i][1]) {
        return data[i][0];
      }
    }
  };

  this.push = function (obj) {
    merge_object_in_array(obj, data, 'push');
  };

  this.pop = function () {
    data.pop();
  };

  this.unshift = function (obj) {
    merge_object_in_array(obj, data, 'unshift');
  };

  this.shift = function () {
    data.shift();
  };

  this.data = data;

};
