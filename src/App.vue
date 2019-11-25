<template>
  <div id="app">
    <div class="header">
      <div class="w">
        <div class="header-box">
          <div class="left" style="padding-left:20px;">
            <h2 style="display:flex; align-items: end; ">
              <a href="javascript:;" style="display:inline-block;">
                <img src="./assets/logo1.png" alt="">
              </a>
            </h2>
          </div>
          <div class="right">
            <ul>     
              <li @click="goRouter('index')">首页</li>
              <li @click="goRouter('service')">服务介绍</li>
              <li @click="goRouter('about')">关于我们</li>
              <li @click="goRouter('billNoSearch')">提单查询</li>
              <li><a href="http://www.gangkou56.com/tms_sys/" target="view_window">管车入口</a></li>
              <li @click="goRouter('phoneMe')">联系我们</li>
              <li @click="goRouter('login')">{{$store.state.loginObj.name}}</li>
              <li @click="goRouter('Order')">下单
                <!-- <ul class="orderType" :style="{display: orderSwitch? 'block':'none' }">
                  <li style="line-height: 24px;" @click="goRouter('orderManagement')">在线下单</li>
                  <li style="line-height: 24px;" @click="goRouter('imgOrder')">图片下单</li>
                  <li style="line-height: 24px;" @click="goRouter('pdfOrder')">pdf下单</li>
                </ul> -->
              </li>
              <li @click="toLogin">退出</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
      <router-view></router-view>
    <div class="footer">
      <div class="w">
        <div class="top">
          <ul>
            <li><span>鹏程物流</span></li>
            <li><span>上海物流运输</span></li>
            <li><span>联系方式</span></li>
            <li><span>技术支持</span></li>
          </ul>
        </div>
        <div class="cont">
          <div>
            <dl>
              <dd>运输服务</dd>
              <dd>报关服务</dd>
              <dd>代运</dd>
              <dd>进出口</dd>
            </dl>
          </div>
          <div>
            <dl>
              <dd>鹏程物流</dd>
<!--              <dd>ENG/英文版</dd>-->
              <dd></dd>
              <dd></dd>
            </dl>
          </div>
          <div>
            <dl>
              <dd>联系方式</dd>
              <dd>客服：400-8215617</dd>
              <dd>电话：021-58202955</dd>
              <dd>QQ：3361338348</dd>
              <dd>邮箱：service@gangkou56.com</dd>
            </dl>
          </div>
          <div>
            <dl>
              <dd>技术支持</dd>
              <dd>承集信息科技（上海）有限公司</dd>
              <dd>驮鸟物流</dd>
            </dl>
          </div>
        </div>
        <div class="bottom">
          <div></div>
          Copyright © 2018 驮鸟物流 上海市浦东新区泰谷路18号8楼 沪ICP备17024569号-2
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',

  components: {
  },
  data() {
    return {
      orderSwitch: false
    }
  },
  methods:{
    goRouter(data){
      if(data=='billNoSearch'){
        if(!this.$util.testingLogin.call(this)){
          return
        }
      }
      if(data=='orderManagement'){
        if(!this.$util.testingLogin.call(this)){
          return
        }
      }
      if(data == 'login'){
        if(sessionStorage.getItem('obj')){
          return
        }
      }
      this.$router.push({name:data})
    },
    handleChangeStatus() {
      this.orderSwitch = !this.orderSwitch
    },
    toLogin(){
      sessionStorage.clear()
       this.$store.commit('setLoginObj',{name:'登陆'})
      location.reload()
    }
  }
}
</script>

<style lang="less">
body{
   padding:0;
   margin:0;
}

div,ul,li,table,tr,td,th,h1,h2,h3,h4,h5,h6,dl,dd,dt{
      padding:0;
      margin:0;
    }
  #app{
    
    ul,li{
      list-style:none;
    }
    .w{
      width:1200px;
      margin:0 auto;
    }
    .header{
      height:74px;
      line-height:74px;
      .header-box{
        display:flex;
        justify-content:space-between;
        .left{

          img{
            transform: translateY(16%);
            width: 250px;
          }
        }
        .right{
           width:60%;
          ul{
            display:flex;
            width:100%;
            justify-content:space-between;
            li{
              width:100px;
              text-align: center;
              font-size:14px;
              cursor:pointer;
              a{
                text-decoration: none;
                color:#000;
              }
            }
          }
        }
      }
    }
    .footer{
      background-color:#222222;
      height:500px;
      box-sizing:border-box;
      padding:70px 0 40px 0;
      .top{
       ul{
          width:100%;
          display:flex;
          justify-content:space-between;
          li{
            width:24%;
            border-bottom:1px solid #2790b0;
            text-align: center;
            color:#919191;
            padding-bottom:10px;
            span{
              padding:0 15px 11px 15px;
              border-bottom:4px solid #2790b0;
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
          }
       }
      }
      .cont{
        display:flex;
        justify-content:space-between;
        div{
          width:24%;
          dl{
            padding-top: 30px;
            padding-left:15px;
            dd{
              color:#919191;
              font-size:14px;
              font-weight:700;
              margin:10px;
            }
          }
        }
      }  
      .bottom{
        div{
          position: absolute;
          width:100%;
          height: 1px;
          top:-20px;
          background: linear-gradient(to left,#222 0%,#919191 50%,#222 100%);
            
        }
        position: relative;
        margin-top:100px;
        padding-top:45px;
        color:#919191;
        text-align: center;
        
      }
    }
  }
.orderType{
  border: 1px solid #f1f1f1;
  background-color: #e1e1e1;
  li:hover {
    background-color: #fff;
  }
}
</style>
