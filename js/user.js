var app = new Vue({
	el:".span9",
	data: {
		id:'',
		token:'',
		alldata:{
		},
		dept_id:0,
		sex:0,
		username:'用户名不可更改',
		hiredate:'',
		birthday:'',
		education:'',
		nickname:'',
		selected:'',
		api_url:'http://120.24.211.212:7777/v1/account',
		user_id:0,

},//数据结尾处

created: function () {
	this.fetchData();
},
methods:{
	fetchData:function(){
		var arr = sessionStorage.getItem('selectUser');
		console.log("Arr"+arr);
		this.alldata = JSON.parse(arr);
		this.dept_id=this.alldata.dept_id;
		this.username=this.alldata.username;
		this.sex=this.alldata.sex;
		this.hiredate=this.alldata.hiredate;
		this.birthday=this.alldata.birthday;
		this.education=this.alldata.education;
		this.hiredate=this.alldata.hiredate;
        this.nickname=this.alldata.nickname;
        this.user_id=this.alldata.id;
		let id = "id" + "=";
		let token = "token" + "=";
		let that =this;
    if (this.id.length > 4) {
    	return;
    }

	var cookie = document.cookie.split(';');
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

	},
	saveData:function(){
        var that = this;
		var instance = axios.create({
			timeout: 1000,
			async:true,
			crossDomain:true,
			headers: {
				'id': that.id,
				'token':that.token,
			},
		});

		url = 'http://120.24.211.212:7777/v1/account'+'/'+this.alldata.id;
		console.log(url);

   	instance.put('http://120.24.211.212:7777/v1/account'+'/'+this.alldata.id,{
		dept_id:that.dept_id,
		sex:that.sex,
		username:that.username,
		hiredate:that.hiredate,
		birthday:that.birthday,
		education:that.education,
	    nickname:that.nickname,
	    role:that.selected,
   	})
		.then(function (response) {
			console.log(JSON.stringify(response));
            window.alert(response.data.message);
            window.location.href="users.html";
		})
		.catch(function (error) {
			console.log(error);
		});

	},

	deleteUser:function(event){
		var that = this;
		var url = 'http://120.24.211.212:7777/v1/account'+'/'+this.alldata.id;
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
			console.log("删除后获得的响应:"+JSON.stringify(response.data.data.data.message));
         if (response.data.message == "删除成功") {

          window.alert("删除成功！");
         }


		})
		.catch(function (error) {
			console.log(error);
		});


	},

},


})