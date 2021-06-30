<template>
  <div class="input">
    <el-form
      style="width: 60%"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="talkTime" prop="talkTime">
        <el-input v-model="ruleForm.talkTime"></el-input>
      </el-form-item>
      <el-form-item label="unpaidNum" prop="unpaidNum">
        <el-input v-model="ruleForm.unpaidNum"></el-input>
      </el-form-item>
      <!-- <el-form-item label="unpaidCostAcrossYear" prop="unpaidCostAcrossYear">
        <el-input v-model="ruleForm.unpaidCostAcrossYear"></el-input>
      </el-form-item>
      <el-form-item label="payMethod" prop="payMethod">
        <el-input v-model="ruleForm.payMethod"></el-input>
      </el-form-item> -->
    </el-form>
    <el-button type="primary" @click="submit">提交</el-button>
    <div class="input-div" v-show="result != ''">
      <span class="input-result">result: {{ result }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        talkTime: "",
        unpaidNum: "",
        // unpaidCostAcrossYear: "",
        // payMethod: "",
      },
      rules: {
        talkTime: [
          { required: true, message: "请输入通话次数", trigger: "blur" },
        ],
        unpaidNum: [
          { required: true, message: "请输入未缴费次数", trigger: "blur" },
        ],
        // unpaidCostAcrossYear: [
        //   { required: true, message: "请输入边长", trigger: "blur" },
        // ],
        // payMethod: [{ required: true, message: "请输入边长", trigger: "blur" }],
      },
      result: "",
    };
  },
  created() {},
  methods: {
    async submit() {
      let data = await this.$http.post("/question6/charge/", {
        talkTime: parseInt(this.ruleForm.talkTime),
        unpaidNum: parseInt(this.ruleForm.unpaidNum),
      });
      this.result = data.data;
      console.log(this.result);
    },
  },
};
</script>

<style lang="less" scoped>
</style>