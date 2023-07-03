<template>
  <div class="login-container">
    <el-form ref="loginFormRef" :model="loginData" :rules="loginRules" class="login-form">
      <el-form-item prop="username">
        <el-input ref="username" v-model="loginData.username" class="flex-1" size="large" name="username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          ref="password"
          v-model="loginData.password"
          class="flex-1"
          size="large"
          name="password"
          type="password"
        />
      </el-form-item>
    </el-form>

    <el-button size="default" type="primary" class="w-full" @click.prevent="handleLogin">登录 </el-button>
  </div>
</template>

<script setup lang="ts">
import { LoginData } from "@/api/auth/types";
import router from "@/router";
import { useUserStore } from "@/store/modules/user";
import { LocationQuery, LocationQueryValue, useRoute } from "vue-router";

const userStore = useUserStore();
const route = useRoute();

const loginData = ref<LoginData>({
  username: "admin",
  password: "123456",
});

const loginRules = {
  username: [{ required: true, trigger: "blur" }],
  password: [{ required: true, trigger: "blur" }],
};

const loginFormRef = ref(ElForm);

function handleLogin() {
  loginFormRef.value.validate((valid: boolean, fields: string) => {
    if (valid) {
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
          console.log("验证失败");
        })
        .finally(() => {
          console.log("finally");
        });
    } else {
      console.log("error submit!", fields);
    }
  });
}
</script>
