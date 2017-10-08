var app = new Vue({
	el:".span9",
	data: {
		api_url:'http://120.24.211.212:7777/v1/account',
		id:'',
		token:'',
		alldata:'',
		userId:-1,
		deleteID:-1,
},//数据结尾处

created: function () {
	this.fetchData();
},

methods:{
	fetchData:function(){
		console.log("你好");
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

		var instance = axios.create({
			timeout: 1000,
			async:true,
			crossDomain:true,
			headers: {
				'id': that.id,
				'token':that.token,
			},
		});
		instance.get(that.api_url)
		.then(function (response) {
			console.log(JSON.stringify(response));
			that.alldata = response.data.data.data;
		})
		.catch(function (error) {
			console.log(error);
		});

	},//获得数据的函数

	deleteUser:function(event){
		var that = this;
		var url = that.api_url +'/' + this.deleteID;
        console.log("删除de ："+url);
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
            that.fetchData();
		})
		.catch(function (error) {
			console.log(error);
		});


	},

	//编辑部门
		editUser:function(event){
          
          console.log(event);
          // console.log("数据中的"+this.alldata[event].sex);
         var selectUser = JSON.stringify(this.alldata[event]);
         window.sessionStorage.setItem('selectUser',selectUser);
         console.log(selectUser);
         location.href="user.html";

		},






},//方法结尾

})//此处结尾