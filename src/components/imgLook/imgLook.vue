<template>
    <div class="img-look-container">
       
        <div class="img-container">
             <div class="close" @click="close()">
                <span class="el-icon-close"></span>
            </div>
            <div class="top">
                <div class="left" @click="imgLeftClick()">
                    <span class="el-icon-arrow-left"></span>
                </div>
                <img :src="imageChecked ? imageChecked : ''" alt="">
                <!-- <div class="name_cont">{{imgSelectedName}}</div> -->
                <div class="right" @click="imgRightClick()">
                    <span class="el-icon-arrow-right"></span>
                </div>
            </div>
            <div class="img_container_bottom">
                <img @click="imgclick($event,i)" v-for="(item,i) in imgBox" :key="i" :src="item.url ? item.url : ''" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            imgBox:[],
            imageChecked:'',
            imageIndex:0,
            imgSelectedName:'对应阶段名称'
        }
    },
    created(){
        // this.imgData.forEach(item=>{
        //     switch(item.attType){
        //         case 1:item.name = "箱号照";break;
        //         case 2:item.name = "封号照";break;
        //         case 4:item.name = "厂门照";break;
        //         case 12:item.name = "卸货签收单照片";break;
        //         case 10:item.name = "过磅单照";break;
        //         case 5:item.name = "空箱照";break;
        //         case 13:item.name = "报损照";break;
        //         case 7:item.name = "箱损照";break;
        //         case 6:item.name = "空箱箱号照";break;
        //         case 15:item.name = "空箱地板照";break;
        //         case 3:item.name = "装箱单照";break;
        //         case 8:item.name = "封条照";break;
        //         case 9:item.name = "货物照";break;
        //     }
        // })
        var urlStr = 'http://chengji-tms.oss-cn-shanghai.aliyuncs.com/upload/'
        this.imgBox = this.imgData.filter(item=>{
           item.url = urlStr + item.url
           return item
       })
        this.imageChecked = this.imgBox[0].url
        this.imgSelectedName = this.imgBox[0].name
        
    },
    props:['imgData'],
    methods:{
        imgclick(e,i){
           this.$(e.path[0]).css('border',"3px solid #73b4e0").siblings('img').css('border','none')
           this.imageChecked = this.imgBox[i].url
           this.imgSelectedName = this.imgBox[i].name
           this.imageIndex = i
        },
        imgLeftClick(){
            this.imageIndex--
            if(this.imageIndex<0){
                this.$message.error('此照片已经是第一张了！')
                this.imageInde++
                return
            }
            this.$(this.$('.img_container_bottom img')[this.imageIndex]).css('border',"3px solid #73b4e0").siblings('img').css('border','none')
            this.imageChecked = this.imgBox[this.imageIndex].url
            this.imgSelectedName = this.imgBox[this.imageIndex].name
        },
        imgRightClick(){
            this.imageIndex++
            if(this.imageIndex>=this.imgBox.length){
                this.$message.error('没有更多图片了！')
                this.imageInde--
                return
            }
            this.$(this.$('.img_container_bottom img')[this.imageIndex]).css('border',"3px solid #73b4e0").siblings('img').css('border','none')
            this.imageChecked = this.imgBox[this.imageIndex].url
            this.imgSelectedName = this.imgBox[this.imageIndex].name
        },
        close(){
            this.$emit('close',false)
        }
    }
}
</script>

<style lang="less">
    .img-look-container{
        position:fixed;
        top:0;
        left:0;
        width: 100%;
        height:100%;
        z-index:1000;
        background-color:#333;
       
        .img-container{
            height:100%;
            width:60%;
            margin:0 auto;
            background-color:#000;
            padding:20px;
            cursor:pointer;
            position: relative;
            padding-top:30px;
            .close{
                position:absolute;
                right:3px;
                top:3px;
                width:30px;
                height:30px;
                color:#fff;
                text-align: center;
                line-height: 30px;
                z-index:10; 
                border-radius:3px;
                font-size:16px;

            }
            .close:hover{
                background-color:red;
            }
            .top{
                position:absolute;
                height:100%;
                width:100%;
                top:0;
                left:0;
                background-color:#000;
                padding-top:20px;
                text-align:center;
                .name_cont{
                    width:100px;
                    height:60px;
                    line-height:60px;
                    color:#fff;
                    font-size:16px;
                    position:absolute;
                    top:30px;
                    left:50%;
                    transform:translateX(-50%);
                }
                img{
                    height:90%;
                    max-width:90%;
                }
                .left{
                    position: absolute;
                    font-size:60px;
                    font-weight:700;
                    width:63px;
                    height:88px;
                    background-color: rgba(255,255,255,.1);
                    top:50%;
                    left:0;
                    transform:translateY(-50%);
                }
                .right{
                     position: absolute;
                    font-size:60px;
                    font-weight:700;
                    width:63px;
                    height:88px;
                    top:50%;
                    right:0;
                    background-color: rgba(255,255,255,.1);
                    transform:translateY(-50%);
                }
                .left:hover,.right:hover{
                    color:#fff;
                }
            }
            .img_container_bottom{
                position:absolute;
                height:60px;
                width:100%;
                bottom: 90px;
                left:0;
                background-color:rgba(0,0,0,.3);
                text-align:center;
                img{
                    height:100%;
                    margin: 0 5px;
                }
            }
        }
    }

</style>
