(function() {
  /*!
  surrogate-pair.js
  https://github.com/eller86/surrogate-pair.js
  
  Copyright(c) 2011 eller86
  Licensed under Apache License Version 2.0
  */
  var MAX_HIGH_SURROGATE, MAX_LOW_SURROGATE, MIN_HIGH_SURROGATE, MIN_LOW_SURROGATE, PATTERN, checkHighSurrogate, checkLowSurrogate, checkString;
  MIN_HIGH_SURROGATE = 0xD800;
  MAX_HIGH_SURROGATE = 0xDBFF;
  MIN_LOW_SURROGATE = 0xDC00;
  MAX_LOW_SURROGATE = 0xDFFF;
  PATTERN = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
  checkString = function(obj) {
    return typeof obj === 'string';
  };
  checkHighSurrogate = function(c) {
    return (MIN_HIGH_SURROGATE <= c && c <= MAX_HIGH_SURROGATE);
  };
  checkLowSurrogate = function(c) {
    return (MIN_LOW_SURROGATE <= c && c <= MAX_LOW_SURROGATE);
  };
  window.sp = {
    countCodePoint: function(string) {
      var count, i, _ref;
      if (!checkString(string)) {
        return 0;
      }
      count = 0;
      for (i = 0, _ref = string.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        if (checkHighSurrogate(string.charCodeAt(i)) && checkLowSurrogate(string.charCodeAt(i + 1))) {
          ++i;
        }
        ++count;
      }
      return count;
    },
    substr: function(string, startCodePoints, codePoints) {
      var count, endIndex, i, startIndex, _ref;
      if (string == null) {
        string = '';
      }
      if (startCodePoints == null) {
        startCodePoints = 0;
      }
      if (codePoints == null) {
        codePoints = string.length;
      }
      if (!checkString(string) || codePoints <= 0) {
        return '';
      }
      count = 0;
      startIndex = 0;
      endIndex = string.length;
      for (i = 0, _ref = string.length; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        if (count === startCodePoints) {
          startIndex = i;
        }
        if (count === startCodePoints + codePoints) {
          endIndex = i;
          break;
        }
        if (checkHighSurrogate(string.charCodeAt(i)) && checkLowSurrogate(string.charCodeAt(i + 1))) {
          ++i;
        }
        ++count;
      }
      return string.substr(startIndex, endIndex - startIndex);
    },
    findSurrogatePair: function(string) {
      return PATTERN.test(string);
    },
    checkHighSurrogate: checkHighSurrogate,
    checkLowSurrogate: checkLowSurrogate
  };
}).call(this);
