<template>
  <div
    class="w-4/12 h-auto order-1 login-container"
    style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04)"
  >
    <div class="w-full h-full flex flex-col items-center">
      <span class="font-sans text-4xl leading-13 font-thin">欢迎!</span>
      <span class="text-2xl mt-4 font-thin"
        >没有账号？
        <el-link class="sign-text" href="/register"
          ><span class="text-xl font-thin">立即注册</span>
        </el-link>
      </span>

      <!-- input field -->
      <el-form ref="loginRef" :rules="rules" :model="loginProps" status-icon class="demo-ruleForm">
        <div class="input-field mt-6">
          <div class="userName-field">
            <div class="useName-field-text text-2xl leading-9 font-semibold my-3">账号</div>
            <el-form-item prop="username">
              <el-input
                v-model="loginProps.username"
                size="medium"
                placeholder="输入您的账号"
                :prefix-icon="User"
              >
              </el-input>
            </el-form-item>
          </div>

          <div class="password-field-text text-2xl font-semibold leading-9 my-3">密码</div>
          <div class="">
            <el-form-item prop="password">
              <el-input
                v-model="loginProps.password"
                placeholder="输入您的密码"
                show-password
                type="password"
                :prefix-icon="Warning"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="my-4 flex justify-center">
          <el-button class="w-5/12" @click.enter="submitForm('loginRef')" plain round>
            登录
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, unref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { User, Warning } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import router from '../../../../router';

export default defineComponent({
  setup() {
    const store = useStore();
    const loginProps = ref({
      username: '',
      password: '',
    });
    const hasLogin = (token, userInfo) => {
      if (token && userInfo.icon) {
        ElMessage.info('已经登录，正在跳转');
        router.push('/');
      }
    };
    const loginRef = ref();
    const rules = reactive({
      username: [
        {
          required: true,
          message: '手机号不能为空',
          trigger: 'blur',
        },
        {
          min: 3,
          max: 15,
          message: '手机号应在6-15位之间',
          trigger: 'blur',
        },
      ],
      password: [
        {
          required: true,
          message: '密码不能为空',
          trigger: 'blur',
        },
        {
          min: 3,
          max: 15,
          message: '密码应在6-15位之间',
          trigger: 'blur',
        },
        {
          min: 3,
          max: 15,
          message: '密码应在6-15位之间',
          trigger: 'blur',
        },
      ],
    });
    onMounted(() => {
      const Token = window.sessionStorage.getItem('token');
      const userInfo = store.state.user;
      hasLogin(Token, userInfo);
    });
    const submitForm = () => {
      const form = unref(loginRef);
      form.validate((valid) => {
        if (valid) {
          store.dispatch('user/login', loginProps.value);
        } else {
          ElMessage({
            type: 'error',
            message: '请确认信息是否有误',
            duration: 5 * 1000,
          });
        }
      });
    };
    return {
      loginProps,
      loginRef,
      submitForm,
      rules,
      Warning,
      User,
    };
  },
});
</script>

<style lang="scss">
.login-container {
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
.login-container::before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  filter: blur(20px);
  z-index: -1;
  margin: -30px;
}
</style>
