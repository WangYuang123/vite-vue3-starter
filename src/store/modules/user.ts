import { defineStore } from "pinia";
import { LoginData } from "@/api/auth/types";

import { loginApi } from "@/api/auth";
import { useStorage } from "@vueuse/core";


export const useUserStore = defineStore("user", () => {
  const token = useStorage("accessToken", "");
  /**
   * 登录调用
   *
   * @param {LoginData}
   * @returns
   */
  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData)
        .then((response) => {
          const { tokenType, accessToken } = response.data;
          token.value = tokenType + " " + accessToken; // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  return {
    login
  }
});
