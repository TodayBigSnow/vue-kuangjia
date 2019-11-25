<template>
    <div class="service-cont">
        <div class="service_header">
            <div class="w">
                <h3>首页/服务介绍</h3>
                <h4>服务介绍</h4>
            </div>
        </div>
        <div class="service_banner">
            <div class="w">
                <h3>服务介绍</h3>
                <div>金网运物流 提供快速且优质的货品运输报关服务</div>
            </div>
        </div>
        <div class="service_cont">
           <div class="w">
                <div class="top">服务介绍</div>
                <div class="bottom_xian"></div>
                <p>
                    公司主要以公路运输为主，同时可提供铁路和航空运输的多式联运，货物仓储包装，流通加工，配送，信息管理，还可以为广大客户提供第三方物流方案设计，咨询，企业物流资源整合的综合性物流服务，并与太平洋保险公司签定了预约保险合同，对丢失，破损的货物能及时理赔。备有专人热线，对货物全程监控，24小时为您提供货物查询，业务咨询，信息反馈，监督的服务，实现了诚信，准时，安全，便利的服务目标，赢得了全国广大客户的支持和信赖。 本公司与太平洋保险公司签定了预约保险合同，对丢失，破损的货物能及时理赔。正规发票随时可开，并备有专人热线，对货物全程监控，24小时为您提供货物查询，业务咨询，信息反馈，监督的服务，实现了诚信，准时，安全，便利。 顾客的需求在很大程度上要依靠承运人来实现，因此公司在承运人货物时，综合考虑了速度、弹性并以顾客为中心等因素。为了降低运输成本，应尽量将同一目的地的货物集中在一起进行运送，以达到规模化效益公司在完善物流基础设施的同时，将不断改进服务质量，为客户提供一系列的附加服务，从而提高公司的市场竞争力。由于宝达物流一直坚持这样的经营理念，在过去的五年中公司取得了很好地效益，其业务量年增长率达到30%。 相信某某走到哪里，满意就会走到哪里!
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
            this.$('.service-cont .service_banner h3').css({opacity:1,marginTop:0})
            this.$('.service-cont .service_banner div').css({opacity:1,marginTop:0})
        },100)
    }
}
</script>

<style lang="less" scoped>

    .service-cont{
        .service_header{
            background-color: #cc0000;
            height:130px;
            box-sizing:border-box;
            padding:35px 0 30px 0;
            h3{
                font-size: 16px;
                color: #fff;
                line-height:30px;
            }
            h4{
                margin-top:3px;
                font-size: 36px;
                color: #fff;
                line-height:30px;
            }
        }
        .service_banner{
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
                margin-top: 200px;
                 opacity: 0;
                transition: all 1s;
            }
            div{
                width: 780px;
                color: #fff;
                font-size: 28px;
                line-height: 40px;
                margin-top: 300px;
                opacity: 0;
                transition: all 2s;
            }
        }
        .service_cont{
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
