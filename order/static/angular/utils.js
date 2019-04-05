var getDb = function(http,dbname,type,callback){
    http({
        method: 'GET',
        url: '/mydb?dbname='+dbname+'&type='+type
    }).then(function(response){
        console.log('Get '+dbname+' success');
        callback(response.data);
    },function(response){
        console.log('Get '+dbname+' error');
    });
};

var setDb = function(http,dbname,type,postdata,callback){
    var dataobj = {
        method: 'POST',
        url: '/mydb?dbname='+dbname+'&type='+type,
        data: postdata
    };
    http(dataobj).then(function(response){
        console.log(dataobj.method,dataobj.url,"success");
        callback(response);
    },function(response){
        console.log(dataobj.method,dataobj.url,"error");
    });
}

var getDbSort = function(http,dbname,type,sortTarget,sortType,callback){
    http({
        method: 'GET',
        url: '/mydb?dbname='+dbname+'&type='+type+"&sortTarget="+sortTarget+"&sortType="+sortType
    }).then(function(response){
        console.log('Get '+dbname+' success');
        callback(response.data);
    },function(response){
        console.log('Get '+dbname+' error');
    });
};

var getOthersValue = function(result,name){
    for(var i=0;i<result.length;i++){
        if( result[i].name == name ){
            return result[i].value;
        }
    }
};

var resultSum = function(result){
    for(var i=0;i<result.length;i++){
        var sum =0;
        for(var j=0;j<result[i].order.length;j++){
            sum += parseInt(result[i].order[j].price)*parseInt(result[i].order[j].count);
            result[i].sum = sum;
        }
    }
};

var formatTime = function(d){
    return d.getMonth()+1+"/"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+"."+d.getMilliseconds();
};

var getPathParm = function(item){
    var url = location.href;
    var ret = "";

    if(url.indexOf('?')!=-1)
    {
        var ary = url.split('?')[1].split('&');

        for(i=0;i<=ary.length-1;i++)
        {
            if(ary[i].split('=')[0] == item)
                ret = ary[i].split('=')[1];
        }
    }
    return ret;
};

var getMultiLanguage = function(langId){
    var lang = [
        {
            user : "User",
            tablenumber : "Table Number",
            tackout : "Tackout",
            name : "Name",
            price : "Price",
            count : "Count",
            sendOrder : "Send Order",
            orderStatus : "Order Status",
            time : "Time",
            order : "Order",
            status : "Status",
            sum : "Sum",
            detal : "Detal",
            pleaseChoiseTablenumber : "Please choice table number",
            pleaseChoiseMenu : "Please choice menu",
            admin : "Admin",
            modifyConfigs : "Modify Configs",
            menu : "Menu",
            others : "Others",
            report : "Report",
            chart : "Chart",
            addMenu : "Add Menu",
            descript : "Descript",
            save : "Save",
            menuList : "Menu List",
            sequence : "Sequence",
            delall : "Delall",
            del : "Delete",
            modify : "Modify",
            tableCounts : "Table Counts",
            businessTime : "Business Time",
            backup : "Backup",
            export : "Export",
            restore : "Restore",
            restoreFromDropbox : "Restore from Dropbox",
            dropboxAccessToken : "Dropbox Access Token",
            multiLanguage : "Multi Language",
            english : "English",
            chinese : "Chinese",
            seller : "Seller",
            userOrder : "User Order",
            action : "Action",
            complete : "Complete",
            modifyOrder : "Modify Order",
            cannotModify : "Can not Modify",
            addDel : "Add / Delete",
            confirm : "Confirm",
            notReady : "Not Ready",
        },
        {
            user : "顧客/使用者",
            tablenumber : "桌號",
            tackout : "外帶",
            name : "名稱",
            price : "價格",
            count : "數量",
            sendOrder : "傳送訂單",
            orderStatus : "訂單狀態",
            time : "時間",
            order : "訂單",
            status : "狀態",
            sum : "加總",
            detal : "詳細",
            pleaseChoiseTablenumber : "請選擇桌號",
            pleaseChoiseMenu : "請選擇菜單",
            admin : "管理者",
            modifyConfigs : "修改設定",
            menu : "選單",
            others : "其他",
            report : "報表",
            chart : "圖表",
            addMenu : "新增選單",
            descript : "描述",
            save : "儲存",
            menuList : "選單列表",
            sequence : "順序",
            delall : "刪除全部",
            del : "刪除",
            modify : "修改",
            tableCounts : "桌數",
            businessTime : "營業時間",
            backup : "備份",
            export : "匯出",
            restore : "還原",
            restoreFromDropbox : "從Dropbox還原",
            dropboxAccessToken : "Dropbox Access Token",
            multiLanguage : "多國語言",
            english : "英文",
            chinese : "繁體中文",
            seller : "接單人員",
            userOrder : "顧客訂單",
            action : "動作",
            complete : "完成",
            modifyOrder : "修改訂單",
            cannotModify : "無法修改",
            addDel : "新增/刪除",
            confirm : "確認",
            notReady : "未完成",
        }
    ];

    return lang[langId];
};
