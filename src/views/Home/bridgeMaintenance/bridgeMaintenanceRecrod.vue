<template>
  <el-form label-width="110px" size="mini" inline>
    <!-- <inspectionContent :statusOptions="statusOptions"  :invalidOptins="invalidOptins" :menuForm="menuForm"></inspectionContent> -->
    <div class="inspection-content">
      <el-form-item label="计划Id " >
         <el-input v-model="menuForm.planId" disabled></el-input>
      </el-form-item>
      <!-- <el-form-item label="检查人Id " prop="bridgeSpanType">
      <el-input v-model="this.menuForm.personId"></el-input>
      </el-form-item>-->
      <el-form-item label="检查病害 " prop="personName"  >
         <!-- <el-input v-model="menuForm.diseaseName" ></el-input> -->
        <el-select v-model="menuForm.diseaseId" multiple placeholder="请选择">
         <el-option
            v-for="item in  getDiseaseList"
            :key="item.diseaseId"
            :label="item.diseaseName"
            :value="item.diseaseId"
          ></el-option>
         </el-select>
      </el-form-item>
      <el-form-item label="维修单位 :" prop="bridgeConstructionMilestone" disabled>
         <el-select v-model="menuForm.organizationId" placeholder="请选择">
         <el-option
            v-for="item in  organizationOptin"
            :key="item. organizationId"
            :label="item. organizationName"
            :value="item. organizationId"
          ></el-option>
         </el-select>
      </el-form-item>
      <el-form-item label="维修方式 :" prop="bridgeConstructionMilestone" >
         <el-input v-model="menuForm.recordMaintainWay" ></el-input>
      </el-form-item>
       <el-form-item label="维修实际金额 :" prop="bridgeConstructionMilestone" >
         <el-input v-model="menuForm.recordMaintainMoney" ></el-input>
      </el-form-item>
       <el-form-item label="维修说明 :" prop="bridgeConstructionMilestone" >
         <el-input v-model="menuForm.recordMaintainDetail" ></el-input>
      </el-form-item>
      <el-form-item label="状态 :" prop="bridgeConstructionMilestone" >
        <el-select v-model="menuForm.status" placeholder="请选择">
         <el-option
            v-for="item in  statusList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
         </el-select>
      </el-form-item>
      <el-form-item label="创建人 :" prop="bridgeConstructionMilestone">
        <!-- <span class="demonstration">默认</span> -->
         <!-- <el-input v-model="menuForm.personId" ></el-input> -->
        <!-- <el-date-picker v-model="menuForm.personId" type="date" placeholder></el-date-picker> -->
             <el-select v-model="menuForm.personId" placeholder="请选择" disabled>
         <el-option
            v-for="item in getUserList"
            :key="item.personId"
            :label="item.personName"
            :value="item.personId"
          ></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="完工时间 :" prop="bridgeConstructionMilestone">
        <!-- <span class="demonstration">默认</span> -->
        <el-date-picker v-model="menuForm.completionTime" type="date" placeholder></el-date-picker>
      </el-form-item>
    
        <el-row>
        <el-button style="margin-left:460px" size="medium" class="next-button" @click="submitForm()">添加</el-button>        
      </el-row>
   
     
    </div>
  </el-form>
</template>
<script>
import axios from "axios";
import { async } from 'q';

export default {
  components: {
   
  },
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
          value: "关闭"
        },
        {
          id: 3,
          value: "延后完成"
        },
        {
          id: 4,
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
      organizationOptin:[],
      componentsList: [
        { id: 1, name: "翼墙、耳墙",mark:null },
        { id: 2, name: "锥坡、护坡",mark:null },
        { id: 3, name: "桥墩",mark:null },
        { id: 4, name: "桥台",mark:null },
        { id: 5, name: "河床",mark:null },
        { id: 6, name: "调治构造物",mark:null },
        { id: 7, name: "墩台基础",mark:null },
        { id: 8, name: "支座",mark:null },
        { id: 9, name: "上部承重部件",mark:null },
        { id: 10, name: "上部一般部件",mark:null },
        { id: 11, name: "桥面铺装",mark:null },
        { id: 12, name: "伸缩缝装置" ,mark:null},
        { id: 13, name: "排水系统",mark:null  },
        { id: 14, name: "照明" ,mark:null },
        { id: 15, name: "人行道",mark:null  },
        { id: 16, name: "栏杆、护栏" ,mark:null },
      ],
      diseaseTypeCodeList:[
        {
          id:1,
          name:"裂缝"
        },
        {
          id:2,
          name:"混凝土碳化及钢筋锈蚀"
        },
        {
          id:3,
          name:"剥蚀"
        },
        {
          id:4,
          name:"地基不均匀沉降"
        },
        {
          id:5,
          name:"混凝土内部的毛细管孔及气泡"
        },
        {
          id:6,
          name:"其他病害"
        }
      ],
      diseaseGradeList:[
        {
          id:1,
          name:"1级"
        },
         {
          id:2,
          name:"2级"
        }, {
          id:3,
          name:"3级"
        },
         {
          id:4,
          name:"4级"
        },
         {
          id:5,
          name:"5级"
        }
      ],
      statusList:[
        { 
          id:0,
          name:"未完成"
        },
        {
          id:1,
          name:"已完成"
        },
    
      ],
      getbridgeForm: [],
      getUserList:[],
      userInfoList:[],
      userInfoPersonId:null,
      getDiseaseList:[],
      menuForm: {
            recordId:null,
            planId:this.$route.params.planId,
            diseaseId:[],
            diseaseName:null,
            organizationId:null,
            organizationName:null,
            recordMaintainWay:null,
            recordMaintainMoney:null,
            recordMaintainDetail:null,
            status:null,
            completionTime:null,
            personId:null,
            createTime:null,
            updateTime:null,
            bridgeCode:null,
            checkRecordDiseases:[]
      }
    };
  },
  methods: {
     getOrganization(){
        var that=this;
        axios
        .post("http://bridge.vipgz1.idcfengye.com/api/organization/getOrganization", {
            currentPage: 0,
            pageSize: 0
        
        })
        .then(function(response) {
          that.organizationOptin=[...response.data.data.list]
          //console.log("管养单位")
          //console.log(that.sizeForm.organizationOptin)
       
        })
        .catch(function(error) {
          //console.log(error);
        });
    },
    submitForm(){
      var that = this;
      console.log(this.menuForm.diseaseId)
      for(let item of that.menuForm.diseaseId){
        let disease={diseaseId:item}
   
       that.menuForm.checkRecordDiseases.push(disease)
      }
      console.log(that.menuForm.checkRecordDiseases)
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/maintain/addCheckMaintainRecord", {
     

              recordId:this.menuForm.recordId,
              planId:this.menuForm.planId,
      //        diseaseId:this.menuForm.diseaseId,
              organizationId:this.menuForm.organizationId,
              organizationName:this.menuForm.organizationName,
              recordMaintainWay:this.menuForm.recordMaintainWay,
              recordMaintainMoney:this.menuForm.recordMaintainMoney,
              recordMaintainDetail:this.menuForm.recordMaintainDetail,
              status:this.menuForm.status,
              completionTime:this.menuForm.completionTime,
              personId:this.menuForm.personId,
              createTime:this.menuForm.createTime,
              updateTime:this.menuForm.updateTime,
              checkRecordDiseases:this.menuForm.checkRecordDiseases


        })
        .then(function(response) {
           that.$router.push('/bridgeMaintenanceRecrodinfo')
        })
        .catch(function(error) {});
    //  this.$router.push('/')
    },
    getUserinfo(){
     var that = this;
     axios
      .post("http://bridge.vipgz1.idcfengye.com/api/user/getUserInfo", {})
      .then(function(response) {
        console.log(response.data.data)
        that.menuForm.personId=response.data.data.personId
    //    that.menuForm.personId=that.userList.personId
      })
      .catch(function(error) {
      
      });
      console.log(11111)
      console.log(that.menuForm.personId);
    },
    getUser(){
          var that = this;

      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/user/getUser", {
            currentPage:0,
            pageSize:0
        })
        .then(function(response) {
          console.log(response);
          that.getUserList=[...response.data.data.list]
        })
        .catch(function(error) {});
    },
    getBridgeCode(){
      var that = this;
     axios
      .post("http://bridge.vipgz1.idcfengye.com/api/maintain/getCheckMaintainPlan", {
        currentPage: 0,
        pageSize: 0,
        checkMaintainPlan:{
          planId:this.menuForm.planId
        }
      })
      .then(function(response) {
        console.log()
        console.log(response.data.data.list);
        that.menuForm.bridgeCode=response.data.data.list[0].bridgeCode
         console.log(that.menuForm.bridgeCode)
        that.getDisease()
   
      })
      .catch(function(error) {
        //console.log(error);
      });
      return that.menuForm.bridgeCode
    },
    getDisease(){
  //    this.getBridgeCode()
      var that = this;
   //   let bridgeCode=that.menuForm.bridgeCode;

      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/disease/getDisease", {
            currentPage:0,
            pageSize:0,
            checkDisease:{
             bridgeCode:that.menuForm.bridgeCode
            }
        })
        .then(function(response) {
          that.getDiseaseList=[...response.data.data.list];
          console.log(that.getDiseaseList)
       //   that.menuForm.diseaseName=that.getDiseaseList[0].diseaseName
        //  that.menuForm.diseaseCode=that.getDiseaseList[0].diseaseCode
      //    that.menuForm.diseaseGrade=that.getDiseaseList[0].diseaseGrade
        })
        .catch(function(error) {});
    }
  },
  mounted: function() {
        this.getUserinfo();
        this.getBridgeCode();
        this.getOrganization();
        this.getUser();
     //   this.getDisease();
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
    display:block;
    height:40px;
    weight:100px; 
    margin: 20px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.54);
    background-color: #545c64;
    color: #eee;
    border: 0px;
    margin-bottom:0px;
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
.inspection-content .el-textarea__inner{
  padding: 5px 15px;
}

</style>