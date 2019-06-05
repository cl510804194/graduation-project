<template>
  <div class="bridgeinfo-box">
    <div class="bridge-table-border">
      <el-row>
        <el-button @click.native.prevent="routerAdd()">添加</el-button>
      </el-row>

      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand" label-width="120px">
              <el-tag type="info" class="birdgeint-tag">桥梁识别</el-tag>
              <el-form-item label="桥梁Id">
                <span>{{ props.row.bridgeCode }}</span>
              </el-form-item>
              <el-form-item label="桥梁名称">
                <span>{{ props.row.bridgeName }}</span>
              </el-form-item>
              <el-form-item label="路线号">
                <span>{{ props.row.roadNumber }}</span>
              </el-form-item>
              <el-form-item label="路线名称">
                <span>{{ props.row.roadName }}</span>
              </el-form-item>
              <el-form-item label="路线类型">
                <span>{{ props.row.roadType }}</span>
              </el-form-item>
              <el-form-item label="次要路线">
                <span>{{ props.row.minorRoad }}</span>
              </el-form-item>
              <el-form-item label="顺序号">
                <span>{{ props.row.bridgeSerialNumber }}</span>
              </el-form-item>
              <el-form-item label="所在地">
                <span>{{ props.row.bridgeLocation }}</span>
              </el-form-item>
              <el-form-item label="经度">
                <span>{{ props.row.longitude }}</span>
              </el-form-item>
              <el-form-item label="维度">
                <span>{{ props.row.latitude }}</span>
              </el-form-item>
              <el-form-item label="中心桩号">
                <span>{{ props.row.bridgeCenterMilestone }}</span>
              </el-form-item>
              <el-form-item label="桥型">
                <span>{{ props.row.bridgeType }}</span>
              </el-form-item>
              <el-form-item label="管养单位">
                <span>{{ props.row.organizationName }}</span>
              </el-form-item>
              <el-form-item label="跨越地物名称">
                <span>{{ props.row.bridgeSpanName }}</span>
              </el-form-item>
              <el-form-item label="跨越地物类型">
                <span>{{ props.row.bridgeSpanType }}</span>
              </el-form-item>
              <el-form-item label="施工桩号">
                <span>{{ props.row.bridgeConstructionMilestone }}</span>
              </el-form-item>
              <el-form-item label="公路技术等级">
                <span>{{ props.row.highwayLevel }}</span>
              </el-form-item>
              <el-form-item label="桥梁性质">
                <span>{{ props.row.bridgeProperty }}</span>
              </el-form-item>
              <el-form-item label="桥梁分类">
                <span>{{ props.row.bridgeClassification }}</span>
              </el-form-item>
              <el-form-item label="设计荷载等级">
                <span>{{ props.row.desiginLoadLevel }}</span>
              </el-form-item>
              <el-form-item label="目前荷载等级">
                <span>{{ props.row.bridgeNowLoadLevel }}</span>
              </el-form-item>
              <el-form-item label="上部结构类型">
                <span>{{ props.row.bridgeSuperstructureType }}</span>
              </el-form-item>
              <el-form-item label="支座类型">
                <span>{{ props.row.bridgeSupportType }}</span>
              </el-form-item>
              <el-form-item label="桥墩类型">
                <span>{{ props.row.bridgePierType}}</span>
              </el-form-item>
              <el-form-item label="桥台类型">
                <span>{{ props.row.bridgeAbutmentType}}</span>
              </el-form-item>
              <el-form-item label="桥墩基础类型">
                <span>{{ props.row.bridgePierPileType }}</span>
              </el-form-item>
              <el-form-item label="桥台基础类型">
                <span>{{ props.row.bridgeAbutmentPileType }}</span>
              </el-form-item>
              <el-form-item label="桥面铺装类型">
                <span>{{ props.row.bridgeDeckType }}</span>
              </el-form-item>
              <el-form-item label="伸缩缝类型">
                <span>{{ props.row.bridgeDeckType }}</span>
              </el-form-item>
              <el-form-item label="桥梁用途">
                <span>{{ props.row.bridgePurpose }}</span>
              </el-form-item>
              <el-form-item label="桥梁状态">
                <span>{{ props.row.bridgeState}}</span>
              </el-form-item>
              <el-form-item label="行政等级">
                <span>{{ props.row.administrativeLevel}}</span>
              </el-form-item>
              <el-form-item label="所属乡镇">
                <span>{{ props.row.bridgeTownship}}</span>
              </el-form-item>
              <el-form-item label="母桥代码">
                <span>{{ props.row.bridgeMotherCode}}</span>
              </el-form-item>
              <el-form-item label="管理形式码">
                <span>{{ props.row.bridgeManageCode}}</span>
              </el-form-item>
              <el-form-item label="责任人">
                <span>{{ props.row.bridgePrincipal}}</span>
              </el-form-item>
              <el-form-item label="多媒体资料">
                <span ref="multimediaData" v-if="false">{{ props.row.multimediaData}}</span>
                <img :src="imgSrc+props.row.multimediaData" alt width="100px" height="100px">
              </el-form-item>
              <el-tag type="info" class="birdgeint-tag">桥梁结构</el-tag>
              <el-form-item label="桥梁组合">
                <span>{{ props.row.bridgeSpanCombination}}</span>
              </el-form-item>
              <el-form-item label="最大跨境">
                <span>{{ props.row.bridgeMaxSpan}}</span>
              </el-form-item>
              <el-form-item label="桥梁全长">
                <span>{{ props.row.bridgeLength}}</span>
              </el-form-item>
              <el-form-item label="路径总长">
                <span>{{ props.row.bridgeTotalSpan}}</span>
              </el-form-item>
              <el-form-item label="桥宽组合">
                <span>{{ props.row.bridgeWidthConbination}}</span>
              </el-form-item>
              <el-form-item label="桥面净宽">
                <span>{{ props.row.bridgeClearWidth}}</span>
              </el-form-item>
              <el-form-item label="是否宽路窄桥">
                <span>{{ props.row.isWideroadNarrowbridge}}</span>
              </el-form-item>
              <el-form-item label="桥高">
                <span>{{ props.row.bridgeHeight}}</span>
              </el-form-item>
              <el-form-item label="建桥年月">
                <span>{{ props.row.bridgemountedate}}</span>
              </el-form-item>
              <el-form-item label="改建年月">
                <span>{{ props.row.bridgeRebuildDate}}</span>
              </el-form-item>
              <el-form-item label="通航等级">
                <span>{{ props.row.navigationLevel}}</span>
              </el-form-item>
              <el-form-item label="桥梁限高">
                <span>{{ props.row.bridgeMaxHeadroom}}</span>
              </el-form-item>
              <el-form-item label="桥下垂直净高">
                <span>{{ props.row.bridgeVerticalHeight}}</span>
              </el-form-item>
              <el-form-item label="跨中截面高">
                <span>{{ props.row.bridgeMidspanHeight}}</span>
              </el-form-item>
              <el-form-item label="桥面全宽">
                <span>{{ props.row.bridgeOverallWidth}}</span>
              </el-form-item>
              <el-form-item label="桥梁平曲面净宽">
                <span>{{ props.row.bridgeHorizontalRadius}}</span>
              </el-form-item>
              <el-form-item label="矢跨比">
                <span>{{ props.row.bridgeHeadWidth}}</span>
              </el-form-item>
              <el-form-item label="桥面纵坡">
                <span>{{ props.row.bridgeRiseSpanRatio}}</span>
              </el-form-item>
              <el-form-item label="弯坡斜特征">
                <span>{{ props.row.bridgeLongitudinalSlope}}</span>
              </el-form-item>
              <el-form-item label="立交特征">
                <span>{{ props.row.bridgeLinetype}}</span>
              </el-form-item>
              <el-form-item label="交叉形式">
                <span>{{ props.row.bridgeGradeSeparation}}</span>
              </el-form-item>
              <el-form-item label="引道总宽">
                <span>{{ props.row.bridgeIntersect}}</span>
              </el-form-item>
              <el-form-item label="引道路面宽">
                <span>{{ props.row.bridgeApproachWidth}}</span>
              </el-form-item>
              <el-form-item label="引道线形">
                <span>{{ props.row.bridgeApproachPavementWidth}}</span>
              </el-form-item>
              <el-form-item label="桥台护坡">
                <span>{{ props.row.bridgeApproachLinear}}</span>
              </el-form-item>
              <el-form-item label="护墩体">
                <span>{{ props.row.accelerationFactor}}</span>
              </el-form-item>
              <el-form-item label="调治构造物">
                <span>{{ props.row.modulatingStructure}}</span>
              </el-form-item>
              <el-form-item label="常水位">
                <span>{{ props.row.regularWaterLevel}}</span>
              </el-form-item>
              <el-form-item label="设计水位">
                <span>{{ props.row.designWaterLevel}}</span>
              </el-form-item>
              <el-form-item label="历史洪水位">
                <span>{{ props.row.maximumHistoricalFlood}}</span>
              </el-form-item>
              <el-form-item label="地震动峰值加速度系数">
                <span>{{ props.row.bridgeApproachLinear}}</span>
              </el-form-item>

              <el-tag type="info" class="birdgeint-tag">桥梁经济</el-tag>

              <el-form-item label="总造价">
                <span>{{ props.row.bridgeCost}}</span>
              </el-form-item>
              <el-form-item label="施工工期">
                <span>{{ props.row.bridgeConstructionPeriod}}</span>
              </el-form-item>
              <el-form-item label="桥面中心标高">
                <span>{{ props.row.bridgeDeckElevation}}</span>
              </el-form-item>
              <el-form-item label="设计洪水频率">
                <span>{{ props.row.designedFloodFrequency}}</span>
              </el-form-item>
              <el-form-item label="设计冲刷标高">
                <span>{{ props.row.designedScourElevation}}</span>
              </el-form-item>
              <el-form-item label="主桥基底标高">
                <span>{{ props.row.bridgeBaseElevation}}</span>
              </el-form-item>
              <el-form-item label="历史最大洪水">
                <span>{{ props.row.historyFloodElevation}}</span>
              </el-form-item>
              <el-form-item label="年日均交通量">
                <span>{{ props.row.avgTraffic}}</span>
              </el-form-item>
              <el-form-item label="防护工程类型">
                <span>{{ props.row.bridgeProtectProject}}</span>
              </el-form-item>
              <el-form-item label="地基地质">
                <span>{{ props.row.bridgeGeology}}</span>
              </el-form-item>
              <el-form-item label="抗震设防">
                <span>{{ props.row.bridgeAntiknock}}</span>
              </el-form-item>
              <el-form-item label="桥上附设">
                <span>{{ props.row.bridgeAuxiliary}}</span>
              </el-form-item>
              <el-form-item label="分隔带">
                <span>{{ props.row.bridgeSeparator}}</span>
              </el-form-item>
              <el-form-item label="收费情况">
                <span>{{ props.row.bridgeCharge}}</span>
              </el-form-item>
              <el-tag type="info" class="birdgeint-tag">桥梁档案</el-tag>
              <el-form-item label="设计资料编号">
                <span>{{ props.row.bridgeDesignDataNum}}</span>
              </el-form-item>
              <el-form-item label="竣工资料编号">
                <span>{{ props.row.bridgeCompletionDataNum}}</span>
              </el-form-item>
              <el-form-item label="养护资料编号">
                <span>{{ props.row.bridgeMaintenanceDataNum}}</span>
              </el-form-item>
              <el-form-item label="保管单位">
                <span>{{ props.row.bridgeKeeper}}</span>
              </el-form-item>
              <el-form-item label="交通管制措施">
                <span>{{ props.row.trafficControlMeasures}}</span>
              </el-form-item>

              <el-form-item label="最近改造部位">
                <span>{{ props.row.lastRebuildDate}}</span>
              </el-form-item>
              <el-form-item label="最近改造完工日期">
                <span>{{ props.row.lastRebuildPart}}</span>
              </el-form-item>
              <el-form-item label="工程性质">
                <span>{{ props.row.projectNature}}</span>
              </el-form-item>
              <el-form-item label="产权单位名称">
                <span>{{ props.row.bridgeOwner}}</span>
              </el-form-item>
              <el-form-item label="设计单位">
                <span>{{ props.row.bridgeDesignDepartment}}</span>
              </el-form-item>
              <el-form-item label="所用标准图">
                <span v-if="false">{{ props.row.bridgeConstructionDrawings}}</span>
                <img
                  :src="imgSrc+props.row.bridgeConstructionDrawings"
                  alt
                  width="100px"
                  height="100px"
                >
              </el-form-item>
              <el-form-item label="设计者">
                <span>{{ props.row.bridgeDesigner}}</span>
              </el-form-item>
              <el-form-item label="施工单位">
                <span>{{ props.row.bridgePracticeDepartment}}</span>
              </el-form-item>
              <el-form-item label="施工负责人">
                <span>{{ props.row.bridgeConstructionSupervisor}}</span>
              </el-form-item>
              <el-form-item label="监理单位">
                <span>{{ props.row.bridgeSuperviseDepartment}}</span>
              </el-form-item>
              <el-form-item label="竣工验收意见">
                <span>{{ props.row.bridgeAcceptanceOpinion}}</span>
              </el-form-item>
              <el-form-item label="最后修改日期">
                <span>{{ props.row.lastUpdateDate}}</span>
              </el-form-item>
              <el-tag type="info" class="birdgeint-tag">桥梁桥牌</el-tag>
              <el-form-item label="养护单位">
                <span>{{ props.row.bridgeMaintenance}}</span>
              </el-form-item>
              <el-form-item label="养护电话">
                <span>{{ props.row.bridgeMaintenancePhone}}</span>
              </el-form-item>
              <el-form-item label="管理单位">
                <span>{{ props.row.bridgeManager}}</span>
              </el-form-item>
              <el-form-item label="管理电话">
                <span>{{ props.row.bridgeManagePhone}}</span>
              </el-form-item>
              <el-form-item label="监管单位">
                <span>{{ props.row.bridgeSuperviseDep}}</span>
              </el-form-item>
              <el-form-item label="监管电话">
                <span>{{ props.row.bridgeSupervisePhone}}</span>
              </el-form-item>
              <el-tag type="info" class="birdgeint-tag">桥梁部件</el-tag>
              <el-form-item
                v-for="(item,index) in props.row.bridgeParts"
                :key="index"
                :label="item.partName"
              >
                <span>{{ item.mark}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="bridgeCode" label="桥梁编码"></el-table-column>
        <el-table-column prop="bridgeName" label="桥梁名称" width="120"></el-table-column>
        <!-- <el-table-column prop="roadNumber" label="路线号"></el-table-column> -->
        <!-- <el-table-column prop="roadName" label="路线名称"></el-table-column> -->
        <el-table-column prop="bridgeCenterMilestone" label="中心桩号"></el-table-column>
        <el-table-column prop="bridgeType" label="桥型"></el-table-column>
        <el-table-column prop="bridgeClassification" label="桥梁分类"></el-table-column>
        <el-table-column prop="organizationName" label="养护单位"></el-table-column>
        <!-- <el-table-column prop="bridgeManager" label="管理单位"></el-table-column> -->
        <!-- <el-table-column fixed="right" label="操作" width="420">
          <template slot-scope="scope">
            <el-button
              v-if="userShow"
              @click.native.prevent="inspectionRowOften(scope.$index, tableData)"
              size="mini"
            >添加经常性检查</el-button>

            <el-button
              v-if="userShow"
              @click.native.prevent="inspectionRowRegular(scope.$index, tableData)"
              size="mini"
            >添加定期检查</el-button>
            <el-button
              v-if="userShow"
              @click.native.prevent="inspectionRowSpecial(scope.$index, tableData)"
              size="mini"
            >添加特殊检查</el-button>
          </template>
        </el-table-column>-->
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>
  </div>
</template>

  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      userList: [],
      userShow: true,
      organizationType: null,
      imgSrc: "http://bridge.vipgz1.idcfengye.com/api/file/getFile?fileId=",
      diseaseForm: {
        bridgeCode: null,
        bridgeId: null
      },
      imgUrl: null
    };
  },
  methods: {
    routerAdd() {
      this.$router.push("/bridgeAdd");
    },
    getIndex(index, rows) {
      console.log(index);
    },
    diseaseRow(index, rows) {
      var that = this;
      //console.log(this.tableData);
      that.diseaseForm.bridgeCode = that.tableData[index].bridgeCode;
      console.log(that.diseaseForm.bridgeCode);
      this.$router.push({
        name: "bridgedisease",
        params: { bridgeCode: that.diseaseForm.bridgeCode }
      });
    },
    getUserinfo() {
      var that = this;
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/user/getUserInfo", {})
        .then(function(response) {
          console.log(response);
          that.organizationType = response.data.data.organizationType;
          console.log(that.organizationType);
          if (that.organizationType == "省级") {
            that.userShow = true;
          } else {
            that.userShow = false;
          }
        })
        .catch(function(error) {});
    },
    inspectionRowOften(index, rows) {
      var that = this;
      //console.log(this.tableData);
      that.diseaseForm.bridgeCode = that.tableData[index].bridgeCode;
      console.log(that.diseaseForm.bridgeCode);
      this.$router.push({
        name: "bridgeinspection",
        params: { bridgeCode: that.diseaseForm.bridgeCode, checkType: 0 }
      });
    },
    inspectionRowRegular(index, rows) {
      var that = this;
      //console.log(this.tableData);
      that.diseaseForm.bridgeCode = that.tableData[index].bridgeCode;
      console.log(that.diseaseForm.bridgeCode);
      this.$router.push({
        name: "bridgeinspection",
        params: { bridgeCode: that.diseaseForm.bridgeCode, checkType: 1 }
      });
    },
    inspectionRowSpecial(index, rows) {
      var that = this;
      //console.log(this.tableData);
      that.diseaseForm.bridgeCode = that.tableData[index].bridgeCode;
      console.log(that.diseaseForm.bridgeCode);
      this.$router.push({
        name: "bridgeinspection",
        params: { bridgeCode: that.diseaseForm.bridgeCode, checkType: 2 }
      });
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    getBridge() {
      var that = this;
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/bridge/getBridge", {})
        .then(function(response) {
          //console.log(response.data.data.list);
          that.tableData = [...response.data.data.list];
          that.getUserinfo();
        })
        .catch(function(error) {});
    },
    getImg() {
      var that = this;
      axios
        .get("http://bridge.vipgz1.idcfengye.com/api/file/getFile", {
          params: {
            fileId: 12
          }
        })
        .then(function(response) {
          //console.log(response.data.data.list);
          that.tableData = [...response.data.data.list];
        })
        .catch(function(error) {});
    }
  },
  mounted: function() {
    this.getBridge();
    this.getImg();
    this.getUserinfo();
    //console.log(that.tableData);
  }
};
</script>
<style lang="stylus" scoped>
menu-shadow() {
  border-radius: 4px;
  border: 4px solid #E9EEF3;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.54);
}

.menu-manage-box {
  padding: 20px;
  menu-shadow();
}

.el-table {
  menu-shadow();
}

.bridgeinfo-box {
  border-radius: 4px;
  border: 4px solid #E9EEF3;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.54);
  padding: 19px;
}

.bridge-table-border {
  border-radius: 4px;
  border: 4px solid #e9eef3;
  -webkit-box-shadow: 0 0 6px rgba(0, 0, 0, 0.54);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.54);
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 25%;
}

.birdgeint-tag {
  display: block;
  text-align: center;
}

.el-row .bridge-dropdown {
  display: inline-block;
  menu-shadow();
  margin: 20px;
}

.el-button {
  background-color: #545c64;
  color: #eee;
  margin: 2px;
  border: 0px;

  &:hover {
    background-color: #eee;
    color: #545c64;
  }

  &:active {
    background-color: #eee;
    color: #545c64;
  }
}
</style>

