<template>
  <div class="login-container">
    <el-form ref="loginFormRef" :model="loginData" :rules="loginRules" class="login-form">
      <div class="flex text-white items-center py-4">
        <span class="text-2xl flex-1 text-center">vue3-element-admin</span>
        <lang-select class="text-white! cursor-pointer" />
      </div>

      <el-form-item prop="username">
        <div class="p-2 text-white">
          <svg-icon icon-class="user" />
        </div>
        <el-input
          ref="username"
          v-model="loginData.username"
          class="flex-1"
          size="large"
          placeholder="用户名"
          name="username"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="p-2 text-white">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          v-model="loginData.password"
          class="flex-1"
          placeholder="密码"
          :type="passwordVisible === false ? 'password' : 'input'"
          size="large"
          name="password"
          @keyup.enter="handleLogin"
        />
        <span class="mr-2" @click="passwordVisible = !passwordVisible">
          <svg-icon :icon-class="passwordVisible === false ? 'eye' : 'eye-open'" class="text-white cursor-pointer" />
        </span>
      </el-form-item>

      <el-form-item prop="verifyCode">
        <span class="p-2 text-white">
          <svg-icon icon-class="verify_code" />
        </span>
        <el-input
          v-model="loginData.verifyCode"
          auto-complete="off"
          placeholder="验证码"
          style="width: 60%"
          @keyup.enter="handleLogin"
        />

        <div class="captcha">
          <img :src="captchaBase64" @click="getCaptcha" />
        </div>
      </el-form-item>

      <el-button size="default" :loading="loading" type="primary" class="w-full" @click.prevent="handleLogin"
        >登录
      </el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { LoginData } from "@/api/auth/types";
import router from "@/router";
import { useUserStore } from "@/store/modules/user";
import { LocationQuery, LocationQueryValue, useRoute } from "vue-router";
import { getCaptchaApi } from "@/api/auth";

const userStore = useUserStore();
const route = useRoute();

const passwordVisible = ref(false);
const loading = ref(false);

const loginData = ref<LoginData>({
  username: "admin",
  password: "123456",
  verifyCode: "",
});

const loginRules = {
  username: [{ required: true, trigger: "blur" }],
  password: [{ required: true, trigger: "blur" }],
  verifyCode: [{ required: true, trigger: "blur" }],
};

const loginFormRef = ref(ElForm);

const captchaBase64 = ref();

function getCaptcha() {
  getCaptchaApi().then(({ data }) => {
    const { verifyCodeBase64, verifyCodeKey } = data;
    loginData.value.verifyCodeKey = verifyCodeKey;
    captchaBase64.value = verifyCodeBase64;
  });
}

function handleLogin() {
  loginFormRef.value.validate((valid: boolean, fields: string) => {
    if (valid) {
      loading.value = true
      userStore
        .login(loginData.value)
        .then(() => {
          const query: LocationQuery = route.query;
          const redirect = (query.redirect as LocationQueryValue) ?? "/";

          const otherQueryParams = Object.keys(query).reduce((acc: any, cur: string) => {
            if (cur !== "redirect") {
              acc[cur] = query[cur];
            }
            return acc;
          }, {});

          router.push({ path: redirect, query: otherQueryParams });
        })
        .catch(() => {
          getCaptcha()
        })
        .finally(() => {
          loading.value = false
        });
    } else {
      console.log("error submit!", fields);
    }
  });
}

onMounted(() => {
  getCaptcha();
});
</script>
<style lang="scss" scoped>
.login-container {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #2d3a4b;

  .login-form {
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .captcha {
      position: absolute;
      top: 0;
      right: 0;

      img {
        width: 120px;
        height: 48px;
        cursor: pointer;
      }
    }
  }
}

.el-form-item {
  background: rgb(0 0 0 / 10%);
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 5px;
}

.el-input {
  background: transparent;

  // 子组件 scoped 无效，使用 :deep
  :deep(.el-input__wrapper) {
    padding: 0;
    background: transparent;
    box-shadow: none;

    .el-input__inner {
      color: #fff;
      background: transparent;
      border: 0;
      border-radius: 0;
      caret-color: #fff;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px transparent inset !important;
        -webkit-text-fill-color: #fff !important;
      }

      // 设置输入框自动填充的延迟属性
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        transition: color 99999s ease-out, background-color 99999s ease-out;
        transition-delay: 99999s;
      }
    }
  }
}
</style>
