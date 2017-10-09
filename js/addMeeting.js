var app = new Vue({
    el:".span9",
    data: {
        title:'',
        location:'',
        start_time:'',
        end_time:'',
        describe:'',
        dept_ids:'',
        id:'',
        token:'',
        api_url:'http://120.24.211.212:7777/v1/meeting',

},//数据结尾处

created: function () {
},
mounted:function(){
    let that = this;
    laydate.render({
        elem: '#start-time'
        ,type: 'datetime'
        ,done: function(value, date){
            that.start_time = value;
        }
    });
    laydate.render({
        elem: '#end_time'
        ,type: 'datetime'
        ,done: function(value, date){
            that.end_time = value;
        }
    });
},
methods:{
   saveData:function(){
    let id = "id" + "=";
    let token = "token" + "=";
    var cookie = document.cookie.split(';');
    let that =this;
    for(var i=0; i<cookie.length; i++) 
    {
        var c = cookie[i].trim();
        if (c.indexOf(id)==0){
            that.id = c.substring(id.length,c.length);
        }
        if (c.indexOf(token)==0) {
            that.token = c.substring(token.length,c.length);
        }
    }
    console.log("获得的id"+that.id +"获得的token:"+that.token);
    console.log("开始的时间"+that.start_time);
    console.log("会议名"+that.title);


    var instance = axios.create({
        timeout: 1000,
        async:true,
        crossDomain:true,
        headers: {
            'id': that.id,
            'token':that.token,
        },
    });
    instance.post(that.api_url,{
        title:that.title,
        describe:that.describe,
        dept_ids:that.dept_ids,
        location:that.location,
        start_time:that.start_time,
        end_time:that.end_time
    })
    .then(function (response) {
        console.log(JSON.stringify(response));
        if (typeof(response.data.data) == "undefined") {
         if (typeof(response.data.message) != "undefined" ) {
            alert("参会部门为空或者部门不存在!");
         }
        }
        
        else if (typeof(response.data.data.msg) != "undefined") {
            let finResult = response.data.data.msg.join(",");
            alert(finResult);
         }
         else{
            alert("修改成功");
            window.location.href  = "meeting.html";
         }
    })
    .catch(function (error) {
        console.log(error);
    });

},

},//方法结尾

})//此处结尾