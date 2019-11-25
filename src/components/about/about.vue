<template>
    <div class="about_container">
        <div class="about_header">
            <div class="w">
                <h3>首页/关于我们</h3>
                <h4>关于金网运物流</h4>
            </div>
        </div>
        <div class="about_banner">
            <div class="w">
                <h3>关于我们</h3>
                <div>金网运物流 提供快速且优质的货品运输报关服务</div>
            </div>
        </div>
        <div class="about_cont">
           <div class="w">
                <div class="top">关于金网运物流</div>
                <div class="bottom_xian"></div>
                <p>
                    上海礼邦物流有限公司（原上海永达运输有限公司）成立于 2002 年，专业从事进出口集装箱运输、仓储、进口拆箱以及出口拼箱等多种形式的业务服务。公司办公地址位于上海市水产路1458号1号楼208室，注册资金为550万元（实际在沪投资过千万元），公司现有员工约60人。
                </p>
                <p>
                    公司在原有车辆的基础上于2010年又投资购买了15部海关监管集装箱运输车辆从事进出口货物运输。现公司拥有重汽豪沃集装箱运输车辆10部，陕汽奥龙集装箱运输车辆 7部，上海汇众集装箱运输车辆3部，一汽解放拉煤王集装箱运输车辆10部。另公司还有可调控车辆20余部，以供急需。公司内装箱仓库位于宝山区逸仙路 4188 号，紧靠A20同济路出口，交通十分便利。内装仓库备有5 吨散货车 2 辆，铲车 3辆， 3000 平方米的室内仓库， 1200 平方米的理货天棚。机械设备齐全，可满足客户多种装箱要求。
                </p>
                <p>
                    公司拥有一批从事物流方面的专业人才，员工均接受过专业培训，本公司坚持以市场为导向、以客户为中心、以“感动服务”为行动的经营方针；并依照现代企业管理理念，采用现代物流先进的管理模式，可为贵公司提供全方位一体化的物流服务，为提高和保证服务质量，我公司建立了一整套完整的物流服务管理系统，从客户接待、业务洽谈、货物运输、客户意见反馈、电话回访等、都有专人负责，专人管理；我公司相信，经过一系列的努力，能树立良好的企业形象，成为同行业发展的典范。
                </p>
                <p>
                    本公司车辆性能优越，运行安全高效，车辆全部装配英迪GPS全球卫星定位系统，可对车辆进行全方位和全天候动态管理和调度，有效的保证车辆安全、优质、高效的运营。同时为大限度的维护客户利益，本公司对全部车辆加入了高额货物保险，免除了客户的后顾之忧，我公司的驾驶员全部接受过规范化培训，并且具有统一着装，文明用语，动作规范，服务专业、素质高。敬业等特点。本公司相信：“只有专业才能创业”。
                </p>
                <p>
                    上海礼邦物流有限公司愿为广大客户提供“安全、优质、准时、专业、高效”的全方位服务。
                </p>
                <p>
                    如果您满意我们的工作，请告诉您的朋友；若您对我们的工作有不满意之处，请尽快告诉我们，以便我们能及时改进工作中的不足，从而能为您提供更好的服务。真诚期望您能为我们提出宝贵的意见！
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
        background-color: #cc0000;
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
        background:url('../../assets/banner1.png') no-repeat center center;
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
        p{
            color: #333;
            font-size: 20px;
            line-height: 36px;
        }
    }
}

</style>
