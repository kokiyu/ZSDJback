var app = new Vue({
	el:".span9",
	data:{
		alldata:[],
		index_now:-1,
		edit_now:-1,
		current_page:1,
		totalPage:[],
		totalPage2:-1,
	},
	created: function () {
		this.fetchData();
	},
	
	methods:{
		fetchData:function(){
			var that =this;
			//请求数据
			that.totalPage = [];

			axios.get('http://120.24.211.212:7777/v1/dept',{
				params:{
					page:that.current_page,
				},
			})
			.then(function (response) {
	        //部门返回的数据
	        result = JSON.stringify(response);
	        // console.log("返回的数据:"+result);
	        // console.log("所需要的数据模型:"+ JSON.stringify(response.data.data.data));
	        that.alldata = response.data.data.data;
	        // console.log("查看赋值情况:"+ that.alldata[0].id);
	        that.totalPage2  = response.data.data.pagination.total_page;
	        for (var i = 0; i <= that.totalPage2 - 1; i++) {
	        	that.totalPage =  that.totalPage+i;
	        }
	    })
			.catch(function (error) {
				console.log("错误:"+error);
			});
		},

		//添加部门
		addData:function(){

			var that =this;
			var add =  prompt("新部门的名称:","20");
			console.log("add:"+add);
         //添加数据
         axios.post('http://120.24.211.212:7777/v1/dept',{
         	dept_name:add,
         })
         .then(function(response){
         	result = JSON.stringify(response);
         	console.log(result);
         	that.fetchData();
         })
         .catch(function (error) {
         	console.log("错误:"+error);
         });
     },

		//删除部门
		deleteDept:function(event){
			console.log(this.index_now);
			let that = this;
			var str = 'http://120.24.211.212:7777/v1/dept/' + this.index_now;
			axios.delete(str)
			.then(function(response){
				result = JSON.stringify(response);
				console.log(result);
				that.fetchData();

			})
			.catch(function (error) {
				console.log("错误:"+error);
			});

		},

		//编辑部门
		editDept:function(event){
			console.log(event);
			let that = this;
			var edit =  prompt("修改部门的名称:","");
			console.log(edit);
			var str = 'http://120.24.211.212:7777/v1/dept/' + event;
			axios.put(str,{
				dept_name:edit	
			})
			.then(function(response){
				result = JSON.stringify(response);
				console.log(result);
				that.fetchData();

			})
			.catch(function (error) {
				console.log("错误:"+error);
			});
		},



	},

})