###!
surrogate-pair.js
https://github.com/eller86/surrogate-pair.js

Copyright(c) 2011 eller86
Licensed under Apache License Version 2.0
###
MIN_HIGH_SURROGATE = 0xD800
MAX_HIGH_SURROGATE = 0xDBFF
MIN_LOW_SURROGATE  = 0xDC00
MAX_LOW_SURROGATE  = 0xDFFF
PATTERN = /[\uD800-\uDBFF][\uDC00-\uDFFF]/

checkString = (obj) ->
  typeof obj == 'string'

checkHighSurrogate = (c) -> 
  MIN_HIGH_SURROGATE <= c <= MAX_HIGH_SURROGATE

checkLowSurrogate = (c) ->
  MIN_LOW_SURROGATE <= c <= MAX_LOW_SURROGATE

window.sp = {
  countCodePoints: (string) ->
    return 0 if !checkString(string)
    count = 0
    for i in [0...string.length]
      ++i if checkHighSurrogate(string.charCodeAt(i)) && checkLowSurrogate(string.charCodeAt(i + 1))
      ++count

    return count

  substr: (string='', startCodePoints=0, codePoints=string.length) ->
    return '' if !checkString(string) || codePoints <= 0
    count = 0
    startIndex = 0
    endIndex = string.length
    for i in [0..string.length]
      startIndex = i if count == startCodePoints
      if count == startCodePoints + codePoints
        endIndex = i
        break
      ++i if checkHighSurrogate(string.charCodeAt(i))&& checkLowSurrogate(string.charCodeAt(i + 1))
      ++count
    return string.substr(startIndex, endIndex - startIndex)

  findSurrogatePair: (string) ->
    PATTERN.test(string)

  checkHighSurrogate: checkHighSurrogate
  checkLowSurrogate: checkLowSurrogate

}
