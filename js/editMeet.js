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
        alldata:'',
        meetId:'',
    

},//数据结尾处
created:function(){
 this.fetchData();
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
  fetchData:function(){
    //截取token 和 id;
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


//获得会议id
    var url=JSON.stringify(location.search);
  var url = location.search; //获取url中"?"符后的字串
   var theRequest = new Object();
   if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
         theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
      }
   }
   console.log(theRequest.meetId);

   this.meetId = theRequest.meetId;
        var instance = axios.create({
            timeout: 1000,
            async:true,
            crossDomain:true,
            headers: {
                'id': that.id,
                'token':that.token,
            },
        });

        instance.get(that.api_url+'/'+theRequest.meetId)
        .then(function (response) {
            console.log(JSON.stringify(response));
            that.alldata = response.data.data.data;
            that.title = that.alldata.title;
            that.location = that.alldata.location;
            that.start_time = that.alldata.start_time;
            that.end_time = that.alldata.end_time;
            that.describe = that.alldata.describe;
            that.dept_ids = that.alldata.dept_ids;
        })
        .catch(function (error) {
            console.log(error);
        });
  },

  //编辑会议
  saveData:function(){
    let that = this;
     var instance = axios.create({
            timeout: 1000,
            async:true,
            crossDomain:true,
            headers: {
                'id': that.id,
                'token':that.token,
            },
        });
      console.log("调用了编辑会议");
      instance.put(that.api_url+'/'+that.meetId,{
        'title': that.alldata.title,
        'location': that.alldata.location,
        'start_time': that.alldata.start_time,
        'end_time': that.alldata.end_time,
        'describe': that.alldata.describe,
        'dept_ids': that.alldata.dept_ids,
      })
        .then(function (response) {
            console.log(JSON.stringify(response));
            console.log("message:"+response.data.message);
            if (response.data.message == "修改成功") {
                alert("修改成功！");
                location.href = "meeting.html";
            }
        })
        .catch(function (error) {
            console.log(error);
        });
  },

  deleteDept:function(){
        var that = this;
        var url = that.api_url +'/' + this.meetId;
        console.log("删除的会议 ："+url);
        console.log(that.id);
        console.log(that.token);
        var instance = axios.create({
            timeout: 1000,
            async:true,
            crossDomain:true,
            headers: {
                'id': that.id,
                'token':that.token,
            },
        });

        instance.delete(url)
        .then(function (response) {
            console.log(JSON.stringify("删除后获得的响应:"+response));
        })
        .catch(function (error) {
            console.log(error);
        });
    },


},//方法结尾

})//此处结尾