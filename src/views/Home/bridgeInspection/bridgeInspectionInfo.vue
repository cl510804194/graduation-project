<template>
  <div class="menu-manage-box">
   
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="diseaseDevelopId" label="发展记录Id" ></el-table-column>
      <el-table-column prop="diseaseCode" label="病害编码" ></el-table-column>
      <el-table-column prop="diseaseName" label="病害名称" ></el-table-column>
      <el-table-column prop="checkTime" label="诊断时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200px">
        <template slot-scope="scope">
          <!-- <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" size="mini">删除</el-button> -->
          <el-button @click.native.prevent="recordRow(scope.$index, tableData) "    size="mini">添加记录</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
     
      parentMenuName: "",
      show2: false,
      show:false,
      index:null,
  
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
      parentMenu: [
        {
          menuName: "无",
          menuId: 0
        }
      ],
       menuTypeForm:[{
          menuTypeId:0,
          menuTypeName:"管理菜单"
        },{
          menuTypeId:1,
          menuTypeName:"应用菜单"
        }
       ],
      tableData: [],
      menuAddForm: {
        diseaseId:null
      },
      rules: {
        menuCode: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        menuName: [
          { required: true, message: "信息不能为空", trigger: "blur" }
        ],
        menuId: [
          { required: true, message: "信息不能为空", trigger: "change" }
        ],
        meneUrl: [{ required: true, message: "信息不能为空", trigger: "blur" }],
        menuIco: [{ required: true, message: "信息不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {

    showMenu() {
      var that = this;
      that.show= true;
      if (that.parentMenu.length != 1) {
        that.parentMenu.splice(1, that.parentMenu.length);
      }
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/menu/getAllMenu", {
          currentPage: 0,
          pageSize: 0,
          powerMenu: {
            parentMenuId: 0
          }
        })
        .then(function(response) {
          //console.log(response.data.data.list);
          for (let i = 0; i < response.data.data.list.length; i++) {
            that.parentMenu.push(response.data.data.list[i]);
          }
          //console.log(that.parentMenu);
        })
        .catch(function(error) {
          //console.log(error);
        });
    },
    editRow(index, rows) {
      var that = this;
      that.show2 = true;
      //console.log(this.tableData);
      that.menuAddForm.menuId = that.tableData[index].menuId;
      that.menuAddForm.menuName = that.tableData[index].menuName;
      
      that.menuAddForm.menuCode=that.tableData[index].menuCode;
      that.menuAddForm.meneUrl = that.tableData[index].meneUrl;
      that.menuAddForm.menuIco = that.tableData[index].menuIco;
      if (that.parentMenu.length != 1) {
        that.parentMenu.splice(1, that.parentMenu.length);
      }
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/menu/getAllMenu", {
          currentPage: 0,
          pageSize: 0,
         
        })
        .then(function(response) {
          //console.log(response.data.data.list);
          for (let i = 0; i < response.data.data.list.length; i++) {
            that.parentMenu.push(response.data.data.list[i]);

          }

          for(let x in that.parentMenu){
             if(that.parentMenu[x].menuId==that.tableData[index].menuId){
            
                that.index=that.parentMenu[x].parentMenuId;
                
             break;
          }
          for(let x in that.menuTypeForm){
               if(that.menuTypeForm[x].menuTypeId==that.tableData[index].menuType){
                   //console.log("我找到了");
                   that.menuAddForm.menuType=that.menuTypeForm[x].menuTypeId;
                    break;
               }
               
             }
          }
          //for(let x in that.parentMenu)
          //console.log(that.parentMenu);
        })
        .catch(function(error) {
          //console.log(error);
        });
    },
    recordRow(index,rows){
        var that=this;
       //console.log(this.tableData);
       that.menuAddForm.diseaseId = that.tableData[index].diseaseId;
       console.log(that.menuAddForm.diseaseId )
       this.$router.push({
        name: 'bridgeInspectionRecord', 
        params: { diseaseId: that.menuAddForm.diseaseId }
        });
    },
 
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.show = false;
        } else {
          that.show = true;
        }
      });
      if (that.show == false) {
        axios
          .post("http://bridge.vipgz1.idcfengye.com/api/menu/addMenu", {
            menuCode: this.menuAddForm.menuCode,
            menuName: this.menuAddForm.menuName,
            parentMenuId: this.parentMenu.menuId,
            meneUrl: this.menuAddForm.meneUrl,
            menuIco: this.menuAddForm.menuIco,
            menuType:this.menuTypeForm.menuTypeId
          })
          .then(function(response) {})
          .catch(function(error) {
            //console.log(error);
          });


      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/menu/getAllMenu", {
          currentPage: 0,
          pageSize: 0
        })
        .then(function(response) {
          // //console.log(response.data.data.list);
          // for (let i = 0; i < response.data.data.list.length; i++) {
          //   that.tableData.push(response.data.data.list[i]);
          // }
          // //console.log(that.tableData);
          that.tableData=[...response.data.data.list];
        })
        .catch(function(error) {
          //console.log(error);
        });

      }
      that.menuAddForm.menuCode = null;
      that.menuAddForm.menuName = null;
      that.menuAddForm.menuId = null;
      that.menuAddForm.meneUrl = null;
      that.menuAddForm.menuIco = null;
   
   
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
          .post("http://bridge.vipgz1.idcfengye.com/api/menu/updateMenu", {
            menuCode: that.menuAddForm.menuCode,
            menuName: that.menuAddForm.menuName,
            menuId: that.menuAddForm.menuId,
            meneUrl: that.menuAddForm.meneUrl,
            menuIco: that.menuAddForm.menuIco,
            parentMenuId:that.parentMenu.menuId
          })
          .then(function(response) {
            that.show2 = false;
            //console.log(response);
          })
          .catch(function(error) {
            that.show2 = true;
            //console.log(error);
          });
      };
      
      that.tableData = [];
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/menu/getAllMenu", {
          currentPage: 0,
          pageSize: 0
        })
        .then(function(response) {
          //console.log(response.data.data.list);
          for (let i = 0; i < response.data.data.list.length; i++) {
            that.tableData.push(response.data.data.list[i]);
          }
          //console.log(that.tableData);
        })
        .catch(function(error) {
          //console.log(error);
        });
    },

    deleteRow(index, rows) {
      var that = this;

      //console.log(this.tableData);
      axios
        .post("http://bridge.vipgz1.idcfengye.com/api/menu/deleteMenu", {
          menuId: that.tableData[index].menuId
        })
        .then(function(response) {
          //console.log(1);
        })
        .catch(function(error) {
          //console.log(error);
        });
      rows.splice(index, 1);
    }
  },

  mounted: function() {
    var that = this;
    axios
      .post("http://bridge.vipgz1.idcfengye.com/api/check/getCheckPlan", {
        currentPage: 0,
        pageSize: 0
      })
      .then(function(response) {
        //console.log(response.data.data.list);
        for (let i = 0; i < response.data.data.list.length; i++) {
          that.tableData.push(response.data.data.list[i]);
        }
     
      })
      .catch(function(error) {
        //console.log(error);
      });
    //console.log(that.tableData);
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
