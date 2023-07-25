interface DefaultSetting {
  title: string;
  showSettings: boolean; // 是否显示设置
  tagsView: boolean; //是否显示多标签导航
  fixedHeader: boolean; // 是否固定头部
  sidebarLogo: boolean; //是否显示侧边栏Logo
  layout: string; // 导航栏布局
  theme: string; // 主题模式
  size: string; // 布局大小
}

const defaultSetting: DefaultSetting = {
  title: "vue3-element-admin",
  showSettings: true,
  tagsView: true,
  fixedHeader: false,
  sidebarLogo: true,
  layout: "left",
  theme: 'dark',
  size: 'default',
};

export default defaultSetting
