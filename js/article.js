var app = new Vue({
	el:".span9",
	data:{
		api_url:'http://120.24.211.212:7777/v1/category',
		alldata:[],
		index_now:-1,
		edit_now:-1,
		id:null,
		token:null,
		row:0,
		selectData:null,
	},
	created: function () {
		this.fetchData();
	},
	

	methods:{
	printBox:function(row,index,tag){
			let articleId = this.fvbyindex(row,index,tag);
          location.href="editArticle.html?artId="+articleId;
	},
		fetchData:function(){
 			//请求数据
			this.getCookie();
			this.axiosCreate({
					'id': this.id,
					'token':this.token,
				})
			.get(this.api_url)
			.then(this.handleData)
			.catch(function (error) {
				console.log("错误:"+error);
			});
		},
		handleData:function(response){
			//数据返回分类
			console.log(JSON.stringify(response));
			var rData=response.data;
			if (rData.code==200) {
	        	this.alldata = rData.data.data;
	        	this.row=parseInt(this.alldata.length/3);
	        	if (this.alldata.length%3!=0) {
	        		this.row++;
	        	}
	        	console.log(this.row)
			}
			else {
				alert(rData.message);
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
		deleteClick:function(event){
			this.selectData=event;
		},
		//删除部门
		deleteDept:function(){
			if (!this.selectData) {
				return;
			}
			let that = this;
			var str = this.api_url+"/" + this.selectData.id;
			this.selectData=null;
			this.axiosCreate({
					'id': this.id,
					'token':this.token,
				})
			.delete(str) 
			.then(function(response){
				console.log(JSON.stringify(response));
				that.fetchData();
			})
			.catch(function (error) {
				console.log("错误:"+error);
			});
		},
		//编辑部门
		updateClick:function(event){
         var selectArticle = JSON.stringify(event);
         sessionStorage.setItem('selectArticle',selectArticle);
         console.log(selectArticle);
         location.href="addArticle.html";
		},
		/*获取跨域请求实例*/
		axiosCreate:function(headers){
			return axios.create({
				timeout: 1000,
				async:true,
				crossDomain:true,
				headers: headers
			});
		},
		fvbyindex:function(row,index,tag){
			console.log(row+":::"+index+":::"+tag);
			row--;
			var inx=row*3+index;
			if (tag==1) {
				return this.alldata[inx];
			}else if(tag==2){
				return this.alldata[inx].image;
			}
			else if(tag==3){
				return this.alldata[inx].title;
			}
			else if(tag==4){
				return this.alldata[inx].id;
			}
		}
		
	},


})