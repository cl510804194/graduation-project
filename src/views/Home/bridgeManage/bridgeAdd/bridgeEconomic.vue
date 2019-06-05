<template>
  <el-form
    ref="economicForm"
    :model="economicForm"
    :rules="rules"
    label-width="110px"
    size="mini"
    inline
    v-if="$store.state.chooseItem===2"
  >
    <el-form-item label="桥梁代码 :"  prop="bridgeCode" >
      <el-input v-model="economicForm.bridgeCode" disabled></el-input>
    </el-form-item>
    <el-form-item label="总造价 :" >
      <el-input v-model="economicForm.bridgeCost"></el-input>
    </el-form-item>
    <el-form-item label="施工工期 :" >
      <el-input v-model="economicForm.bridgeConstructionPeriod"></el-input>
    </el-form-item>
    <el-form-item label="桥面中心标高 :" >
      <el-input v-model="economicForm.bridgeDeckElevation"></el-input>
    </el-form-item>
    <el-form-item label="设计洪水频率 :" >
      <el-input v-model="economicForm.designedFloodFrequency"></el-input>
    </el-form-item>
    <el-form-item label="设计冲刷标高 :">
      <el-input v-model="economicForm.designedScourElevation"></el-input>
    </el-form-item>
    <el-form-item label="主桥基底标高 :" >
      <el-input v-model="economicForm.bridgeBaseElevation"></el-input>
    </el-form-item>
    <el-form-item label="历史最大洪水 :" >
      <el-input v-model="economicForm.historyFloodElevation"></el-input>
    </el-form-item>
    <el-form-item label="年日均交通量 :" >
      <el-input v-model="economicForm.avgTraffic"></el-input>
    </el-form-item>
    <el-form-item label="防护工程类型 :" >
      <el-input v-model="economicForm.bridgeProtectProject"></el-input>
    </el-form-item>
   
    <el-form-item label="地基地质 :" >
      <el-input v-model="economicForm.bridgeGeology"></el-input>
    </el-form-item>
    <el-form-item label="抗震设防 :">
      <el-input v-model="economicForm.bridgeAntiknock"></el-input>
    </el-form-item>
    <el-form-item label="桥上附设 ">
      <el-input v-model="economicForm.bridgeAuxiliary"></el-input>
    </el-form-item>
    <el-form-item label="分隔带 " >
      <el-input v-model="economicForm.bridgeSeparator"></el-input>
    </el-form-item>
    <el-form-item label="收费情况 :" >
      <el-input v-model="economicForm.bridgeCharge"></el-input>
    </el-form-item>
    <!-- <el-form-item label="公路技术等级 " prop="highwayLevel">
      <el-select style="width:202px" v-model="economicForm.highwayLevel" placeholder="请选择">
        <el-option
          v-for="item in economicForm.highwayLevelOptions"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        ></el-option>
      </el-select>
    </el-form-item> -->
    <!-- <el-form-item label="设计时速 :" prop="bridgeProperty">
      <el-select style="width:202px" v-model="economicForm.bridgeProperty" placeholder="请选择">
        <el-option
          v-for="item in economicForm.bridgePropertyOptions"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        ></el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item label="设计时速 :" >
      <el-input v-model="economicForm.designedSpeed"></el-input>
    </el-form-item>
    <el-form-item label="桥梁与环境协调度 " >
      <el-input v-model="economicForm.bridgeCoordinate"></el-input>
    </el-form-item>
    <el-form-item label="环境条件 " >
      <el-input v-model="economicForm.bridgeEnvironment"></el-input>
    </el-form-item>
     <el-form-item label="墩台防撞设施类型 :" >
      <el-input v-model="economicForm.bridgeAgainstType"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import axios from "axios";
import store from '../../../../vuex/store';

export default {
  props:{
         identBridgeCode:String
  },
  data() {
    return {
      economicForm: {
        bridgeCode: null,
        bridgeCost: null,
        bridgeConstructionPeriod: null,
        bridgeDeckElevation: null,
        designedFloodFrequency: null,
        designedScourElevation: null,
        bridgeBaseElevation: null,
        historyFloodElevation: null,
        avgTraffic: null,
        bridgeProtectProject: null,
        bridgeAgainstType: null,
        bridgeGeology: null,
        bridgeAntiknock: null,
        bridgeAuxiliary: null,
        bridgeSeparator: null,
        bridgeCharge: null,
        designedSpeed: null,
        bridgeCoordinate: null,
        bridgeEnvironment: null
      },
    rules: {
        bridgeCode: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ]
    }
    };
  },
  methods:{
        submitForm(formName) {
        var that=this;
        this.economicForm.bridgeCode=this.identBridgeCode;
        this.$refs[formName].validate((valid) => {
          if (valid) {
       
            that.bool=true;
          } else {
            //console.log('error submit!!');
             that.bool=false;
            return false;
          }
        });

        if(this.bool==true){
            axios
        .post("http://bridge.vipgz1.idcfengye.com/api/bridge/addBridgeEconomic", {
            bridgeCode:this.economicForm.bridgeCode,
            bridgeCost:this.economicForm.bridgeCost,
            bridgeConstructionPeriod:this.economicForm.bridgeConstructionPeriod,
            bridgeDeckElevation:this.economicForm.bridgeDeckElevation,
            designedFloodFrequency:this.economicForm.designedFloodFrequency,
            designedScourElevation:this.economicForm.designedScourElevation,
            bridgeBaseElevation:this.economicForm.bridgeBaseElevation,
            historyFloodElevation:this.economicForm.historyFloodElevation,
            avgTraffic:this.economicForm.avgTraffic,
            bridgeProtectProject:this.economicForm.bridgeProtectProject,
            bridgeAgainstType:this.economicForm.bridgeAgainstType,
            bridgeGeology:this.economicForm.bridgeGeology,
            bridgeAntiknock:this.economicForm.bridgeAntiknock,
            bridgeAuxiliary:this.economicForm.bridgeAuxiliary,
            bridgeSeparator:this.economicForm.bridgeSeparator,
            bridgeCharge:this.economicForm.bridgeCharge,
            designedSpeed:this.economicForm.designedSpeed,
            bridgeCoordinate:this.economicForm.bridgeCoordinate,
            bridgeEnvironment:this.economicForm.bridgeEnvironment,
        })
        .then(function(response) {
          //console.log(1);
        })
        .catch(function(error) {
          //console.log(error);
        });
          this.$store.state.active++;
          this.$store.state.chooseItem++;
        }
          
      },
  }
};
</script>
