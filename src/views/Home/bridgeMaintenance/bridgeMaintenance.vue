<template>
  <el-form label-width="110px" size="mini" inline>
    <div class="inspection-header">
      <el-form-item label="桥梁编码:">
        <el-select v-model="menuForm.bridgeCode" placeholder="请选择桥梁">
          <el-option
            v-for="item in bridgeList"
            :key="item.bridgeCode"
            :label="item.bridgeName"
            :value="item.bridgeCode"
          ></el-option>
        </el-select>
        <!-- <el-input v-model="menuForm.bridgeCode"></el-input> -->
      </el-form-item>
      <el-form-item label="人员Id :" prop="bridgeConstructionMilestone" v-if="false">
        <el-input v-model="menuForm.bepersonId" disabled></el-input>
      </el-form-item>
      <el-form-item label="创建人 :" prop="bridgeConstructionMilestone">
        <el-input v-model="menuForm.bepersonId" disabled></el-input>
      </el-form-item>
      <el-button class="next-button" style="margin-top: 12px;" @click="submitForm()">下一步</el-button>
    </div>

    <!-- <inspectionContent :statusOptions="statusOptions"  :invalidOptins="invalidOptins" :menuForm="menuForm"></inspectionContent> -->
    <div class="inspection-content">
      <el-form-item label="计划编码:">
        <el-input v-model="menuForm.planCode"></el-input>
      </el-form-item>

      <el-form-item label="预计工程量:">
        <el-input v-model="menuForm.quantities"></el-input>
      </el-form-item>
      <el-form-item label="维修技术水平:">
        <el-select v-model="menuForm.maintainLevel" placeholder="请选择">
          <el-option
            v-for="item in technicalLevel"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="检查人Id " prop="bridgeSpanType">
      <el-input v-model="this.menuForm.personId"></el-input>
      </el-form-item>-->
      <el-form-item label="申报单位 ">
        <el-select v-model="menuForm.organizationId" placeholder="请选择">
          <el-option
            v-for="item in organizationOptin"
            :key="item. organizationId"
            :label="item. organizationName"
            :value="item. organizationId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="维修范围 :" prop="bridgeConstructionMilestone">
        <el-input v-model="menuForm.maintainRange"></el-input>
      </el-form-item>

      <el-form-item label="负责人 :" prop="bridgeConstructionMilestone">
        <el-select v-model="menuForm.bepersonId" placeholder="请选择">
          <el-option
            v-for="item in getUserList"
            :key="item.personId"
            :label="item.personName"
            :value="item.personId"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="申请人 :" prop="bridgeConstructionMilestone">
        <el-select v-model="menuForm.personId" placeholder="请选择">
          <el-option
            v-for="item in getUserList"
            :key="item.personId"
            :label="item.personName"
            :value="item.personId"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="失效标记 :" prop="bridgeConstructionMilestone">
        <el-select v-model="menuForm.invalid" placeholder="请选择失效情况">
          <el-option
            v-for="item in invalidOptins"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预计费用 :" prop="bridgeConstructionMilestone">
        <el-input v-model="menuForm.estimatedCost"></el-input>
      </el-form-item>
      <el-form-item label="维修等级 :" prop="bridgeConstructionMilestone">
        <el-input v-model="menuForm.maintainRanking"></el-input>
      </el-form-item>
      <el-form-item label="状态 :" prop="bridgeConstructionMilestone">
        <el-select v-model="menuForm.status" placeholder="请选择桥梁名称">
          <el-option
            v-for="item in statusOptions"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述 :" prop="bridgeConstructionMilestone">
        <el-input v-model="menuForm.description"></el-input>
      </el-form-item>
      <el-form-item label="计划开始时间 :" prop="bridgeConstructionMilestone">
        <!-- <span class="demonstration">默认</span> -->
        <el-date-picker v-model="menuForm.planStartTime" type="date" placeholder></el-date-picker>
      </el-form-item>

      <el-form-item label="计划结束时间 :" prop="bridgeConstructionMilestone">
        <!-- <span class="demonstration">默认</span> -->
        <el-date-picker v-model="menuForm.planEndTime" type="date" placeholder></el-date-picker>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      bridgeList: [],
      insprectionTypeOptions: [
        {
          id: 1,
          value: "经常性检查"
        },
        {
          id: 2,
          value: "定期检查"
        },
        {
          id: 3,
          value: "特殊检查"
        }
      ],
      statusOptions: [
        {
          id: 0,
          value: "未完成"
        },
        {
          id: 1,
          value: "已完成"
        }
      ],
      invalidOptins: [
        {
          id: 0,
          value: "失效"
        },
        {
          id: 1,
          value: "正常"
        }
      ],
      technicalLevel: [
        {
          id: 0,
          value: "低"
        },
        {
          id: 1,
          value: "中"
        },
        {
          id: 2,
          value: "高"
        }
      ],
      organizationOptin: [],
      getbridgeForm: [],
      getUserList: [],
      menuForm: {
        planId: null,
        planCode: null,
        bridgeCode: this.$route.params.bridgeCode,
        quantities: null,
        maintainLevel: null,
        estimatedCos: null,
        organizationId: null,
        maintainRange: null,
        bepersonId: null,
        personId: null,
        principal: null,
        proposer: null,
        invalid: null,
        maintainRanking: null,
        status: null,
        description: null,
        updateTime: null,
        createTime: null,
        planEndTime: null,
        planStartTime: null,
        proposal: null,
        bepersonName: null
      }
    };
  },
  computed: {
    getPersonName() {
      let person = this.getUserList.filter(
        item => item.personId == this.menuForm.personId
      );
      return person[0].personName;
    }
  },
  methods: {
    getBridge() {
      var that = this;
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/bridge/getBridge", {})
        .then(function(response) {
          //console.log(response.data.data.list);
          that.bridgeList = [...response.data.data.list];
        })
        .catch(function(error) {});
    },
    getLoginUser() {
      var that = this;

      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/user/getUserInfo", {})
        .then(function(response) {
          console.log(response.data.data);
          that.menuForm.bepersonId = response.data.data.personId;
          // that.menuForm.personId = response.data.data.personId;
          that.menuForm.bepersonName = response.data.data.personName;
        })
        .catch(function(error) {});
    },
    getUser() {
      var that = this;

      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/user/getUser", {
          currentPage: 0,
          pageSize: 0
        })
        .then(function(response) {
          console.log(response);
          that.getUserList = [...response.data.data.list];
        })
        .catch(function(error) {});
    },
    submitForm() {
      var that = this;
      axios
        .post(
          "http://bridge.vipgz1.idcfengye.com/api/maintain/addCheckMaintainPlan",
          {
            planId: this.menuForm.planId,
            planCode: this.menuForm.planCode,
            bridgeCode: this.menuForm.bridgeCode,
            quantities: this.menuForm.quantities,
            maintainLevel: this.menuForm.maintainLevel,
            estimatedCos: this.menuForm.estimatedCos,
            organizationId: that.menuForm.organizationId,
            maintainRange: this.menuForm.maintainRange,
            bepersonId: this.menuForm.bepersonId,
            personId: this.menuForm.personId,
            principal: this.menuForm.bepersonId,
            proposer: this.menuForm.personId,
            invalid: this.menuForm.invalid,
            maintainRanking: this.menuForm.maintainRanking,
            status: this.menuForm.status,
            description: this.menuForm.description,
            updateTime: this.menuForm.updateTime,
            createTime: this.menuForm.createTime,
            planEndTime: this.menuForm.planEndTime,
            planStartTime: this.menuForm.planStartTime,
            proposal: this.menuForm.proposal
          }
        )
        .then(function(response) {
          that.$router.push("/bridgeMaintenanceInfo");
        })
        .catch(function(error) {});
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
        })
        .catch(function(error) {});
    }
  },

  mounted: function() {
    this.getLoginUser();
    this.getBridge();
    this.getUser();
    this.getOrganization();
  }
};
</script>
<style lang="stylus" scoped>
menu-shadow() {
  border-radius: 4px;
  border: 4px solid #E9EEF3;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.54);
}

.inspection-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  menu-shadow();
  padding: 5px;

  .el-form-item--mini.el-form-item {
    margin-bottom: 0px;
  }

  .next-button {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.54);
    background-color: #545c64;
    color: #eee;
    border: 0px;
    margin-bottom: 10px;

    &:hover {
      background-color: #eee;
      color: #545c64;
    }

    &:active {
      background-color: #eee;
      color: #545c64;
    }
  }
}

.inspection-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  menu-shadow();
  margin-top: 10px;
  padding-top: 10px;

  .el-date-editor.el-input {
    width: 100%;
  }
}
</style>