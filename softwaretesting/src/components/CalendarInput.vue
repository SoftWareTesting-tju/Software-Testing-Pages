<template>
  <div class="input">
    <el-form
      style="width: 60%"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="year" prop="year">
        <el-input v-model="ruleForm.year"></el-input>
      </el-form-item>
      <el-form-item label="month" prop="month">
        <el-input v-model="ruleForm.month"></el-input>
      </el-form-item>
      <el-form-item label="day" prop="day">
        <el-input v-model="ruleForm.day"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submit">提交</el-button>
    <div class="input-div" v-show="result!=''">
      <span class="input-result">result:   {{ result }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: { year: "", month: "", day: "" },
      rules: {
        year: [{ required: true, message: "请输入年份", trigger: "blur" }],
        month: [{ required: true, message: "请输入月份", trigger: "blur" }],
        day: [{ required: true, message: "请输入日期", trigger: "blur" }],
      },
      result: "",
    };
  },
  created() {},
  methods: {
    async submit() {
      let data = await this.$http.post("/question8/calendar/", {
        year: parseInt(this.ruleForm.year),
        month: parseInt(this.ruleForm.month),
        day: parseInt(this.ruleForm.day),
      });
      this.result = data.data;
      console.log(this.result);
    },
  },
};
</script>

<style lang="less" scoped>

</style>