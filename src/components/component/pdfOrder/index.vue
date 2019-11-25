<template>
    <div class="excilAndimg-container">
        <div class="excil" v-if="excelSelected">
            <div class="zhezhao_file">
				<div class="zhezhaoBox">
					<div class="zhezhaoBox1">
						<div class="zhezhaoBox1_top">
								上传pdf文件  <span class="glyphicon glyphicon-remove" @click="imgBoxclear()"></span>
						</div>
						<div class="zhezhaoBox1_cont zhezhaoBox1_cont_file" >
							<ul style="display:none;">
								<li class="fileBox" @click="fileClick()">
									<!-- <img src="../../assets/image/xlsbg.png" alt="" > -->
									<div>{{imgName}}</div>
								</li>
							</ul>
						</div>
                        <!-- （按照模板格式上传） -->
						<div class="zhezhaoBox1_bottom"><span style="color:#1e2227;">请上传一个文件</span>
							<div style="width:50%">
								<div @click="imgBoxclear()">取消</div>
								<div class="whd_file_delete" @click="fileDelete()" ref="delete">删除</div>
								<div @click="fileSubmit()" >确认</div>
								<!-- <div style="width:65px;" @click="exclDowload()">
										<a class ="dowloadexcl" href="http://chengji-tms.oss-cn-shanghai.aliyuncs.com/%E4%B8%8B%E5%8D%95%E6%A8%A1%E7%89%88.xls" style="color:#fff;">模板下载</a>
								</div> -->
							</div>
							<form id="fileForm" action="">
								<div class="file_whd_box">
									<div style="width: 100px">上传文件</div>
									<input type="file" id="myFile" @input="fileChange()" name="file"> 
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
        </div>
        <div class="img" v-if="imgSelected">
            <div class="zhezhaoBox">
                <div class="zhezhaoBox1">
                    <div class="zhezhaoBox1_top">
                            图片下单  <span class="glyphicon glyphicon-remove" @click="imgBoxclear()"></span>
                    </div>
                    <div class="zhezhaoBox1_cont"  id="zhantieBox">图片展示区（可以点击删除）
                        <img v-for="(item,i) in imgArr" :key="i" :src="item" @click="imgClick(i)" alt="">
                    </div>
                    <div class="zhezhaoBox1_bottom"><span></span>
                        <div>
                            <div @click="imgBoxclear()">取消</div>
                            <div @click="imgBoxsubmit()">确认</div>
                            <div class="whd_delete" @click="imgDelete()">删除</div>
                        </div>
                        <form action="">
                            <div>
                                <div class="whd_delete">上传图片</div>
                                <input type="file" name="myFile" id="myiImg" multiple="multiple"  > 
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="world" v-if="wordSelected">
            word
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            imgArr:[],
            imgSelected:'',
            imgIndex:9999,
            imgSelected:true,
            excelSelected:true,
            wordSelected:true,
            imgName:'',
            fileArr:'',
            updateSelected:true,
            timer:''
        }
    },
    created(){
        if(JSON.parse(sessionStorage.getItem('obj'))){
             this.obj = JSON.parse(sessionStorage.getItem('obj'))
        }
        switch(this.selected){
            case 1: this.excelSelected = false; this.wordSelected = false; break;
            case 2: this.imgSelected = false; this.wordSelected = false; break;
            case 3: this.imgSelected = false; this.excelSelected = false; break;
        }
        
    },
    mounted(){
        switch(this.selected){
            case 1: this.PictureProcessing(); break;
        }
    },
    
    props:['selected'],
    methods:{
        imgBoxclear(){
            this.$emit('excilFn',false)
        },
        substring(str){
			var reg = /\./
			if(!reg.exec(str)){
				return str
			}
			return this.substring(str.substring(reg.exec(str).index+1,str.length))
        },
        imgDelete(){
            this.imgArr.splice(this.imgIndex,1)
        },
        imgClick(index){
            var that = this
            this.$('#zhantieBox img').each(function(item,i){
                if(item == index){
                    that.$(i).css('border','3px solid orange').siblings('img').css('border','none')
                    that.imgSelected = i
                    that.imgIndex = item
                }
            })
        },
        imgBoxsubmit(){
            
            if(this.imgArr.length <= 0){
                this.$message({message:'请上传一张图片',type:'warning'})
                return
            }
            if(!this.updateSelected){
                console.log(this.updateSelected)
                return
            }
            clearTimeout(this.timer)
            this.updateSelected = false
            var data = {
                imgs:this.imgArr,
                companyId: this.obj.companyId,
                customerId: this.obj.customerId,
                customerName:this.obj.name
            }
            this.axios.post('customerImg/saveCustomerImg',data,).then(res=>{
                if(res.data.code === '1'){
                    this.$message({
                        message:'上传成功',
                        type:'success'
                    })
                    this.updateSelected = true
                    this.imgBoxclear()
                }else{
                    this.$message.error(res.data.message)
                    this.updateSelected = true
                    this.imgBoxclear()
                }
            })
            this.timer = setTimeout(()=>{
                if(!this.updateSelected){
                    this.$message.error('请求超时')
                    this.updateSelected = true
                }
            },60000)
        },
        PictureProcessing() {
			// 发送数据的图片集合
			var that = this
			// 存放选中的图片
			var selected;
			var flag;
			//添加监听ctrl+v事件     
			var box = document.querySelector('#zhantieBox')
			box.addEventListener('paste', function (e) {
				if(that.imgArr.length>= 10){
					that.$message.error('最多上传10张图片')
					return
				}
				var cbd = e.clipboardData;
				var ua = window.navigator.userAgent;
				// 剪贴板不存在直接退出
				if (!(e.clipboardData && e.clipboardData.items)) {
					return;
				}
				for (var i = 0; i < cbd.items.length; i++) {
					var item = cbd.items[i]
					if (item.kind == 'file') {
						var blod = item.getAsFile()
						if (blod.size == 0) {
							return
						}
						var reader = new FileReader()
						reader.onload = function () {
							return function (e) {
								that.imgArr.push(e.target.result)
							}
						}()
						reader.readAsDataURL(blod);
						var zhantieBox = document.querySelector('#zhantieBox')
						zhantieBox.style.fontSize = '0px'
						zhantieBox.style.lineHeight = '0px'
					}  
				}
			  
            }, false)
            that.$('#myiImg').on('change', function () {
					var zhantieBox = document.querySelector('#zhantieBox')
					var file = document.querySelector("#myiImg").files;
					if(that.imgArr.length + file.length>= 10){
						sweet.auto('最多上传10张图片')
						return
					}
					for (var i = 0; i < file.length; i++) {
						(function (i) {
							if(that.substring(file[i].name) != 'jpg' && that.substring(file[i].name) != 'png' && that.substring(file[i].name) != 'pdf'){
								that.$message.error('请上传png/jpg/pdf格式的图片')
								return
							}else{
								var reader = new FileReader();
								reader.readAsDataURL(file[i]);
								reader.onload = function () {
									/*展示*/
									that.imgArr.push(reader.result)
								}
								that.$('#myImg').attr('type','text')
								that.$('#myImg').attr('type','file')
							}
							
						})(i)

					}
					zhantieBox.style.fontSize = '0px'
					zhantieBox.style.lineHeight = '0px'
					that.$("#myiImg").val('');
			})
        },
        fileSubmit(){
            
            if(this.fileArr === ''){
				this.$message({message:'请上传一个文件',type:'warning'})
				return
            }
            if(!this.updateSelected){
                return
            }
            this.updateSelected = false
            var data = new FormData();//重点在这
            data.append("file",this.fileArr)
            data.append("companyId",this.obj.companyId)
            data.append("customerId",this.obj.customerId)
            data.append("customerName",this.obj.name)
            this.axios.post('customerImg/uploadExcelOrder',data).then(res=>{
				if(res.data.code === '1'){
                    this.$message({message:'上传成功',type:'success'})
                    this.imgBoxclear()
                    this.updateSelected = true
					return
				}else{
                    this.$message.error(res.data.message)
                    this.imgBoxclear()
                    this.updateSelected = true
				}
            })
            setTimeout(()=>{
                if(!this.updateSelected){
                    this.$message.error('上传超时')
                    this.updateSelected = true
                }
            })
        },
        fileClick(){
            this.$('.fileBox').css('border','3px solid orange')
        },
        fileChange(){
			var that = this
			var file = document.querySelector("#myFile").files[0];
			if(!file){
				return
			}
			if(file.name && that.substring(file.name) === 'xls'){
				that.imgName = file.name
				that.$('.zhezhaoBox1_cont_file ul').css('display','block')
				if(!that.fileSelected){
					that.fileSelected = that.$('.fileBox')
				}
				that.fileSelected.css('display','block')
				that.fileSelected.css('border','none')
				that.fileArr = file
			}else{
				this.$message.error('请上传xls格式的文件')
			}
			that.$("#myFile").val('');
        },
        fileDelete(){
			this.fileSelected.css('display','none')
			this.fileArr = ''
        },
        exclDowload(){

        }
    }
}
</script>

<style lang="less">
    .excilAndimg-container{
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.3);
        z-index:10000;
        .excil{
            .zhezhao_file{
                    .whd_yanshi{
                        background-color: #cdcdcd !important;
                        color:white !important;
                        font-weight:700 !important;
                    }
                    position: fixed;
                    width: 100%;
                    height: 100%;
                    background-color:rgba(0,0,0,.3);
                    top:0;
                    left:0;
                    z-index:1000;
                    .zhezhaoBox{
                        width: 540px;
                        height: 434px;
                        background-color: #ccc;
                        border-radius:10px;
                        padding:10px;
                        position: absolute;
                        top:50%;
                        left:50%;
                        transform:translate(-50%,-50%);
                        
                    
                        .zhezhaoBox1{
                            width: 100%;
                            height: 100%;
                            background-color: #fff;
                            
                            .zhezhaoBox1_top{
                                width: 100%;
                                height: 40px;
                                background-color: #1e2227;
                                text-align: left;
                                color:#fff;
                                line-height: 40px;
                                padding:0 10px;
                                box-sizing:border-box;
                                cursor:pointer;
                                .glyphicon{
                                    width:100%;
                                    text-align: right;
                                    top: -40px;
                                }
                            }
                            .zhezhaoBox1_cont{
                                margin:10px;
                                height: 310px;
                                border:1px dashed #ccc;
                                border-radius:5px;
                                text-align: center;
                            
                                overflow-y:auto;
                                ul{
                                    display:flex;
                                    padding:10px;
                                    box-sizing:border-box;
                                    li{
                                        width:33.333%;
                                        box-sizing:border-box;
                                        height:130px;
                                        text-align: center;
                                        padding:10px;
                                        cursor:pointer;
                                    }
                                }
                            }
                            .zhezhaoBox1_bottom{
                                padding: 0 10px;
                                margin-bottom: 10px;
                                display:flex;
                                span{
                                    color:#1e2227;
                                    font-weight:700;
                                }
                                div{
                                    display:inline-block;
                                    text-align: right;
                                    width: 80%;
                                    div{
                                        display:inline-block;
                                        width: 60px;
                                        height: 28px;
                                        background-color: #1e2227;
                                        border:1px solid #1e2227;
                                        border-radius:2px;
                                        text-align: center;
                                        line-height: 28px;
                                        color:#fff;
                                        cursor:pointer;
                                        margin-left: 3px;
                                        a{
                                            color:#fff;
                                        }
                                        a:hover{
                                            color:#1e2227;
                                        }
                                    }
                                    div:hover{
                                        background-color: #fff;
                                        color:#1e2227;
                                        font-weight:700;
                                    }
                                    }
                                }
                                form{
                                    display:inline-block;
                                    width:100px;
                                    cursor:pointer;
                                    div{
                                        position: relative;
                                        width: 80px;
                                        height: 28px;
                                        margin-left: 2px;
                                        cursor:pointer;
                                        input{
                                            position: absolute;
                                            top:0;
                                            left:0;
                                            opacity:0;

                                            cursor: pointer;
                                        }
                                    }
                                }
                            }
                        }
                    }
        }
        .img{
            .zhezhaoBox {
                    width: 880px;
                    height: 640px;
                    background-color: #ccc;
                    border-radius: 10px;
                    padding: 10px;
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform:translate(-50%, -50%);
                    .zhezhaoBox1 {
                        width: 100%;
                        height: 100%;
                        background-color: #fff;
                        .zhezhaoBox1_top {
                            width: 100%;
                            height: 40px;
                            background-color: #1e2227;
                            text-align: left;
                            color: #fff;
                            line-height: 40px;
                            padding: 0 10px;
                            box-sizing: border-box;
                            cursor: pointer;
                            .glyphicon {
                                top:-41px;
                                width: 94%;
                                text-align: right;
                            }
                        }
                        .zhezhaoBox1_cont {
                            margin: 10px;
                            height: 520px;
                            border: 1px dashed #ccc;
                            border-radius: 5px;
                            text-align: center;
                            line-height: 520px;
                            overflow-y: auto;
                            img {
                                width: 100%;
                                margin-bottom: 10px;
                            }
                        }
                        .zhezhaoBox1_bottom {
                            padding: 0 10px;
                            margin-bottom: 10px;
                            display: flex;
                            span {
                                color: #1e2227;
                                font-weight: 700;
                            }
                            div {
                                display: inline-block;
                                text-align: right;
                                width: 90%;
                                div {
                                    display: inline-block;
                                    width: 50px;
                                    height: 28px;
                                    background-color: #1e2227;
                                    border: 1px solid #1e2227;
                                    border-radius: 2px;
                                    text-align: center;
                                    line-height: 28px;
                                    color: #fff;
                                    margin-left: 6px;
                                    cursor: pointer;
                                }
                                div:hover {
                                    background-color: #fff;
                                    color: #1e2227;
                                    font-weight: 700;
                                }
                            }
                            form {
                                display: inline-block;
                                width: 100px;
                                cursor: pointer;
                                div {
                                    position: relative;
                                    width: 80px;
                                    height: 28px;
                                    margin-left: 2px;
                                    cursor: pointer;
                                    input {
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        opacity: 0;
                                        cursor: pointer;
                                    }
                                }
                            } 
                        }
                    }
                }
        }
        .world{

        }
    }
</style>
