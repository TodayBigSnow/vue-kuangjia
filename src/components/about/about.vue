<template>
    <div class="about_container">
        <div class="about_header">
            <div class="w">
                <h3>首页/关于我们</h3>
                <h4>关于鹏程物流</h4>
            </div>
        </div>
        <div class="about_banner">
            <div class="w">
                <h3>关于我们</h3>
                <div>鹏程物流——提供快速且优质的货品运输报关服务</div>
            </div>
        </div>
        <div class="about_cont">
           <div class="w">
                <div class="top">关于承集信息科技有限公司</div>
                <div class="bottom_xian"></div>
                <h1>公司介绍</h1>
                <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;承集信息科技（上海）有限公司2017年5月15日正式注册成立，致力于为货主、货代、车队、司机提供数字化集装箱物流协同服务平台，一站式支持完成集装箱运输交易、运输监控、支付全线上运营。自2017年6月8日第一期产品【驮鸟放箱】正式开放上线至今【驮鸟管车】【驮鸟派单】【驮鸟仓库】【驮鸟司机宝】基于云端的SAAS系统系列上线。
                </p>
                <h1>服务对象</h1>
                <p>
                    货代、物流企业、集卡车队、车队司机、自驾车主、挂靠车队。
                </p>
                <h1 style="margin-bottom: 18px">服务项目</h1>
                <ul>
                   <li>1、拼箱找车等的信息发布、交易。</li>
                   <li>2、在线车货匹配。</li>
                   <li>3、集卡车队全流程一体化SAAS软件系统。</li>
                   <li>4、手机APP终端。</li>
                   <li>5、一键预录。</li>
                   <li>6、一键进港预约。</li>
                   <li>7、可视化订单跟踪、数据收集。</li>
                   <li>8、金融支付。</li>
                   <li>9、港口物流信息综合查询。</li>
                </ul>
                <p style="font-weight: 700">
                    港口物流网、爱集运网在两年多的发展过程中积累了为客户服务的宝贵经验，也得到了广大客户的大力支持， 我们将会继续为大家提供优质热情的服务，和所有客户共同成长！
                </p>

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
            console.log(32321213)
            this.$('.about_container .about_banner h3').css({opacity:1,marginTop:0})
            this.$('.about_container .about_banner div').css({opacity:1,marginTop:'0px'})
        },100)
    }
}
</script>

<style lang="less">
.about_container{
    .about_header{
        background-color: #337ab7;
        height:130px;
        box-sizing:border-box;
        padding:35px 0 30px 0;
        overflow:hidden;
        h3{
            font-size: 16px;
            color: #fff;
            line-height:30px;
          
        }
        h4{
            margin-top:3px;//3
            font-size: 36px;
            
            color: #fff;
            line-height:30px;
        }
    }
    .about_banner{
        padding-top: 220px;
        box-sizing:border-box;
        height: 780px;
        background:url('../../assets/login-two-bg.jpg') no-repeat center top;
        background-size:cover;
        h3{
            font-size: 80px;
            margin-bottom: 10px;
            color: #fff;
            font-weight: normal;
            margin-bottom: 45px;
            opacity:0;
            margin-top: 200px;//0
            transition:all 1s;
        }
        div{
            width: 780px;
            color: #fff;
            font-size: 28px;
            line-height: 40px;
            opacity:0;
            margin-top: 100px;//0
            transition:all 2s;
            margin-top: 300px;
        }
    }
    .about_cont{
        padding:110px 0 107px 0;
        .top{
            text-align: center;
            font-size: 39px;
            color: #333;
            text-align: center;
            font-weight:700;
        }
        .bottom_xian{
            width:100%;
            height: 1px;
            background: linear-gradient(to left,#fff 0%,#e7e7e7 50%,#fff 100%);
            margin:45px 0 50px 0;
        }
        p,ul li{
            color: #333;
            font-size: 18px;
            line-height: 36px;
        }

    }
}

</style>
