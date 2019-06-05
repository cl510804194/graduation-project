<template>
  <div>
    <div>
      <el-form
        ref="structureForm"
        :model="structureForm"
        :rules="rules"
        label-width="110px"
        size="mini"
        inline
        v-if="$store.state.chooseItem===1"
      >
        <el-form-item label="桥梁代码 :" prop="bridgeCode">
          <el-input v-model="identBridgeCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="桥梁组合 :">
          <el-input v-model="structureForm.bridgeSpanCombination"></el-input>
        </el-form-item>
        <el-form-item label="最大跨径 :" prop="bridgeMaxSpan">
          <el-input v-model="structureForm.bridgeMaxSpan"></el-input>
        </el-form-item>
        <el-form-item label="桥梁全长 :" prop="bridgeLength">
          <el-input v-model="structureForm.bridgeLength"></el-input>
        </el-form-item>
        <el-form-item label="路径总长 :">
          <el-select v-model="structureForm.bridgeTotalSpan" placeholder="请选择">
            <el-option
              v-for="item in structureForm.roadOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="桥宽组合 :">
          <el-input v-model="structureForm.bridgeWidthConbination"></el-input>
        </el-form-item>
        <el-form-item label="桥面净宽 :" prop="bridgeClearWidth">
          <el-input v-model="structureForm.bridgeClearWidth"></el-input>
        </el-form-item>
        <el-form-item label="是否宽路窄桥 :">
          <el-input v-model="structureForm.isWideroadNarrowbridge"></el-input>
        </el-form-item>
        <el-form-item label="桥高 :">
          <el-input v-model="structureForm.bridgeHeight"></el-input>
        </el-form-item>
        <el-form-item label="建桥年月 :" prop="bridgemountedate">
          <el-date-picker v-model="structureForm.bridgemountedate" type="month" placeholder="选择年月"></el-date-picker>
        </el-form-item>
        <el-form-item label="改建年月 :">
          <el-date-picker v-model="structureForm.bridgeRebuildDate" type="month" placeholder="选择年月"></el-date-picker>
        </el-form-item>
        <el-form-item label="通航等级 :">
          <el-input v-model="structureForm.navigationLevel"></el-input>
        </el-form-item>
        <el-form-item label="桥梁限高 :">
          <el-input v-model="structureForm.bridgeMaxHeadroom"></el-input>
        </el-form-item>
        <el-form-item label="桥下垂直净高 ">
          <el-input v-model="structureForm.bridgeVerticalHeight"></el-input>
        </el-form-item>
        <el-form-item label="跨中截面高 ">
          <el-input v-model="structureForm.bridgeMidspanHeight"></el-input>
        </el-form-item>
        <el-form-item label="桥面全宽 :">
          <el-input v-model="structureForm.bridgeOverallWidth"></el-input>
        </el-form-item>
        <el-form-item label="桥梁平曲面净宽 ">
          <el-select v-model="structureForm.bridgeHorizontalRadius" placeholder="请选择">
            <el-option
              v-for="item in structureForm.highwayLevelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="矢跨比 :">
          <el-select v-model="structureForm.bridgeHeadWidth" placeholder="请选择">
            <el-option
              v-for="item in structureForm.bridgePropertyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="桥面纵坡 :">
          <el-input v-model="structureForm.bridgeRiseSpanRatio"></el-input>
        </el-form-item>
        <el-form-item label="弯坡斜特征 ">
          <el-input v-model="structureForm.bridgeLongitudinalSlope"></el-input>
        </el-form-item>
        <el-form-item label="立交特征 ">
          <el-input v-model="structureForm.bridgeLinetype"></el-input>
        </el-form-item>
        <el-form-item label="交叉形式 ">
          <el-input v-model="structureForm.bridgeGradeSeparation"></el-input>
        </el-form-item>
        <el-form-item label="引道总宽 :">
          <el-input v-model="structureForm.bridgeIntersect"></el-input>
        </el-form-item>
        <el-form-item label="引道路面宽 :">
          <el-input v-model="structureForm.bridgeApproachWidth"></el-input>
        </el-form-item>
        <el-form-item label="引道线形 :">
          <el-input v-model="structureForm.bridgeApproachPavementWidth"></el-input>
        </el-form-item>

        <el-form-item label="桥台护坡 ">
          <el-input v-model="structureForm.accelerationFactor"></el-input>
        </el-form-item>
        <el-form-item label="护墩体 ">
          <el-input v-model="structureForm.bridgeAbutmentProtect"></el-input>
        </el-form-item>
        <el-form-item label="调治构造物 :">
          <el-input v-model="structureForm.modulatingStructure"></el-input>
        </el-form-item>
        <el-form-item label="常水位 :">
          <el-input v-model="structureForm.regularWaterLevel"></el-input>
        </el-form-item>
        <el-form-item label="设计水位 :">
          <el-input v-model="structureForm.designWaterLevel"></el-input>
        </el-form-item>

        <el-form-item label="历史洪水位 :">
          <el-input v-model="structureForm.maximumHistoricalFlood"></el-input>
        </el-form-item>

        <el-form-item label="地震动峰值加速度系数 ">
          <el-input v-model="structureForm.bridgeApproachLinear"></el-input>
        </el-form-item>

        <div>
          <bridgeComponents ref="bridgeComponents"></bridgeComponents>
        </div>
      </el-form>
    </div>
    <!-- <div>
      <bridgeComponents ref="bridgeComponents"></bridgeComponents>
    </div>-->
  </div>
</template>
<script>
import store from "../../../../vuex/store";
import axios from "axios";
import bridgeIdent from "./bridgeIdent";
import bridgeComponents from "../../bridgeComponents/bridgeComponents";

export default {
  props: {
    identBridgeCode: String
  },
  components: {
    bridgeComponents
  },
  data() {
    return {
      structureForm: {
        bridgeCode: null,
        bridgeSpanCombination: null,
        bridgeMaxSpan: null,
        bridgeLength: null,
        bridgeTotalSpan: null,
        bridgeWidthConbination: null,
        bridgeClearWidth: null,
        isWideroadNarrowbridge: null,
        bridgeHeight: null,
        bridgemountedate: null,
        bridgeRebuildDate: null,
        navigationLevel: null,
        bridgeMaxHeadroom: null,
        bridgeVerticalHeight: null,
        bridgeMidspanHeight: null,
        bridgeOverallWidth: null,
        bridgeHorizontalRadius: null,
        bridgeHeadWidth: null,
        bridgeRiseSpanRatio: null,
        bridgeLongitudinalSlope: null,
        bridgeLinetype: null,
        bridgeGradeSeparation: null,
        bridgeIntersect: null,
        bridgeApproachWidth: null,
        bridgeApproachPavementWidth: null,
        bridgeApproachLinear: null,
        accelerationFactor: null,
        bridgeAbutmentProtect: null,
        bridgePierProtect: null,
        modulatingStructure: null,
        regularWaterLevel: null,
        designWaterLevel: null,
        maximumHistoricalFlood: null
      },
      rules: {
        bridgeMaxSpan: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgeLength: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgeClearWidth: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgemountedate: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      var that = this;
      this.structureForm.bridgeCode = this.identBridgeCode;
      this.$refs.bridgeComponents.submitForm();
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.bool = true;
        } else {
          //console.log("error submit!!");
          that.bool = false;
          return false;
        }
      });

      if (this.bool == true) {
        axios
          .post(
            "http://bridge.vipgz1.idcfengye.com/api/bridge/addBridgeStructure",
            {
              bridgeCode: this.structureForm.bridgeCode,
              bridgeSpanCombination: this.structureForm.bridgeSpanCombination,
              bridgeMaxSpan: this.structureForm.bridgeMaxSpan,
              bridgeLength: this.structureForm.bridgeLength,
              bridgeTotalSpan: this.structureForm.bridgeTotalSpan,
              bridgeWidthConbination: this.structureForm.bridgeWidthConbination,
              bridgeClearWidth: this.structureForm.bridgeClearWidth,
              isWideroadNarrowbridge: this.structureForm.isWideroadNarrowbridge,
              bridgeHeight: this.structureForm.bridgeHeight,
              bridgemountedate: this.structureForm.bridgemountedate,
              bridgeRebuildDate: this.structureForm.bridgeRebuildDate,
              navigationLevel: this.structureForm.navigationLevel,
              bridgeMaxHeadroom: this.structureForm.bridgeMaxHeadroom,
              bridgeVerticalHeight: this.structureForm.bridgeVerticalHeight,
              bridgeMidspanHeight: this.structureForm.bridgeMidspanHeight,
              bridgeOverallWidth: this.structureForm.bridgeOverallWidth,
              bridgeHorizontalRadius: this.structureForm.bridgeHorizontalRadius,
              bridgeHeadWidth: this.structureForm.bridgeHeadWidth,
              bridgeRiseSpanRatio: this.structureForm.bridgeRiseSpanRatio,
              bridgeLongitudinalSlope: this.structureForm
                .bridgeLongitudinalSlope,
              bridgeLinetype: this.structureForm.bridgeLinetype,
              bridgeGradeSeparation: this.structureForm.bridgeGradeSeparation,
              bridgeIntersect: this.structureForm.bridgeIntersect,
              bridgeApproachWidth: this.structureForm.bridgeApproachWidth,
              bridgeApproachPavementWidth: this.structureForm
                .bridgeApproachPavementWidth,
              bridgeApproachLinear: this.structureForm.bridgeApproachLinear,
              accelerationFactor: this.structureForm.accelerationFactor,
              bridgeAbutmentProtect: this.structureForm.bridgeAbutmentProtect,
              bridgePierProtect: this.structureForm.bridgePierProtect,
              modulatingStructure: this.structureForm.modulatingStructure,
              regularWaterLevel: this.structureForm.regularWaterLevel,
              designWaterLevel: this.structureForm.designWaterLevel,
              maximumHistoricalFlood: this.structureForm.maximumHistoricalFlood
            }
          )
          .then(function(response) {})
          .catch(function(error) {
            //console.log(error);
          });
        this.$store.state.active++;
        this.$store.state.chooseItem++;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.el-date-editor.el-input {
  width: 100%;
}
</style>