<template>
    <div class="area-container" >
        <div class="box-cont" @click.prevent="textClick($event)">{{valueData}} <span @click.stop="spanCLick()" class="el-icon-delete" style="cursor:pointer;float:right;margin-top:12px;"></span> </div>
        <el-tabs v-model="activeName" @tab-click="handleClick" v-if="selected" style="width:500px;padding:10px;position:fixed;background-color:#fff;z-index:1000;top:465px;left:1053px;">
            <el-tab-pane @clcik="tab_click()" label="省份" name="省份">
                <el-row>
                    <el-col :span="8" v-for="(item,i) in data" :key="i" style="margin-bottom:10xp;">
                        <span class="hoverClass" @click="provinceClick(item.id,item.nameCn)">{{item.nameCn}}</span>
                    </el-col>
                </el-row>

            </el-tab-pane>
            <el-tab-pane @clcik="tab_click()" label="城市" name="城市">
                <el-row style="">
                    <el-col :span="8" v-for="(item,i) in data1" :key="i" style="margin-bottom:10xp;">
                        <span class="hoverClass" @click="cityClick(item.id,item.nameCn)">{{item.nameCn}}</span>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane @clcik="tab_click()" label="区县" name="区县">
                <el-row style="">
                    <el-col :span="8" v-for="(item,i) in data2" :key="i" style="margin-bottom:10xp;">
                        <span class="hoverClass" @click="countyClick(item.id,item.nameCn)">{{item.nameCn}}</span>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:[],
            activeName: '省份',
            data1:[],
            data2:[],
            valueData:'请选择门点区域',
            selected:false
        }
    },
    created(){
        this.getList(0,(res)=>{
            this.data = res.data
        })
       setTimeout(()=>{
            this.valueData = this.area ? this.area : '请选择门点区域'
       },500)
    },
    props:['area','index'],
    methods:{
        valueChange(value){
            this.valueData = value ? value : '请选择门点区域'
        },
        textClick(e){
            this.selected = true
            this.activeName = '省份'
        },
        handleClick(){
        },
        provinceClick(id,name){
            this.activeName = '城市'
            this.getList(id,res=>{
                this.data1 = res.data
            })
            this.valueData = name+'-'
            this.$emit('areaValue',this.index,this.valueData)
        },
        getList(id,callFucn){
            this.axios.post('area/querylist?pid='+id,null).then(res=>{
               callFucn(res)
            })
        },
        spanCLick(){
            this.valueData = '请选择门点区域'
            this.$emit('areaValue',this.index,'')
        },
        cityClick(id,name){
            this.activeName = '区县'
            this.getList(id,res=>{
                this.data2 = res.data
            })
            this.valueData += name+'-'
            this.$emit('areaValue',this.index,this.valueData)
            this.data1 = []
        },
        countyClick(id,name){
            this.valueData += name
            this.$emit('areaValue',this.index,this.valueData)
            this.selected = false
            this.data2= []
        },
    },
}
</script>

<style lang="less">
.area-container{
    .box-cont{
        width: 100%;
        height:40px;
        border:1px solid #DCDFE6;
        color:#606266;
        padding-left:10px;
        box-sizing: border-box;
        border-radius:3px;
        line-height: 40px;
        font-size:14px;
    }
    .hoverClass{
        cursor:pointer;
        padding:5px;
    }
    .hoverClass:hover{
        background-color:#409EFF;
        color:#fff;
    }
}

</style>
