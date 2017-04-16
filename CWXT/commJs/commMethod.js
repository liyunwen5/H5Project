//获取当前时间，格式YYYY-MM-DD HH:MM:SS
    function _getNowFormatDateTime() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var hour = date.getHours();
        var minutes  = date.getMinutes();
        var seconds = date.getSeconds();
        if (month < 10) {
            month = "0" + month;
        }
        if (strDate < 10) {
            strDate = "0" + strDate;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate + " "+ 
        	hour + seperator2 + minutes + seperator2 + seconds;
        return currentdate;
    }