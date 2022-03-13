<template>
  <div class="w-=full h-auto m-20">
    <el-form
      :model="registerForm"
      ref="RegisterRef"
      label-width="120px"
      label-position="top"
      :rules="RegisterRules"
      size="large"
    >
      <el-form-item label="用户名" prop="nickname">
        <el-input
          type="string"
          placeholder="请输入用户名"
          v-model="registerForm.nickname"
          :prefix-icon="User"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input
          placeholder="请输入手机号"
          v-model="registerForm.phoneNumber"
          :prefix-icon="Phone"
        ></el-input>
      </el-form-item>

      <el-row :gutter="60">
        <el-col :span="14">
          <el-form-item label="验证码" prop="code">
            <el-input
              placeholder="请输入验证码"
              v-model="registerForm.code"
              :prefix-icon="Bell"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="mt-0.5">
          <div class="mt-12">
            <el-button
              type="primary"
              @click="validButton(registerForm.phoneNumber)"
              :disabled="buttonState"
            >
              {{ buttonText }}
            </el-button>
          </div>
        </el-col>
      </el-row>
      <el-form-item label="邀请码" prop="inviteCode">
        <el-input
          placeholder="请输入邀请码"
          v-model="registerForm.inviteCode"
          :prefix-icon="Link"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="registerForm.password"
          :prefix-icon="Lock"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          placeholder="请再次输入密码"
          v-model="registerForm.checkPass"
          :prefix-icon="Lock"
          show-password
        ></el-input>
      </el-form-item>
      <div class="flex justify-center">
        <el-form-item>
          <el-button plain round @click="registerButton(RegisterRef)">注册</el-button>
        </el-form-item>
      </div>
    </el-form>

    <div class="text-xl font-thin">
      <span class="text-xl font-thin">已有帐号，</span>
      <el-link href="/login"><span class="text-xl font-thin">去登陆</span> </el-link>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, unref } from 'vue';
import { useRouter } from 'vue-router';
import { validateSend, registerInfo } from '@/utils/request';
import { validatePass, validateUserName, validatePhone } from '@/utils/validate';
import _ from 'lodash';
import { User, Phone, Bell, Link, Lock } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
  setup() {
    const registerForm = ref({
      code: '',
      inviteCode: '',
      nickname: '',
      password: '',
      phoneNumber: '',
      checkPass: '',
    });
    const router = useRouter();
    const RegisterRef = ref();
    const buttonText = ref('发送验证码');
    const buttonState = ref(false);
    const RegisterRules = reactive({
      code: [
        {
          required: true,
          message: '请输入验证码',
          trigger: 'blur',
        },
        {
          min: 4,
          max: 4,
          message: '请输入正确的验证码',
          trigger: 'blur',
        },
      ],
      inviteCode: [
        {
          required: true,
          message: '请输入邀请码',
          trigger: 'blur',
        },
      ],
      nickname: [
        {
          required: true,
          validator: _.throttle((rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入用户名'));
            } else if (!validateUserName(value)) {
              callback(
                new Error('用户名只允许出现中文/字母/数字/下划线,不允许下划线开头或结束以数字开头'),
              );
            } else {
              callback();
            }
          }, 1500),
          trigger: ['change', 'blur'],
        },
      ],
      phoneNumber: [
        {
          required: true,
          validator: _.throttle((rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入手机号'));
            } else if (!validatePhone(value)) {
              callback(new Error('请输入正确的手机号'));
            } else {
              callback();
            }
          }, 1500),
          trigger: 'blur',
        },
      ],
      password: [
        {
          required: true,
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else if (!validatePass(value)) {
              callback(new Error('包含数字、英文、特殊符号，必须包含数字和英文,长度6-18位'));
            } else {
              if (registerForm.checkPass !== '') {
                if (!RegisterRef.value) return;
                RegisterRef.value.validateField('checkPass', () => null);
              }
              callback();
            }
          },
          trigger: ['blur', 'change'],
        },
      ],

      checkPass: [
        {
          required: true,
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== registerForm.value.password) {
              callback(new Error('两次输入密码不一致'));
            } else {
              callback();
            }
          },
          trigger: 'blur',
        },
      ],
    });

    const goto = () => {
      router.push('/login');
    };
    const validButton = _.throttle((phoneNumber) => {
      const form = unref(RegisterRef);
      const timer = null;
      if (!form) return;
      form.validateField('phoneNumber', (valid) => {
        if (!valid) {
          validateSend(phoneNumber);
          let count = 60;
          buttonText.value = `${count}后重新发送`;
          if (!timer) {
            buttonState.value = true;
            this.timer = setInterval(() => {
              if (count > 0 && count <= 60) {
                count -= 1;
                buttonText.value = `${count}后重新发送`;
              } else {
                buttonState.value = false;
                buttonText.value = '发送验证码';
              }
            }, 1000);
            clearInterval(this.timer);
            this.timer = null;
          }
        }
      });
    }, 2000);
    const registerButton = _.throttle(() => {
      const form = unref(RegisterRef);
      if (!form) return;
      form.validate((valid) => {
        if (valid) {
          registerInfo(registerForm.value)
            .then((res) => {
              if (res.status === 200) {
                if (res.data.success) {
                  ElMessage({
                    type: 'success',
                    message: '注册成功',
                  });
                  goto();
                } else {
                  ElMessage({
                    type: 'error',
                    message: res.data.message,
                  });
                }
              } else {
                ElMessage({
                  type: 'error',
                  message: '请求异常请稍后重试',
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    }, 3000);
    return {
      registerForm,
      RegisterRef,
      RegisterRules,
      validButton,
      registerButton,
      buttonText,
      buttonState,
      User,
      Phone,
      Bell,
      Link,
      Lock,
    };
  },
});
</script>
