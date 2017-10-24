

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
        users:'',
        image:'images/upload.png',
        deptData:[],
        members:[],
        dept_url:'http://120.24.211.212:7777/v1/utils/deptwithmember',
        number:'',
        memLength:'',



},//数据结尾处

created: function () {
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
            let that = this;
            axios.get(that.dept_url)
            .then(function (response) {
                console.log(JSON.stringify(response));
                that.deptData = response.data.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });

        },
        listChange:function(index){

         this.number = index;
     },

    addPeople:function(id){
        if (this.users == "") {
            this.users = id;
        }else{
  this.users = this.users +","+id;}
    },
    cardData:function(){
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

    var instance = axios.create({
        timeout: 1000,
        async:true,
        crossDomain:true,
        headers: {
            'id': that.id,
            'token':that.token,
        },
    });

},

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
        end_time:that.end_time,
        image:that.image

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
        alert("添加成功");
        window.location.href  = "meeting.html";
    }
})
    .catch(function (error) {
        console.log(error);
    });

},
fileClick:function(){
    document.getElementById('upload_file').click()
},
fileChange:function(el){
    if (!el.target.files[0].size)
        return;
    var file= el.target.files[0];
        //上传图片
        this.uploadFile(file);
    },
    uploadFile:function(file){ 
        let that=this;
        //创建form对象
        let files = new FormData();
        //通过append向form对象添加数据
        files.append('file',file,file.name);
        var instance = axios.create({
            timeout: 1000,
            async:true,
            crossDomain:true,
            headers: {
                'id': that.id,
                'token':that.token,
            },
        });
        axios.post('http://120.24.211.212:7777/v1/utils/file',files)
        .then(function(response){
            console.log(JSON.stringify(response) );
            alert(response.data.message);
            if (response.data.code==200) {
                that.image=response.data.data.image_url;
            }
        });

    },

},//方法结尾

})//此处结尾