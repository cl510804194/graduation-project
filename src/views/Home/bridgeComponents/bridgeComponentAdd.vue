<template>
  <div>
    <el-tag type="info">上部结构</el-tag>
    <bridgeComponent :bridgeCode="sizeForm.bridgeCode">
      <el-form-item slot="header" label="上部承重构件"></el-form-item>

      <el-option
        slot="footer"
        v-for="item in bearingOptions"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      ></el-option>
    </bridgeComponent>

    <bridgeComponent :bridgeCode="sizeForm.bridgeCode">
      <el-form-item slot="header" label="上部一般构件"></el-form-item>

      <el-option
        slot="footer"
        v-for="item in bearingOptions"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      ></el-option>
    </bridgeComponent>
    <bridgeComponent :bridgeCode="sizeForm.bridgeCode">
      <el-form-item slot="header" label="支座"></el-form-item>

      <el-option
        slot="footer"
        v-for="item in supportOptions"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      ></el-option>
    </bridgeComponent>

    <el-tag type="info">下部结构</el-tag>
    <bridgeComponent :bridgeCode="sizeForm.bridgeCode">
      <el-form-item slot="header" label="翼墙、耳墙"></el-form-item>

      <el-option
        slot="footer"
        v-for="item in bearingOptions"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      ></el-option>
    </bridgeComponent>
    <bridgeComponent :bridgeCode="sizeForm.bridgeCode">
      <el-form-item slot="header" label="锥坡、护坡"></el-form-item>

      <el-option
        slot="footer"
        v-for="item in slopeOptins"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      ></el-option>
    </bridgeComponent>
    <bridgeComponent :bridgeCode="sizeForm.bridgeCode">
      <el-form-item slot="header" label="桥墩"></el-form-item>

      <el-option
        slot="footer"
        v-for="item in pierOptions"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      ></el-option>
    </bridgeComponent>
    <bridgeComponent :bridgeCode="sizeForm.bridgeCode">
      <el-form-item slot="header" label="桥台"></el-form-item>

      <el-option
        slot="footer"
        v-for="item in abutmentOptions"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      ></el-option>
    </bridgeComponent>
    <bridgeComponent :bridgeCode="sizeForm.bridgeCode">
      <el-form-item slot="header" label="墩台基础"></el-form-item>

      <el-option
        slot="footer"
        v-for="item in pierOptions"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      ></el-option>
    </bridgeComponent>
    <bridgeComponent :bridgeCode="sizeForm.bridgeCode">
      <el-form-item slot="header" label="河床"></el-form-item>

      <el-option
        slot="footer"
        v-for="item in pierOptions"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      ></el-option>
    </bridgeComponent>
    <bridgeComponent :bridgeCode="sizeForm.bridgeCode">
      <el-form-item slot="header" label="调治构造物"></el-form-item>

      <el-option
        slot="footer"
        v-for="item in  regulatingOptions"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      ></el-option>
    </bridgeComponent>

    <el-tag type="info">桥面系</el-tag>
    <bridgeComponent :bridgeCode="sizeForm.bridgeCode">
      <el-form-item slot="header" label="桥面铺装"></el-form-item>

      <el-option
        slot="footer"
        v-for="item in  matOptions"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      ></el-option>
    </bridgeComponent>
    <bridgeComponent :bridgeCode="sizeForm.bridgeCode">
      <el-form-item slot="header" label="伸缩缝装置"></el-form-item>

      <el-option
        slot="footer"
        v-for="item in  expansionOptions"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      ></el-option>
    </bridgeComponent>
    <bridgeComponent :bridgeCode="sizeForm.bridgeCode">
      <el-form-item slot="header" label="人行道"></el-form-item>

      <el-option
        slot="footer"
        v-for="item in  walkOptinos"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      ></el-option>
    </bridgeComponent>
    <bridgeComponent :bridgeCode="sizeForm.bridgeCode">
      <el-form-item slot="header" label="栏杆、护栏"></el-form-item>

      <el-option
        slot="footer"
        v-for="item in   railingOptions"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      ></el-option>
    </bridgeComponent>
    <bridgeComponent :bridgeCode="sizeForm.bridgeCode">
      <el-form-item slot="header" label="排水系统"></el-form-item>

      <el-option
        slot="footer"
        v-for="item in  drainageOptions"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      ></el-option>
    </bridgeComponent>
    <bridgeComponent :bridgeCode="sizeForm.bridgeCode">
      <el-form-item slot="header" label="照明"></el-form-item>

      <el-option
        slot="footer"
        v-for="item in  IlluminatedOptions"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      ></el-option>
    </bridgeComponent>
  </div>
</template>
<script>
export default {
  props: {
    bridgeCode: String
  }
};
</script>
<style>
</style>
