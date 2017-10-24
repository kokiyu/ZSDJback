var app = new Vue({
	el:".span9",
	data: {
		api_url:'http://120.24.211.212:7777/v1/article',
		id:'',
		articleId:'',
		token:'',
		alldata:'',
		deleteID:-1,
		page:1,
		current_page:1,
		totalPage:[],
		totalPage2:-1,
},//数据结尾处

created: function () {
	this.fetchData();
},

methods:{
	fetchData:function(){
		console.log("你好,这里是文章界面！");
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

//获得文章id
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
  console.log(theRequest.artId);
  this.articleId = theRequest.artId;

  var instance = axios.create({
  	timeout: 1000,
  	async:true,
  	crossDomain:true,
  	headers: {
  		'id': that.id,
  		'token':that.token,
  	},
  	params:{
  		page:that.current_page,
  		c_id:that.articleId,
  	}
  });
  instance.get(that.api_url)
  .then(function (response) {
  	console.log(JSON.stringify(response));
  	 if (response.data.code != "200") {
          	alert(response.data.message);
          	return;
          }

  	that.alldata = response.data.data.data;
  	that.totalPage2  = response.data.data.pagination.total_page;
			for (var i = 0; i <= that.totalPage2 - 1; i++) {
				that.totalPage =  that.totalPage+i;
			}
  })
  .catch(function (error) {
  	console.log(error);
  });

	},//获得数据的函数
	addData:function(){

		var title = prompt("请输入文章标题", "");  
		var url = prompt("请输入该文章的url","");
		let that = this;
		var instance = axios.create({
			timeout: 1000,
			async:true,
			crossDomain:true,
			headers: {
				'id': that.id,
				'token':that.token,
			},
			params:{
				c_id:that.articleId,
			}
		});
		instance.post(that.api_url,{
			title:title,
			url:url,
			c_id:that.articleId,
		})
		.then(function (response) {
			if (response.data.code != 200) {
				alert(response.data.message);
			}
			that.fetchData();

			console.log(JSON.stringify(response.data.data.message));
		})
		.catch(function (error) {
			console.log(error);
		});

		that.fetchData();

	},
	deleteData:function(event){
		let that = this;
		let url = that.api_url +'/' + this.deleteID;
		console.log("删除的文章 ："+url);
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
			params:{
				c_id:that.articleId,
			},
		});

		instance.delete(url)
		.then(function (response) {
			console.log(JSON.stringify(response));
			that.fetchData();
		})
		.catch(function (error) {
			console.log(error);
		});


	},

	//编辑文章
	editData:function(index,id){

		console.log(index+"  "+id);
		var title = prompt("请输入需修改的文章标题", this.alldata[index].title);  
		var url = prompt("请输入该文章的url",this.alldata[index].url);
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

		instance.put(that.api_url+'/'+id,{
			title:title,
			url:url,
			c_id:that.articleId,
		})
		.then(function (response) {
			console.log(JSON.stringify(response));
			that.fetchData();
		})
		.catch(function (error) {
			console.log(error);
		});
	},






},//方法结尾

})//此处结尾