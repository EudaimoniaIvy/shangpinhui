<template>
  <div>
    <!-- 三级联动组件已经全局注册，不需要再次引入 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/> 
    <Rank/>
    <Like/>
    <Floor v-for="f in floorList" :key="f.id" :list="f"/>
    <Brand/>
  </div>
</template>

<script>
//引入其余组件
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'

export default {
  name:'Home',
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    //派发action,获取floor的数据
    this.$store.dispatch("home/getFloorList")
    //获取用户信息在首页展示
    //this.$store.dispatch("user/getUserInfo")
  },
  computed:{
    ...mapState(
      //没开命名空间的写法
      /* floorList:state=>state.home.floorList */
      'home',["floorList"]
    )
  }
}
</script>

<style>

</style>