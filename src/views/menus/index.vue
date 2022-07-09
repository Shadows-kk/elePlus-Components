<template>
  <div class="container">
    <m-menus
      :data="data1"
      name="a"
      index="b"
      icon="c"
      children="d"
      defaultActive="1"
      style="width: 200px"
    ></m-menus>
    <infinite-menus
      :data="data2"
      name="a"
      index="b"
      icon="c"
      children="d"
      defaultActive="2"
      background-color="#545c64"
      active-text-color="#ffd04b"
      text-color="#fff"
      style="width: 400px"
    ></infinite-menus>
  </div>
</template>

<script setup lang="ts">
let data1 = [
  {
    a: "导航一",
    b: "1",
    c: "document",
  },
  {
    a: "导航二",
    b: "2",
    c: "document",
  },
  {
    a: "导航三",
    b: "3",
    c: "document",
    d: [
      {
        a: "导航3-1",
        b: "3-1",
        c: "document",
      },
      {
        a: "导航3-2",
        b: "3-2",
        c: "document",
      },
    ],
  },
];
let data2 = [
  {
    a: "导航一",
    b: "1",
    c: "Document",
  },
  {
    a: "导航二",
    b: "2",
    c: "Document",
  },
  {
    a: "导航三",
    b: "3",
    c: "Document",
    d: [
      {
        a: "导航3-1",
        b: "3-1",
        c: "Document",
      },
      {
        a: "导航3-2",
        b: "3-2",
        c: "Document",
        d: [
          {
            a: "导航3-1-1",
            b: "3-1-1",
            c: "Document",
            d: [
              {
                a: "导航3-1-1-1",
                b: "3-1-1-1",
                c: "Document",
                d: [
                  {
                    a: "导航3-1-1-1-1",
                    b: "3-1-1-1-1",
                    c: "Document",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}
</style>
