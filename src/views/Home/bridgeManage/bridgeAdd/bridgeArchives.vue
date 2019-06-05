<template>
  <el-form
    ref="archivesForm"
    :model="archivesForm"
    :rules="rules"
    label-width="110px"
    size="mini"
    inline
    v-if="$store.state.chooseItem===3"
  >
    <el-form-item label="桥梁代码 :" prop="bridgeCode">
      <el-input v-model="archivesForm.bridgeCode" disabled></el-input>
    </el-form-item>
    <el-form-item label="设计资料编号 :">
      <el-input v-model="archivesForm.bridgeDesignDataNum"></el-input>
    </el-form-item>
    <el-form-item label="竣工资料编号 :">
      <el-input v-model="archivesForm.bridgeCompletionDataNum"></el-input>
    </el-form-item>
    <el-form-item label="养护资料编号 :">
      <el-input v-model="archivesForm.bridgeMaintenanceDataNum"></el-input>
    </el-form-item>
    <el-form-item label="保管单位 :">
      <el-input v-model="archivesForm.bridgeKeeper"></el-input>
    </el-form-item>
    <el-form-item label="交通管制措施 :">
      <el-input v-model="archivesForm.trafficControlMeasures"></el-input>
    </el-form-item>

    <el-form-item label="最近改造部位 :">
      <el-input v-model="archivesForm.lastRebuildPart"></el-input>
    </el-form-item>
    <el-form-item label="工程性质 :">
      <el-input v-model="archivesForm.projectNature"></el-input>
    </el-form-item>
    <el-form-item label="产权单位名称 :">
      <el-input v-model="archivesForm.bridgeOwner"></el-input>
    </el-form-item>
    <el-form-item label="设计单位 :">
      <el-input v-model="archivesForm.bridgeDesignDepartment"></el-input>
    </el-form-item>
 
    <el-form-item label="设计者 ">
      <el-input v-model="archivesForm.bridgeDesigner"></el-input>
    </el-form-item>
    <el-form-item label="施工单位 ">
      <el-input v-model="archivesForm.bridgePracticeDepartment"></el-input>
    </el-form-item>
    <el-form-item label="施工负责人 :">
      <el-input v-model="archivesForm.bridgeConstructionSupervisor"></el-input>
    </el-form-item>
    <el-form-item label="监理单位 :">
      <el-input v-model="archivesForm.bridgeSuperviseDepartment"></el-input>
    </el-form-item>
    <el-form-item label="竣工验收意见 ">
      <el-input v-model="archivesForm.bridgeAcceptanceOpinion"></el-input>
    </el-form-item>
    <el-form-item label="最后修改日期 ">
      <el-input v-model="archivesForm.lastUpdateDate"></el-input>
    </el-form-item>
    <el-form-item label="最近三年是否评定 :">
      <el-input v-model="archivesForm.assessdLastThreeYears"></el-input>
    </el-form-item>
    <el-form-item label="最近改造完工日期 :">
      <el-input v-model="archivesForm.lastRebuildDate"></el-input>
    </el-form-item>
       <el-form-item label="所用标准图 :">
      <el-upload
        action="http://bridge.vipgz1.idcfengye.com/api/file/upload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        name="file"
        ref="upload"
        :on-change="fileChange"
        :on-success="fileSuccess"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-form-item>
  </el-form>
</template>
<script>
import axios from "axios";
import store from "../../../../vuex/store";

export default {
  props: {
    identBridgeCode: String
  },
  data() {
    return {
      archivesForm: {
        bridgeCode: null,
        bridgeDesignDataNum: null,
        bridgeCompletionDataNum: null,
        bridgeMaintenanceDataNum: null,
        bridgeKeeper: null,
        trafficControlMeasures: null,
        assessdLastThreeYears: null,
        lastRebuildDate: null,
        lastRebuildPart: null,
        projectNature: null,
        bridgeOwner: null,
        bridgeDesignDepartment: null,
        bridgeConstructionDrawings: null,
        bridgeDesigner: null,
        bridgePracticeDepartment: null,
        bridgeConstructionSupervisor: null,
        bridgeSuperviseDepartment: null,
        bridgeAcceptanceOpinion: null,
        lastUpdateDate: null
      },
      rules: {
        bridgeCode: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
      fileSuccess(response, file, fileList){
     this.archivesForm.bridgeConstructionDrawings=response.data
  },
    fileChange(file) {
      const typeArr = ["image/png", "image/gif", "image/jpeg", "image/jpg"];
      const isJPG = typeArr.indexOf(file.raw.type) !== -1;
      // image/png, image/jpeg, image/gif, image/jpg
      const isLt3M = file.size / 1024 / 1024 < 3;

      if (!isJPG) {
        this.$message.error("只能是图片!");
        this.$refs.upload.clearFiles();
        this.files = null;
        return;
      }
      // if (!isLt3M) {
      //   this.$message.error('上传图片大小不能超过 3MB!');
      //   this.$refs.upload.clearFiles();
      //   this.files = null;
      //   return;
      // }
      this.files = file.raw;
      console.log(file.raw);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
    },
    submitForm(formName) {
      var that = this;
      this.archivesForm.bridgeCode = this.identBridgeCode;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.bool = true;
        } else {
          //console.log('error submit!!');
          that.bool = false;
          return false;
        }
      });

      if (this.bool == true) {
        axios
          .post(
            "http://bridge.vipgz1.idcfengye.com/api/bridge/addBridgeArchives",
            {
              bridgeCode: this.archivesForm.bridgeCode,
              bridgeDesignDataNum: this.archivesForm.bridgeDesignDataNum,
              bridgeCompletionDataNum: this.archivesForm
                .bridgeCompletionDataNum,
              bridgeMaintenanceDataNum: this.archivesForm
                .bridgeMaintenanceDataNum,
              bridgeKeeper: this.archivesForm.bridgeKeeper,
              trafficControlMeasures: this.archivesForm.trafficControlMeasures,
              assessdLastThreeYears: this.archivesForm.assessdLastThreeYears,
              lastRebuildDate: this.archivesForm.lastRebuildDate,
              lastRebuildPart: this.archivesForm.lastRebuildPart,
              projectNature: this.archivesForm.projectNature,
              bridgeOwner: this.archivesForm.bridgeOwner,
              bridgeDesignDepartment: this.archivesForm.bridgeDesignDepartment,
              bridgeConstructionDrawings: this.archivesForm
                .bridgeConstructionDrawings,
              bridgeDesigner: this.archivesForm.bridgeDesigner,
              bridgePracticeDepartment: this.archivesForm
                .bridgePracticeDepartment,
              bridgeConstructionSupervisor: this.archivesForm
                .bridgeConstructionSupervisor,
              bridgeSuperviseDepartment: this.archivesForm
                .bridgeSuperviseDepartment,
              bridgeAcceptanceOpinion: this.archivesForm
                .bridgeAcceptanceOpinion,
              lastUpdateDate: this.archivesForm.lastUpdateDate
            }
          )
          .then(function(response) {
            //console.log(1);
          })
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
