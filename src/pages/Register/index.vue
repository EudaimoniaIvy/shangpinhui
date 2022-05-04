<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="allContent">
        <div class="content">
        <label>手机号:</label>
        <!-- 
          name:给每一个表单元素添加一个名字，需要让vee-valadite区分验证的是哪一个表单元素
          v-validate=验证规则
          /正则/，^表示开头，$表示结尾，\d表示数字，{10}表示前面的\d有10位
        -->
        <input
          type="text"
          placeholder="请输入你的手机号"
          v-model="phone"
          name="phone"
          v-validate="{ required: true, regex: /^1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }"
        />
        <!-- 
          errors.first(‘field’) – 获取关于当前field的第一个错误信息
          collect('field') -- 获取关于当前field的所有错误信息(list)
          errors.has('field') -- 当前filed是否有错误(true/false)
          all() -- 当前表单所有错误(list)
          any() -- 当前表单是否有任何错误(true/false)
        -->
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          type="text"
          placeholder="请输入验证码"
          v-model="code"
          name="code"
          v-validate="{ required: true, regex: /^\d{6}$/ }"
          :class="{ invalid: errors.has('code') }"
        />
        <button style="with: 100px; height: 38px" @click="getCode">
          获取验证码
        </button>
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <!-- /^[0-9a-zA-Z]{8,20}$/匹配一个8到20位长的字符串，其中只能包含大小写字母和数字。 -->
        <input
          type="password"
          placeholder="密码由8-20位字母和数字组合"
          v-model="password"
          name="password"
          v-validate="{ required: true, regex: /^[0-9a-zA-Z]{8,20}$/ }"
          :class="{ invalid: errors.has('password') }"
        />
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="password"
          placeholder="请再次输入确认密码"
          v-model="confirmPassword"
          name="confirmPassword"
          v-validate="{ required: true, is: password }"
          :class="{ invalid: errors.has('confirmPassword') }"
        />
        <span class="error-msg">{{ errors.first("confirmPassword") }}</span>
      </div>
      <div class="controls">
        <input
          name="agree"
          type="checkbox"
          v-model="agree"
          v-validate="{ required: true, agree: true }"
          :class="{ invalid: errors.has('agree') }"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first("agree") }}</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      //收集表单数据
      phone: "",
      //验证码
      code: "",
      //密码
      password: "",
      //确认密码
      confirmPassword: "",
      //同意协议
      agree: true,
    };
  },
  methods: {
    //获取验证码
    async getCode() {
      //简单判断一下
      try {
        //const {phone} = this;相当于是const phone = this.phone
        const { phone } = this;
        phone && (await this.$store.dispatch("user/getCode", phone));
        this.code = this.$store.state.user.code;
      } catch (error) {}
    },
    //用户注册
    async userRegister() {
      //这里是vee-valadiate提供的一个方法，如果表单验证全部成功，返回布尔值真，
      //如有有一个字段验证失败，返回布尔值false
      const success = await this.$validator.validateAll();
      //console.log('表单验证',success);
      if (success) {
        try {
          //如果成功路由跳转
          const { phone, code, password, confirmPassword } = this;
          await this.$store.dispatch("user/userRegister", {
            phone,
            code,
            password,
          });
          this.$router.push("/login");
        } catch (error) {
          alert(error.message);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        text-align: left;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      .allContent{
        margin-top: 40px;
      }

      .content {
        padding-right: 50px;
        margin-bottom: 18px;
        position: relative;
        button {
          position: absolute;
        }

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }
  }
</style>