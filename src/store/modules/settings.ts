import { defineStore } from "pinia";
import defaultSetting from "@/settings";
import { useStorage } from "@vueuse/core";

export const useSettingStore = defineStore("setting", () => {
  const tagsView = useStorage<boolean>("tagsView", defaultSetting.tagsView);

  const showSettings = ref<boolean>(defaultSetting.showSettings);
  const fixedHeader = ref<boolean>(defaultSetting.fixedHeader);
  const sidebarLogo = ref<boolean>(defaultSetting.sidebarLogo);

  const layout = useStorage<string>("layout", defaultSetting.layout);

  function changeSetting(param: { key: string; value: any }) {
    const { key, value } = param;
    switch (key) {
      case "showSettings":
        showSettings.value = value;
        break;
      case "fixedHeader":
        fixedHeader.value = value;
        break;
      case "sidebarLogo":
        sidebarLogo.value = value;
        break;
      case "tagsView":
        tagsView.value = value;
        break;
      case "layout":
        layout.value = value;
        break;
      default:
        break;
    }
  }

  return {
    showSettings,
    fixedHeader,
    sidebarLogo,
    layout,
    changeSetting,
    tagsView
  };
});
