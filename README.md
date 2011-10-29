surrogate-pair.js
=================
surrogate-pair.js is a library which makes handling surrogate pair easy.

tested browsers
---------------
- Google Chrome 11+
- Safari 5.0.5 
- Mozilla Firefox 3.6.13
- Opera 11.01
- Internet Explorer 9

methods
-------
if you load surrogate-pair.js, a global object named 'sp' is created.
this object has utility methods below:

### countCodePoints(str)
count code points of given string and return it.

    sp.countCodePoints('');     // = 0
    sp.countCodePoints('abc');  // = 3
    sp.countCodePoints('あ');   // = 1
    sp.countCodePoints('あ');   // = 1
    '𠮟'.length;               // = 2
    sp.countCodePoints('𠮟');   // = 1


### substr(str, startCodePoints, codePoints)
returns the code points in a string beginning at the specified location through the specified number of code points.
this method resembles String.prototype.substr, but its startCodePoints should be positive number.

    sp.substr('abc', 0);      // = 'abc'
    sp.substr('abc', 1);      // = 'bc'
    sp.substr('abc', 0, 0);   // = ''
    sp.substr('a𠮟', 0, 2);   // = 'a𠮟'
    sp.substr('a𠮟', 1, 1);   // = '𠮟'


### findSurrogatePair(str)
return true if given string contains any surrogate pair.

    sp.findSurrogatePair('');    // = false
    sp.findSurrogatePair('abc'); // = false
    sp.findSurrogatePair('あ');  // = false
    sp.findSurrogatePair('𠮟');  // = true

### checkHighSurrogate(charCode)
return true if given character code is high(leading) surrogate.

    sp.checkHighSurrogate('a'.charCodeAt(0))    // = false
    sp.checkHighSurrogate('𠮟'.charCodeAt(0))   // = true
    sp.checkHighSurrogate('𠮟'.charCodeAt(1))   // = false

### checkLowSurrogate(charCode)
return true if given character code is low(trailing) surrogate.

    sp.checkLowSurrogate('a'.charCodeAt(0))    // = false
    sp.checkLowSurrogate('𠮟'.charCodeAt(0))   // = false
    sp.checkLowSurrogate('𠮟'.charCodeAt(1))   // = true


copyright and license
---------------------
Copyright 2011 Kengo TODA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


thanks
------
we use QUnit for unit testing.
http://docs.jquery.com/QUnit

surrogate-pair.min.js is compressed by YUI-compressor-2.4.6.
http://developer.yahoo.com/yui/compressor/

surrogate-pair.js is written in coffeescript.
http://jashkenas.github.com/coffee-script/

