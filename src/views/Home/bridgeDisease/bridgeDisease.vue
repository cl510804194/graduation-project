<template>
  <el-form label-width="110px" :model="menuForm" ref="menuForm" :rules="rules" size="mini" inline>
    <!-- <inspectionContent :statusOptions="statusOptions"  :invalidOptins="invalidOptins" :menuForm="menuForm"></inspectionContent> -->
    <div class="inspection-content">
      <el-form-item label="病害名称 " prop="diseaseName">
        <el-input v-model="menuForm.diseaseName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="检查人Id " prop="bridgeSpanType">
      <el-input v-model="this.menuForm.personId"></el-input>
      </el-form-item>-->
      <el-form-item label="病害编码 " prop="diseaseCode">
        <el-input v-model="menuForm.diseaseCode"></el-input>
      </el-form-item>
      <el-form-item label="所属桥梁编码">
        <el-input v-model="menuForm.bridgeCode" disabled></el-input>
      </el-form-item>
      <el-form-item label="所属结构类型">
        <el-select disabled="disabled" v-model="construction" placeholder="所属结构类型">
          <el-option
            v-for="item in componentOptions"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属部件类型">
        <el-select
          disabled="disabled"
          @change="componentChange()"
          v-model="component"
          placeholder="所属部件类型"
        >
          <el-option
            v-for="item in componentOptionsChildren[0].children"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属构件">
        <el-select v-model="menuForm.structuralPartCode" placeholder="所属构建代码" disabled>
          <el-option
            v-for="item in coponentList"
            :key="item.componentId"
            :label="item.componentName"
            :value="item.componentId"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="病害类别" prop="diseaseTypeCode">
        <el-select v-model="menuForm.diseaseTypeCode" placeholder="请选择病害类别">
          <el-option
            v-for="item in diseaseTypeCodeList[0].disease"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="病害状态" prop="status">
        <el-select v-model="menuForm.status" placeholder="请选择病害状态">
          <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="处置建议">
        <!-- <span class="demonstration">默认</span> -->
        <el-input v-model="menuForm.disposalAdvise"></el-input>
      </el-form-item>

      <el-form-item label="建档时间" prop="createTime">
        <!-- <span class="demonstration">默认</span> -->
        <el-date-picker v-model="menuForm.createTime" type="date" placeholder></el-date-picker>
      </el-form-item>

      <el-form-item label="更新时间" prop="updateTime">
        <!-- <span class="demonstration">默认</span> -->
        <el-date-picker v-model="menuForm.updateTime" type="date" placeholder></el-date-picker>
      </el-form-item>

      <el-form-item label="病害位置描述" prop="diseaseLocation">
        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="menuForm.diseaseLocation"></el-input>
      </el-form-item>
      <el-form-item label="病害定量描述" prop="quantifyDescription">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="menuForm.quantifyDescription"
        ></el-input>
      </el-form-item>
      <el-form-item label="病害定性描述" prop="qualitativeDescription">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="menuForm.qualitativeDescription"
        ></el-input>
      </el-form-item>

      <el-button
        size="medium"
        style="width:100px"
        class="next-button"
        @click="submitForm('menuForm')"
      >添加</el-button>
    </div>
  </el-form>
</template>
<script>
import axios from "axios";

export default {
  components: {},
  props: {
    bridgeCode: String,
    partName: String,
    componentIdP: Number,
    bridgeEntityTypeName: String
  },
  watch: {
    structForm: function(newQuestion, oldQuestion) {},
    bridgeCode: function() {
      this.menuForm.bridgeCode = this.bridgeCode;
    },
    partName() {
      this.component = this.partName;
    },
    componentIdP() {
      this.menuForm.structuralPartCode = this.componentIdP;
    },
    bridgeEntityTypeName() {
      this.construction = this.bridgeEntityTypeName;
    },
    component() {
      this.componentChange();
    }
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
      componentOptions: [
        {
          id: 1,
          name: "上部结构",
          children: [
            {
              id: 1,
              name: "上部承重构件",
              disease: [{ id: 1, name: "变形" }, { id: 2, name: "泛油" }]
            },
            {
              id: 2,
              name: "上部一般构件",
              disease: [
                { id: 1, name: "破损" },
                { id: 2, name: "磨光、脱皮、露骨" }
              ]
            },
            {
              id: 3,
              name: "支座",
              disease: [{ id: 1, name: "错台" }, { id: 2, name: "剥落" }]
            }
          ]
        },
        {
          id: 2,
          name: "下部结构",
          children: [
            {
              id: 1,
              name: "翼墙耳墙",
              disease: [{ id: 1, name: "裂缝" }, { id: 2, name: "缺陷" }]
            },
            {
              id: 2,
              name: "锥坡护坡",
              disease: [
                { id: 1, name: "混凝土碳化" },
                { id: 2, name: "冲刷、淘空" }
              ]
            },
            {
              id: 3,
              name: "桥墩",
              disease: [{ id: 1, name: "剥落、露筋" }, { id: 2, name: "冲蚀" }]
            },
            {
              id: 4,
              name: "桥台",
              disease: [
                { id: 1, name: "鼓肚、砌体松动" },
                { id: 2, name: "防锈油结块" }
              ]
            },
            {
              id: 5,
              name: "墩台基础",
              disease: [{ id: 1, name: "裂缝" }, { id: 2, name: "缺陷" }]
            },
            {
              id: 6,
              name: "河床",
              disease: [
                { id: 1, name: "河底铺砌损坏" },
                { id: 2, name: "沉降" }
              ]
            },
            { id: 7, name: "调治构造物", disease: [{ id: 1, name: "位移" }] }
          ]
        },
        {
          id: 3,
          name: "桥面系",
          children: [
            {
              id: 1,
              name: "桥面铺装",
              disease: [{ id: 1, name: "磨损" }, { id: 2, name: "表观病害" }]
            },
            {
              id: 2,
              name: "伸缩缝装置",
              disease: [
                { id: 1, name: "锈蚀" },
                { id: 2, name: "索夹密封填料损坏" }
              ]
            },
            {
              id: 3,
              name: "人行道",
              disease: [{ id: 1, name: "破损" }, { id: 2, name: "位移" }]
            },
            {
              id: 4,
              name: "栏杆护栏",
              disease: [{ id: 1, name: "裂缝" }, { id: 2, name: "缺陷" }]
            },
            { id: 5, name: "排水系统", disease: [{ id: 1, name: "破损" }] },
            { id: 6, name: "照明标志", disease: [{ id: 1, name: "破损" }] }
          ]
        }
      ],

      coponentList: [],
      component: null,
      componentId: null,
      construction: "上部结构",
      diseaseTypeCodeList: [{ disease: [{ id: 0, name: "无" }] }],
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
      bool: false,
      menuForm: {
        diseaseId: null,
        diseaseName: null,
        diseaseCode: null,
        bridgeCode: this.$route.params.bridgeCode,
        structuralPartCode: null,
        structuralStructural: null,
        diseaseLocation: null,
        diseaseTypeCode: null,
        diseaseGrade: null,
        quantifyDescription: null,
        qualitativeDescription: null,
        imgUrl: null,
        status: null,
        disposalAdvise: null,
        createTime: null,
        updateTime: null
      },
      rules: {
        diseaseName: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        diseaseCode: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        structuralPartCode: [
          { required: true, message: "信息不能为空", trigger: "change" }
        ],
        diseaseTypeCode: [
          { required: true, message: "信息不能为空", trigger: "change" }
        ],
        diseaseGrade: [
          { required: true, message: "信息不能为空", trigger: "change" }
        ],
        status: [
          { required: true, message: "信息不能为空", trigger: "change" }
        ],
        createTime: [
          { required: true, message: "信息不能为空", trigger: "change" }
        ],
        updateTime: [
          { required: true, message: "信息不能为空", trigger: "change" }
        ],
        diseaseLocation: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        quantifyDescription: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        qualitativeDescription: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    componentOptionsChildren() {
      let a = this.componentOptions.filter(
        item => item.name == this.construction
      );
      console.log(a);
      return a;
    }
  },
  methods: {
    componentChange() {
      let that = this;
      let a = this.componentOptionsChildren[0].children.filter(
        item => item.name == this.component
      );
      that.diseaseTypeCodeList = [...a];
      axios
        .post(
          "http://bridge.vipgz1.idcfengye.com/api/bridge/getBridgeComponent",
          {
            currentPage: 0,
            pageSize: 0,
            bridgeComponent: {
              bridgeCode: that.menuForm.bridgeCode,
              bridgeEntityTypeName: that.construction,
              partName: that.component
            }
          }
        )
        .then(res => {
          this.componentId = null;
          that.coponentList = [...res.data.data.list];
          console.log(that.coponentList);
        })
        .catch(err => {
          console.error(err);
        });
    },
    constructionChange() {
      let a = this.componentOptions.filter(
        item => item.id == this.construction
      );
      console.log(a);
    },
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
    submitForm(formName) {
      var that = this;
      console.log(that.structForm);
      console.log(that.bridgeCode);
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
          .post("http://bridge.vipgz1.idcfengye.com/api/disease/addDisease", {
            checkDisease: {
              diseaseId: this.menuForm.diseaseId,
              diseaseName: this.menuForm.diseaseName,
              diseaseCode: this.menuForm.diseaseCode,
              bridgeCode: this.menuForm.bridgeCode,
              structuralPartCode: this.menuForm.structuralPartCode,
              structuralStructural: this.menuForm.structuralStructural,
              diseaseLocation: this.menuForm.diseaseLocation,
              diseaseTypeCode: this.menuForm.diseaseTypeCode,
              diseaseGrade: this.menuForm.diseaseGrade,
              quantifyDescription: this.menuForm.quantifyDescription,
              qualitativeDescription: this.menuForm.qualitativeDescription,
              imgUrl: this.menuForm.imgUrl,
              status: this.menuForm.status,
              disposalAdvise: this.menuForm.disposalAdvise,
              createTime: this.menuForm.createTime,
              updateTime: this.menuForm.updateTime
            }
          })
          .then(function(response) {
            that.$router.push("/bridgeDiseaseInfo");
          })
          .catch(function(error) {});
      }
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleNodeClick(data) {
      console.log(data);
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