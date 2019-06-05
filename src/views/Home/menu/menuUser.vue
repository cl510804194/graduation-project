<template>
  <div class="menu-manage-box">
    <el-row>
      <el-button @click="showMenu()">添加</el-button>
      <el-dialog title="添加用户" :visible.sync="show" width="30%">
        <el-form
          :model="menuAddForm"
          ref="menuAddForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名 :" prop="personLoginName">
            <el-input v-model="menuAddForm.personLoginName"></el-input>
          </el-form-item>
          <el-form-item label="密码 :" prop="personPassword">
            <el-input type="password" v-model="menuAddForm.personPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认密码 :" prop="passwordConfirm">
            <el-input type="password" v-model="menuAddForm.passwordConfirm"></el-input>
          </el-form-item>
          <el-form-item label="姓名 :" prop="personName">
            <el-input v-model="menuAddForm.personName"></el-input>
          </el-form-item>
          <el-form-item label="手机号 :" prop="personPhone">
            <el-input v-model="menuAddForm.personPhone"></el-input>
          </el-form-item>
          <el-form-item label="角色 :" prop="roleId">
            <el-select v-model="menuAddForm.roleId" placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in menuAddForm.roleIdOption"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="管养单位 :" prop="organizationId">
            <el-select v-model="menuAddForm.organizationId" placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in menuAddForm.organizationOptin"
                :key="item.organizationId"
                :label="item.organizationName"
                :value="item.organizationId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="show = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('menuAddForm')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="修改用户" :visible.sync="show2" width="30%">
        <el-form
          :model="menuAddForm"
          ref="menuAddForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名 :" prop="personLoginName">
            <el-input v-model="menuAddForm.personLoginName"></el-input>
          </el-form-item>
          <el-form-item label="密码 :" prop="personPassword">
            <el-input type="password" v-model="menuAddForm.personPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认密码 :" prop="passwordConfirm">
            <el-input type="password" v-model="menuAddForm.passwordConfirm"></el-input>
          </el-form-item>
          <el-form-item label="姓名 :" prop="personName">
            <el-input v-model="menuAddForm.personName"></el-input>
          </el-form-item>
          <el-form-item label="手机号 :" prop="personPhone">
            <el-input v-model="menuAddForm.personPhone"></el-input>
          </el-form-item>
          <el-form-item label="角色 :" prop="roleId">
            <el-select v-model="menuAddForm.roleId" placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in menuAddForm.roleIdOption"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="管养单位 :" prop="organizationId">
            <el-select v-model="menuAddForm.organizationId" placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in menuAddForm.organizationOptin"
                :key="item.organizationId"
                :label="item.organizationName"
                :value="item.organizationId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="show = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('menuAddForm')">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="personId" label="编号" width="50"></el-table-column>
      <el-table-column prop="personLoginName" label="用户名"></el-table-column>
      <el-table-column prop="personName" label="姓名"></el-table-column>
      <el-table-column prop="personPhone" label="用户手机"></el-table-column>
      <el-table-column prop="roleName" label="权限级别"></el-table-column>
      <el-table-column prop="roleId" label="权限Id" v-if="false"></el-table-column>
      <el-table-column prop="organizationId" label="单位Id" v-if="false"></el-table-column>
      <el-table-column prop="personPassword" label="用户密码" v-if="false"></el-table-column>
      <el-table-column prop="passwordConfirm" label="确认用户密码" v-if="false"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" size="mini">删除</el-button>
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
 
      var validateName = (rule, value, callback) => {
        var that=this;
        var validate=0;
     
        // var ret2 =this.tableData.findIndex((v) => {
        //       return v.id == 233;
        //   });
        axios
        .post("http://bridge.vipgz1.idcfengye.com/api/user/checkUser", {
           personLoginName:this.menuAddForm.personLoginName
        })
        .then(function(response) {
          //console.log(response.data)
          if(response.data.ret==1){
             that.validate=1;
            
          }
          if(response.data.ret==0){
             that.validate=0
          }
        })
        .catch(function(error) {
        });
        if (!value) {
          callback(new Error('信息不能为空'));
        }
        else if(that.validate==1){
             callback(new Error('该账号已经被注册'));  
        } 
        else{
            callback();  
        }
       //console.log(that.validate);
      };
    var validatePass2 = (rule, value, callback) => {
        if (!value) {
          callback(new Error('信息不能为空'));
        } else if (value !== this.menuAddForm.personPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        var validatephone = (rule, value, callback) => {
           var reg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!value) {
          callback(new Error('信息不能为空'));
        } else if (!reg.test(value)) {
          callback(new Error('请输入正确的手机号码!'));
        } else {
          callback();
        }
      };
    return {
      show: false,
      show2:false,
      value: "",
      tableData: [],
      menuAddForm: {
      personLoginName:null,
      personPassword:null,
      personName:null,
      personPhone:null,
      roleId:null,
      organizationId:null,
      passwordConfirm:null,

      roleIdOption:[],
      organizationOptin:[],
      },
      rules: {
        personLoginName: [{ required: true, validator:validateName, trigger: "blur" }],
        personPassword: [{ required: true, message: "信息不能为空", trigger: "blur" }],
        passwordConfirm: [{ required: true, validator: validatePass2, trigger: "blur" }],
        personName: [{ required: true, message: "信息不能为空", trigger: "blur" }],
        personPhone: [{ required: true,validator:validatephone, trigger: "blur" }],
        roleId: [{ required: true, message: "信息不能为空", trigger: "change" }],
        organizationId: [{ required: true, message: "信息不能为空", trigger: "change" }]
      }
    };
  },
  methods: {
    showMenu() {
      var that = this;
      this.show = true;
      that.menuAddForm.roleIdOption=[]
        axios
        .post("http://bridge.vipgz1.idcfengye.com/api/role/getAllRole", {
            currentPage: 0,
            pageSize: 0
        
        })
        .then(function(response) {
          //console.log(response.data.data.list);
          for(let i=0;i<response.data.data.list.length;i++){
              that.menuAddForm.roleIdOption.push(response.data.data.list[i])
          }
          //console.log(that.menuAddForm.roleIdOption)
       
        })
        .catch(function(error) {
          //console.log(error);
        });

        axios
        .post("http://bridge.vipgz1.idcfengye.com/api/organization/getOrganization", {
            currentPage: 0,
            pageSize: 0
        
        })
        .then(function(response) {
          that.menuAddForm.organizationOptin=[...response.data.data.list]
          //console.log("管养单位")
          //console.log(that.menuAddForm.organizationOptin)
       
        })
        .catch(function(error) {
          //console.log(error);
        });
        
    },
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.show = false;
        } else {
          that.show = true;
          //console.log("error submit!!");
        }
      });
      if (that.show == false) {
        axios
          .post("http://bridge.vipgz1.idcfengye.com/api/user/addUser", {
            person:{
            personLoginName:this.menuAddForm.personLoginName,
            personPassword:this.menuAddForm.personPassword,
            personName:this.menuAddForm.personName,
            personPhone:this.menuAddForm.personPhone,
            roleId:this.menuAddForm.roleId,
            organizationId:this.menuAddForm.organizationId,
            }
           
          })
          .then(function(response) {
              axios
                .post("http://bridge.vipgz1.idcfengye.com/api/user/getUser", {
                    currentPage: 0,
                    pageSize: 0

                })
                .then(function(response) {
                  //console.log(response.data.data.list);
                      that.tableData=[...response.data.data.list]
                  
                  //console.log(that.tableData)
                })
                .catch(function(error) {
                  //console.log(error);
                });
  
          })
          .catch(function(error) {
            //console.log(error);
          });
          that.menuAddForm.personLoginName=null;
          that.menuAddForm.personPassword=null;
          that.menuAddForm.personName=null;
          that.menuAddForm.personPhone=null;
          that.menuAddForm.roleId=null;
          that.menuAddForm.organizationId=null;
      }
      
    },
    deleteRow(index, rows) {
      var that = this;

      //console.log(this.tableData);
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/user/deleteUser", {
          roleId: that.tableData[index].roleId
        })
        .then(function(response) {
          //console.log(1);
        })
        .catch(function(error) {
          //console.log(error);
        });
      rows.splice(index, 1);
    },
    editRow(index, rows) {
      var that = this;
      that.show2 = true;
      //console.log(this.tableData);
      that.menuAddForm.personLoginName = that.tableData[index].personLoginName;
      that.menuAddForm.personPassword = that.tableData[index].personPassword;
      that.menuAddForm.personName =that.tableData[index].personName;
      that.menuAddForm.personPhone = that.tableData[index].personPhone;
      that.menuAddForm.roleId = that.tableData[index].roleId;
      that.menuAddForm.organizationId = that.tableData[index].organizationId;
      that.menuAddForm.passwordConfirm = that.tableData[index].passwordConfirm;

      if (that.parentMenu.length != 1) {
        that.parentMenu.splice(1, that.parentMenu.length);
      }
      that.menuAddForm.roleIdOption=[]
        axios
        .post("http://bridge.vipgz1.idcfengye.com/api/role/getAllRole", {
            currentPage: 0,
            pageSize: 0
        
        })
        .then(function(response) {
          //console.log(response.data.data.list);
          for(let i=0;i<response.data.data.list.length;i++){
              that.menuAddForm.roleIdOption.push(response.data.data.list[i])
          }
          //console.log(that.menuAddForm.roleIdOption)
       
        })
        .catch(function(error) {
          //console.log(error);
        });

        axios
        .post("http://bridge.vipgz1.idcfengye.com/api/organization/getOrganization", {
            currentPage: 0,
            pageSize: 0
        
        })
        .then(function(response) {
          that.menuAddForm.organizationOptin=[...response.data.data.list]
          //console.log("管养单位")
          //console.log(that.menuAddForm.organizationOptin)
       
        })
        .catch(function(error) {
          //console.log(error);
        });
      

 
    },
  },
  mounted:function(){
    var that = this;
     axios
        .post("http://bridge.vipgz1.idcfengye.com/api/user/getUser", {
            currentPage: 0,
            pageSize: 0

        })
        .then(function(response) {
          //console.log(response.data.data.list);
          for(let i=0;i<response.data.data.list.length;i++){
              that.tableData.push(response.data.data.list[i])
          }
          //console.log(that.tableData)
        })
        .catch(function(error) {
          //console.log(error);
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