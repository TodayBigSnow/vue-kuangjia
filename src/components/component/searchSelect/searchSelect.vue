<template>
    <div class="search-select-cont">
        <el-autocomplete class="inline-input" 
            v-model="data" 
            :fetch-suggestions="querySearch"  placeholder="请输入内容"
        @select="HandleSelect"
        ></el-autocomplete>
    </div>
</template>

<script>
export default {
    data(){
        return{
            searchData:'',
            urlData:'',
            dataValue:''
        }
    },
    created(){
        this.urlData = this.data
        this.dataValue = this.value
    },
    props:['url','data','type','value'],
    methods:{
        querySearch(queryString,cb){
            if(this.type == 1){
                var url = this.url+'?'+this.urlData+'='+queryString
                this.axios.get(url,null).then(res=>{
                    if(res.data.rows){
                        var valueArr = this.dataValue.split(',')
                        res.data.rows.forEach(item=>{
                            var str = ''
                            valueArr.forEach(item1=>{
                                str += item[item1] + '-'
                            })
                            item.value = str
                        })
                        cb(res.data.rows)
                    }
                   
                })
            }else if (this.type == 2){
                var data = {}
                
                this.axios.post(this.url,this.data).then(res=>{

                })
            }
            
        },
        HandleSelect(item){
            this.$emit('shipaNameSelect',item)
        }
    }
}
</script>

<style class="less" scoped>
    .search-select-cont{
        width:100%;
    }
</style>
