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

      <el-form-item label="检查类型:">
        <el-select v-model="menuForm.checkType" placeholder="请选择检查类型" disabled>
          <el-option
            v-for="item in insprectionTypeOptions"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-button class="next-button" style="margin-top: 12px;" @click="submitForm()">下一步</el-button>
    </div>
    <!-- <inspectionContent :statusOptions="statusOptions"  :invalidOptins="invalidOptins" :menuForm="menuForm"></inspectionContent> -->
    <div class="inspection-content">
      <el-form-item label="创建人 ">
        <el-input v-model="menuForm.bepersonName" disabled></el-input>
      </el-form-item>
      <!-- <el-form-item label="检查人Id " prop="bridgeSpanType">
      <el-input v-model="this.menuForm.personId"></el-input>
      </el-form-item>-->
      <el-form-item label="检查人 " prop="personName">
        <el-select v-model="menuForm.personId" placeholder="请选择检查人">
          <el-option
            v-for="item in getUserList"
            :key="item.personId"
            :label="item.personName"
            :value="item.personId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="负责人 :" prop="bridgeConstructionMilestone">
        <el-select v-model="menuForm.principal" placeholder="请选择负责人">
          <el-option
            v-for="item in getUserList"
            :key="item.personId"
            :label="item.personName"
            :value="item.personid"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="计划编码 :" prop="bridgeConstructionMilestone">
        <el-input v-model="menuForm.planCode"></el-input>
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
      <el-form-item
        v-if="menuForm.checkType===1||menuForm.checkType===2"
        label="维修等级 :"
        prop="bridgeConstructionMilestone"
      >
        <el-input v-model="menuForm.maintainRanking"></el-input>
      </el-form-item>
      <el-form-item v-if="menuForm.checkType===2" label="评分等级 :" prop="bridgeConstructionMilestone">
        <el-input v-model="menuForm.gradeRanking"></el-input>
      </el-form-item>

      <el-form-item v-if="menuForm.checkType===2" label="养护建议 :" prop="bridgeConstructionMilestone">
        <el-input v-model="menuForm.proposal"></el-input>
      </el-form-item>
      <el-form-item label="状态 :" prop="bridgeConstructionMilestone">
        <el-select v-model="status" disabled>
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
import inspectionContent from "./components/content";
import store from "../../../vuex/store";
export default {
  components: {
    inspectionContent
  },
  data() {
    return {
      insprectionTypeOptions: [
        {
          id: 0,
          value: "经常性检查"
        },
        {
          id: 1,
          value: "定期检查"
        },
        {
          id: 2,
          value: "特殊检查"
        }
      ],
      statusOptions: [
        {
          id: 0,
          value: "未完成"
        }
      ],
      status: 0,
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
      bridgeList: [],
      getUserList: [],
      menuForm: {
        planId: null,
        planCode: null,
        bridgeCode: this.$route.params.bridgeCode,
        bridgeName: null,
        checkType: this.$store.state.checkType,
        bepersonId: null,
        bepersonName: null,
        personId: null,
        personName: null,
        principal: null,
        proposer: null,
        invalid: null,
        estimatedCost: null,
        maintainRanking: null,
        gradeRanking: null,
        proposal: null,
        status: null,
        description: null,
        reserve1: null,
        reserve2: null,
        reserve3: null,
        planStartTime: null,
        planEndTime: null,
        finishTime: null,
        createTime: null,
        updateTime: null
      }
    };
  },
  computed: {
    getPersonName() {
      let person = this.getUserList.filter(
        item => item.proposer == this.menuForm.proposer
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
          that.getbridgeForm = [...response.data.data.list];
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
          that.menuForm.bepersonName = response.data.data.personName;
        })
        .catch(function(error) {});
      // axios
      //  .post("http://bridge.vipgz1.idcfengye.com/api/user/getUserInfo", {
      //    currentPage:0,
      //    pageSize,
      //    person:{
      //      personId:that.menuForm.bepersonId = response.data.data.personId
      //    }
      //  })
      //   .then(function(response) {
      //     console.log(response.data.data);
      //     that.menuForm.bepersonId = response.data.data.personId;
      //     that.menuForm.bepersonName = response.data.data.personName;
      //   })
      //   .catch(function(error) {});
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
    submitForm() {
      var that = this;
      console.log(1);
      console.log(that.getPersonName);
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/check/addCheckPlan", {
          planId: that.menuForm.planId,
          planCode: that.menuForm.planCode,
          bridgeCode: that.menuForm.bridgeCode,
          bridgeName: that.menuForm.bridgeName,
          checkType: that.menuForm.checkType,
          bepersonId: that.menuForm.bepersonId,
          personId: that.menuForm.personId,
          personName: that.getPersonName,
          principal: that.menuForm.principal,
          proposer: that.menuForm.principal,
          invalid: that.menuForm.invalid,
          estimatedCost: that.menuForm.estimatedCost,
          maintainRanking: that.menuForm.maintainRanking,
          gradeRanking: that.menuForm.gradeRanking,
          proposal: that.menuForm.proposal,
          status: 0,
          description: that.menuForm.description,
          reserve1: that.menuForm.reserve1,
          reserve2: that.menuForm.reserve2,
          reserve3: that.menuForm.reserve3,
          planStartTime: that.menuForm.planStartTime,
          planEndTime: that.menuForm.planEndTime,
          finishTime: that.menuForm.finishTime,
          createTime: that.menuForm.createTime,
          updateTime: that.menuForm.updateTime
        })
        .then(function(response) {
          that.$router.push("/inspectionInfo");
        })
        .catch(function(error) {});
    }
  },

  mounted: function() {
    this.getLoginUser();
    this.getBridge();
    this.getUser();
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