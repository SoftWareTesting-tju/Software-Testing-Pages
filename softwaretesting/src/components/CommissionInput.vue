<template>
  <div class="input">
    <el-form
      style="width: 60%"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="host" prop="host">
        <el-input v-model="ruleForm.host"></el-input>
      </el-form-item>
      <el-form-item label="display" prop="display">
        <el-input v-model="ruleForm.display"></el-input>
      </el-form-item>
      <el-form-item label="peripheral" prop="peripheral">
        <el-input v-model="ruleForm.peripheral"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submit">提交</el-button>
    <div class="input-div" v-show="result != ''">
      <span class="input-result">result: {{ result.commission }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: { host: "", display: "", peripheral: "" },
      rules: {
        host: [{ required: true, message: "请输入销售数量", trigger: "blur" }],
        display: [
          { required: true, message: "请输入销售数量", trigger: "blur" },
        ],
        peripheral: [
          { required: true, message: "请输入销售数量", trigger: "blur" },
        ],
      },
      result: "",
    };
  },
  created() {},
  methods: {
    async submit() {
      let data = await this.$http.post("/question3/commission/", {
        host: parseInt(this.ruleForm.host),
        display: parseInt(this.ruleForm.display),
        peripheral: parseInt(this.ruleForm.peripheral),
      });
      this.result = data.data;
      console.log(data);
    },
  },
};
</script>

<style lang="less" scoped>
</style>