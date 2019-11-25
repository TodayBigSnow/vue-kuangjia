<template>
    <div class="phoneMe_container">
        <div class="phone_banner">
            <div class="w">
                <h3>首页/联系我们</h3>
                 <h4>关于金网运物流</h4>
            </div>
        </div>
        <div class="phoneMe_header">
            <div class="w">
                <h3>联系金网运物流</h3>
                 <div class="bottom_xian"></div>
                 <div class="banner">
                     <img src="../../assets/banner3.png" alt="">
                 </div>
            </div>
        </div>
        <div class="phone_bottom">
            <div class="w">
                <ul>
                    <li class="top">上海礼邦物流有限公司</li>
                    <li class="bottom">上海市宝山区宝杨路1943号新宝科创园610室</li>
                    <li class="qita">电 话：86-021-56493583</li>
                    <li class="qita">传 真：86-021-56493782</li>
                    <li class="qita">手 机：18616165099</li>
                    <li class="qita">邮 箱：shangjingxin@reppon.com</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
    .phoneMe_container{
        .phone_banner{
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
        .phoneMe_header{
            .w{
                h3{
                    text-align: center;
                    margin:110px 0 45px 0;
                    font-size: 39px;
                    color: #333;
                    text-align: center;
                }
                .bottom_xian{
                    width:100%;
                    height: 1px;
                    background: linear-gradient(to left,#fff 0%,#e7e7e7 50%,#fff 100%);
                    margin-bottom: 40px;
                }
            }
        }
        .phone_bottom{
            padding-bottom: 100px;
            .top{
                color: #333;
                font-size: 20px;
                line-height: 36px;
                margin-top: 30px;
            }
            .bottom{
                color: #717171;
                font-size: 16px;
                margin-bottom: 30px;
                margin-top: 10px;
            }
            .qita{
                    margin-top: 30px;
                    font-size: 16px;
            }
        }
    }
</style>
