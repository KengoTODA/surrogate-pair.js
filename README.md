surrogate-pair.js
=================
surrogate-pair.js is a library which makes handling surrogate pair easy.

tested browsers
---------------
- Google Chrome 11+ on MacOSX 10.6.7
- Safari 5.0.5 on MacOSX 10.6.7

methods
-------
if you load surrogate-pair.js, a global object named 'sp' is created.
this object has utility methods below:

### countCodePoint(str)
count code points of given string and return it.

    sp.codePointCount('');     // = 0
    sp.codePointCount('abc');  // = 3
    sp.codePointCount('あ');   // = 1
    sp.codePointCount('あ');   // = 1
    '𠮟'.length;               // = 2
    sp.codePointCount('𠮟');   // = 1


### substr(str, startCodePoints, codePoints)
(sorry, now under construction)

### containsSurrogatePair(str)
return true if given string contains any surrogate pair.

    sp.containsSurrogatePair('');    // = false
    sp.containsSurrogatePair('abc'); // = false
    sp.containsSurrogatePair('あ');  // = false
    sp.containsSurrogatePair('𠮟');  // = true

### isHighSurrogate(charCode)
return true if given character code is high(leading) surrogate.

    sp.isHighSurrogate('a'.charCodeAt(0))    // = false
    sp.isHighSurrogate('𠮟'.charCodeAt(0))   // = true
    sp.isHighSurrogate('𠮟'.charCodeAt(1))   // = false

### isLowSurrogate(charCode)
return true if given character code is low(trailing) surrogate.

    sp.isLowSurrogate('a'.charCodeAt(0))    // = false
    sp.isLowSurrogate('𠮟'.charCodeAt(0))   // = false
    sp.isLowSurrogate('𠮟'.charCodeAt(1))   // = true


thanks
------
we use QUnit for unit testing.
http://docs.jquery.com/QUnit

surrogate-pair.min.js is compressed by YUI-compressor-2.4.6.
http://developer.yahoo.com/yui/compressor/
