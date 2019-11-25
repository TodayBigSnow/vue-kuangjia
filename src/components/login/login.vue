<template>
    <div class="login-container">
        <div class="login_header">
            <div class="w">
                <h3>首页/登录</h3>
            </div>
        </div>
        <div class="login_banner">
            <div class="login_go">
                <div class="top">
                    欢迎登陆鹏程网站
                </div>
                <div class="cont" >
                    <div style="margin-bottom:10px;">账号*</div>
                    <el-input v-model="userName"></el-input>
                    <div style="margin-bottom:10px;">密码*</div>
                    <el-input v-model="password" show-password></el-input>
                </div>
                <div class="bottom" style="text-align:right;padding:6px 6px 0 0 ;">
                    <el-button type="primary" @click="submit()">登陆</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            userName:'',
            password:''
        }
    },
    
    methods:{
        submit(){
            if(!this.userName){
                this.$message.error('请输入账号')
                return
            }
            if(!this.password){
                this.$message.error('请输入密码')
                return
            }
            var data = {userName:this.userName,password:this.password}
            this.axios({
                url:'cLogin/login',
                method: 'post',
                data:data,
                headers:{
						'Content-Type':'application/json;'
					}
            }).then((res)=>{
                console.log(res);
                if(res.data.code == '1'){
                    this.$message({message:'登陆成功',type:'success'})
                    sessionStorage.setItem('obj',JSON.stringify(res.data.validateMap))
                    this.$store.commit('setLoginObj',res.data.validateMap)
                    this.$router.push({name:'index'})
                    this.axios.interceptors.request.use((data)=>{
                        data.headers.Authorization = this.$store.state.loginObj.token
                        return data
                    },(data)=>{
                        return data
                    })
                }else{
                    this.$message.error({message:res.data.message})
                }
                
            })
        }
    }
}
</script>

<style lang="less" >
.login-container{
    .login_header{
        background-color: #337ab7;
        height:80px;
        box-sizing:border-box;
        padding:30px 0 30px 0;
        h3{
            font-size: 16px;
            color: #fff;
        }
    }
    .login_banner{
        height:400px;
        background:url('../../assets/banner2.png') no-repeat center center;
        background-size:cover;
        overflow:hidden;
        .login_go{
            width: 375px;
            height: 300px;
            background-color: #fff;
            border:1px solid #89826e;
            border-radius:10px;
            margin:20px auto;
            .top{
                height: 55px;
                line-height: 55px;
                text-align: center;
                border-bottom:1px solid #e5e5e5;
            }
            .cont{
                padding:15px 45px 30px 15px;
                border-bottom:1px solid #e5e5e5;
            }
        }
    }
}

</style>
