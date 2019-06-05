<template>
  <el-form
    ref="cardForm"
    :model="cardForm"
    :rules="rules"
    label-width="110px"
    size="mini"
    inline
    v-if="$store.state.chooseItem===4"
  >
    <el-form-item label="桥梁代码 :"  prop="bridgeCode" >
      <el-input v-model="cardForm.bridgeCode" disabled></el-input>
    </el-form-item>
    <el-form-item label="桥梁名称 :"   prop="bridgeName">
      <el-input v-model="cardForm.bridgeName" disabled></el-input>
    </el-form-item>
    <el-form-item label="路线号 :"   prop="roadNumber">
      <el-input v-model="cardForm.roadNumber" disabled></el-input>
    </el-form-item>
    <el-form-item label="路线名称 :" prop="roadName">
      <el-input v-model="cardForm.roadName" disabled></el-input>
    </el-form-item>
    <el-form-item label="中心桩号 :"  prop="bridgeCenterMilestone">
      <el-input v-model="cardForm.bridgeCenterMilestone" disabled></el-input>
    </el-form-item>
    <el-form-item label="桥型 :" prop="bridgeType">
      <el-input v-model="cardForm.bridgeType" disabled></el-input>
    </el-form-item>
    <el-form-item label="养护单位 :" prop="bridgeMaintenance">
      <el-input v-model="cardForm.bridgeMaintenance"></el-input>
    </el-form-item>
    <el-form-item label="养护电话 :" >
      <el-input v-model="cardForm.bridgeMaintenancePhone"></el-input>
    </el-form-item>
    <el-form-item label="管理单位 :" prop="bridgeManager">
      <el-input v-model="cardForm.bridgeManager"></el-input>
    </el-form-item>
    <el-form-item label="管理电话 :" >
      <el-input v-model="cardForm.bridgeManagePhone"></el-input>
    </el-form-item>
    <el-form-item label="监管单位 :" prop="bridgeSuperviseDep">
      <el-input v-model="cardForm.bridgeSuperviseDep"></el-input>
    </el-form-item>   
    <el-form-item label="监管电话 :" >
      <el-input v-model="cardForm.bridgeSupervisePhone"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import axios from "axios";
import store from '../../../../vuex/store';

export default {
  props:{
         identBridgeCode:String,
         identBridgeName:String,
         identRoadNumber:String,
         identRoadName:String,
         identBridgeCenterMilestone:String,
         identBridgeType:String,
  },
  data() {
    return {
        cardForm: {
        bridgeCode:null,
        bridgeName:null,
        roadNumber:null,
        roadName:null,
        bridgeCenterMilestone:null,
        bridgeType:null,
        bridgeMaintenance:null,
        bridgeMaintenancePhone:null,
        bridgeManager:null,
        bridgeManagePhone:null,
        bridgeSuperviseDep:null,
        bridgeSupervisePhone:null,
      },
    rules: {
        bridgeCode: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgeName: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
         roadNumber: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
          roadName: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
       bridgeCenterMilestone: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgeType: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgeMaintenance: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
       bridgeManager: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgeSuperviseDep: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ]
    }
    };
  },
  methods:{
        submitForm(formName) {
        var that=this;
        this.cardForm.bridgeCode=this.identBridgeCode;
        this.cardForm.bridgeName=this.identBridgeName;
        this.cardForm.roadNumber=this.identRoadNumber;
        this.cardForm.roadName=this.identRoadName;
        this.cardForm.bridgeCenterMilestone=this.identBridgeCenterMilestone;
        this.cardForm.bridgeType=this.identBridgeType;
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
        .post("http://bridge.vipgz1.idcfengye.com/api/bridge/addBridgeCard", {
            bridgeCode:this.cardForm.bridgeCode,
            bridgeName:this.cardForm.bridgeName,
            roadNumber:this.cardForm.roadNumber,
            roadName:this.cardForm.roadName,
            bridgeCenterMilestone:this.cardForm.bridgeCenterMilestone,
            bridgeType:this.cardForm.bridgeType,
            bridgeMaintenance:this.cardForm.bridgeMaintenance,
            bridgeMaintenancePhone:this.cardForm.bridgeMaintenancePhone,
            bridgeManager:this.cardForm.bridgeManager,
            bridgeManagePhone:this.cardForm.bridgeManagePhone,
            bridgeSuperviseDep:this.cardForm.bridgeSuperviseDep,
            bridgeSupervisePhone:this.cardForm.bridgeSupervisePhone,
        
            
          
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

