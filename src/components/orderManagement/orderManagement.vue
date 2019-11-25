<template>
    <div class="businessInput">
       <div class="w">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                <div class="header">客户信息</div>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="进出口">
                            <el-radio-group v-model="form.order.isExport">
                                <el-radio label="进口"></el-radio>
                                <el-radio label="出口"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                     <el-col :span="6">
                        <el-form-item label="提单号">
                            <el-input v-model="form.order.billNo" placeholder="请输入提单号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                         <el-form-item label="船名">
                             <el-autocomplete 
                             :fetch-suggestions="shipNameSearch" 
                             @select="shipaNameSelect"
                             placeholder="请输入船名"
                             v-model="form.order.shipName">
                             </el-autocomplete>
                         </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="航次">
                            <el-input v-model="form.order.voyage"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                         <el-form-item label="装货港">
                             <el-autocomplete 
                             :fetch-suggestions="startPortSearch" 
                             @select="startPortSelect"
                             placeholder="请输入装货港"
                             v-model="form.order.startPortName">
                             </el-autocomplete>
                         </el-form-item>
                    </el-col>
                    <el-col :span="6">
                         <el-form-item label="卸货港">
                             <el-autocomplete 
                             :fetch-suggestions="endPortSearch" 
                             @select="endPortSelect"
                             placeholder="请输入卸货港"
                             v-model="form.order.endPortName">
                             </el-autocomplete>
                         </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="港区">
                            <el-input v-model="form.order.wharfName" placeholder="请选船名带出港区" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                     <el-col :span="6">
                        <el-form-item label="开港时间">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.order.startPortTime" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                     <el-col :span="6">
                        <el-form-item label="截港时间">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.order.endPortTime" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-collapse v-model="activeNames" @change="handleChange1" style="margin-bottom:10px;">
                    <span class="el-icon-plus" 
                    style="color:#409eff;cursor:pointer;position:relative;top:33px;left:55px;" 
                    @click="addFactoryList()"></span>
                    <el-collapse-item title="门点信息" name="1">
                        <el-row>
                            <el-col :span="3" style="text-align:center;margin:0 5px;">门点名称</el-col>
                            <el-col :span="3" style="text-align:center;margin:0 5px;">门点联系人</el-col>
                            <el-col :span="5" style="text-align:center;margin:0 5px;">联系人电话</el-col>
                            <el-col :span="5" style="text-align:center;margin:0 5px;">装箱点</el-col>
                            <el-col :span="5" style="text-align:center;margin:0 5px;">门点区域</el-col>
                            <el-col :span="1" style="text-align:center;margin:0 5px;">操作</el-col>
                        </el-row>
                        <div v-for="(item,i) in form.factoryList" :key="i" @click="factoryListClick(i)">
                            <el-row>
                                <el-col :span="3" style="margin:0 5px;box-sizing:border-box;"> 
                                     <el-autocomplete 
                                        :fetch-suggestions="factorySearch" 
                                        @select="factorySelect"
                                        placeholder="请输入门点名称"
                                        v-model="item.name">
                                        </el-autocomplete>
                                </el-col>
                                <el-col :span="3" style="margin:0 5px;box-sizing:border-box;"><el-input v-model="item.contactPerson"></el-input></el-col>
                                <el-col :span="5" style="margin:0 5px;box-sizing:border-box;"><el-input v-model="item.contactPhone"></el-input></el-col>
                                <el-col :span="5" style="margin:0 5px;box-sizing:border-box;"><el-input v-model="item.address"></el-input></el-col>
                                <el-col :span="5" style="margin:0 5px;box-sizing:border-box;"> <Area ref="child" :index="i" :area="item.area" @areaValue="areaValue"></Area></el-col>
                                <el-col :span="1" style="line-height:42px;font-size:20px;padding-left:10px;cursor:pointer;">
                                    <span class="el-icon-delete-solid" @click="factoryListDelete(i)"></span>
                                </el-col>
                            </el-row>
                        </div>
                    </el-collapse-item>
                </el-collapse>    
                 <el-collapse v-model="activeNames2" @change="handleChange2" style="margin-bottom:10px;">
                    <span class="el-icon-plus" 
                    style="color:#409eff;cursor:pointer;position:relative;top:33px;left:55px;" 
                    @click="addBillNoList()"></span>
                    <el-collapse-item title="副提单号" name="1">
                        <el-row>	
                            <el-col :span="4" style="text-align:center;margin:0 5px;">操作</el-col>
                            <el-col :span="3" style="text-align:center;margin:0 5px;">副提单号</el-col>
                            <el-col :span="3" style="text-align:center;margin:0 5px;">件数</el-col>
                            <el-col :span="3" style="text-align:center;margin:0 5px;">货重(kg)</el-col>
                            <el-col :span="3" style="text-align:center;margin:0 5px;">尺码(m³)</el-col>
                            <el-col :span="3" style="text-align:center;margin:0 5px;">品名</el-col>
                            <el-col :span="3" style="text-align:center;margin:0 5px;">唛头</el-col>
                            
                        </el-row>
                        <div v-for="(item,i) in form.containerBillList" :key="i" style="margin-bottom:10px;">
                            <el-row>
                                <el-col :span="4" style="margin:0 5px;box-sizing:border-box;text-align:center;line-height:37px;color:red;"> 
                                    <span @click="billNoDelete(i)">删除</span>
                                </el-col>
                                <el-col :span="3" style="margin:0 5px;box-sizing:border-box;"> <el-input v-model="item.copyBillNo"></el-input></el-col>
                                <el-col :span="3" style="margin:0 5px;box-sizing:border-box;"><el-input v-model="item.number"></el-input></el-col>
                                <el-col :span="3" style="margin:0 5px;box-sizing:border-box;"><el-input v-model="item.weight"></el-input></el-col>
                                <el-col :span="3" style="margin:0 5px;box-sizing:border-box;"><el-input v-model="item.size"></el-input></el-col>
                                <el-col :span="3" style="margin:0 5px;box-sizing:border-box;"><el-input v-model="item.goodsSeries"></el-input></el-col>
                                <el-col :span="3" style="margin:0 5px;box-sizing:border-box;"><el-input v-model="item.markHead"></el-input></el-col>
                            </el-row>
                        </div>
                    </el-collapse-item>
                </el-collapse> 
                <el-collapse v-model="activeNames1" @change="handleChange" style="margin-bottom:10px;">
                     <el-collapse-item title="箱货明细" name="1">
                        <el-row style="margin-bottom:10px;">
                            <el-col :span="4" style="text-align:center;"> <el-checkbox v-model="boxTypeObj.isDangerous">危险品</el-checkbox></el-col>
                            <el-col :span="4" style="text-align:center;"> <el-checkbox v-model="boxTypeObj.isColdgoods">冷藏品</el-checkbox></el-col>
                            <el-col :span="4" style="text-align:center;"> <el-checkbox v-model="boxTypeObj.isExamine">动检</el-checkbox></el-col>
                            <el-col :span="4" style="text-align:center;"> <el-checkbox v-model="boxTypeObj.isDisinfect">熏蒸</el-checkbox></el-col>
                            <el-col :span="4" style="text-align:center;"> <el-checkbox v-model="boxTypeObj.isAnimalHealth">动卫检</el-checkbox></el-col>
                        </el-row>
                       <el-row>
                           <el-col :span="6" style="padding:0 5px;">
                            <el-form-item label="箱型">
                                <el-select v-model="boxTypeObj.containerSize" placeholder="请选择箱型">
                                        <el-option v-for="(itemn,i) in boxTypeList" :key="i" :label="itemn.name" :value="itemn.name"></el-option>
                                    </el-select>
                            </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="箱量"  style="padding:0 5px;">
                                    <el-input v-model="boxTypeObj.boxNumber" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="品名"  style="padding:0 5px;">
                                    <el-input v-model="boxTypeObj.goodsSeries"></el-input>
                                </el-form-item>
                            </el-col>
                             <el-col :span="6">
                                <el-form-item label="件数"  style="padding:0 5px;">
                                    <el-input v-model="boxTypeObj.number" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
                                </el-form-item>
                            </el-col>
                       </el-row>
                       <el-row>
                            <el-col :span="6">
                                <el-form-item label="货重(kg)"  style="padding:0 5px;">
                                    <el-input v-model="boxTypeObj.weight" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
                                </el-form-item>
                            </el-col>
                             <el-col :span="6">
                                <el-form-item label="做箱时间"  style="padding:0 5px;">
                                    <el-date-picker type="date"  v-model="boxTypeObj.makeBoxTime" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                             <el-col :span="6">
                                <el-form-item label="尺码(m³)"  style="padding:0 5px;">
                                    <el-input v-model="boxTypeObj.size" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
                                </el-form-item>
                            </el-col>
                       </el-row>
                        <el-row>
                             <el-col :span="12">
                                <el-form-item label="做箱要求"  style="padding:0 5px;">
                                    <el-input v-model="boxTypeObj.makeContainerRemark"></el-input>
                                </el-form-item>
                            </el-col>
                       </el-row>
                       <el-row>
                            <el-col :span="6" v-show="boxTypeObj.isColdgoods">
                                <el-form-item label="温度"  style="padding:0 5px;">
                                    <el-input v-model="boxTypeObj.temperature"></el-input>
                                </el-form-item>
                            </el-col>
                             <el-col :span="6"  v-show="boxTypeObj.isDangerous">
                                <el-form-item label="联合国编号"  style="padding:0 5px;">
                                    <el-input v-model="boxTypeObj.unitedNationsNo"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6"  v-show="boxTypeObj.isDangerous">
                                <el-form-item label="等级"  style="padding:0 5px;">
                                    <el-input v-model="boxTypeObj.dangerousLevel"></el-input>
                                </el-form-item>
                            </el-col>
                       </el-row>
                       <el-row>
                           <el-col :span="24" style="text-align:right;">
                              
                                <el-button type="primary" @click="boxArrClear()">确认修改</el-button>
                                
                                <el-button type="primary" @click="boxArrAdd()">添加</el-button>
                           </el-col>
                       </el-row>
                     </el-collapse-item>
                </el-collapse>
        </el-form>
          <el-row style="margin-bottom:10px;">
                <el-col :span="2" style="text-align:center;">操作</el-col>
                <el-col :span="3" style="text-align:center;">箱型</el-col>
                <el-col :span="3" style="text-align:center;">箱号</el-col>
                <el-col :span="3" style="text-align:center;">封号</el-col>
                <el-col :span="3" style="text-align:center;">货名</el-col>
                <el-col :span="3" style="text-align:center;">件数</el-col>
                <el-col :span="2" style="text-align:center;">毛重</el-col>
                <el-col :span="2" style="text-align:center;">运费</el-col>
            </el-row>
            <div v-for="(item,index) in form.boxArr" :key="index" @click="boxSelectedClick(index,$event)" class="input_box_container">
                <el-row  style="margin-bottom:10px;" > 
                    <el-col :span="2" style="padding:0 5px;line-height:40px;font-size:20px;text-align:center;">
                        <span class="el-icon-edit-outline" style="cursor:pointer;margin-right:8px;" title="编辑" @click="updateBoxSize(index)"></span>
                        <span class="el-icon-delete-solid" style="cursor:pointer;" title="删除" @click="deleteBoxSize(index)"></span>
                    </el-col>
                    <el-col :span="3" style="padding:0 5px;">
                         <el-select v-model="item.containerSize" placeholder="请选择箱型">
                            <el-option v-for="(itemn,i) in boxTypeList" :key="i" :label="itemn.name" :value="itemn.name"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3" style="padding:0 5px;"><el-input placeholder="请输入箱号" v-model="item.containerNumber" @blur="boxNumberBlur(index)"></el-input></el-col>
                    <el-col :span="3" style="padding:0 5px;"><el-input placeholder="请输入封号" v-model="item.packageNumber"></el-input></el-col>
                    <el-col :span="3" style="padding:0 5px;"><el-input placeholder="请输入货名" v-model="item.goodsSeries"></el-input></el-col>
                    <el-col :span="3" style="padding:0 5px;"><el-input placeholder="请输入件数" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="item.number"></el-input></el-col>
                    <el-col :span="2" style="padding:0 5px;"><el-input placeholder="请输入毛重" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="item.weight"></el-input></el-col>
                    <el-col :span="2" style="padding:0 5px;"><el-input placeholder="请输入运费" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="item.charge"></el-input></el-col>
                </el-row>
            </div>
            <div class="fotter">
                 <el-button type="primary" @click="saveContainer()">{{updateSelected ? '订单修改' : '确认下单'}}</el-button>
            </div>
       </div>
       
    </div>
</template>

<script>
import Area from '../area/area.vue'

export default {
    data(){
        return{
            form:{
                order:{isExport:'进口'},
                factoryList:[{name:'',contactPerson:'',contactPhone:'',address:'',area:''}],
                boxArr:[],
                containerBillList:[]
            },
            data:[],
            rules:{},
            activeNames: ['1'],
            activeNames1: ['1'],
            activeNames2:['1'],
            boxTypeList:[],
            boxTypeObj:{boxNumber:1},
            updateSelected:false,
            factorySelectIndex:'',
            boxSelectedIndex:'',
            selectedFactorList:[]
        }
    },
    created(){
        this.getBoxTypeList()
        if(this.$route.query.orderId){
            this.updateSelected = true
            this.updateGetInfo(this.$route.query.orderId)
        }
        if(!this.$util.testingLogin.call(this)){
          return
        }
    },
    methods:{
        updateGetInfo(id){
            this.axios({
                url:'webOrder/queryContainerById',
                method:'post',
                data:id,
                headers:{
                    'Content-Type':'application/json;charset=UTF-8'
                }
            }).then(res=>{
                res.data.order.isExport = res.data.order.isExport == 1 ? '进口' : '出口'
                this.form.order = res.data.order
                res.data.containerList.forEach(item=>{
                    item.isDangerous =  item.isDangerous == 1 ? true : false
                    item.isColdgoods =  item.isColdgoods == 1? true : false
                    item.isExamine =  item.isExamine  == 1? true : false
                    item.isDisinfect =  item.isDisinfect == 1? true : false
                    item.isAnimalHealth =  item.isAnimalHealth == 1? true : false
                    item.mendianList.forEach(itemn=>{
                        itemn.name = itemn.factoryName
                    })
                    item.factoryList = item.mendianList
                })
                this.form.factoryList = res.data.containerList[0].mendianList
                this.form.boxArr = res.data.containerList
            })
        },
        billNoDelete(i){
            this.form.containerBillList.splice(i,1)
        },
        factoryListClick(i){
            this.factorySelectIndex = i
        },
        shipNameSearch(key,cb){
            this.axios.get('container/getYuLuShipSG?name='+key,null).then(res=>{
                res.data.rows.forEach(item=>{
                    item.value = item.termName + '-'+ item.voyage + '-'+item.vslENName
                })
                cb(res.data.rows)
            })
        },
        shipaNameSelect(item){
            this.form.order.shipName = item.vslENName
            this.form.order.wharfName = item.termName
            this.form.order.voyage = item.voyage
        },
        startPortSearch(queryString,cb){
            this.axios.post('drop/queryportlist?loadportFlag=1&nameCn='+queryString,null).then(res=>{
                res.data.forEach(item=>{
                    item.value = (item.nameEn ? item.nameEn : '' )+ '-' + (item.nameCn ? item.nameCn : '')
                })
                cb(res.data)
            })
        },
        startPortSelect(item){
            this.form.order.startPortId = item.id
            this.form.order.startPortName = item.nameEn
        },
        endPortSearch(queryString,cb){
            this.axios.post('webOrder/getPortTimeBySG',{shipName:this.form.order.shipName,voyage:this.form.order.voyage,isFlag : this.form.order.isExport == '进口' ? 'I' : 1}).then(res=>{
                res.data.callingPorts.forEach(item=>{
                    item.value = item.callPort + '---' + item.callPortCode
                })
                cb(res.data.callingPorts)
            })
        },
        endPortSelect(item){
            this.form.order.endPortName = item.callPort
        },
        handleChange(val) {
        },
        factorySearch(queryString,cb){
            var data = {
                itemId:JSON.parse(sessionStorage.getItem('obj')).customerId,
                companyId:JSON.parse(sessionStorage.getItem('obj')).companyId,
                key:queryString
            }
            this.axios.post('webOrder/querydropfactorylist',data).then(res=>{
               res.data.forEach(item=>{
                   item.value = item.name
               })
               cb(res.data)
            })
        },
        factorySelect(item){
            for(var i = 0;i<this.form.factoryList.length;i++){
                if(i == this.factorySelectIndex){
                    continue
                }
                if(this.form.factoryList[i].name == item.name){
                    this.$message.error('不能添加重复的门点')
                    this.form.factoryList[this.factorySelectIndex].name = ''
                    return
                }
            }
            this.form.factoryList[this.factorySelectIndex].name = item.name
            this.form.factoryList[this.factorySelectIndex].contactPerson = item.customerName
            this.form.factoryList[this.factorySelectIndex].contactPhone = item.contactsTel
            this.form.factoryList[this.factorySelectIndex].address = item.address
            this.form.factoryList[this.factorySelectIndex].area = item.provinceIdStr +'-'+ item.cityIdStr+'-'+item.countyIdStr
            this.$refs.child[this.factorySelectIndex].valueChange(item.provinceIdStr +'-'+ item.cityIdStr+'-'+item.countyIdStr) 
        },
        getBoxTypeList(){
             this.axios.post('drop/queryContainerType',null).then(res=>{
                 this.boxTypeList = res.data
            })
        },
        querySearch(queryString, cb){
            this.axios.get('drop/queryshippinglist?isRole=1&nameCn='+queryString,null).then(res=>{
                var arr = []
                cb(arr)
            })
        },
        shipNameQuerySearch(queryString,cb){
        },
        areaValue(i,value){
            this.form.factoryList[i].area = value
        },
        saveContainer(){
            var data = {
                
            }
            var dataOrder = this.$util.instanceOfObj(this.form.order)
            var dataArr = this.$util.instanceOfObj(this.form.boxArr)
            if(dataArr.length == 0){
                this.$message('请至少选择一个箱子')
                return
            }
            if(!dataOrder.billNo){
                this.$message('请输入提单号')
                return
            }
            dataOrder.isExport = dataOrder.isExport == '进口' ? 1 : 0
            dataArr.forEach(item=>{
                delete item.boxNumber
                delete item.businessNo
                item.isDangerous =  item.isDangerous ? 1 : 2
                item.isColdgoods =  item.isColdgoods ? 1 : 2
                item.isExamine =  item.isExamine ? 1 : 2
                item.isDisinfect =  item.isDisinfect ? 1 : 2
                item.isAnimalHealth =  item.isAnimalHealth ? 1 : 2
                for(var i=0;i<item.factoryList.length;i++){
                    item.factoryList[i].factoryName = item.factoryList[i].name 
                    if(!item.factoryList[i].name){
                        item.factoryList.splice(i,1)
                        i--
                    }
                }
                item.makeBoxTime = this.$util.handleTime(item.makeBoxTime,1)
                item.mendianList = item.factoryList
                delete item.factoryList
            })
            dataOrder.startPortTime = this.$util.handleTime(dataOrder.startPortTime,1)
            dataOrder.endPortTime = this.$util.handleTime(dataOrder.endPortTime,1)
            dataOrder.placeType = 1
            data.containerList = dataArr
            data.order = dataOrder
            if(this.updateSelected){
                this.axios.post('webOrder/placeAnOrder',data).then(res=>{
                    if(res.data.code === '1'){
                        this.$message({message:'修改成功',type:'success'})
                        this.$router.push({name:'billNoSearch'})
                    }else{
                        this.$message(res.data.message)
                    }
                })
            }else{
                this.axios.post('webOrder/placeAnOrder',data).then(res=>{
                    if(res.data.code === '1'){
                        this.$message({message:'下单成功',type:'success'})
                        this.$router.push({name:'billNoSearch'})
                    }else{
                        this.$message(res.data.message)
                    }
                })
            }
            
        },
        boxSelected(index,type){
            if(!index && index != 0){
                this.$('.input_box_container').css('borderColor','transparent')
            }else{
                this.$(this.$('.input_box_container')[index]).css('border','1px solid #409EFF').siblings('div').css('borderColor','transparent')
            }
           
        },
        boxSelectedClick(i,e){
            if(!this.boxSelectedIndex && this.boxSelectedIndex !== 0){
                this.selectedFactorList = this.form.factoryList
            }
            this.boxSelectedIndex = i
            this.boxSelected(i)
            this.form.factoryList = this.form.boxArr[i].factoryList
            this.form.containerBillList = this.form.boxArr[i].containerBillList
            this.boxTypeObj = this.form.boxArr[i]
        },
        boxArrAdd(){
            if(!this.boxTypeObj.containerSize){
                this.$message.error('请选择箱型');
                return
            }
            if(!this.boxTypeObj.boxNumber){
                this.$message.error('请至少添加一个箱子！');
                return
            }
            var length = this.form.boxArr.length
            for(var i = 0;i<parseInt(this.boxTypeObj.boxNumber);i++){
                var aa = new this.$util.GetBillNo('SLB')
                this.boxTypeObj.businessNo = aa.name+i
                this.form.boxArr.push(this.$util.merge(this.boxTypeObj))
            }
            for(var i=length;i<this.form.boxArr.length;i++){
                
                this.form.boxArr[i].factoryList = [] 
                this.form.boxArr[i].containerBillList = [] 
                this.form.factoryList.forEach(item=>{
                    if(item.name){
                        item.factoryName = item.name
                        this.form.boxArr[i].factoryList.push(this.$util.merge(item))
                    }
                })
            }
            // handleTime
            this.boxTypeObj = {
                boxNumber:1,
                isDangerous:false,
                isColdgoods:false,
                isExamine:false,
                isDisinfect:false,
                isAnimalHealth:false,
            }
        },
        boxArrClear(){
            this.boxSelectedIndex = ''
            this.boxSelected()
            this.form.factoryList = this.selectedFactorList
             this.boxTypeObj = {
                boxNumber:1,
                isDangerous:false,
                isColdgoods:false,
                isExamine:false,
                isDisinfect:false,
                isAnimalHealth:false,
            }
        },
        boxNumberBlur(i){   
            if(!this.$util.numberTest(this.form.boxArr[i].containerNumber)){
                this.$message.error('箱号不符合规格，请重新输入！');
                this.form.boxArr[i].containerNumber = ''
                return
            }else{
                this.form.boxArr[i].containerNumber = this.form.boxArr[i].containerNumber.toUpperCase()
            }
        },
        updateBoxSize(index){
           this.boxTypeObj =  this.form.boxArr[index]
        },
        deleteBoxSize(index){
            this.form.boxArr.splice(index,1)
        },
        addFactoryList(){
            this.form.factoryList.push({})
        },
        addBillNoList(){
            if(!(this.boxSelectedIndex || this.boxSelectedIndex === 0)){
                this.$message.error('请选中一个箱子')
                return
            }
            this.form.containerBillList.push({})
        },
        factoryListDelete(i){
            if(this.form.factoryList.length===1){
                return
            }
            this.form.factoryList.splice(i,1)
        },
        handleChange1(){

        },
        handleChange2(){

        }
    },
    components:{
        Area,
        
    }
}
</script>

<style scope="scoped" lang="less">
    .businessInput{
        .input_box_container{
            border-radius:3px;
            padding-top:10px;
            margin-bottom: 3px;
        }
        .fotter{
            margin-top:110px;
            border-top:1px solid #ccc;
            padding-top:15px;
            text-align: right;
            margin-bottom: 20px;
        }
        .header{
            height:40px;
            margin:20px 0;
            
            line-height: 40px;
            font-size:16px;
           padding-left:10px;
           color:#999;
            border-bottom:1px solid #ccc;
        }
        .w{
            width: 1200px;
            margin:0 auto;
            padding-top:20px;
        }
        input{
            -webkit-appearance: none;
            background-color: #FFF;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #DCDFE6;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            font-size: inherit;
            height: 40px;
            line-height: 40px;
            outline: 0;
            padding: 0 15px;
            -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            width: 100%;
        }
    }
</style>
