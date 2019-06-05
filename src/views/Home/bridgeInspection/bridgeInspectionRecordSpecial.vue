<template>
  <div class="inspection-content">
    <el-form-item label="检查编码">
      <el-input v-model=" menuForm.recordCode"></el-input>
    </el-form-item>
    <el-form-item label="结构部件 " prop="personName">
      <el-select v-model="menuForm.structuralPartId" placeholder="请选择结构部件">
        <el-option
          v-for="item in  componentsList"
          :key="item.componentId"
          :label="item.componentName"
          :value="item.componentId"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="检查单位 :" prop="bridgeConstructionMilestone">
      <el-select v-model="menuForm.organizationId" placeholder="请选择">
        <el-option
          v-for="item in  organizationOptin"
          :key="item. organizationId"
          :label="item.organizationName"
          :value="item.organizationId"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="状态 :" prop="bridgeConstructionMilestone">
      <el-select v-model="menuForm.status" placeholder="请选择">
        <el-option v-for="item in  statusOptin" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="特检缘由 :" prop="bridgeConstructionMilestone">
      <el-select v-model="menuForm.checkReason" placeholder="请选择">
        <el-option
          v-for="item in checkReasonList"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="实际负责人 :" prop="bridgeConstructionMilestone">
      <el-input v-model="menuForm.recordPrincipal"></el-input>
    </el-form-item>

    <el-form-item label="记录人 :" prop="bridgeConstructionMilestone">
      <el-input v-model="menuForm.recorder"></el-input>
    </el-form-item>

    <el-form-item label="费用 :" prop="bridgeConstructionMilestone">
      <el-input v-model="menuForm.speciallMoney"></el-input>
    </el-form-item>
    <el-form-item label="检查时间 :" prop="bridgeConstructionMilestone">
      <el-date-picker v-model="menuForm.checkTime" type="date" placeholder></el-date-picker>
    </el-form-item>

    <el-form-item label="检查项目结果 :" prop="bridgeConstructionMilestone">
      <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="menuForm.checkResult"></el-input>
    </el-form-item>
    <el-form-item label="特检新技术 :" prop="bridgeConstructionMilestone">
      <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="menuForm.technology"></el-input>
    </el-form-item>

    <el-form-item label="特检材料来源 :" prop="bridgeConstructionMilestone">
      <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="menuForm.materials"></el-input>
    </el-form-item>

    <el-form-item label="检查项目说明 :" prop="bridgeConstructionMilestone">
      <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="menuForm.checkExplain"></el-input>
    </el-form-item>

    <el-form-item label="检查项目评估 :" prop="bridgeConstructionMilestone">
      <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="menuForm.resultRanking"></el-input>
    </el-form-item>
    <el-form-item label="养护建议 :" prop="bridgeConstructionMilestone">
      <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="menuForm.proposal"></el-input>
    </el-form-item>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    planList: Array
  },
  data() {
    return {
      statusOptin: [
        {
          id: 0,
          name: "未完成"
        },
        {
          id: 1,
          name: "已完成"
        }
      ],
      componentsList: [
        { id: 1, name: "翼墙、耳墙", mark: null },
        { id: 2, name: "锥坡、护坡", mark: null },
        { id: 3, name: "桥墩", mark: null },
        { id: 4, name: "桥台", mark: null },
        { id: 5, name: "河床", mark: null },
        { id: 6, name: "调治构造物", mark: null },
        { id: 7, name: "墩台基础", mark: null },
        { id: 8, name: "支座", mark: null },
        { id: 9, name: "上部承重部件", mark: null },
        { id: 10, name: "上部一般部件", mark: null },
        { id: 11, name: "桥面铺装", mark: null },
        { id: 12, name: "伸缩缝装置", mark: null },
        { id: 13, name: "排水系统", mark: null },
        { id: 14, name: "照明", mark: null },
        { id: 15, name: "人行道", mark: null },
        { id: 16, name: "栏杆、护栏", mark: null }
      ],
      checkReasonList: [
        {
          id: 1,
          name: "洪水"
        },
        {
          id: 2,
          name: "滑坡"
        },
        {
          id: 3,
          name: "地震"
        },
        {
          id: 4,
          name: "车辆"
        }
      ],
      organizationOptin: [],
      componentList: [],
      menuForm: {
        recordId: null,
        planId: null,
        recordCode: null,
        structuralPartId: null,
        organizationId: null,
        recordPrincipal: null,
        recorder: null,
        remark: null,
        checkReason: null,
        checkType: null,
        checkResult: null,
        technology: null,
        materials: null,
        checkExplain: null,
        resultRanking: null,
        speciallMoney: null,
        status: null,
        proposal: null,
        checkTime: null,
        createTime: null,
        updateTime: null
      }
    };
  },
  computed: {},
  methods: {
    getComponent() {
      var that = this;
      axios
        .post(
          "http://bridge.vipgz1.idcfengye.com/api/bridge/getBridgeComponent",
          {
            currentPage: 0,
            pageSize: 0
          }
        )
        .then(function(response) {
          that.componentsList = [...response.data.data.list];
        })
        .catch(function(error) {
          //console.log(error);
        });
    },
    getOrganization() {
      var that = this;
      axios
        .post(
          "http://bridge.vipgz1.idcfengye.com/api/organization/getOrganization",
          {
            currentPage: 0,
            pageSize: 0
          }
        )
        .then(function(response) {
          that.organizationOptin = [...response.data.data.list];
          //console.log("管养单位")
          //console.log(that.sizeForm.organizationOptin)
        })
        .catch(function(error) {
          //console.log(error);
        });
    },
    submitForm(checkType) {
      if (checkType == 2) {
        var that = this;
        axios
          .post(
            "http://bridge.vipgz1.idcfengye.com/api/check/addSpecialRecord",
            {
              recordId: that.menuForm.recordId,
              recordCode: that.menuForm.recordCode,
              planId: that.planList[0].planId,
              bridgeCode: that.planList[0].bridgeCode,
              organizationId: that.menuForm.organizationId,
              recordPrincipal: that.menuForm.recordPrincipal,
              recorder: that.menuForm.recorder,
              proposal: that.menuForm.proposal,
              remark: that.menuForm.remark,
              status: that.menuForm.status,
              checkTime: that.menuForm.checkTime,
              createTime: that.menuForm.createTime,
              updateTime: that.menuForm.updateTime,
              structuralPartId: that.menuForm.structuralPartId,
              checkReason: that.menuForm.checkReason,
              checkType: that.menuForm.checkType,
              checkResult: that.menuForm.checkResult,
              technology: that.menuForm.technology,
              materials: that.menuForm.materials,
              checkExplain: that.menuForm.checkExplain,
              resultRanking: that.menuForm.resultRanking,
              speciallMoney: that.menuForm.speciallMoney
            }
          )
          .then(function(response) {
            //     that.organizationOptin = [...response.data.data.list];
            that.$router.push("/bridgeSpecialRecordInfo");
          })
          .catch(function(error) {
            console.log("异常错误");
          });
      }
    }
  },
  mounted() {
    this.getOrganization();
    this.getComponent();
  }
};
</script>
<style lang="stylus">
.inspection-content .el-date-editor.el-input {
  width: 100%;
}
</style>