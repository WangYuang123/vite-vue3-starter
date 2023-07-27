import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import defaultSetting from "@/settings";

export const useAppStore = defineStore("app", () => {
  const device = useStorage("device", "desktop");
  const size = useStorage<any>("size", defaultSetting.size);

  const slideStatus = useStorage("slideStatus", "closed");
  const sidebar = reactive({
    opened: slideStatus.value !== "closed",
    withoutAnimation: false,
  });

  function toggleSidebar(withoutAnimation: boolean) {
    sidebar.opened = !sidebar.opened;
    sidebar.withoutAnimation = withoutAnimation;

    if (sidebar.opened) {
      slideStatus.value = "opened";
    } else {
      slideStatus.value = "closed";
    }
  }

  function closeSidebar(withoutAnimation: boolean) {
    sidebar.opened = false;
    sidebar.withoutAnimation = withoutAnimation;
    slideStatus.value = "closed";
  }

  function openSidebar(withoutAnimation: boolean) {
    sidebar.opened = true;
    sidebar.withoutAnimation = withoutAnimation;
    slideStatus.value = "opened";
  }

  function toggleDevice(val: string) {
    device.value = val;
  }

  function changeSize(val: string) {
    size.value = val;
  }

  return {
    device,
    size,
    slideStatus,
    sidebar,
    toggleSidebar,
    closeSidebar,
    openSidebar,
    toggleDevice,
    changeSize,
  };
});
