<template>
  <div id="app">
    <MyHeader></MyHeader>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 只在home和search显示。 -->
    <!-- <MyFooter v-show="$route.path=='/home'||$route.path=='/search'"></MyFooter> -->
    <MyFooter v-show="$route.meta.show"></MyFooter>
  </div>
</template>

<script>
/* /index.vue可以省略 */
import MyHeader from './components/MyHeader/index.vue'
import MyFooter from './components/MyFooter/index.vue'

export default {
  name: 'App',
  components: {
    MyHeader,MyFooter
  },
  //优化search组件（因为search和home的反复切换造成TypeNav组件反复挂载（之前写在TypeNav的mounted)
  //会反复向服务器发送请求
  //复习v-test39
  mounted() {
    //派发一个action,通知Vuex发请求，获取三级列表数据
    this.$store.dispatch("home/categoryList");
    //this.$store.dispatch("user/getUserInfo")
  },
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
