<template>
  <div class="input">
    <el-form
      style="width: 60%"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="edge1" prop="edge1">
        <el-input v-model="ruleForm.edge1"></el-input>
      </el-form-item>
      <el-form-item label="edge2" prop="edge2">
        <el-input v-model="ruleForm.edge2"></el-input>
      </el-form-item>
      <el-form-item label="edge3" prop="edge3">
        <el-input v-model="ruleForm.edge3"></el-input>
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
      ruleForm: { edge1: "", edge2: "", edge3: "" },
      rules: {
        edge1: [{ required: true, message: "请输入边长", trigger: "blur" }],
        edge2: [{ required: true, message: "请输入边长", trigger: "blur" }],
        edge3: [{ required: true, message: "请输入边长", trigger: "blur" }],
      },
      result: "",
    };
  },
  created() {},
  methods: {
    async submit() {
      let data = await this.$http.post("/question1/triangle/", {
        edge1: parseInt(this.ruleForm.edge1),
        edge2: parseInt(this.ruleForm.edge2),
        edge3: parseInt(this.ruleForm.edge3),
      });
      this.result = data.data;
      console.log(this.result);
    },
  },
};
</script>

<style lang="less" scoped>

</style>