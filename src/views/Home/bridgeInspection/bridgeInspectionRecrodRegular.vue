<template>
  <div class="inspection-content">
    <el-form-item label="检查编码">
      <el-input v-model=" menuForm.recordCode"></el-input>
    </el-form-item>
    <el-form-item label="桥梁编码 " prop="personName">
      <el-input v-model="planList[0].bridgeCode" disabled></el-input>
    </el-form-item>
    <el-form-item label="检查单位 :" prop="bridgeConstructionMilestone">
      <el-select v-model="menuForm.organizationId" placeholder="请选择单位">
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

    <el-form-item label="实际负责人 :" prop="bridgeConstructionMilestone">
      <el-input v-model="menuForm.recordPrincipal"></el-input>
    </el-form-item>
    <el-form-item label="创建人Id :" prop="bridgeConstructionMilestone">
      <el-input v-model="planList[0].personId" disabled></el-input>
    </el-form-item>
    <el-form-item label="记录人 :" prop="bridgeConstructionMilestone">
      <el-input v-model="menuForm.recorder"></el-input>
    </el-form-item>
    <el-form-item label="检查时间 :" prop="bridgeConstructionMilestone">
      <el-date-picker v-model="menuForm.checkTime" type="date" placeholder></el-date-picker>
    </el-form-item>

    <el-form-item label="总体评分等级 " prop="personName">
      <el-input v-model="menuForm.gradeRanking"></el-input>
    </el-form-item>

    <el-form-item label="清洁评分等级 " prop="personName">
      <el-input v-model="menuForm.cleanRanking"></el-input>
    </el-form-item>

    <el-form-item label="保养、小修评分等级 " prop="personName">
      <el-input v-model="menuForm.maintainRanking"></el-input>
    </el-form-item>

    <el-form-item label="上部结构形式 :" prop="bridgeConstructionMilestone">
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="menuForm.upsideStructureShape"
      ></el-input>
    </el-form-item>

    <el-form-item label="桥墩结构形式 :" prop="bridgeConstructionMilestone">
      <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="menuForm.pierStructureShape"></el-input>
    </el-form-item>

    <el-form-item label="桥台结构形式 :" prop="bridgeConstructionMilestone">
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="menuForm.abutmentStructureShape"
      ></el-input>
    </el-form-item>

    <el-form-item label="路径组合 :" prop="bridgeConstructionMilestone">
      <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="menuForm.pathCombination"></el-input>
    </el-form-item>
    <el-form-item label="检查内容 :" prop="bridgeConstructionMilestone">
      <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="menuForm.checkDetails"></el-input>
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
      organizationOptin: [],
      menuForm: {
        recordId: null,
        recordCode: null,
        planId: null,
        organizationId: null,
        recordPrincipal: null,
        recorder: null,
        pathCombination: null,
        pathType: null,
        upsideStructureShape: null,
        pierStructureShape: null,
        abutmentStructureShape: null,
        technical: null,
        checkDetails: null,
        remark: null,
        gradeRanking: null,
        cleanRanking: null,
        maintainRanking: null,
        proposal: null,
        status: null,
        checkTime: null,
        checkNextTime: null,
        createTime: null,
        updateTime: null
      }
    };
  },
  computed: {},
  methods: {
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
      if (checkType == 1) {
        var that = this;
        axios
          .post(
            "http://bridge.vipgz1.idcfengye.com/api/check/addIntervalsRecord",
            {
              recordId: that.menuForm.recordId,
              recordCode: that.menuForm.recordCode,
              planId: that.planList[0].planId,
              bridgeCode: that.planList[0].bridgeCode,
              organizationId: that.menuForm.organizationId,
              recordPrincipal: that.menuForm.recordPrincipal,
              personId: that.planList[0].personId,
              recorder: that.menuForm.recorder,
              checkDetails: that.menuForm.checkDetails,
              proposal: that.menuForm.proposal,
              remark: that.menuForm.remark,
              status: that.menuForm.status,
              checkTime: that.menuForm.checkTime,
              createTime: that.menuForm.createTime,
              updateTime: that.menuForm.updateTime,
              pathCombination: that.menuForm.pathCombination,
              pathpathType: that.menuForm.pathType,
              upsideStructureShape: that.menuForm.upsideStructureShape,
              pierStructureShape: that.menuForm.pierStructureShape,
              abutmentStructureShape: that.menuForm.abutmentStructureShape,
              technical: that.menuForm.technical,
              gradeRanking: that.menuForm.gradeRanking,
              cleanRanking: that.menuForm.cleanRanking,
              maintainRanking: that.menuForm.maintainRanking
            }
          )
          .then(function(response) {
            //that.organizationOptin = [...response.data.data.list];
            //console.log("管养单位")
            //console.log(that.sizeForm.organizationOptin)
            that.$router.push("/bridgeRegularRecordInfo");
          })
          .catch(function(error) {
            alert("异常错误");
          });
      }
    }
  },
  mounted() {
    this.getOrganization();
  }
};
</script>
<style lang="stylus">
.inspection-content .el-date-editor.el-input {
  width: 100%;
}

.inspection-content .el-textarea__inner {
  padding: 5px 6px;
}
</style>