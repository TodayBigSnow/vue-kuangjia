<template>
  <div class="billNoSearch_container">
    <imgLook v-if="imgSelected" :imgData="imgIdData" @close="imgClose()"></imgLook>
    <div class="billNoSearch_header">
      <div class="w">
        <h3>首页/提单查询</h3>
        <h4>提单查询</h4>
      </div>
    </div>
    <div class="billNoSearch_banner">
      <div class="w">
        <div class="cont">
          <ul>
            <li>
              <input type="text" style="width:100%;" placeholder="请输入提单号" v-model="searchObj.billNo" />
            </li>
            <li>
              <button type="button" class="tariffsBackgroundColor" @click="searchData">查询</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="w">
      <el-table
        border
        :data="tableData"
        style="width: 100%"
        @row-dblclick="tableDbClick"
        @cell-click="imgLockClick"
      >
        <el-table-column prop label="操作" width="150">
           <template slot-scope="scope">
                 <el-button @click="lookImage(scope.row,1)" type="text" size="small">图片</el-button>
                 <el-button @click="lookImage(scope.row,2)" type="text" size="small">详情</el-button>
                 <el-button @click="lookImage(scope.row,3)" type="text" size="small">导出</el-button>
            </template>
        </el-table-column>
        <el-table-column style="test-align:center" prop="billNo" label="提单号" width="120"></el-table-column>
        <el-table-column style="test-align:center" prop="isExport" label="进出口" width="60"></el-table-column>
        <el-table-column style="test-align:center" prop="containerSize" label="箱型" width="100"></el-table-column>
        <el-table-column style="test-align:center" prop="startPortName" label="装货港" width="120"></el-table-column>
        <el-table-column style="test-align:center" prop="shipName" label="船名" width="130"></el-table-column>
        <el-table-column style="test-align:center" prop="voyage" label="航次" width="60"></el-table-column>
        <el-table-column style="test-align:center" prop="makeBoxTime" label="做箱时间" width="150"></el-table-column>
        <el-table-column style="test-align:center" prop="carNo" label="车牌号" width="120"></el-table-column>
        <el-table-column style="test-align:center" prop="containerNumber" label="箱号" width="120"></el-table-column>
        <el-table-column style="test-align:center" prop="packageNumber" label="封号" width="99"></el-table-column>
        <!-- <el-table-column prop="placeTime" label="下单时间" width="120"> </el-table-column>
                <el-table-column prop="placeTypeStr" label="下单类型" width="120"> </el-table-column>
                <el-table-column prop="name1" label="门点名称" width="120"> </el-table-column>
                <el-table-column prop="address1" label="门点地址" width="200"> </el-table-column>
                <el-table-column prop="charge" label="运费" width="120"> </el-table-column>
                <el-table-column prop="number" label="件数" width="120"> </el-table-column>
                <el-table-column prop="weight" label="毛重" width="120"> </el-table-column>
                <el-table-column prop="markHead" label="货名" width="120"> </el-table-column>
                <el-table-column prop="makeContainerRemark" label="做箱要求" width="120"> </el-table-column>
                <el-table-column prop="startPortTime" label="开港时间" width="120"> </el-table-column>
                <el-table-column prop="endPortTime" label="截港时间" width="120"> </el-table-column>
                <el-table-column prop="wharfName" label="港区" width="120"> </el-table-column>
                <el-table-column prop="yard" label="堆场" width="120"> </el-table-column>
        <el-table-column prop="endPortName" label="卸货港" width="120"> </el-table-column>-->
      </el-table>
      <el-dialog
        title="位置信息"
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose"
        top="50px"
      >
        <baidu-map class="map" :center="lngLatData" :zoom="13" :scroll-wheel-zoom="true">
          <bm-marker :position="lngLatData" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
            <bm-label
              :title="titleData"
              :content="changCarno"
              :labelStyle="{color: 'red', fontSize : '12px'}"
              :offset="{width: -0, height: 10}"
            />
          </bm-marker>
        </baidu-map>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-pagination
        layout="prev, pager, next, sizes, total, jumper"
        :total="tabel.total"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="10"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
      <el-dialog
        title="详细信息"
        :visible.sync="dataAdressSelected"
        width="35%"
        :before-close="dataAdress"
        top="50px"
      >
        <table style="margin-bottom:25px;">
          <tbody>
            <tr>
              <td width="24%" align="center">
                <span>{{wrafName}}</span>
              </td>
              <td width="14%" valign="top">
                <img src="../../assets/jiantou.png" />
              </td>
              <td width="24%" align="center">
                <span>{{factoryName}}</span>
              </td>
              <td width="14%" valign="top">
                <img src="../../assets/jiantou.png" />
              </td>
              <td width="24%" align="center">
                <span>{{yard}}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="details_cont">
            <el-steps :active="0" align-center>
            <el-step title="已提箱"></el-step>
            <el-step title="到门点"></el-step>
            <el-step title="出门点"></el-step>
            <el-step title="已完成"></el-step>
        </el-steps>
        </div>
        <div class="details_cont">
          <h2>基础信息</h2>
          <div class="detil_box">提单号：{{detailsData.billNo}}</div>
          <div class="detil_box">进出口：{{detailsData.isExport == 1 ? '进口' : '出口'}}</div>
          <div class="detil_box">箱型：{{detailsData.containerSize}}</div>
          <div class="detil_box">装货港：{{detailsData.startPortName}}</div>
          <div class="detil_box">船名：{{detailsData.shipName}}</div>
          <div class="detil_box">航次：{{detailsData.voyage}}</div>
          <div class="detil_box">做箱时间：{{detailsData.makeBoxTime}}</div>
        </div>
        <div class="details_cont">
          <h2>箱封号信息</h2>
          <div class="detil_box">
            箱号：{{detailsData.containerNumber}}
            <span @click="lookContanCtno(1)">查看图片</span>
          </div>
          <div class="detil_box">
            封号：{{detailsData.packageNumber}}
            <span @click="lookContanCtno(2)">查看图片</span>
          </div>
        </div>
        <div class="details_cont">
          <h2>司机信息</h2>
          <div class="detil_box">司机：{{detailsData.contactPerson}}</div>
          <div class="detil_box">车牌号：{{detailsData.carNo}}</div>
          <div class="detil_box">联系电话：{{detailsData.contactPhone}}</div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dataAdressSelected = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import imgLook from "../imgLook/imgLook.vue";
export default {
  data() {
    return {
      dialogVisible: false,
      carno: "",
      tableData: [],
      searchObj: {
        billNo: "",
        pageSize: 10,
        pageNo: 0
      },
      tabel: {
        total: 0
      },
      wrafName: "",
      yard: "",
      imgIdData: [],
      imgSelected: false,
      lngLatData: { lng: "", lat: "" },
      active: false,
      changCarno: "",
      titleData: "",
      dataAdressSelected: false,
      detailsData: "",
      selectedIndex: "",
      factoryName: ""
    };
  },
  created() {
    setTimeout(() => {
      this.searchData();
    }, 100);
    if (!this.$util.testingLogin.call(this)) {
      return;
    }
  },
  methods: {
    lookImage(row,type){
        if(type == 1){
            this.axios({
            url: "webOrder/queryContainerFileAtt",
            data: row.id,
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            method: "post"
            }).then(res => {
            if (res.data.length > 0) {
                this.imgIdData = res.data;
                this.imgSelected = true;
            } else {
                this.$message.error("此条单子下没有对应的图片");
                return;
            }
            });
        }else if(type==2){
             this.detailsClick(row);
        }else if (type == 3){
          this.$util.openUrl('container/baobiaoNew',{containerId:row.id})
        }
    },  
    lookContanCtno(type) {
      this.axios({
        url: "webOrder/queryContainerFileAtt",
        data: this.selectedIndex,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        method: "post"
      }).then(res => {
        let arr = [];
        arr = res.data.filter(item => item.attType == type);
        console.log(arr);
        if (arr.length > 0) {
          this.imgIdData = arr;
          this.imgSelected = true;
          this.dataAdressSelected = false;
        } else {
          this.$message.error("此条单子下没有对应的图片");
          return;
        }
      });
    },
    handleClose(done) {
      done();
    },
    dataAdress(done) {
      done();
    },
    draw({ el, BMap, map }) {
      const pixel = map.pointToOverlayPixel(
        new BMap.Point(this.lngLatData.lng, this.lngLatData.lat)
      );
      el.style.left = pixel.x - 60 + "px";
      el.style.top = pixel.y - 20 + "px";
    },
    searchData() {
      if (!this.$util.testingLogin.call(this)) {
        return;
      }
      this.axios
        .post("webOrder/queryContainerArr", this.searchObj)
        .then(res => {
          res.data.rows.forEach(item => {
            item.isExport = item.isExport == 1? '进口' : '出口'
            item.makeBoxTime = this.$util.handleTime(item.makeBoxTime, 1);
            item.endPortTime = this.$util.handleTime(item.endPortTime, 1);
            item.startPortTime = this.$util.handleTime(item.startPortTime, 1);
            item.placeTime = this.$util.handleTime(item.placeTime, 1);
            item.name1 = "";
            item.address1 = "";
            item.mendianList.forEach(item1 => {
              item.name1 += item1.factoryName ? item1.factoryName + "," : "";
              item.address1 += item1.address ? item1.address + "," : "";
            });
          });
          this.tableData = res.data.rows;
          this.tabel.total = res.data.total;
        });
    },
    imgLockClick(row, column, cell, event) {
      if (column.label == "车牌号") {
        // this.carno =
        if (row.carNo) {
          this.carno = row.carNo;
          this.carnoSearch();
          this.carno = "";
        }
      }
    },
    detailsClick(column) {
      this.factoryName =
        column.mendianList && column.mendianList.length != 0
          ? column.mendianList[0].name
          : "";
      this.wrafName = column.isExport == 1 ? column.wharfName : "提箱";
      this.yard = column.isExport == 1 ? "提箱" : column.wharfName;
      this.selectedIndex = column.id;
      this.detailsData = column;
      this.dataAdressSelected = true;
    },
    carnoSearch() {
      if (!this.carno) {
        return;
      }
      this.axios({
        url: "gps/multiCarQuery",
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        },
        data: this.carno
      })
        .then(res => {
          if (res.data.latitude) {
            this.lngLatData.lat = res.data.latitude
              ? res.data.latitude
              : 31.338684;
            this.lngLatData.lng = res.data.longitude
              ? res.data.longitude
              : 121.604004;
            this.dialogVisible = true;
            this.changCarno = res.data.carno;
            this.titleData = `车牌号:${res.data.carno}\n位置:${res.data.address}\n时间:${res.data.locationTime}`;
          } else {
            this.$message.error("没有gps信息");
          }
        })
        .catch(res => {
          this.$message.error("定位失败");
        });
    },
    imgClose(selected) {
      this.imgSelected = false;
    },
    handleCurrentChange(num) {
      this.searchObj.pageNo = num;
      this.searchData();
    },
    handleSizeChange(num) {
      this.searchObj.pageSize = num;
      this.searchData();
    },
    tableDbClick(a, b, c) {
      if (a.placeStatus != 1) {
        this.$message.error("订单正在执行中，无法更改");
        return;
      }
      this.$router.push({ path: "/orderManagement?orderId=" + a.orderId });
    }
  },
  components: {
    imgLook
  }
};
</script>

<style lang="less">
.billNoSearch_container {
  margin-bottom: 200px;
  .map {
    width: 100%;
    height: 600px;
  }
  .w {
    width: 1200px;
    margin: 0 auto;
  }
  .billNoSearch_header {
    background-color: #337ab7;
    height: 130px;
    box-sizing: border-box;
    padding: 35px 0 30px 0;
    h3 {
      font-size: 16px;
      color: #fff;
      line-height: 30px;
    }
    h4 {
      margin-top: 3px;
      font-size: 36px;
      color: #fff;
      line-height: 30px;
    }
  }
  .details_cont {
    padding: 20px;
    border-top: 1px solid #e2e2e2;
    h2 {
      font-size: 18px;
      color: rgb(27, 102, 199);
    }
    div {
      line-height: 37px;
    }
    span {
      color: rgb(54, 174, 234);
      font-size: 15px;
      cursor: pointer;
    }
  }
  .billNoSearch_banner {
    .cont {
      margin-top: 100px;
      background: #f4f5f7;
      border: 1px solid #dddddd;
      height: 90px;
      margin-bottom: 20px;
      box-sizing: border-box;
      padding-top: 25px;
      ul {
        li {
          float: left;
          width: 23%;
          padding: 0 10px;
          input {
            width: 100%;
            height: 35px;
            padding: 0 10px;
            font-size: 16px;
            border-radius: 5px;
            border: 1px solid #dddddd;
            margin-left: 15px;
            text-rendering: auto;
            color: initial;
            letter-spacing: normal;
            word-spacing: normal;
            text-transform: none;
            text-indent: 0px;
            text-shadow: none;
            display: inline-block;
            text-align: start;
            margin: 0em;
            font: 400 13.3333px Arial;
          }
          button {
            width: 110px;
            height: 35px;
            border-radius: 5px;
            border: 0;
            color: #fff;
            background: #337ab7 !important;
            font-size: 16px;
            line-height: 35px;
            text-align: center;
            margin-left: 30px;
          }
        }
      }
    }
  }
}
</style>