<template>
    <div class="inspection-content">
    <el-form-item label="创建人 ">
      <el-input v-model="this.menuForm.bepersonId"></el-input>
    </el-form-item>
    <!-- <el-form-item label="检查人Id " prop="bridgeSpanType">
      <el-input v-model="this.menuForm.personId"></el-input>
    </el-form-item> -->
    <el-form-item label="检查人姓名 " prop="personName">
      <el-input v-model="this.menuForm.personName"></el-input>
    </el-form-item>
    <el-form-item label="负责人 :" prop="bridgeConstructionMilestone">
      <el-input v-model="this.menuForm.principal"></el-input>
    </el-form-item>
    <el-form-item label="申请人 :" prop="bridgeConstructionMilestone">
      <el-input v-model="this.menuForm.proposer"></el-input>
    </el-form-item>
     <el-form-item label="失效标记 :" prop="bridgeConstructionMilestone">
        <el-select v-model="this.menuForm.invalid" placeholder="请选择桥梁名称">
        <el-option
          v-for="item in invalidOptins"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        ></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="预计费用 :" prop="bridgeConstructionMilestone">
      <el-input v-model="this.menuForm.estimatedCost"></el-input>
    </el-form-item>
    <el-form-item label="维修等级 :" prop="bridgeConstructionMilestone">
      <el-input v-model="this.menuForm.maintainRanking"></el-input>
    </el-form-item>
     <el-form-item label="状态 :" prop="bridgeConstructionMilestone">
         <el-select v-model="this.menuForm.status" placeholder="请选择桥梁名称">
            <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            ></el-option>
         </el-select>
    </el-form-item>
    <el-form-item label="描述 :" prop="bridgeConstructionMilestone">
      <el-input v-model="this.menuForm.description"></el-input>
    </el-form-item>
    <el-form-item label="计划开始时间 :" prop="bridgeConstructionMilestone">
      <!-- <span class="demonstration">默认</span> -->
      <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
    </el-form-item>
    </div>
</template>
<script>
export default {
    props:{
        menuForm:Object,
        statusOptions:Array,
        invalidOptins:Array
    },
    data(){
        return{

        }

    }
}
</script>
<style lang="stylus" scoped>
.inspection-content
    display flex 
    flex-wrap wrap
    .el-form-item
        width 24%
</style>