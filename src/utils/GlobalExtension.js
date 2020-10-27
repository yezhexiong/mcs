/********************************
 * 相关全局扩展方法(扩展js原生对象)
 ********************************/

const extensionFunc = {};

/************************************************** String *******************************************************/
extensionFunc.String = {
    //remove space of head and end [去字符串前后空格]
    trim: function (str) {
        return str.replace(/^\s+|\s+$/g, '');
    },
    lTrim: function (str) {//remove space of head [去字符串前空格]
        return str.replace(/(^\s*)/g, "");
    },
    rTrim: function (str) {//remove space of end [去字符串后空格]
        return str.replace(/(\s*$)/g, "");
    },
    IsNum: function (str) {//判断是否为数字 
        if (str != null && str != "") { return !isNaN(str); } return false;
    },
    isInteger: function (str) {//是否为整数
        var re = /^-?\d+$/;
        if (re.test(str)) {
            return true;
        } return false;
    },
    isEmail: function (str) {
        var re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (re.test(str)) {
            return true;
        } return false;
    },
    //判断字符为空
    isNull: function (str) {
        if (str.byteLength() < 1) {
            return true;
        } else {
            return false;
        }
    },
    //判断身份证号码
    IsIdCard: function (number) {
        number = number.toLowerCase();
        var date, Ai;
        var verify = "10x98765432";
        var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var area = ['', '', '', '', '', '', '', '', '', '', '', '北京', '天津', '河北', '山西', '内蒙古', '', '', '', '', '', '辽宁', '吉林', '黑龙江', '', '', '', '', '', '', '', '上海', '江苏', '浙江', '安微', '福建', '江西', '山东', '', '', '', '河南', '湖北', '湖南', '广东', '广西', '海南', '', '', '', '重庆', '四川', '贵州', '云南', '西藏', '', '', '', '', '', '', '陕西', '甘肃', '青海', '宁夏', '新疆', '', '', '', '', '', '台湾', '', '', '', '', '', '', '', '', '', '香港', '澳门', '', '', '', '', '', '', '', '', '国外'];
        var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/i);
        if (re == null) return false;
        if (re[1] >= area.length || area[re[1]] == "") return false;
        if (re[2].length == 12) {
            Ai = number.substr(0, 17);
            date = [re[9], re[10], re[11]].join("-");
        }
        else {
            Ai = number.substr(0, 6) + "19" + number.substr(6);
            date = ["19" + re[4], re[5], re[6]].join("-");
        }
        if (!this.IsDate(date, "ymd")) return false;
        var sum = 0;
        for (var i = 0; i <= 16; i++) {
            sum += Ai.charAt(i) * Wi[i];
        }
        Ai += verify.charAt(sum % 11);
        return (number.length == 15 || number.length == 18 && number == Ai);
    },
    //判断日期合法
    IsDate: function (op, formatString) {
        formatString = formatString || "ymd";
        var m, year, month, day;
        switch (formatString) {
            case "ymd":
                m = op.match(new RegExp("^((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})$"));
                if (m == null) return false;
                day = m[6];
                month = m[5] * 1;
                year = (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
                break;
            case "dmy":
                m = op.match(new RegExp("^(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))$"));
                if (m == null) return false;
                day = m[1];
                month = m[3] * 1;
                year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10));
                break;
            default:
                break;
        }
        if (!parseInt(month)) return false;
        month = month == 0 ? 12 : month;
        var date = new Date(year, month - 1, day);
        return (typeof (date) == "object" && year == date.getFullYear() && month == (date.getMonth() + 1) && day == date.getDate());
        function GetFullYear(y) { return ((y < 30 ? "20" : "19") + y) | 0; }
    },
    /** 
    * 字符串转换为json对象 
    * @obj  {string} json字符串 
    */
    toJson: function (str) {
        return eval('(' + str + ')');
    },
    escapeHTML: function (str) {//escapeHTML
        return str.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
    },
    unescapeHTML: function (str) {//unescapeHTML
        return str.replace(/</g, '<').replace(/>/g, '>').replace(/&/g, '&');
    },
    byteLength: function (str) {//get the string's length, a Chinese char is two lengths
        // eslint-disable-next-line no-control-regex
        return str.replace(/[^\x00-\xff]/g, "**").length;
    },
    delLast: function (str) {//remove the last char
        return str.substring(0, str.length - 1);
    },
    toInt: function (str) {//String to Int
        return Math.floor(str);
    },
    toArray: function (str, o) {//String to Array
        return str.split(o || '');
    },
    toDate: function (str) {//String to Date
        return new Date(str.replace(/[-]/g, '/'));
    },
    //substring, start from head, and a Chinese char is two lengths
    left: function (str, n) {
        if (str == null) return "";
        // eslint-disable-next-line no-control-regex
        var s = str.replace(/\*/g, " ").replace(/[^\x00-\xff]/g, "**");
        s = s.slice(0, n).replace(/\*\*/g, " ").replace(/\*/g, "").length;
        return str.slice(0, s);
    },
    //截取字符串，如果有截取则加 ...
    leftAddDot: function (str, n) {
        if (str == null) return "";
        // eslint-disable-next-line no-control-regex
        var s = str.replace(/\*/g, " ").replace(/[^\x00-\xff]/g, "**");
        s = s.slice(0, n).replace(/\*\*/g, " ").replace(/\*/g, "").length;
        if (str.length <= s) {
            return str;
        } else {
            return str.slice(0, s) + "...";
        }
    },
    //substring, start from end, and a Chinese char is two lengths
    right: function (str, n) {
        var len = str.length;
        // eslint-disable-next-line no-control-regex
        var s = str.replace(/\*/g, " ").replace(/[^\x00-\xff]/g, "**");
        s = s.slice(s.length - n, s.length).replace(/\*\*/g, " ").replace(/\*/g, "").length;
        return str.slice(len - s, len);
    },
    //remove HTML tags 
    removeHTML: function (str) {
        return str.replace(/<\/?[^>]+>/gi, '');
    },
    //format string
    //eg. "<div>{0}</div>{1}".format(txt0,txt1);
    format: function () {
        var str = arguments[0], args = [];
        for (var i = 1, il = arguments.length; i < il; i++) {
            args.push(arguments[i]);
        }
        return str.replace(/\{(\d+)\}/g, function (m, i) {
            return args[i];
        });
    },
    // toLowerCase
    toLower: function (str) {
        return str.toLowerCase();
    },
    // toUpperCase
    toUpper: function (str) {
        return str.toUpperCase();
    },
    // toString(16)
    on16: function (str) {
        var a = [], i = 0;
        for (; i < str.length;) a[i] = ("00" + str.charCodeAt(i++).toString(16)).slice(-4);
        return "\\u" + a.join("\\u");
    },
    // unString(16)
    un16: function (str) {
        return unescape(str.replace(/\\/g, "%"));
    },
    /** 
    * 时间字符串的格式化显示; 
    * @dateTime {string} 要格式化的日期字符串 
    * @format   {string} 格式化字符 可为空 
    */
    formatDateTime: function (str, f) {
        if (str == null) { return ""; }
        if (str == "") { return ""; }
        if (!f || f == "") { f = "yyyy-MM-dd"; }
        str = str.replace('T', ' ');
        var myDate = new Date(str.replace(/[-]/g, '/'));
        return extensionFunc.Date.format(myDate, f); //格式化时间  
    },
    escape: function (str) {
        return escape(str);
    },
    unescape: function (str) {
        return unescape(str);
    },
    alert: function (str) {
        alert(str);
    },
    FormatNull: function (_s) {
        if (_s == "null") {
            return "";
        }
        if (_s == null) {
            return "";
        }
        return _s;
    },
    toDecimal: function (x) {//remove space of end [去字符串后空格]
        if (x == "") return "";
        if (typeof (x) == "undefined") return "";
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f2 = Math.round(x * 100) / 100;
        var s = f2.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    }
};

/************************************************** Date *******************************************************/
extensionFunc.Date = {
    //eg. new Date().format('yyyy-MM-dd');
    format: function (date, f) {
        if (!f || f == "") { f = "yyyy/MM/dd"; }
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };
        if (/(y+)/.test(f))
            f = f.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(f))
                f = f.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        return f;
    },
    //获取时间差
    //_type ：D表示查询精确到天数的之差
    //_type ：H表示查询精确到小时之差
    //_type ：M表示查询精确到分钟之差
    //_type ：S表示查询精确到秒之差
    //_type ：T表示查询精确到毫秒之差
    //使用方法:
    //dateDiff('2007-4-1', '2007/04/19','D');
    dateDiff: function (date1, date2, _type) {
        _type = _type.toUpperCase();
        var _tmp = 1;
        switch (_type) {
            case "D": { _tmp = 1000 * 60 * 60 * 24; break; }
            case "H": { _tmp = 1000 * 60 * 60; break; }
            case "M": { _tmp = 1000 * 60; break; }
            case "S": { _tmp = 1000; break; }
            case "T": { _tmp = 1; break; }
            default: { _tmp = 1000; break; }
        }
        var dt1 = new Date(Date.parse(date1.replace(/-/g, '/')));
        var dt2 = new Date(Date.parse(date2.replace(/-/g, '/')));
        try {
            return Math.round((dt2.getTime() - dt1.getTime()) / _tmp);
        }
        catch (e) {
            console.log(e)
        }
    },
    //添加年
    addYear: function (date, num) {
        return this.add(date, 'yy', num);
    },
    //添加月
    addMonth: function (date, num) {
        return this.add(date, 'mm', num);
    },
    //添加日
    addDay: function (date, num) {
        return this.add(date, 'dd', num);
    },
    /** 
    * 累加时间 
    * @date {date} 要格式化的日期字符串 
    * @part {string} 时间部分 yy表示年 qq季度 mm月 wk星期 dd日 hh小时 mi分钟 ss秒 ms毫秒
    * @num  {int|string} 格式化字符 可为空 
    */
    add: function (date, part, num) {
        var datecopy;
        var ms = date.getTime();
        num = parseInt(num);
        switch (part) {
            case "ms":
                ms += num;
                break;
            case "ss":
                ms += 1000 * num;
                break;
            case "mi":
                ms += 60 * 1000 * num;
                break;
            case "hh":
                ms += 60 * 60 * 1000 * num;
                break;
            case "dd":
                ms += 24 * 60 * 60 * 1000 * num;
                break;
            case "wk":
                ms += 7 * 24 * 60 * 60 * 1000 * num;
                break;
            case "mm":
                datecopy = new Date(Date.parse(date));
                datecopy.setFullYear(date.getFullYear() + Math.floor((date.getMonth() + num) / 12));
                var mth = (date.getMonth() + num) % 12;
                if (mth < 0) mth += 12;
                datecopy.setMonth(mth);
                break;
            case "qq":
                datecopy = new Date(Date.parse(date));
                datecopy.setFullYear(date.getFullYear() + Math.floor((date.getMonth() + 3 * num) / 12));
                var mth2 = (date.getMonth() + 3 * num) % 12;
                if (mth < 0) mth2 += 12;
                datecopy.setMonth(mth2);
                break;
            case "yy":
                datecopy = new Date(Date.parse(date));
                datecopy.setFullYear(date.getFullYear() + num);
                break;
        }
        if (datecopy == null)
            return new Date(ms);
        else
            return datecopy;
    }
};

/************************************************* Function *****************************************************/
extensionFunc.Function = {
    //设置该方法延迟一定时间后执行，单位毫秒 例如test.timeout(1000)//1秒钟后执行 只执行一次
    timeout: function (fun, time) {
        return setTimeout(fun, time);
    },
    //设置该方法间隔一定时间执行一次，单位毫秒
    interval: function (fun, time) {
        return setInterval(fun, time);
    },
    //apply scope, and can transfer some arguments [设置方法新的作用域(this)，并且在新方法的所有参数之前插入一些参数]
    bind: function (fun) {
        var _this = arguments[1], args = [];
        for (var i = 2, il = arguments.length; i < il; i++) {
            args.push(arguments[i]);
        }
        return function () {
            var thisArgs = args.concat();
            for (var i = 0, il = arguments.length; i < il; i++) {
                thisArgs.push(arguments[i]);
            }
            return fun.apply(_this || this, thisArgs);
        }
    },
    //apply scope, and transfer event and some ohter arguments
    bindEvent: function (fun) {
        var _this = arguments[1], args = [];
        for (var i = 2, il = arguments.length; i < il; i++) {
            args.push(arguments[i]);
        }
        return function (e) {
            var thisArgs = args.concat();
            thisArgs.unshift(e || window.event);
            return fun.apply(_this || this, thisArgs);
        }
    },
    //clone function
    clone: function (fun) {
        var clone = function () {
            return fun.apply(this, arguments);
        };
        clone.prototype = fun.prototype;
        for (let prototype in fun) {
            // eslint-disable-next-line no-prototype-builtins
            if (fun.hasOwnProperty(prototype) && prototype != 'prototype') {
                clone[prototype] = fun[prototype];
            }
        }
        return clone;
    }
};

/************************************************* Array *****************************************************/
extensionFunc.Array = {
    /**
     *  方法:Array.indexOf(val)
     *  功能:根据元素值确定位置.
     *  参数:元素值
     *  返回:在原数组上修改数组
     * @param {*} val 
     */
    indexOfValue: function (arr,val) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === val) {
                return i;
            }
        }
        return -1;
    },
    /**
     *  方法:Array.removeValue(val)
     *  功能:根据元素值删除数组元素.
     *  参数:元素值
     *  返回:在原数组上修改数组
     * @param {*} val 
     */
    removeValue: function (arr,val) {
        var index = arr.indexOfValue(val);
        if (index > -1) {
            arr.splice(index, 1);
        }
    },
    /**
     *  方法:Array.remove(index)
     *  功能:根据元素位置值删除数组元素.
     *  参数:元素值
     *  返回:在原数组上修改数组
     * @param {*} index 
     */
    removeIndex: function (arr,index) {
        if (isNaN(index) || index > arr.length) {
            return false;
        }
        for (var i = 0, n = 0; i < arr.length; i++) {
            if (arr[i] != arr[index]) {
                arr[n++] = arr[i];
            }
        }
        arr.length -= 1;
    }
};

/************ 配套相关方法 **************/
extensionFunc.others = {
    ext: function (target, src, is) {
        if (!target) target = {};
        for (var it in src) {
            if (is) {
                target[it] = extensionFunc.Function.bind(function () {
                    var c = arguments[0], f = arguments[1];
                    var args = [this];
                    for (var i = 2, il = arguments.length; i < il; i++) {
                        args.push(arguments[i]);
                    }
                    return c[f].apply(c, args);
                }, null, src, it);
            } else {
                target[it] = src[it];
            }
        }
    },
    _onlyPush: function (arr, it) {
        if (it.constructor != Array) it = [it];
        return extensionFunc.Array.unique(arr.concat(it));
    }
};
/************ 初始化 **************/

extensionFunc.install = function () {
    console.log("run extensionFunc.install")
    extensionFunc.others.ext(String.prototype, extensionFunc.String, true); extensionFunc.others._onlyPush
    extensionFunc.others.ext(Function.prototype, extensionFunc.Function, true);
    extensionFunc.others.ext(Date.prototype, extensionFunc.Date, true);
    extensionFunc.others.ext(Array.prototype, extensionFunc.Array, true);
}

extensionFunc.install();
//#endregion