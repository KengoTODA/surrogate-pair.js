/*!
 * surrogate-pair.js
 * https://github.com/eller86/surrogate-pair.js
 * 
 * Copyright(c) 2011 eller86
 * Licensed under Apache License Version 2.0
 */
;(function(){
	var MIN_HIGH_SURROGATE = 0xD800, MAX_HIGH_SURROGATE = 0xDBFF,
	    MIN_LOW_SURROGATE  = 0xDC00, MAX_LOW_SURROGATE  = 0xDFFF,
	    PATTERN = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
	function isString(obj) {
		return typeof obj === 'string';
	};
	function isHighSurrogate(c) {
		return c >= MIN_HIGH_SURROGATE && c <= MAX_HIGH_SURROGATE;
	};
	function isLowSurrogate(c) {
		return c >= MIN_LOW_SURROGATE && c <= MAX_LOW_SURROGATE;
	};

	sp = {
		countCodePoint: function(str) {
			if (!isString(str)) return 0;
			var count = 0;
			for (var i = 0; i < str.length; ++i) {
				if (isHighSurrogate(str.charCodeAt(i)) && isLowSurrogate(str.charCodeAt(i + 1))) {
					++i;
				}
				++count;
			}
			return count;
		},
		substr: function(str, startCodePoints, codePoints) {
			if (!isString(str) || codePoints <= 0) return '';
			if (startCodePoints === undefined) { startCodePoints = 0; }
			var codePoints_ = codePoints;
			if (codePoints === undefined) { codePoints = str.length; }
			if (startCodePoints < 0) {
				// TODO make more faster
				startCodePoints = Math.max(0, startCodePoints + sp.countCodePoint(str));
			}

			var count = 0, startIndex = undefined, endIndex = str.length;
			for (var i = 0; i <= str.length; ++i) {
				if (count === startCodePoints) { startIndex = i; }
				if (count === startCodePoints + codePoints) { endIndex = i; break; }
				if (isHighSurrogate(str.charCodeAt(i)) && isLowSurrogate(str.charCodeAt(i + 1))) {
					++i;
				}
				++count;
			}
			if (startIndex === undefined) {
				return '';
			} else if (arguments.length < 3) {
				return str.substr(startIndex);
			} else if (codePoints_ === undefined) {
				return str.substr(startIndex, undefined);
			} else {
				return str.substr(startIndex, endIndex - startIndex);
			}
		},
		containsSurrogatePair: function(str) {
			return PATTERN.test(str);
		},
		// TODO rename to good one do not like 'is~'
		isHighSurrogate: isHighSurrogate,
		// TODO rename to good one do not like 'is~'
		isLowSurrogate:  isLowSurrogate
	};
})();