<template>
  <el-form
    ref="sizeForm"
    :model="sizeForm"
    :rules="rules"
    label-width="110px"
    size="mini"
    inline
    v-if="$store.state.chooseItem===0"
  >
    <el-form-item label="桥梁代码 :" prop="bridgeCode">
      <el-input v-model="sizeForm.bridgeCode"></el-input>
    </el-form-item>
    <el-form-item label="桥梁名称 :" prop="bridgeName">
      <el-input v-model="sizeForm.bridgeName"></el-input>
    </el-form-item>
    <el-form-item label="路线号 :" prop="roadNumber">
      <el-input v-model="sizeForm.roadNumber"></el-input>
    </el-form-item>
    <el-form-item label="路线名称 :" prop="roadName">
      <el-input v-model="sizeForm.roadName"></el-input>
    </el-form-item>
    <el-form-item label="路线类型 :" prop="roadType">
      <el-select size="mini" v-model="sizeForm.roadType" placeholder="请选择">
        <el-option
          v-for="item in sizeForm.roadOptions"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="次要路线 :">
      <el-input v-model="sizeForm.minorRoad"></el-input>
    </el-form-item>
    <el-form-item label="顺序号 :" prop="bridgeSerialNumber">
      <el-input v-model="sizeForm.bridgeSerialNumber"></el-input>
    </el-form-item>
    <el-form-item label="所在地 :" prop="bridgeLocation">
      <el-input v-model="sizeForm.bridgeLocation"></el-input>
    </el-form-item>
    <el-form-item label="经度 :" prop="longitude">
      <el-input v-model="sizeForm.longitude"></el-input>
    </el-form-item>
    <el-form-item label="维度 :" prop="latitude">
      <el-input v-model="sizeForm.latitude"></el-input>
    </el-form-item>
    <el-form-item label="中心桩号 :" prop="bridgeCenterMilestone">
      <el-input v-model="sizeForm.bridgeCenterMilestone"></el-input>
    </el-form-item>
    <el-form-item label="桥型 :" prop="bridgeType">
      <el-select size="mini" v-model="sizeForm.bridgeType" placeholder="请选择">
        <el-option
          v-for="item in sizeForm.bridgeTypeOption"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="管养单位 :" prop="bridgeManageMaintenance">
      <el-select v-model="sizeForm.bridgeManageMaintenance" placeholder="请选择" style="width: 100%">
        <el-option
          v-for="item in sizeForm.organizationOptin"
          :key="item.organizationId"
          :label="item.organizationName"
          :value="item.organizationId"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="跨越地物名称 ">
      <el-input v-model="sizeForm.bridgeSpanName"></el-input>
    </el-form-item>
    <el-form-item label="跨越地物类型 " prop="bridgeSpanType">
      <el-input v-model="sizeForm.bridgeSpanType"></el-input>
    </el-form-item>
    <el-form-item label="施工桩号 :" prop="bridgeConstructionMilestone">
      <el-input v-model="sizeForm.bridgeConstructionMilestone"></el-input>
    </el-form-item>
    <el-form-item label="公路技术等级 " prop="highwayLevel">
      <el-select v-model="sizeForm.highwayLevel" placeholder="请选择">
        <el-option
          v-for="item in sizeForm.highwayLevelOptions"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="桥梁性质 :" prop="bridgeProperty">
      <el-select v-model="sizeForm.bridgeProperty" placeholder="请选择">
        <el-option
          v-for="item in sizeForm.bridgePropertyOptions"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="桥梁分类 :" prop="bridgeClassification">
      <el-select v-model="sizeForm.bridgeClassification" placeholder="请选择">
        <el-option
          v-for="item in sizeForm.bridgeClassificationOptions"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="设计荷载等级 " prop="desiginLoadLevel">
      <el-input v-model="sizeForm.desiginLoadLevel"></el-input>
    </el-form-item>
    <el-form-item label="目前荷载等级 " prop="bridgeNowLoadLevel">
      <el-input v-model="sizeForm.bridgeNowLoadLevel"></el-input>
    </el-form-item>
    <!-- <el-form-item label="上部结构类型 " prop="bridgeSuperstructureType">
      <el-input v-model="sizeForm.bridgeSuperstructureType"></el-input>
    </el-form-item>
    <el-form-item label="支座类型 :" prop="bridgeSupportType">
      <el-input v-model="sizeForm.bridgeSupportType"></el-input>
    </el-form-item>
    <el-form-item label="桥墩类型 :" prop="bridgePierType">
      <el-input v-model="sizeForm.bridgePierType"></el-input>
    </el-form-item>
    <el-form-item label="桥台类型 :" prop="bridgeAbutmentType">
      <el-input v-model="sizeForm.bridgeAbutmentType"></el-input>
    </el-form-item>
    <el-form-item label="桥墩基础类型 " prop="bridgePierPileType">
      <el-input v-model="sizeForm.bridgePierPileType"></el-input>
    </el-form-item>
    <el-form-item label="桥台基础类型 " prop="bridgeAbutmentPileType">
      <el-input v-model="sizeForm.bridgeAbutmentPileType"></el-input>
    </el-form-item>
    <el-form-item label="桥面铺装类型 " prop="bridgeDeckType">
      <el-input v-model="sizeForm.bridgeDeckType"></el-input>
    </el-form-item>
    <el-form-item label="伸缩缝类型 :" prop="bridgeDeckType">
      <el-input v-model="sizeForm.bridgeJointType"></el-input>
    </el-form-item>-->

    <el-form-item label="桥梁用途 :" prop="bridgePurpose">
      <el-input v-model="sizeForm.bridgePurpose"></el-input>
    </el-form-item>
    <el-form-item label="桥梁状态 :" prop="bridgeState">
      <el-input v-model="sizeForm.bridgeState"></el-input>
    </el-form-item>

    <el-form-item label="行政等级 :" prop="administrativeLevel">
      <el-input v-model="sizeForm.administrativeLevel"></el-input>
    </el-form-item>
    <el-form-item label="所属乡镇 :">
      <el-input v-model="sizeForm.bridgeTownship"></el-input>
    </el-form-item>
    <el-form-item label="母桥代码 :">
      <el-input v-model="sizeForm.bridgeMotherCode"></el-input>
    </el-form-item>
    <el-form-item label="管理形式码 :">
      <el-input v-model="sizeForm.bridgeManageCode"></el-input>
    </el-form-item>
    <el-form-item label="责任人 :">
      <el-input v-model="sizeForm.bridgePrincipal"></el-input>
    </el-form-item>
    <el-form-item label="多媒体资料 :" style="display:block">
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
      <el-dialog></el-dialog>
    </el-form-item>
  </el-form>
</template>
// 
<script>
import store from "../../../../vuex/store";
import axios from "axios";
import bridgeComponent from "./bridgeComponents";
export default {
  name: "bridgeIdent",
  components: {
    bridgeComponent
  },
  props: {},
  data() {
    return {
      bool: false,
      componentForm: {
        componentId: null,
        bridgeCode: null,
        bridgeEntityTypeName: null,
        partName: null,
        componentName: null,
        componentLocation: null,
        componentMaterials: null,
        componentCode: null
      },
      sizeForm: {
        bridgeCode: null,
        bridgeName: null,
        roadNumber: null,
        roadName: null,
        roadType: null,
        minorRoad: null,
        bridgeSerialNumber: null,
        bridgeLocation: null,
        longitude: null,
        latitude: null,
        bridgeCenterMilestone: null,
        bridgeType: null,
        bridgeManageMaintenance: null,
        bridgeSpanName: null,
        bridgeSpanType: null,
        bridgeConstructionMilestone: null,
        highwayLevel: null,
        bridgeProperty: null,
        bridgeClassification: null,
        desiginLoadLevel: null,
        bridgeNowLoadLevel: null,
        bridgeSuperstructureType: null,
        bridgeSupportType: null,
        bridgePierType: null,
        bridgeAbutmentType: null,
        bridgePierPileType: null,
        bridgeAbutmentPileType: null,
        bridgeDeckType: null,
        bridgeJointType: null,
        bridgePurpose: null,
        bridgeState: null,
        multimediaData: null,
        administrativeLevel: null,
        bridgeTownship: null,
        bridgeMotherCode: null,
        bridgeManageCode: null,
        bridgePrincipal: null,
        fileId: null,
        dialogImageUrl: null,
        dialogVisible: false,
        organizationOptin: [],
        bridgeClassificationOptions: [
          {
            value: 1,
            label: "特大"
          },
          {
            value: 2,
            label: "大"
          },
          {
            value: 3,
            label: "中"
          },
          {
            value: 4,
            label: "小"
          }
        ],
        bridgeTypeOption: [
          {
            value: 1,
            label: "[1]梁式桥"
          }
        ],
        roadOptions: [
          {
            value: 1,
            label: "左线"
          },
          {
            value: "选项2",
            label: "右线"
          },
          {
            value: "选项3",
            label: "跨线"
          },
          {
            value: "选项4",
            label: "匝道"
          }
        ],
        highwayLevelOptions: [
          {
            value: "选项1",
            label: "高速公路"
          },
          {
            value: "选项2",
            label: "一级公路"
          },
          {
            value: "选项3",
            label: "二级公路"
          },
          {
            value: "选项4",
            label: "三级公路"
          },
          {
            value: "选项5",
            label: "四级公路"
          },
          {
            value: "选项6",
            label: "等外路"
          }
        ],

        bridgePropertyOptions: [
          {
            value: "选项1",
            label: "永久性"
          },
          {
            value: "选项2",
            label: "半永久性"
          },
          {
            value: "选项3",
            label: "临时性"
          }
        ]
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
        roadType: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgeSerialNumber: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgeLocation: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgeCenterMilestone: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgeType: [
          { required: true, message: "信息不能为空", trigger: "change" }
        ],
        bridgeSpanType: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        highwayLevel: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgeProperty: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgeClassification: [
          { required: true, message: "信息不能为空", trigger: "change" }
        ],
        desiginLoadLevel: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgeNowLoadLevel: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgeSuperstructureType: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgeSupportType: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgePierType: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgeAbutmentPileType: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgePierPileType: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgeDeckType: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgeJointType: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgePurpose: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgeState: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        roadType: [
          { required: true, message: "信息不能为空", trigger: "change" }
        ],
        highwayLevel: [
          { required: true, message: "信息不能为空", trigger: "change" }
        ],
        bridgeProperty: [
          { required: true, message: "信息不能为空", trigger: "change" }
        ],
        latitude: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        longitude: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgeAbutmentType: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        bridgeManageMaintenance: [
          { required: true, message: "信息不能为空", trigger: "change" }
        ]
      },
      bearingOptions: [
        {
          id: 1,
          name: "砖木"
        },
        {
          id: 2,
          name: "砖混"
        },
        {
          id: 3,
          name: "钢筋混凝土"
        },
        {
          id: 4,
          name: "钢结构"
        },
        {
          id: 5,
          name: "钢一钢筋混凝土"
        }
      ],
      supportOptions: [
        { id: 1, name: "钢支座" },
        { id: 2, name: "是否带滑动能力划分支座" },
        { id: 3, name: "橡胶支座" }
      ],
      slopeOptins: [{ id: 1, name: "浆砌片石" }],
      pierOptions: [
        { id: 1, name: "木料" },
        { id: 2, name: "石料" },
        { id: 3, name: "混凝土" },
        { id: 4, name: "钢筋混凝土" },
        { id: 5, name: "钢材" }
      ],
      abutmentOptions: [{ id: 1, name: "石砌" }, { id: 2, name: "素混凝土" }],
      regulatingOptions: [
        { id: 1, name: "导流建筑物" },
        { id: 2, name: "挑流建筑物" },
        { id: 3, name: "固底建筑物" },
        { id: 4, name: "边坡加固物" }
      ],
      matOptions: [
        { id: 1, name: "沥青混凝土" },
        { id: 1, name: "级配碎石" },
        { id: 1, name: "水泥稳定土" },
        { id: 1, name: "水泥混凝土" },
        { id: 1, name: "水泥砂浆" }
      ],
      expansionOptions: [
        { id: 1, name: "镀锌薄钢板" },
        { id: 2, name: "橡胶伸缩缝" }
      ],
      walkOptinos: [
        { id: 1, name: "透水砖" },
        { id: 2, name: "面包砖" },
        { id: 3, name: "混凝土" },
        { id: 4, name: "鹅卵石" }
      ],
      railingOptions: [
        { id: 1, name: "镀锌管" },
        { id: 2, name: "不锈钢" },
        { id: 3, name: "木材" }
      ],
      drainageOptions: [{ id: 1, name: "PVC塑料管" }],
      IlluminatedOptions: [
        { id: 1, name: "金属材料" },
        { id: 1, name: "亚克力材料" },
        { id: 1, name: "树脂材料" }
      ]
    };
  },
  methods: {
    addComponent(e) {
      var that = this;
      console.log(e.currentTarget);

      let boolType =
        e.currentTarget.parentElement.firstElementChild.firstElementChild
          .innerHTML;

      if (boolType == "上部承重构件" || "上部一般构件" || "支座") {
        that.componentForm.bridgeEntityTypeName = "上部结构";
      } else if (
        boolType == "翼墙耳墙" ||
        "锥坡护坡" ||
        "桥墩" ||
        "桥台" ||
        "墩台基础" ||
        "河床" ||
        "调治构造物"
      ) {
        that.componentForm.bridgeEntityTypeName = "下部结构";
      } else if (
        boolType == "桥面铺装" ||
        "伸缩缝装置" ||
        "人行道" ||
        "栏杆护杆" ||
        "排水系统" ||
        "照明标志"
      ) {
        that.componentForm.bridgeEntityTypeName = "桥面系";
      }
      axios
        .post(
          "http://bridge.vipgz1.idcfengye.com/api/bridge/addBridgeComponent",
          {
            componentId: that.componentForm.componentId,
            bridgeCode: that.sizeForm.bridgeCode,
            bridgeEntityTypeName: that.componentForm.bridgeEntityTypeName,
            partName: boolType,
            componentName: that.componentForm.componentName,
            componentLocation: that.componentForm.componentLocation,
            componentMaterials: that.componentForm.componentMaterials
          }
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    fileSuccess(response, file, fileList) {
      this.sizeForm.multimediaData = response.data;
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
      if (!isLt3M) {
        this.$message.error("上传图片大小不能超过 3MB!");
        this.$refs.upload.clearFiles();
        this.files = null;
        return;
      }
      this.files = file.raw;
      console.log(file.raw);
    },

    beforeupload(file) {
      //  this.formData.append('file', file)
      console.log(1);
      //  return false
    },
    handleRemove(file, fileList) {
      //console.log(file, fileList);
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
          .post("http://bridge.vipgz1.idcfengye.com/api/bridge/addBridgeBase", {
            bridgeCode: this.sizeForm.bridgeCode,
            bridgeName: this.sizeForm.bridgeName,
            roadNumber: this.sizeForm.roadNumber,
            roadName: this.sizeForm.roadName,
            roadType: this.sizeForm.roadType,
            minorRoad: this.sizeForm.minorRoad,
            bridgeSerialNumber: this.sizeForm.bridgeSerialNumber,
            bridgeLocation: this.sizeForm.bridgeLocation,
            longitude: this.sizeForm.longitude,
            latitude: this.sizeForm.latitude,
            bridgeCenterMilestone: this.sizeForm.bridgeCenterMilestone,
            bridgeType: this.sizeForm.bridgeType,
            bridgeManageMaintenance: this.sizeForm.bridgeManageMaintenance,
            bridgeSpanName: this.sizeForm.bridgeSpanName,
            bridgeSpanType: this.sizeForm.bridgeSpanType,
            bridgeConstructionMilestone: this.sizeForm
              .bridgeConstructionMilestone,
            highwayLevel: this.sizeForm.highwayLevel,
            bridgeProperty: this.sizeForm.bridgeProperty,
            bridgeClassification: this.sizeForm.bridgeClassification,
            desiginLoadLevel: this.sizeForm.desiginLoadLevel,
            bridgeNowLoadLevel: this.sizeForm.bridgeNowLoadLevel,
            bridgeSuperstructureType: this.sizeForm.bridgeSuperstructureType,
            bridgeSupportType: this.sizeForm.bridgeSupportType,
            bridgePierType: this.sizeForm.bridgePierType,
            bridgeAbutmentType: this.sizeForm.bridgeAbutmentType,
            bridgePierPileType: this.sizeForm.bridgePierPileType,
            bridgeAbutmentPileType: this.sizeForm.bridgeAbutmentPileType,
            bridgeDeckType: this.sizeForm.bridgeDeckType,
            bridgeJointType: this.sizeForm.bridgeJointType,
            bridgePurpose: this.sizeForm.bridgePurpose,
            bridgeState: this.sizeForm.bridgeState,
            multimediaData: this.sizeForm.multimediaData,
            administrativeLevel: this.sizeForm.administrativeLevel,
            bridgeTownship: this.sizeForm.bridgeTownship,
            bridgeMotherCode: this.sizeForm.bridgeMotherCode,
            bridgeManageCode: this.sizeForm.bridgeManageCode,
            bridgePrincipal: this.sizeForm.bridgePrincipal
          })
          .then(function(response) {
            //console.log(1);
          })
          .catch(function(error) {
            //console.log(error);
          });
        //    this.$store.state.birdgeCode=this.sizeForm.bridgeCode;
        this.$store.state.active++;
        this.$store.state.chooseItem++;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted: function() {
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
        that.sizeForm.organizationOptin = [...response.data.data.list];
        //console.log("管养单位")
        //console.log(that.sizeForm.organizationOptin)
      })
      .catch(function(error) {
        //console.log(error);
      });
  }
};
</script>
<style lang="stylus" scoped>
.el-tag {
  display: block;
  width: 100%;
}

label {
  font-size: 14px;
}

.el-button {
  padding: 7px 20px;
}

.bridge-component {
  padding: 20px;

  .el-input {
    width: 130px;
  }
}
</style>
