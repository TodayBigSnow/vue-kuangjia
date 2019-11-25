<template>
    <div class="index-container">
        <excil v-if="flag" @excilFn="selectedFn" :selected="updateSelected"></excil>
       <!-- <div class="nav">
          <div class="w">
            <el-row>
             <el-menu>
                   
              
              
                <el-menu-item index="4">订单管理</el-menu-item>
                </el-menu>
           </el-row>
          </div>
       </div> -->
       <!-- <div class="banner">
               <el-carousel :interval="5000" arrow="always" height="400px" type="card">
                    <el-carousel-item v-for="(item,i) in arr" :key="i" >
                        <img :src="item.url" alt="" style="height:100%;">
                        <div style="position:absolute;z-index:1000;top:30px;left:50%;transform: translateX(-50%);color:#fff;padding:20px;font-size:30px;">{{item.name}}</div>
                    </el-carousel-item>
                </el-carousel>
       </div> -->
       <div class="cont">
           <div class="w">
               <el-row>
                    <el-col :span="24">
                        <div class="top">
                            <h3>
                                下单管理
                            </h3>
                        </div>
                    </el-col>
               </el-row>
               <el-row>
                   <el-col :span="24">
                       <div class="bottom">
                           <ul>
                               <li @click="imgePlaceAnOrder(1)"><h3><span class="el-icon-picture-outline"></span></h3> 图片下单</li>
                               <li @click="imgePlaceAnOrder(2)"><h3><span class="el-icon-document"></span></h3> pdf下单</li>
                               <li @click="gobusinessInput()"><h3><span class="el-icon-folder"></span></h3> 在线下单</li>
                           </ul>
                       </div>
                   </el-col>
               </el-row>
           </div>
       </div>
 
        <!-- <div class="search-cont">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>运单号查询</span>
                    <el-button style="float: right;" type="primary" @click="billNoSearch()">搜索</el-button>
                </div>
                <div>
                    <el-input placeholder="请输入提单号" v-model="billNo"></el-input>
                </div>
            </el-card>
        </div> -->
    </div>
</template>

<script>
import excil from '../component/pdfOrder'
export default {
    
    data(){
        return {
            // arr:[
            //     {url:require('../../assets/image/10.png'),name:'集装箱运输'},
            //     {url:require('../../assets/image/2.png'),name:'散货运输'},
            //     {url:require('../../assets/image/3.png'),name:'堆场自卸'}, ],
            // arr1:[
            //     {url:require('../../assets/image/4.jpg')},
            //     {url:require('../../assets/image/5.jpg')},
            //     {url:require('../../assets/image/6.jpg')},
            //     {url:require('../../assets/image/7.jpg')},
            //     {url:require('../../assets/image/8.jpg')},
            // ],    
            billNo:'',
            activeIndex: '1',
            activeIndex2: '1',
            flag:false,
            updateSelected:'',
            obj:{name:'登陆'}
        }
    },
    created(){
    },
    methods:{
        gobusinessInput(){
            if(!this.$util.testingLogin.call(this)){
                return
            }else{
                this.$router.push('orderManagement')
            }
            
        },
        billNoSearch(){
            if(!this.billNo){
                this.$message.error('请输入运单号')   
                return
            }
            if(!this.$util.testingLogin.call(this)){
                return
            }
            this.$router.push({
                path:'orderManagement?billno='+this.billNo
            })
        },
        imgePlaceAnOrder(index){
            // if(!JSON.parse(sessionStorage.getItem('obj'))){
            //     this.$confirm('是否登录?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning' }).then(() => {
            //         this.$router.push('login')
            //     }).catch(()=>{

            //     });
            // }else{
                this.updateSelected = index
                this.flag = true
            // }
        },
        selectedFn(selected){
            this.flag = selected
        },
        demo(){
            this.arr += 1
        }
    },
    components:{
        excil
    }
}
</script>

<style lang="less">
    .index-container{
        .search-cont{
            position: absolute;
            width:400px;
            top:283px;
            left:111px;
            z-index:100;
        }
        .w{
            max-width:1200px;
            margin:0 auto;
        }
        .h{
            background-color: red;
        }
        .header-right{
           position: absolute;
           top:0;
           right:100px;
        }
        .header{
            box-sizing:border-box;
            height:110px;
            padding:0.1rem 0 ;
            background-color:rgb(47, 53, 59);
            .header-right{
                padding:10px 0 0 0 ;
                font-size:14px;
                color:white;
            }
        }
        .nav{
            background-color:rgb(30, 34, 39);
        }
        .banner{
            height:400px;
            margin-top:-1px;
            .el-carousel__item{
                text-align: center;

            }
        }
        .cont{
            margin-top: 30px;
            background-color:rgb(238, 238, 238);
            .top{
                height:150px;
                h3{
                    font-size:45px;
                    font-weight:weight;
                    text-align: center;
                    line-height: 150px;
                }
            }
            .bottom{
                height:244px;
                ul{
                    display:flex;
                    justify-content: center;
                    li{
                        width:16.66666%;
                        text-align: center;
                        font-size:16px;
                        cursor:pointer;

                        h3{
                            width: 120px;
                            height: 120px;
                            border-radius:60px;
                            text-align: center;
                            line-height: 120px;
                            background-color: #fff;
                            color:red;
                            font-size:40px;
                            margin:0 auto 30px;
                        }
                        h3:hover{
                            box-shadow: -2px -2px -2px rgba(0,0,0,.3);
                            animation-fill-mode: both;
                            animation-duration: .75s;
                            animation-name: bounceIn;
                        }
                    }
                }
            }
        }
        // .container{
        //     height:540px;
        //     padding:80px 0;
        //     background:url(../../assets/image/MYTBCC7056F39myt586DE5E391E73.jpg) no-repeat center center;
        //     background-size:cover;
        //     .left{
        //         color:white;
        //         h3{
        //             font-size:24px;
        //             font-weight:700;
        //             margin-bottom: 20px;
        //         }
        //         p{
        //             text-indent:2em;
        //             margin-bottom: 10px;
        //             line-height:27px;
        //         }
        //         a{
        //             display:block;
        //             margin-top: 130px;
        //             width: 126px;   
        //             height: 40px;
        //             background-color: #fff;
        //             text-align: center;
        //             line-height: 40px;
        //             font-size:14px;
        //             border-radius:4px;
        //             transition: all .5s;
        //             cursor:pointer;
        //         }
        //         a:hover{
        //             background-color: red;
        //             color:white;
        //         }
        //     }
        //     .right{
        //         padding-left: 20px;
        //         text-align: center;
        //         img{
        //             cursor:pointer;
        //             height:100%;
        //         }
        //     }
        // }
        .footer{
            height: 460px;
            background-color: rgb(34, 34, 34);
            padding-top:80px;
            
            dd,dt{
                color:white;
                margin-bottom: 30px;
            }
        }
    }
</style>
