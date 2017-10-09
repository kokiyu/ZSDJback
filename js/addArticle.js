var app = new Vue({
	el:".span9",
	data: {
		id:-1,
		token:-1,
		isAdd:true,
		upload_api:'http://120.24.211.212:7777/v1/utils/file',
		article_api:'http://120.24.211.212:7777/v1/category',///v1/category/
		alldata:{
			create_time:" ",
			id:0,
			image:'./images/upload.png',
			title:" ",
		},
		

	},

	created: function () {
		this.fetchData();
	},
	methods:{
		fetchData:function(){
			this.getCookie();
			var arr = sessionStorage.getItem('selectArticle');
			var data = JSON.parse(arr);
			if (data==null) {
				return;
			}
			this.isAdd=false;
			this.alldata=data;
			sessionStorage.setItem('selectArticle',null);
		},
		saveData:function(){
			var url=this.article_api;
			if (!this.isAdd) {
				url+='/'+this.alldata.id;
			}
			console.log("saveData"+url);
			var that = this;
			var instance=this.axiosCreate({
				'id': this.id,
				'token':this.token,
			});
			if (!this.isAdd) {
				instance.put(url,this.alldata)
				.then(this.handleData)
				.catch(function (error) {
					console.log('ddddddddddddddd');
				});
			}else{
				instance.post(url,this.alldata)
				.then(this.handleData)
				.catch(function (error) {
					console.log('ddddddddddddddd');
				});
			}
		},
		deleteData:function(){
			var url=this.article_api+'/'+this.alldata.id;
			console.log(url);
			var that = this;
			this.axiosCreate({
				'id': this.id,
				'token':this.token,
			})
			.delete(url,this.alldata)
			.then(this.handleData)
			.catch(function (error) {
				console.log(error);
			});
		},
		handleData:function(response){
			console.log(JSON.stringify(response));
			alert(response.data.message);
			if (response.data.code==200) {
				console.log('isAdd='+this.isAdd+" ;message="+response.data.message);
			}
		},
		/*获取Cookie信息*/
		getCookie:function(){
			var cookie = document.cookie.split(';');
			for(var i=0; i<cookie.length; i++) 
			{
				var c = cookie[i].trim().split('=');
				if (c[0].indexOf('id')>=0){
					this.id = c[1];
				}else if (c[0].indexOf('token')>=0) {
					this.token = c[1];
				}
			}
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
		var that=this;
		//创建form对象
		let param = new FormData();
		//通过append向form对象添加数据
		param.append('file',file,file.name);
		this.axiosCreate({
			'id': this.id,
			'token':this.token,
		})
		.post(this.upload_api,param)
		.then(function(response){
			console.log(JSON.stringify(response) );
			alert(response.data.message);
			if (response.data.code==200) {
				that.alldata.image=response.data.data.image_url;
			}
		});
	},
	axiosCreate:function(headers){
		return axios.create({
			timeout: 1000,
			async:true,
			crossDomain:true,
			headers: headers
		});
	},

},
})