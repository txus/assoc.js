module.exports = function (object) {

  var data = [],

    // This variable is set to true whenever the lookup table isn't in sync with the data
    // array. "update_dirty_lookup_table" will then re-build the lookup table and reset the
    // dirty-flag.
    lookup_table_dirty = false,

    /*
      This object is used for key-lookup inside the associative data array, so that it
      is not necessary to iterate through the entire array to find a key. The structure
      of this object is the following:

        {
          "someKey": [
            index_of_someKey1,
            ...,
            index_of_someKeyN
          ],
          ...
        }
      */
    lookup_table = {},

    add_lookup_table_key = function (key, index) {
      var occurrences = lookup_table[key] || [];
      occurrences.push(index);
      lookup_table[key] = occurrences;
    },

    update_dirty_lookup_table = function() {
      if(!lookup_table_dirty) {
        return;
      }

      // Workaround: The lookup table has to be cleared, because when resetting it to an
      // empty object, the "this.lookup_table" (of the AssociativeArray object) looses its
      // reference.
      for (prop in lookup_table) { if (lookup_table.hasOwnProperty(prop)) { delete lookup_table[prop]; } }

      for(i = 0; i < data.length; i += 1) {
        add_lookup_table_key(data[i][0], i);
      }

      lookup_table_dirty = false;
    }

    unshift_or_push = function (obj, ary, action) {
      if (action === 'unshift') {
        ary.unshift(obj);
        lookup_table_dirty = true;
      } else {
        // When pushing we can update the lookup_table right away, because it does not have
        // to be completely re-calculated (because no indices change).
        var length = ary.push(obj);
        add_lookup_table_key(obj[0], length - 1);
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

      update_dirty_lookup_table();
    };

  merge_object_in_array(object, data, 'push');

  this.assoc = function (key) {
    if(lookup_table[key] === undefined) {
      throw { name: "Key not found", message: "The requested key '" + key + "' was not found." }
    }

    var index = lookup_table[key][0];
    return data[index][1];
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
  this.lookup_table = lookup_table;

};
