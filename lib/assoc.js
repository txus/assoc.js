function AssociativeArray(object) {

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

  this.push = function (obj) {
    merge_object_in_array(obj, data, 'push');
  };

  this.unshift = function (obj) {
    merge_object_in_array(obj, data, 'unshift');
  };

  this.data = data;

};

AssociativeArray.prototype = {

  assoc: function (key) {
    var i;
    for (i = 0; i < this.data.length; i += 1) {
      if (key === this.data[i][0]) {
        return this.data[i][1];
      }
    }
  },

  rassoc: function (value) {
    var i;
    for (i = 0; i < this.data.length; i += 1) {
      if (value === this.data[i][1]) {
        return this.data[i][0];
      }
    }
  },

  pop: function () {
    return this.data.pop();
  },

  shift: function () {
    return this.data.shift();
  }
}

module.exports = AssociativeArray;
