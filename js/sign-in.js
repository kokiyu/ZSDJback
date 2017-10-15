var app = new Vue({
	el:'#login',
	data:{
		userName:'caap',
		password:'admin123',
		token:'',
		id:'',
		api:"http://120.24.211.212:7777/v1/users/signin",
		vcodeurl:'http://120.24.211.212:7777/v1/users/requestcode',
	},
	methods:{
		login:function(){
			console.log(this.userName);
			console.log(this.password);
			var that = this;

			axios.post(that.api, {
				account: that.userName,
				password:that.password,
			})
			.then(function (response) {
		//注册返回的数据
		result = JSON.stringify(response);
		console.log("result:"+result);
		//登录失败返回的数据
        //登录失败返回的数据
        let result2 = response.data.data.msg;
		//注册情况
		let msg1 = JSON.stringify(response.data.message);
		console.log("登录情况："+msg1);
        //登录情况返回成功字符
        if (msg1.indexOf("成功") > -1 ) {
        	 // window.location.href=("./index.html");
        	 console.log("id:"+response.data.data.data.id);
        	 console.log("token"+response.data.data.data.token);
        	 that.token =  response.data.data.data.token;
        	 that.id = response.data.data.data.id;
//              url = "index.html?token="+that.token; 
// 　          　url += "&id=" + that.id;
       document.cookie="id="+that.id;
       document.cookie="token="+that.token; 
       document.cookie="name="+that.userName;    　    
   　    
     　location.href="./department.html";
           
 	}
        	else{
        		let finResult = result2.join("，");
        		console.log(finResult);
        		window.alert(finResult);
        	}

        })
			.catch(function (error) {
				console.log("错误:"+error);
			});
		},
	},
	
})