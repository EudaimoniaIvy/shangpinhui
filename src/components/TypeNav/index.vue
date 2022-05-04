<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过度动画 -->
        <transition name="sort">
          <!-- 三级联动 -->
        <div class="sort" v-show="show">
          <div class="all-sort-list2"  @click="goSearch">
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ cur: currentIndex == index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a :data-categoryName="c1.categoryName" :data-category2Id="c1.categoryId">{{ c1.categoryName }}</a>
              </h3>
              <!-- 二三级分类 -->
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//引入方式：把lodash全部功能都引入了
//throttle是默认暴露所以不加花括号
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标在的一级分类
      currentIndex: -1,
      show:true,
    };
  },
  //组件挂载完毕，可以向服务器发送请求
  mounted() {
    //当组件挂载完毕，让show属性变成false
    //如果不是Home路由组件，将TypeNav隐藏
    if(this.$route.path!='/home'){
      this.show = false
    }
  },
  computed: {
    ...mapState("home",["categoryList"]),
  },
  methods: {
    //es5语法
    changeIndex:throttle(function (index) {
      //index是用户鼠标在的一级分类的元素的索引值
      //操作太快会发生卡顿（部分鼠标事件无法触发）
      //防抖和节流使用lodash插件，里面封装了防抖与节流业务【闭包和延时器】
      //throttle不要用箭头函数
      this.currentIndex = index;
    }, 50),
    //一级分类鼠标移出事件的回调
    goSearch(e){
      //最好的解决方案（三级联动路由跳转和传参）：编程式导航+事件委派
      //1如何锁定子元素中的a标签，方式是给这三个a标签通过数据绑定绑定一个自定义属性（自定义属性都是小写的）
      //2怎么区分一二三级标签的
      //2通过e.target获取到带有data-category自定义属性的a标签（复习v-test07还可以用v-model拿到数据）
      let element = e.target;
      //2节点有个dataset属性，可以获取节点的自定义属性和属性值
      //拿到a标签的自定义属性和值
      let {categoryname,category1id,category2id,category3id} = element.dataset;
      //判断a标签
      if(categoryname){
        //整理路由跳转参数
        let location = {name:'search'};
        let query = {categoryName:categoryname}
        //判断一二三级分类的a标签
        if(category1id){
          query.category1Id = category1id
        }else if(category2id){
          query.category2Id = category2id
        }else{
          query.category3Id = category3id
        }
        //路由跳转
        //判断，如果路由跳转的时候有params参数（搜索框的关键字），也传过去
        //(疑问这里可以两个都写query参数吗，如果都是query还需要合并参数吗)
        //敏感信息用params否则用query      
          location.params = this.$route.params
          //动态给location配置对象添加query属性
          location.query = query
          //路由跳转
          this.$router.push(location)  
      }
    },
    //当鼠标移入'全部商品分类'的时候，让商品列表展示
    enterShow(){
      this.show = true
    },
    //当鼠标移出'全部商品分类'的时候，让商品列表隐藏
    leaveShow() {
      //当鼠标移出'全部商品分类'的时候，a标签不再高亮
      this.currentIndex = -1;
      //判断是Search路由才执行
      if(this.$route.path!=='/home'){
        this.show = false
      }
      
    },
  },
};
</script>

<style scoped lang='less'>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            text-align: left;
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }

        .cur {
          background-color: skyblue;
        }
      }
    }
    /* 过度动画的样式 */
    //过度动画开始状态（进入的起点、离开的终点）
    .sort-enter,.sort-leave-to{
      height:0px;
      opacity: 0;
    }
    //过度动画结束状态（进入的终点、离开的起点）
    .sort-enter-to,.sort-leave{
      height:461x;
      opacity: 1;
    }
    //定义动画时间，速率
    .sort-enter-active,.sort-leave-active{
      transition: all .5s linear;
    }
  }
}
</style>