<template>
  <div class="inspection-content">
    <el-form-item label="检查编码">
      <el-input v-model=" menuForm.recordCode"></el-input>
    </el-form-item>
    <el-form-item label="桥梁编码 " prop="personName">
      <el-input v-model="planList[0].bridgeCode" disabled></el-input>
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

    <el-form-item label="实际负责人 :" prop="bridgeConstructionMilestone">
      <el-input v-model="planList[0].bepersonName" disabled></el-input>
    </el-form-item>
    <el-form-item label="创建人Id :" prop="bridgeConstructionMilestone" v-show="false">
      <el-input v-model="planList[0].personId"></el-input>
    </el-form-item>
    <el-form-item label="记录人 :" prop="bridgeConstructionMilestone">
      <el-input v-model="planList[0].personName" disabled></el-input>
    </el-form-item>
    <el-form-item label="检查时间 :" prop="bridgeConstructionMilestone">
      <el-date-picker
        v-model="menuForm.checkTime"
        type="date"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="病害标度" prop="diseaseGrade">
      <el-select v-model="menuForm.reserve1" placeholder="请选择病害实时标度">
        <el-option
          v-for="item in diseaseGradeList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="养护建议 :" prop="bridgeConstructionMilestone">
      <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="menuForm.proposal"></el-input>
    </el-form-item>

    <div>
      <el-form-item label="检查内容 :" prop="bridgeConstructionMilestone"></el-form-item>
      <div style="padding:0 40px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-button style="float: right; padding: 3px 0" type="text" @click="addContent()">添加</el-button>
          </div>
          <el-form-item label="部件名称">
            <el-select v-model="contentForm.structuralName" placeholder="请选择">
              <el-option
                v-for="item in  componentsList"
                :key="item. id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="缺省类型">
            <el-input v-model="contentForm.defectType"></el-input>
          </el-form-item>
          <el-form-item label="缺省范围">
            <el-input v-model="contentForm.defectScope"></el-input>
          </el-form-item>
          <el-form-item label="缺省建议">
            <el-input v-model="contentForm.proposal"></el-input>
          </el-form-item>
        </el-card>
        <el-card class="box-card" v-for="(item,index) in checkedContent" :key="index">
          <div slot="header" class="clearfix">
            <el-button style="float: right; padding: 3px 0" type="text" @click="addContent()"></el-button>
          </div>
          <div slot="header" class="clearfix"></div>
          <el-form-item label="部件名称">
            <el-select v-model="item.structuralName" placeholder="请选择" disabled>
              <el-option
                v-for="item in  componentsList"
                :key="item. id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="缺省类型">
            <el-input v-model="item.defectType" disabled></el-input>
          </el-form-item>
          <el-form-item label="缺省范围">
            <el-input v-model="item.defectScope" disabled></el-input>
          </el-form-item>
          <el-form-item label="缺省建议">
            <el-input v-model="item.proposal" disabled></el-input>
          </el-form-item>
        </el-card>
      </div>
    </div>
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
      diseaseGradeList: [
        {
          id: 1,
          name: "1级"
        },
        {
          id: 2,
          name: "2级"
        },
        {
          id: 3,
          name: "3级"
        },
        {
          id: 4,
          name: "4级"
        },
        {
          id: 5,
          name: "5级"
        }
      ],
      checkedContent: [],
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
        { id: 9, name: "上部承重构件", mark: null },
        { id: 10, name: "上部一般构件", mark: null },
        { id: 11, name: "桥面铺装", mark: null },
        { id: 12, name: "伸缩缝装置", mark: null },
        { id: 13, name: "排水系统", mark: null },
        { id: 14, name: "照明", mark: null },
        { id: 15, name: "人行道", mark: null },
        { id: 16, name: "栏杆、护栏", mark: null }
      ],
      organizationOptin: [],
      menuForm: {
        recordId: null,
        recordCode: null,
        planId: null,
        bridgeCode: null,
        organizationId: null,
        recordPrincipal: null,
        personId: null,
        recorder: null,
        checkDetails: null,
        proposal: null,
        remark: null,
        status: null,
        checkTime: null,
        createTime: null,
        updateTime: null,
        reserve1: null
      },
      contentForm: {
        detailsId: null,
        defectType: null,
        defectScope: null,
        structuralName: null,
        checkDetails: null,
        imgUrl: null,
        proposal: null,
        remark: null,
        status: null,
        reserve1: null,
        reserve2: null,
        reserve3: null,
        createTime: null,
        updateTime: null
      }
    };
  },
  computed: {},
  methods: {
    addContent() {
      let bridgeCode = this.planList[0].bridgeCode;
      let contentItem = {
        bridgeCode: this.planList[0].bridgeCode,
        recordCode: this.menuForm.recordCode,
        personId: this.planList[0].personId,
        recorder: this.planList[0].personName,
        ...this.contentForm
      };
      console.log(contentItem);
      this.checkedContent.push(contentItem);
      (this.contentForm.structuralName = null),
        (this.contentForm.defectType = null),
        (this.contentForm.defectScope = null),
        (this.contentForm.proposal = null);
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
      if (checkType == 0) {
        var that = this;
        axios
          .post(
            "http://bridge.vipgz1.idcfengye.com/api/check/addRegularRecord",
            {
              recordId: that.menuForm.recordId,
              recordCode: that.menuForm.recordCode,
              planId: that.planList[0].planId,
              bridgeCode: that.planList[0].bridgeCode,
              organizationId: that.menuForm.organizationId,
              recordPrincipal: that.planList[0].bepersonName,
              personId: that.planList[0].personId,
              recorder: that.planList[0].personName,
              checkDetails: that.menuForm.checkDetails,
              proposal: that.menuForm.proposal,
              remark: that.menuForm.remark,
              status: that.menuForm.status,
              checkTime: that.menuForm.checkTime,
              createTime: that.menuForm.createTime,
              updateTime: that.menuForm.updateTime,
              checkRegularDetails: that.checkedContent,
              reserve1: that.menuForm.reserve1
            }
          )
          .then(function(response) {
            //   that.organizationOptin = [...response.data.data.list];
            that.$router.push("/bridgeRecordInfo");
          })
          .catch(function(error) {
            console.log("异常错误");
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

.box-card {
  width: 350px;
  display: inline-block;
  margin: 10px;
}
</style>