<template>
  <div class="menu-manage-box">
    <el-row>
      <el-button @click="show=true">添加</el-button>

      <el-dialog title="添加功能" :visible.sync="show" width="30%">
        <el-form
          :model="menuAddForm"
          ref="menuAddForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="编码 :" prop="roleName">
            <el-input v-model="menuAddForm.functionCode"></el-input>
          </el-form-item>
          <el-form-item label="功能名称 :" prop="roleName">
            <el-input v-model="menuAddForm.functionName"></el-input>
          </el-form-item>
          <el-form-item label="功能描述 :" prop="roleDesc">
            <el-input v-model="menuAddForm.functionDes"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="show = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('menuAddForm')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="编辑功能" :visible.sync="show2" width="30%">
        <el-form
          :model="menuAddForm"
          ref="menuEditForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="编码 :" prop="roleName">
            <el-input v-model="menuAddForm.functionCode"></el-input>
          </el-form-item>
          <el-form-item label="功能名称 :" prop="roleName">
            <el-input v-model="menuAddForm.functionName"></el-input>
          </el-form-item>
          <el-form-item label="功能描述 :" prop="roleDesc">
            <el-input v-model="menuAddForm.functionDes"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="show = false">取 消</el-button>
          <el-button type="primary" @click="submitEditForm('menuEditForm')">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="functionId" label="功能Id" width="100px" ></el-table-column>
      <el-table-column prop="functionCode" label="功能编号" ></el-table-column>
      <el-table-column prop="functionName" label="功能名称"></el-table-column>
      <el-table-column prop="functionDes" label="功能备注"></el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      >
      <template slot-scope="scope">
        <!-- <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          size="mini"
          >
          删除
        </el-button> -->
        <el-button
          @click.native.prevent="editRow(scope.$index, tableData)"
          size="mini"
          >
          编辑
        </el-button>
      
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
      show2:false,
      value: "",
      tableData: [
 
      ],
      menuAddForm: {
        functionId:null,
        functionName:null,
        functionCode:null,
        functionDes:null
      },
      
      rules: {
        functionName: [{ required: true, message: "信息不能为空", trigger: "blur" }],
        functionCode: [{ required: true, message: "信息不能为空", trigger: "blur" }],
        functionDes: [{ required: true, message: "信息不能为空", trigger: "blur" }],
      }
    };
  },
  methods: {

    
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.show=false
        } else {
          that.show=true
          //console.log("error submit!!");
        }
      });
      if(that.show==false){
          axios
            .post("http://bridge.vipgz1.idcfengye.com/api/function/addFunction", {
                functionName:this.menuAddForm.functionName,
                functionCode:this.menuAddForm.functionCode,
                functionDes:this.menuAddForm.functionDes,
            })
            .then(function(response) {
                //console.log(1)
            })
            .catch(function(error) {
              //console.log(error);
            });

           that.menuAddForm.functionName=null;
           that.menuAddForm.functionCode=null;
           that.menuAddForm.functionDes=null;
           that.tableData=[];
          axios
            .post("http://bridge.vipgz1.idcfengye.com/api/function/getAllFunction", {
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
    },
    submitEditForm(formName) {
       var that=this;
          this.$refs[formName].validate(valid => {
            if (valid) {
              that.show2=false
            } else {
              that.show2=true
              //console.log("error submit!!");
            }
          });
          
        if(that.show2==false){
           axios
            .post("http://bridge.vipgz1.idcfengye.com/api/function/updateFunction", {
                functionId: this.menuAddForm.functionId,
                functionName:this.menuAddForm.functionName,
                functionCode:this.menuAddForm.functionCode,
                functionDes:this.menuAddForm.functionDes,

            })
            .then(function(response) {
                that.show2=false;
                //console.log(response)
            })
            .catch(function(error) {
               that.show2=true;
              //console.log(error);
            });
          
      };
  
        axios
            .post("http://bridge.vipgz1.idcfengye.com/api/function/getAllFunction", {
                currentPage: 0,
                pageSize: 0
            
            })
            .then(function(response) {
              that.tableData=[];
              that.tableData=[...response.data.data.list]
            })
            .catch(function(error) {
              //console.log(error);
            });

    },
    deleteRow(index, rows) {
        var that=this;
     
        //console.log(this.tableData);
         axios
            .post("http://bridge.vipgz1.idcfengye.com/api/role/deleteRole", {
             
                  roleId:that.tableData[index].roleId
            })
            .then(function(response) {
                //console.log(1)
            })
            .catch(function(error) {
              //console.log(error);
            });
           rows.splice(index, 1);
      },
     editRow(index,rows){
        var that=this;
        that.show2=true;
        //console.log(this.tableData);
        that.menuAddForm.roleId=that.tableData[index].roleId;
        that.menuAddForm.roleName=that.tableData[index].roleName;
        that.menuAddForm.roleDesc=that.tableData[index].roleDesc;    
   },
    editRow(index,rows){
        var that=this;
        that.show2=true;
        that.menuAddForm.functionId=that.tableData[index].functionId;
        that.menuAddForm.functionName=that.tableData[index].functionName;
        that.menuAddForm.functionCode=that.tableData[index].functionCode;
        that.menuAddForm.functionDes=that.tableData[index].functionDes;    
   }

  },
  
  mounted:function(){
    var that = this;
     axios
        .post("http://bridge.vipgz1.idcfengye.com/api/function/getAllFunction", {
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