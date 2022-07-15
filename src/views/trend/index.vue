<template>
  <div class="trend">
    <h3>基本组件：</h3>

    <div class="basic">
      <div>
        <trend title="上升" type="up">上升营业额</trend>
      </div>
      <div>
        <trend title="下降" type="down"></trend>
      </div>
    </div>
  </div>
  <div class="trend reverse">
    <h3>颜色反转：</h3>

    <div>
      <trend title="营业额" type="up" reverseColor></trend>
    </div>
    <div>
      <trend title="销售额" type="down" reverseColor></trend>
    </div>
  </div>
  <div class="trend reverse">
    <h3>文字颜色：</h3>
    <div>
      <trend title="营业额" type="up" upTextColor="blue"></trend>
    </div>
    <div>
      <trend title="销售额" type="down" downTextColor="orange"></trend>
    </div>
  </div>
  <div class="trend">
    <h3>自定义图标：</h3>
    <div>
      <trend title="营业额" type="up" upIcon="CaretTop"></trend>
    </div>
    <div>
      <trend title="销售额" type="down" downIcon="CaretBottom"></trend>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.trend {
  display: flex;
  align-items: center;
  .basic {
    display: flex;
  }
}
.trend div {
  margin-right: 10px;
}
h3 {
  margin-right: 20px;
}
</style>
