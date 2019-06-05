<template>
  <div class="menu-manage-box">
    <el-row>
      <el-button @click="showMenu()">添加</el-button>

      <el-dialog title="添加单位" :visible.sync="show" width="30%">
        <el-form
          :model="menuAddForm"
          ref="menuAddForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
      
          <el-form-item label="单位编码 :" prop="organizationCode">
            <el-input v-model="menuAddForm.organizationCode"></el-input>
          </el-form-item>
          <el-form-item label="单位名称 :" prop="organizationName">
            <el-input v-model="menuAddForm.organizationName"></el-input>
          </el-form-item>
          <el-form-item label="父级单位 :" >
            <el-select v-model="menuAddForm.organizationId" placeholder="请选择" style=" display: block">
              <el-option
                v-for="(item,index) in parentMenu"
                :key="index"
                :label="item.organizationName"
                :value="item.organizationId"
              ></el-option>
            </el-select>
          </el-form-item>
   
          <el-form-item label="省 :" >
            <el-select @change="provinceChange()" v-model="menuAddForm.provinceId" placeholder="请选择" style=" display: block">
              <el-option
                v-for="(item,index) in provinceForm"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市 :">
            <el-select @change="cityChange()" v-model=" menuAddForm.cityId" placeholder="请选择" style=" display: block">
              <el-option
                v-for="(item,Index) in  cityForm"
                :key="Index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区县 :" >
              <el-select  v-model=" menuAddForm.areaId" placeholder="请选择" style=" display: block">
              <el-option
                v-for="(item,index) in  areaForm"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
       
          </el-form-item>

          <el-form-item label="创建时间 :" prop="createTime">
                <el-date-picker
                    v-model="menuAddForm.createTime"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="show = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('menuAddForm')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="编辑单位" :visible.sync="show2" width="30%">
          <el-form
          :model="menuAddForm"
          ref="menuAddForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
      
          <el-form-item label="单位编码 :" prop="organizationCode">
            <el-input v-model="menuAddForm.organizationCode"></el-input>
          </el-form-item>
          <el-form-item label="单位名称 :" prop="organizationName">
            <el-input v-model="menuAddForm.organizationName"></el-input>
          </el-form-item>
          <el-form-item label="父级单位 :" >
            <el-select v-model="menuAddForm.parentId" placeholder="请选择" style=" display: block">
              <el-option
                v-for="(item,index) in parentMenu"
                :key="index"
                :label="item.organizationName"
                :value="item.organizationId"
              ></el-option>
            </el-select>
          </el-form-item>
   
          <el-form-item label="省 :" >
            <el-select @change="provinceChange()" v-model="menuAddForm.provinceId" placeholder="请选择" style=" display: block">
              <el-option
                v-for="(item,index) in provinceForm"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市 :">
            <el-select @change="cityChange()" v-model="menuAddForm.cityId" placeholder="请选择" style=" display: block">
              <el-option
                v-for="(item,Index) in  cityForm"
                :key="Index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区县 :" >
              <el-select  v-model=" menuAddForm.areaId" placeholder="请选择" style=" display: block">
              <el-option
                v-for="(item,index) in  areaForm"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
       
          </el-form-item>

          <el-form-item label="创建时间 :" prop="createTime">
                <el-date-picker
                    v-model="menuAddForm.createTime"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="show = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('menuAddForm')">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="organizationId" label="单位Id" width="50"></el-table-column>
      <el-table-column prop="organizationCode" label="编码" width="50"></el-table-column>
      <el-table-column prop="organizationName" label="单位名称"></el-table-column>
      <el-table-column prop="organizationType" label="等级"></el-table-column>
      <el-table-column prop="provinceId" label="省Id" v-if="false"></el-table-column>
      <el-table-column prop="cityId" label="城市Id" v-if="false"></el-table-column>
      <el-table-column prop="areaId" label="区县Id" v-if="false"></el-table-column>
      <el-table-column prop="parentId" label="父级Id" v-if="false"></el-table-column>
   

      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <!-- <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" size="mini">删除</el-button> -->
          <el-button @click.native.prevent="editRow(scope.$index, tableData)" size="mini">编辑</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="icons" label="页面图标" width="100"></el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      show: false,
      show2: false,
      value: "",
      tableData: [],
      parentMenu: [
        {
          organizationName: "无",
          organizationId: 0
        }
      ],
      provinceForm:[],
      cityForm:[],
      areaForm:[],
      menuAddForm: {
        organizationId: null,
        organizationCode: null,
        parentId: null,
        organizationName: null,
        description: null,
        organizationType: null,
        organizationPrincipal: null,
        organizationContact: null,
        provinceId: null,
        cityId: null,
        areaId: null,
        address: null,
        longitude: null,
        latitude: null,
        orgSort: null,
        organizationPhone: null,
        personId:null,
        createTime: null,
        updateTime: null
      },

      rules: {
     
        organizationCode: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        organizationName: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
      }
    };
  },
  computed:{
      getType:function(){
          if(this.menuAddForm.provinceId==this.menuAddForm.cityId&&this.menuAddForm.areaId==null){
               this.menuAddForm.organizationType="省级"
          }
          if(this.menuAddForm.provinceId!==this.menuAddForm.cityId&&this.menuAddForm.areaId==null){
               this.menuAddForm.organizationType="市级" 
          }
          if(this.menuAddForm.areaId!==null){
               this.menuAddForm.organizationType="区级" 
          }
          return this.menuAddForm.organizationType
        
      }
  },
  methods: {
    showMenu() {
      var that = this;
      that.show= true;
      if (that.parentMenu.length != 1) {
        that.parentMenu.splice(1, that.parentMenu.length);
      }
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/organization/getOrganization", {
          currentPage: 0,
          pageSize: 0,
          tOrganization: {
            parentId: 0
          }
        })
        .then(function(response) {
      
          for (let i = 0; i < response.data.data.list.length; i++) {
            that.parentMenu.push(response.data.data.list[i]);
          }
     
        })
        .catch(function(error) {
        
        });

    axios
        .post("http://bridge.vipgz1.idcfengye.com/api/const/getArea", {
          currentPage: 0,
          pageSize: 0,
          area:{
                   areaLevel:1
               }

        })
        .then(function(response) {
          console.log("省")
          console.log(response.data.data.list);
           for (let i = 0; i < response.data.data.list.length; i++) {
            that.provinceForm.push(response.data.data.list[i]);
          }
        })
        .catch(function(error) {
          ////console.log(error);
        });
 
    },
    submitForm(formName) {
      var that = this;
      console.log(this.getType);
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.show = false;
        } else {
          that.show = true;
          ////console.log("error submit!!");
        }
      });
      if (that.show == false) {
        axios
          .post("http://bridge.vipgz1.idcfengye.com/api/organization/addOrganization", {
              organizationCode:that.menuAddForm.organizationCode,
              organizationName:that.menuAddForm.organizationName,
              parentId:that.menuAddForm.organizationId,
              provinceId:that.menuAddForm.provinceId,
              cityId:that.menuAddForm.cityId,
              areaId:that.menuAddForm.areaId,
              createTime:that.menuAddForm.createTime,
              organizationType:that.getType
          })
          .then(function(response) {
            ////console.log(1);
          })
          .catch(function(error) {
            ////console.log(error);
          });   
       }
    },
    submitEditForm(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.show2 = false;
        } else {
          that.show2 = true;
   
        }
      });

      if (that.show2 == false) {
        axios
          .post("http://bridge.vipgz1.idcfengye.com/api/role/updateRole", {
            roleId: that.menuAddForm.roleId,
            roleName: that.menuAddForm.roleName,
            roleDesc: that.menuAddForm.roleDesc
          })
          .then(function(response) {
            that.show2 = false;
   
          })
          .catch(function(error) {
            that.show2 = true;
         
          });
      }
      that.tableData = [];
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/role/getAllRole", {
          currentPage: 0,
          pageSize: 0
        })
        .then(function(response) {
 
          for (let i = 0; i < response.data.data.list.length; i++) {
            that.tableData.push(response.data.data.list[i]);
          }
 
        })
        .catch(function(error) {
    
        });
    },
    deleteRow(index, rows) {
      var that = this;

   
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/role/deleteRole", {
          roleId: that.tableData[index].roleId
        })
        .then(function(response) {
    
        })
        .catch(function(error) {

        });
      rows.splice(index, 1);
    },
    editRow(index, rows) {
      var that = this;
      that.show2 = true;
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/organization/getOrganization", {
          currentPage: 0,
          pageSize: 0,
          tOrganization: {
            parentId: 0
          }
        })
        .then(function(response) {
      
          for (let i = 0; i < response.data.data.list.length; i++) {
            that.parentMenu.push(response.data.data.list[i]);
          }
     
        })
        .catch(function(error) {
        
        });


       axios
        .post("http://bridge.vipgz1.idcfengye.com/api/const/getArea", {
          currentPage: 0,
          pageSize: 0,
          area:{
                   areaLevel:1
               }

        })
        .then(function(response) {
          ////console.log("省")
          ////console.log(response.data.data.list);
           for (let i = 0; i < response.data.data.list.length; i++) {
            that.provinceForm.push(response.data.data.list[i]);
          }
        })
        .catch(function(error) {
          ////console.log(error);
        });




      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/const/getArea", {
               currentPage:0,
               pageSize:0,
               area:{
                   parentId:that.menuAddForm.provinceId,
                   areaLevel:2
               }
        })
        .then(function(response) {
 
          ////console.log(response.data.data.list);
 
          that.cityForm=[...response.data.data.list]
    
        })
        .catch(function(error) {
        });

      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/const/getArea", {
               currentPage:0,
               pageSize:0,
               area:{
                   parentId:that.menuAddForm.cityId,
                   areaLevel:3
               }
        })
        .then(function(response) {
          ////console.log("区")
          ////console.log(response.data.data.list);
 
          that.areaForm=[...response.data.data.list]
    
        })
        .catch(function(error) {
        });
      that.menuAddForm.organizationId = that.tableData[index].organizationId;
      that.menuAddForm.organizationCode = that.tableData[index].organizationCode;
      that.menuAddForm.organizationName = that.tableData[index].organizationName;
      that.menuAddForm.areaName = that.tableData[index].areaName;
      that.menuAddForm.provinceId = that.tableData[index].provinceId;
      that.menuAddForm.cityId = that.tableData[index].cityId;
      that.menuAddForm.areaId = that.tableData[index].areaId;
      that.menuAddForm.parentId = that.tableData[index].parentId;
    
    },
    provinceChange(){
      var that=this;

      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/const/getArea", {
               currentPage:0,
               pageSize:0,
               area:{
                   parentId:that.menuAddForm.provinceId,
                   areaLevel:2
               }
        })
        .then(function(response) {
 
          ////console.log(response.data.data.list);
          that.menuAddForm.cityId=null;
          that.cityForm=[...response.data.data.list]
    
        })
        .catch(function(error) {
        });
    },
    cityChange(){
      var that=this;
   
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/const/getArea", {
               currentPage:0,
               pageSize:0,
               area:{
                   parentId:that.menuAddForm.cityId,
                   areaLevel:3
               }
        })
        .then(function(response) {
          ////console.log("区")
          ////console.log(response.data.data.list);
          that.menuAddForm.areaId=null;
          that.areaForm=[...response.data.data.list]
    
        })
        .catch(function(error) {
        });
    },

  },


  mounted: function() {
    var that = this;
    axios
      .post("http://bridge.vipgz1.idcfengye.com/api/organization/getOrganization", {
        currentPage: 0,
        pageSize: 0
      })
      .then(function(response) {

        for (let i = 0; i < response.data.data.list.length; i++) {
          that.tableData.push(response.data.data.list[i]);
        }

      })
      .catch(function(error) {
   
      });
  }
};
</script>
<style lang="stylus" scoped>
menu-shadow() {
  border-radius: 4px;
  border: 4px solid #E9EEF3;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.54);
}

.menu-manage-box {
  padding: 20px;
  menu-shadow();
}

.el-table {
  menu-shadow();
}

.el-row {
  display: inline-block;
  menu-shadow();
  margin: 20px;
}

.el-button {
  background-color: #545c64;
  color: #eee;
  margin: 2px;
  border: 0px;

  &:hover {
    background-color: #eee;
    color: #545c64;
  }

  &:active {
    background-color: #eee;
    color: #545c64;
  }
}
</style>