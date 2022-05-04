<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button v-if="startAndEndNum.start >= 2" @click="$emit('getPageNo',1)" :class="{active: pageNo==1}">1</button>
    <button v-if="startAndEndNum.start >= 3" >···</button>

    <!-- 中间部分 -->
    <button
      v-for="(page, index) in startAndEndNum.end"
      :key="index"
      v-show="page >= startAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{active: pageNo==page}"
    >
      {{ page }}
    </button>

    <button v-if="startAndEndNum.end < totalPages - 1">···</button>
    <button v-if="startAndEndNum.end < totalPages" @click="$emit('getPageNo', totalPages)" :class="{active: pageNo==totalPages}">{{ totalPages }}</button>
    <button :disabled="pageNo==totalPages" @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px" :class="{active: pageNo==total}">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //一共有几页
    totalPages() {
      //Math.ceil()向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续页码的起始数字和结束数字
    startAndEndNum() {
      const { continues, totalPages, pageNo } = this;
      let start = 0;
      let end = 0;
      //一共页数小于连续页数时
      if (continues > totalPages) {
        start = 1;
        end = totalPages;
      } else {
        //不小于时
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        //start出现是负数，排除这种情况
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //end数字大于页码数是，排除这种情况
        if (end > totalPages) {
          start = totalPages - continues + 1;
          end = totalPages;
        }
        //当前这个计算属性。需要把开始与结束数字返回，只能返回一个对象
        //底下的对象：KV一致省略V
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>