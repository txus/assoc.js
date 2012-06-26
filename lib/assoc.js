function AssociativeArray(object) {
  // This variable is set to true whenever the lookup table isn't in sync with the data
  // array. "update_dirty_lookup_table" will then re-build the lookup table and reset the
  // dirty-flag.
  this.lookup_table_dirty = false;


  // This object is used for key-lookup inside the associative data array, so that it
  // is not necessary to iterate through the entire array to find a key. The structure
  // of this object is the following:
  //
  //     {
  //       "someKey": [
  //         index_of_someKey1,
  //         ...,
  //         index_of_someKeyN
  //       ],
  //       ...
  //     }
  //
  this.lookup_table = {};

  this.data = [];
  this._merge_object_in_array(object, this.data, 'push');
};

AssociativeArray.prototype = {

  assoc: function (key) {
    if(this.lookup_table[key] === undefined) {
      throw { name: "Key not found", message: "The requested key '" + key + "' was not found." }
    }

    var index = this.lookup_table[key][0];
    return this.data[index][1];
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
  },

  push: function (obj) {
    this._merge_object_in_array(obj, this.data, 'push');
  },

  unshift: function (obj) {
    this._merge_object_in_array(obj, this.data, 'unshift');
  },


  // ## "Private" methods ##
  // If you mess around with these, it's your own fault ;)


  _unshift_or_push: function (obj, ary, action) {
    if (action === 'unshift') {
      ary.unshift(obj);
      this.lookup_table_dirty = true;
    } else {
      // When pushing we can update the lookup_table right away, because it does not have
      // to be completely re-calculated (because no indices change).
      var length = ary.push(obj);
      this._add_lookup_table_key(obj[0], length - 1);
    }
  },

  _merge_object_in_array: function (obj, ary, action) {
    var i, temp = [], pair;

    if (obj instanceof Array) {
      for (i = 0; i < obj.length; i += 1) {
        if (obj[i] instanceof Array) {
          this._unshift_or_push(obj[i], ary, action);
        } else {
          temp.push(obj[i]);
        }
      }
      if (temp.length > 0) {
        this._unshift_or_push(temp, ary, action);
      }
    } else {
      for (name in obj) {
        if (typeof obj[name] !== 'function') {
          pair = [name, obj[name]];
          this._unshift_or_push(pair, ary, action);
        }
      }
    }

    this._update_dirty_lookup_table();
  },

  // Adds the given index of an occurence of "key" to the lookup table (assumes that the
  // given index comes **after** all previously added indices).
  _add_lookup_table_key: function (key, index) {
    var occurrences = this.lookup_table[key] || [];
    occurrences.push(index);
    this.lookup_table[key] = occurrences;
  },

  // Rebuilds the lookup table from scratch. This has to be done if an element is prepended
  // (unshifted) in the array, because that operation causes all previous key-index relations
  // to change.
  _update_dirty_lookup_table: function () {
    if(!this.lookup_table_dirty) {
      return;
    }

    this.lookup_table = {};

    for(i = 0; i < this.data.length; i += 1) {
      this._add_lookup_table_key(this.data[i][0], i);
    }

    this.lookup_table_dirty = false;
  }

}

module.exports = AssociativeArray;
