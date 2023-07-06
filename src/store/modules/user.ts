import { defineStore } from "pinia";
import { LoginData } from "@/api/auth/types";
import { store } from "@/store";

import { loginApi } from "@/api/auth";
import { useStorage } from "@vueuse/core";
import { UserInfo } from "@/api/user/types";
import { getUserInfo } from "@/api/user/index";

export const useUserStore = defineStore("user", () => {
  const token = useStorage("accessToken", "");
  const roles = ref<Array<string>>([]);
  const perms = ref<Array<string>>([]); // 用户权限编码集合 → 判断按钮权限
  const userId = ref();
  const nickname = ref("");
  const avatar = ref("");
  /**
   * 登录调用
   *
   * @param {LoginData}
   * @returns
   */

  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData)
        .then((res) => {
          const { tokenType, accessToken } = res.data;
          token.value = tokenType + " " + accessToken;
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function getInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      getUserInfo()
        .then(({ data }) => {
          if (!data) {
            return reject("Verification failed, please Login again.");
          }

          if (!data.roles || data.roles.length <= 0) {
            reject("getUserInfo: roles must be a non-null array!");
          }

          userId.value = data.userId;
          nickname.value = data.nickname;
          avatar.value = data.avatar;
          roles.value = data.roles;
          perms.value = data.perms;

          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function resetToken() {
    token.value = "";
    nickname.value = "";
    avatar.value = "";
    roles.value = [];
    perms.value = [];  
  }

  return {
    token,
    login,
    roles,
    getInfo,
    resetToken
  };
});

export function useUserStoreHook() {
  return useUserStore(store);
}
