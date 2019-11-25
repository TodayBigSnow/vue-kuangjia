<template>
    <div class="index-cont">
       <div class="banner">
           <div class="w">
               <div class="top">
                   <span>鹏程物流</span>
               </div>
               <div class="cont">
                   <p>
                       本公司拥有一批专业的管理 人员和专业的运输队伍，以严格，科学的管理手段，现代化的办公设施。通过物流配送服务，将客户的货品运达全球任何地方。
                   </p>
               </div>
               <div class="bottom">
                   <div @click="toAbout">关于我们</div>
                   <div @click="toService">服务简介</div>
               </div>
           </div>
       </div>
       <div class="cont">
           <div class="w">
               <div class="top">
                   <div class="top_xian"></div>
                   <div class="top_cont">
                       关于鹏程
                   </div>
                   <div class="bottom_xian"></div>
               </div>
               <div class="cont_cont">
                   上海鹏程物流有限公司是集集装箱运输及堆存的专业运输公司，有十二年的运营经验，是一家手续齐全的运输企业。宗旨是“以信誉高效求发展，靠安全快捷
                   谋生存”。目前公司拥有集装箱专业运输车辆36部，小松四十吨集装箱正面吊一台，合力大型叉车一台，集装箱暂落场地9000平方，专业操作及
                   技术人员16名，目前主要从事集装箱货物运输代理，门到门运输，危险品运输、恒温箱运输、白卡服务，这种三合一的车辆有10部。空重箱暂落服务以及内装
                   拼箱业务。我们不但拥有一流的车队，还有一流的信誉，一流的服务以及合理的运输价格，合作的基础源于相互信任，安全的保障来自雄厚的实力，上海鹏程
                   物流有限公司公司是您理想的选择。
               </div>
           </div>
       </div>
       <div class="cont" style="padding-top:0;">
           <div class="w">
               <div class="top">
                   <div class="top_xian"></div>
                   <div class="top_cont">
                      业务范畴
                   </div>
                   <div class="bottom_xian"></div>
               </div>
               <div class="cont_bottom">
                   <div>
                       <img src="../../assets/cont1.png" alt="">
                       <h3><span style="color:#2790b0;">运输</span> 货运</h3>
                       <p>公司主要以公路运输为主，同时可提供铁路和航空运输的多式联运，货物仓储包装，流通加工，配送，信息管理</p>
                   </div>
                    <div>
                       <img src="../../assets/cont2.png" alt="">
                       <h3><span style="color:#2790b0;">报关</span> 货运</h3>
                       <p>为广大客户提供第三方物流方案设计，咨询，企业物流资源整合的综合性物流服务，并与太平洋保险公司签定了预约保险合同，对丢失，破损的货物能及时理赔</p>
                   </div>
                    <div>
                       <img src="../../assets/cont3.png" alt="">
                       <h3><span style="color:#2790b0;">冷链 </span>运输</h3>
                       <p>专人热线，对货物全程监控，24小时为您提供货物查询，业务咨询，信息反馈，监督的服务，实现了诚信，准时，安全，便利的服务目标，赢得了全国广大客户的支持和信赖</p>
                   </div>
                    <div>
                       <img src="../../assets/cont4.png" alt="">
                       <h3><span style="color:#2790b0;">大件</span> 运输</h3>
                       <p>对货物全程监控，24小时为您提供货物查询，业务咨询，信息反馈，监督的服务，实现了诚信，准时，安全，便利</p>
                   </div>
               </div>
           </div>
       </div>
       <div class="cont" style="padding-top:0;">
           <div class="w">
               <div class="top">
                   <div class="top_xian"></div>
                   <div class="top_cont_n">
                        <h3 style="color:#2790b0;">我们的客户</h3>
                        提供优质的运输配送服务 诚信，准时，安全，便利
                   </div>
               </div>
               <div class="cont_bottom1">
                   <span>我们的客户</span>
                   <a class="flex-prev" href="javascript"></a>
                   <a class="flex-prev" href="javascript"></a>
               </div>
               <div class="img_box">
                   <ul>
                       <li style="margin:0;"><img src="../../assets/1.jpg" alt=""></li>
                       <li><img src="../../assets/2.jpg" alt=""></li>
                       <li><img src="../../assets/3.jpg" alt=""></li>
                       <li><img src="../../assets/4.jpg" alt=""></li>
                       <li><img src="../../assets/5.png" alt=""></li>
                       <li><img src="../../assets/6.gif" alt=""></li>
                       <li><img src="../../assets/7.gif" alt=""></li>
                       <li><img src="../../assets/8.png" alt=""></li>
                       <li><img src="../../assets/10.gif" alt=""></li>
                       <li><img src="../../assets/11.png" alt=""></li>
                   </ul>
               </div>
           </div>
       </div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    mounted(){
        setTimeout(()=>{
            this.$('.index-cont .banner .top').css({opacity:1,marginTop:'115px'})
            this.$('.index-cont .banner .cont').css({opacity:1,marginTop:'40px'})
            this.$('.index-cont .banner .bottom').css({opacity:1,marginTop:'55px'})
        },100)
    },
    methods: {
        toAbout:function(){
            this.$router.push({name:'about'})
        },
        toService: function(){
            this.$router.push({name:'service'})
        }

    }
}
</script>

<style lang="less">
    .index-cont{
        .banner{
            height:900px;
            background:url(../../assets/login-one-bg.jpg) no-repeat center center;
            background-size:cover;
            overflow:hidden;
            .top{
                margin-top:200px;//115
                text-align: center;
                transition:all 1s;
                opacity:0;
                span{
                  font-size:70px;
                  color:#fff;  
                  font-weight:700;
                  border-bottom:7px solid red;
                }
            }
            .cont{
                margin-top: 100px; //40
                transition:all 1s;
                opacity:0;
                p{
                    width: 878px;
                    margin: 30px auto;
                    color: #fff;
                    font-size: 28px;
                    line-height: 44px;
                    text-align: center;
                    font-weight: normal;
                }
            }
            .bottom{
                text-align: center;
                margin-top: 100px;//55
                display:flex;
                justify-content:center;
                transition:all 1.5s;
                opacity:0;
                div{
                    width:155px;
                    height:60px;
                    text-align: center;
                    border:1px solid #fff;
                    line-height: 60px;
                    color:#fff;
                    margin-left:10px;
                    cursor:pointer;
                    transition:all .3s;
                }
                div:hover{
                    background-color:red;
                    border:1px solid red;
                    
                }
            }
        }
        .cont{
            padding-top:100px;
            .top{
                .top_xian, .bottom_xian{
                    width:100%;
                    height: 1px;
                    background: linear-gradient(to left,#fff 0%,#e7e7e7 50%,#fff 100%);
                }
                .top_cont{
                    margin:50px 0;
                    text-align: center;
                    font-size: 39px;
                    color: #333;
                    font-weight:700;
                }
                .top_cont_n{
                    margin:40px 0 60px 0;
                    background-color: #fff;
                    border-bottom: 1px solid #ccc;
                    border-left: 4px solid #2790B0;
                    border-radius: 0px;
                    border-right: 1px solid #ccc;
                    border-top: 1px solid #ccc;
                    box-shadow: 0px 5px 12px rgba(50, 50, 50, 0.15);
                    margin-bottom: 20px;
                    min-height: 20px;
                    -moz-border-radius: 0px;
                    -moz-box-shadow: 0px 5px 12px rgba(50, 50, 50, 0.15);
                    padding: 40px 19px;
                    position: relative;
                    -webkit-border-radius: 0px;
                    -webkit-box-shadow: 0px 5px 12px rgba(50, 50, 50, 0.15);
                    text-align: center;
                    &::before {
                        border-bottom: 9px solid transparent;
                        border-left: 9px solid #2790B0;
                        border-top: 9px solid transparent;
                        content: '';
                        display: inline-block;
                        left: 0px;
                        position: absolute;
                        top: 50%;
                        margin-top: -4.5px;
                    }
                    h3{
                        font-weight:400;
                        margin-bottom: 20px;
                    }
                }
            }
            .cont_bottom1{
                border-bottom: 1px solid #2790B0;
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 10px;
                position: relative;
                span{
                    font-weight:700;
                    border-bottom:4px solid #2790B0;
                    padding-bottom: 10px;
                    position: relative;
                    &::before{
                        border-left: 6px solid transparent;
                        border-right: 6px solid transparent;
                        border-top: 6px solid #2790B0;
                        bottom: -10px;
                        content: '';
                        display: inline-block;
                        left: 45%;
                        position: absolute;
                    }
                }
                .flex-prev {
                    cursor: pointer;
                    display: block;
                    height: 30px;
                    position: absolute;
                    top: 0;
                    width: 30px;
                    z-index: 10;
                    right:0;
                    background-position: 0 0;
                    -moz-transition: all 0.3s ease-in-out;
                    -ms-transition: all 0.3s ease-in-out;
                    -o-transition: all 0.3s ease-in-out;
                    transition: all 0.3s ease-in-out;
                    -webkit-transition: all 0.3s ease-in-out;
                }
            }
            .cont_cont{
                color: #333;
                font-size: 20px;
                line-height: 36px;
                padding:50px 0 130px 0;
            }
            .cont_bottom{
                padding-top: 40px;
                display:flex;
                justify-content:space-between;
                box-sizing:border-box;
                transition: all .4s;
                padding-bottom:50px;
                div{
                    border-bottom:4px solid transparent;
                    padding-bottom: 15px;
                    width:24%;
                    text-align: center;
                    h3{
                        margin:30px 0 25px 0;
                    }
                    p{
                        text-align: left;
                        font-size:12px;
                        color:#5a5a5a;
                            line-height: 24px;
                    }
                }
                div:hover{
                    border-bottom:4px solid #2790b0;
                }
            }
            .img_box{
                position: relative;
                height:170px;
                overflow:hidden;
                ul{
                    width:200%;
                    position: relative;
                    li{
                        width:170px;
                        height: 105px;
                        margin-left: 35px;
                        float: left;
                        img{
                            height:100%;
                            width:100%;
                        }
                    }
                }
            }
        }
    }
</style>
