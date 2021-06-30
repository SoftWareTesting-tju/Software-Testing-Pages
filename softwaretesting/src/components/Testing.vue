<template>
  <div>
    <el-tabs type="border-card" v-if="activePath != ''">
      <el-tab-pane label="用例测试">
        <el-row>
          <el-select v-model="version" @change="changeVersion">
            <el-option
              v-for="item in versionOptions"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="testMethod"
            placeholder="请选择"
            @change="changeMethod"
          >
            <el-option
              v-for="item in testOptions"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <el-button type="primary" @click="Test()">测试</el-button>
        </el-row>
        <el-card v-show="testMethod != ''">
          <div class="example-div">
            <span class="example-test">测试用例</span>
          </div>
          <component
            :is="exampleData"
            class="example-table"
            :dataSet="exampleDataSet"
          ></component>
        </el-card>
        <el-card v-show="JSON.stringify(testResults) != '{}'">
          <el-row>
            <div class="result-text">
              <span class="text-result">测试结果</span>
            </div>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="12" class="resultTable-col">
              <component
                :is="resultData"
                class="result-table"
                :dataSet="resultDataSet"
              ></component>
            </el-col>
            <el-col :span="12">
              <component
                :is="resultChart"
                class="result-chart"
                :dataSet="testResults"
              ></component></el-col
          ></el-row>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="输入测试">
        <component :is="input"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MyCharts from "./MyCharts.vue";
import Table from "./Table.vue";
import TriangleInput from "./TriangleInput.vue";
import CommissionInput from "./CommissionInput.vue";
import ChargeInput from "./ChargeInput.vue";
import CalendarInput from "./CalendarInput.vue";

export default {
  props: ["activePath"],
  components: {
    MyCharts,
    Table,
    TriangleInput,
    CommissionInput,
    ChargeInput,
    CalendarInput,
  },
  data() {
    return {
      //测试方法
      testMethod: "",
      //测试结果
      testResults: {},
      //传入测试结果表格的数据
      resultDataSet: {},
      //传入测试用例表格的数据
      exampleDataSet: {},
      //动态渲染组件
      exampleData: "",
      resultData: "",
      resultChart: "",
      //调用版本,v1是bug版本,v2是正常版本
      version: "",
      //版本所有选择
      versionOptions: [
        { label: "v1", value: "bug" },
        { label: "v2", value: "" },
      ],
    };
  },
  created() {},
  watch: {
    activePath: function (val) {
      this.testResults = {}; //清空测试结果
      this.resultDataSet = {};
      this.testMethod = ""; //清空测试方法
      this.exampleData = "";
      this.resultData = "";
      this.resultChart = "";
    },
  },
  computed: {
    //测试选择
    testOptions: function () {
      switch (this.activePath) {
        //三角形问题
        case "/triangle":
          return ["BoundaryValue", "EquivalenceClass"];
        //电脑销售问题
        case "/commission":
          return ["BoundaryValue"];
        //电信收费问题
        case "/charge":
          return ["BoundaryValue", "EquivalenceClass", "DecisionTable"];
        //万年历问题
        case "/calendar":
          return ["BoundaryValue", "EquivalenceClass"];
      }
    },
    //动态渲染输入表单组件
    input: function () {
      switch (this.activePath) {
        //三角形问题
        case "/triangle":
          return "TriangleInput";
        //电脑销售问题
        case "/commission":
          return "CommissionInput";
        //电信收费问题
        case "/charge":
          return "ChargeInput";
        //万年历问题
        case "/calendar":
          return "CalendarInput";
      }
    },
  },
  methods: {
    //测试
    async Test() {
      let results = {};
      switch (this.activePath) {
        //三角形问题
        case "/triangle":
          results = await this.$http.get(
            "/question1/triangle" + this.version + "/" + this.testMethod
          );
          break;
          show;
        //电脑销售问题
        case "/commission":
          results = await this.$http.get(
            "/question3/commission" + this.version + "/" + this.testMethod
          );
          break;
        //电信收费问题
        case "/charge":
          results = await this.$http.get(
            "/question6/charge" + this.version + "/" + this.testMethod
          );
          break;
        //万年历问题
        case "/calendar":
          results = await this.$http.get(
            "/question8/calendar" + this.version + "/" + this.testMethod
          );
          break;
      }
      results.data.accuracy = Math.round(results.data.accuracy * 100) / 100;
      this.testResults = results.data;
      this.resultDataSet = {
        index: Object.keys(results.data),
        data: [results.data],
        showPagination: false,
      };
      this.resultData = Table;
      this.resultChart = MyCharts;
    },
    //改变选择值
    changeMethod(newMethod) {
      this.testResults = {};
      this.resultDataSet = {};
      this.exampleData = "";
      this.getTestExampleData();
    },
    //获取测试用例数据
    async getTestExampleData() {
      let data = await this.$http.post("/show-csv/", {
        problem: this.activePath.substr(1) + this.version,
        method_type: this.testMethod,
      });
      var index = 0;
      for (var i = 0; i < data.data.length; i++) {
        if (!data.data[i].isSame) {
          var temp = data.data[i];
          data.data[i] = data.data[index];
          data.data[index] = temp;
          index++;
        }
      }
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].isSame = data.data[i].isSame + "";
        if (!data.data[i].bug) {
          data.data[i].bug = "No Bug";
        }
      }
      this.exampleDataSet = {
        index: Object.keys(data.data[0]),
        data: Object.values(data.data),
        showPagination: true,
      };
      this.exampleData = Table;
    },
    changeVersion() {
      this.testResults = {};
      this.changeMethod();
    },
  },
};
</script>

<style lang="less" scoped>
.el-select {
  margin-right: 20px;
}
.result-chart {
  margin: 0 auto;
}
.example-div {
  text-align: center;
  // margin: 10px auto;
}
.result-text {
  text-align: center;
  margin: 20px auto;
}
.example-test,
.text-result {
  margin: 0 auto 30px auto;
  font-size: 20px;
}
.resultTable-col {
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-card {
  margin-top: 30px;
}
.result-table {
  width: 80%;
}
</style>