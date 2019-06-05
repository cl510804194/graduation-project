<template>
  <el-form label-width="110px" size="mini" inline>
    <!-- <inspectionContent :statusOptions="statusOptions"  :invalidOptins="invalidOptins" :menuForm="menuForm"></inspectionContent> -->
    <div class="inspection-content">
      <el-form-item label="病害Id ">
        <el-input v-model="menuForm.diseaseId" disabled></el-input>
      </el-form-item>
      <!-- <el-form-item label="检查人Id " prop="bridgeSpanType">
      <el-input v-model="this.menuForm.personId"></el-input>
      </el-form-item>-->
      <el-form-item label="病害名称 " prop="personName">
        <el-input v-model="menuForm.diseaseName" disabled></el-input>
      </el-form-item>
      <el-form-item label="病害编码 :" prop="bridgeConstructionMilestone">
        <el-input v-model="menuForm.diseaseCode" disabled></el-input>
      </el-form-item>

      <el-form-item label="病害标度 :" prop="bridgeConstructionMilestone">
        <el-select disabled v-model="menuForm.diseaseGrade" placeholder="请选择病害实时标度">
          <el-option
            v-for="item in diseaseGradeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="诊断时间 :" prop="bridgeConstructionMilestone">
        <!-- <span class="demonstration">默认</span> -->
        <el-date-picker v-model="menuForm.checkTime" type="date" placeholder></el-date-picker>
      </el-form-item>

      <el-form-item label="病害定量描述 :" prop="bridgeConstructionMilestone">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="menuForm.quantifyDescription"
        ></el-input>
      </el-form-item>
      <el-form-item label="病害定性描述 :" prop="bridgeConstructionMilestone">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="menuForm.qualitativeDescription"
        ></el-input>
      </el-form-item>

      <el-form-item label prop="bridgeConstructionMilestone">
        <el-button
          size="medium"
          style="width:100px;margin-left:110px"
          class="next-button"
          @click="submitForm()"
        >添加</el-button>
      </el-form-item>

      <!-- <el-button size="medium" style="width:100px;margin-left:110px" class="next-button" @click="submitForm()">添加</el-button> -->
    </div>
  </el-form>
</template>
<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
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
        },
        {
          id: 2,
          value: "已逾期"
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
      diseaseTypeCodeList: [
        {
          id: 1,
          name: "裂缝"
        },
        {
          id: 2,
          name: "混凝土碳化及钢筋锈蚀"
        },
        {
          id: 3,
          name: "剥蚀"
        },
        {
          id: 4,
          name: "地基不均匀沉降"
        },
        {
          id: 5,
          name: "混凝土内部的毛细管孔及气泡"
        },
        {
          id: 6,
          name: "其他病害"
        }
      ],
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
      statusList: [
        {
          id: 0,
          name: "未处理"
        },
        {
          id: 1,
          name: "已处理"
        },
        {
          id: 3,
          name: "非病害"
        },
        {
          id: 4,
          name: "无法处理"
        },
        {
          id: 5,
          name: "删除"
        }
      ],
      getbridgeForm: [],
      getUserList: [],
      getDiseaseList: [],
      menuForm: {
        diseaseDevelopId: null,
        diseaseId: this.$route.params.diseaseId,
        diseaseName: null,
        diseaseCode: null,
        diseaseGrade: null,
        quantifyDescription: null,
        qualitativeDescription: null,
        checkTime: null
      }
    };
  },
  methods: {
    submitForm() {
      var that = this;
      axios
        .post(
          "http://bridge.vipgz1.idcfengye.com/api/disease/addDiseaseDevelop",
          {
            checkDiseaseDevelop: {
              diseaseId: this.menuForm.diseaseId,
              diseaseDevelopId: this.menuForm.diseaseDevelopId,
              diseaseId: this.menuForm.diseaseId,
              diseaseName: this.menuForm.diseaseName,
              diseaseCode: this.menuForm.diseaseCode,
              diseaseGrade: this.menuForm.diseaseGrade,
              quantifyDescription: this.menuForm.quantifyDescription,
              qualitativeDescription: this.menuForm.qualitativeDescription,
              checkTime: this.menuForm.checkTime
            }
          }
        )
        .then(function(response) {})
        .catch(function(error) {});
      this.$router.push("/bridgeDiseaseRecordInfo");
    },

    getDisease() {
      var that = this;

      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/disease/getDisease", {
          currentPage: 0,
          pageSize: 0,
          checkDisease: {
            diseaseId: that.menuForm.diseaseId
          }
        })
        .then(function(response) {
          that.getDiseaseList = [...response.data.data.list];
          that.menuForm.diseaseName = that.getDiseaseList[0].diseaseName;

          that.menuForm.diseaseCode = that.getDiseaseList[0].diseaseCode;
          that.menuForm.diseaseGrade = that.getDiseaseList[0].diseaseGrade;
        })
        .catch(function(error) {});
    }
  },
  mounted: function() {
    this.getDisease();
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

  .next-button {
    display: block;
    height: 40px;
    weight: 100px;
    margin: 20px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.54);
    background-color: #545c64;
    color: #eee;
    border: 0px;
    margin-bottom: 0px;

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

.inspection-content .el-textarea__inner {
  padding: 5px 15px;
}
</style>