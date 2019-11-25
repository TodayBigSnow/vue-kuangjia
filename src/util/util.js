
/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios
import $ from 'jquery'
var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function bind(fn, thisArg) {
return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
    args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
};
};
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}
function handleTime(data,type){
  if(!data){
    return ''
  }
  var date = new Date(data)
  var y = date.getFullYear() >= 10 ? date.getFullYear() : '0' + date.getFullYear(),
    m = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1),
    d = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate(),
    h = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours(),
    mm = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes(),
    s = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds();
    if(type){
      return `${y}-${m}-${d}`
    }
  return `${y}-${m}-${d} ${h}:${mm}:${s}`  
  }
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}
// 纯数字或者保留小数点后两位
function numCase (num){
  num += ''
  var reg = /\d+(\.\d{0,2})?/
  if(num.match(reg)[0]){
    return num.match(reg)[0]
  }else{
    return false
  }
}
// 箱号验证
function numberTest  (carNumCase) {
  if(!carNumCase){
    return
  }
  var ctnNo = carNumCase.toUpperCase();
  var parseValue = "0123456789A?BCDEFGHIJK?LMNOPQRSTU?VWXYZ";
  //基础格式验证(4位字母+7位数字)
  var baseCheck = /^([A-Za-z]){4}\d{7}$/.test(ctnNo);
  if (!baseCheck) {
      return false;
  }
  //验证码验证
  var calcNum = 0;
  for (var i = 0; i < 10; i++) {
      var index = parseValue.indexOf(ctnNo[i].toUpperCase());
      if (index == -1 || ctnNo[i] == "?") {
          return false;
      }
      calcNum += index * Math.pow(2, i);
  }
  var rightNum = (calcNum % 11) % 10;
  var flag = parseInt(ctnNo[10]) == rightNum;
  if (!flag) {
      return false;
  }
  return true
}
// 内编号随机
function GetBillNo (name){
  this.name = name+ this.getRandom(0,10000) + this.upadteStr() 
}
GetBillNo.prototype.getRandom = function (min,max) {
  return Math.floor(Math.random() * (max - min + 1)) +  min;
}
GetBillNo.prototype.upadteStr = function () {
  var date = new Date()
  var str = date.getTime() + ''
  var index = 0
  var str1 = ''
  for(var i = str.length-1-4;i>=0;i++){
    str1 += str[i]
    index++
    if(index==4){
    break
    }
    
  }
  return str1
}
function testingLogin () {
  if(!sessionStorage.getItem('obj')){
    this.$confirm('是否登录?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning' }).then(() => {
        this.$router.push('login')
    }).catch(()=>{
      this.$router.push('index')
    });
    return false
  }
  return true
}
function instanceOfObj(obj) {
  var result;
  if (obj && obj.constructor === Object) {
      result = {}
      for (var k in obj) {
          if (obj[k] && obj[k].constructor === Object || obj[k] && obj[k].constructor === Array) {
              result[k] = instanceOfObj(obj[k])
              continue
          }
          result[k] = obj[k]
      }
  } else if (obj && obj.constructor === Array) {
      result = []
      obj.forEach((item, i) => {
          if (item && item.constructor === Object || item && item.constructor === Array) {
              result [i] = instanceOfObj(item)
              return
          }

          result[i] = obj[i]
      })
  }
  return result
}
function openUrl(url,param){
  var pathname = window.location.pathname;
  var sys_source=pathname.substring(1,pathname.lastIndexOf("/"));
  var author = JSON.parse(sessionStorage.getItem('obj')).token
  var parm = ''
  for(var k in param){
    if(param[k]){
      parm += k + '='+param[k]+'&'
    }
  }
  var serverHref= 'http://www.gangkou56.com';
  var servicesUrl =serverHref+"/tms_services/";
  var urlX = servicesUrl + url+"?sys_source=reppon&"+parm + "Authorization=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoie1wiY29ublR5cGVcIjoyLFwic3lzVHlwZVwiOjEsXCJ1c2VySWRcIjo1MjU4LFwidXNlck5hbWVcIjpcImd5bFwiLFwiZW1wbG95ZWVOb1wiOm51bGwsXCJuYW1lXCI6bnVsbCxcIm5pY2tOYW1lXCI6XCJHR0dcIixcInBsYXRmb3JtXCI6bnVsbCxcInBob25lTnVtYmVyXCI6XCIxMzgwMDAwMDAwMFwiLFwiY29tcGFueUlkXCI6NzM4LFwiY29tcGFueU5hbWVcIjpcIuaJv-mbhuS_oeaBr-enkeaKgO-8iOS4iua1t--8ieaciemZkOWFrOWPuOWIhuWFrOWPuFwiLFwibG9nb1wiOlwiaHR0cDovL2NoZW5namktdG1zLm9zcy1jbi1zaGFuZ2hhaS5hbGl5dW5jcy5jb20vdXBsb2FkL251bGxcIixcImN1c3RvbWVySWRcIjpudWxsLFwiZGVwdElkXCI6bnVsbCxcInVzZXJMZXZlbFwiOjAsXCJ1c2VyVHlwZVwiOm51bGwsXCJmY2xMZXZlbElkXCI6bnVsbCxcInJvbGVJZHNcIjpudWxsLFwicGVybWlzc2lvbnNcIjpbXCJUTVMtMDhcIixcIlRNUy0wMTA1XCIsXCJUTVMtMDdcIixcIlRNUy0wNTAxXCIsXCJUTVMtMDEwNFwiLFwiVE1TLTA1MDJcIixcIlRNUy0wNTAzXCIsXCJUTVMtMDVcIixcIlRNUy0wMTA2XCIsXCJUTVMtMDUwNFwiLFwiVE1TLTAyMDNcIixcIlRNUy0wMjA0XCIsXCJUTVMtMDIwNVwiLFwiVE1TLTAyMDZcIixcIlRNUy0wNDA1XCIsXCJUTVMtMDQwNlwiLFwiVE1TLTAyMDFcIixcIlRNUy0wMjAyXCIsXCJUTVMtMDQwMVwiLFwiVE1TLTAxMDFcIixcIlRNUy0wNFwiLFwiVE1TLTA0MDJcIixcIlRNUy0wM1wiLFwiVE1TLTA0MDNcIixcIlRNUy0wMlwiLFwiVE1TLTAxMDNcIixcIlRNUy0wNDA0XCIsXCJUTVMtMDEwMlwiLFwiVE1TLTAxXCIsXCJUTVMtMDMxMFwiLFwiVE1TLTA3MDJcIixcIlRNUy0wNzA1XCIsXCJUTVMtMDMwOVwiLFwiVE1TLTAzMDhcIixcIlRNUy0wMzA3XCIsXCJUTVMtMDMwNlwiLFwiVE1TLTAzMDVcIixcIlRNUy0wMzAzXCIsXCJUTVMtMDMwMlwiLFwiVE1TLTA4MDJcIixcIlRNUy0wODAxXCJdLFwicGVybWlzc2lvbnNCdXRcIjpbXSxcInVzZXJQb3J0TGlzdFwiOm51bGwsXCJ1c2VyUm91dGVMaXN0XCI6bnVsbCxcInVzZXJTaGlwcGluZ0xpc3RcIjpudWxsLFwicmVkaXNWYWx1ZVwiOlwiNm1vZTV1cjRhdWJ0ZWp2clwifSIsImV4cCI6MjUzMzcwNzM2MDAwfQ.K5eC1S-dfmE52KypH4hv7TGl8Z_ue-5qzMsIPSgkE5E";
  var newform = "<form action=\""+urlX+"\" method=\"post\" id=\"romoveFrom\">"
    +"<input type=\"text\" style=\"display:none;\" name=\"Authorization\" value=\""+author+"\">"
    +"<input type=\"text\" style=\"display:none;\"  name=\"sys_source\" value=\""+sys_source+"\">"
    +"<button id=\"open\" type=\"submit\" style=\"display:none;\" value=\"提交\"></button>"
    +"</form>";
  var newwindow = window.open("","_self");
  $(newwindow.document).find("body").append(newform);
  $(newwindow.document).find("#open").click();
  $("#romoveFrom").remove();
}
export default {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  GetBillNo:GetBillNo,
  numberTest:numberTest,
  testingLogin:testingLogin,
  handleTime:handleTime,
  deepMerge:deepMerge,
  instanceOfObj:instanceOfObj,
  openUrl:openUrl
};
