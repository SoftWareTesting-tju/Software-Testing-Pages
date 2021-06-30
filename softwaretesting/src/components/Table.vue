<template>
  <div>
    <el-table
      :data="tableData.slice((pageNum - 1) * pageSize, pageNum * pageSize)"
      stripe
      border
      style="width: 100%"
    >
      <el-table-column
        v-for="(item, index) in tableIndex"
        :key="index + ''"
        :prop="item + ''"
        :label="item + ''"
        align="center"
      >
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="showPagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[3, 5, 8, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="Object.keys(tableData).length"
      background
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    dataSet: Object,
  },
  data() {
    return {
      showPagination: this.dataSet.showPagination,
      tableIndex: this.dataSet.index,
      tableData: this.dataSet.data,
      pageSize: 5,
      pageNum: 1,
    };
  },
  created() {},
  mounted() {
    this.tableIndex.forEach((element) => {});
  },
  watch: {
    dataSet: function (val) {
      console.log(val);
      this.tableIndex = val.index;
      this.tableData = val.data;
    },
  },
  methods: {
    handleSizeChange(newSize) {
      this.pageSize = newSize;
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage;
    },
  },
};
</script>

<style lang="less" scoped>
.el-table {
  margin: 20px auto;
}
.el-pagination {
  text-align: center;
}
// .el-table th {
//   display: table-cell !important;
// }
</style>