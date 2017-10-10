var app = new Vue({
    el:".span9",
    data: {
        title:'',
        content:'',
        id:'',
        token:'',
        api_url:'http://120.24.211.212:7777/v1/bbs',
        image:'images/upload.png',

},//数据结尾处

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
        content:that.content,
        image_url:that.image,
    })
    .then(function (response) {
        console.log(JSON.stringify(response));
        if(response.data.code !="200"){
        alert(response.data.message);
        return;
        }
        else{
            alert("通知添加成功！");
            location.href = "BBS.html"
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