// 这个文件主要是用来备份按需引入的ui组件的, 后面需要优化体积的时候可以用到
// // ui framework -start
// import {
//   Button,
//   Form,
//   Field,
//   CellGroup,
//   Cell,
//   Icon,
//   Tag,
//   Checkbox,
//   CheckboxGroup,
//   Popup,
//   Cascader,
//   Empty,
//   ActionSheet,
//   DropdownMenu,
//   DropdownItem,
//   Progress,
//   Loading,
// } from "vant";
// import {
//   ConfigProvider,
//   Menu,
//   Dropdown,
//   Form as AForm,
//   Select,
//   Checkbox as ACheckbox,
//   Button as AButton,
//   Input,
//   InputNumber,
//   Row,
//   Col,
//   Tooltip,
//   Divider,
//   Breadcrumb,
//   Avatar,
//   Tabs,
//   Table,
//   Upload,
//   Drawer,
//   Progress as AProgress,
//   Tag as ATag,
//   Modal,
//   Tree,
//   Radio,
//   Spin,
//   Result,
//   Popover,
//   Alert,
//   Layout,
// } from "ant-design-vue";
// import "tailwindcss/tailwind.css";

// // ui framework -end

// import AppMobile from "./views/mobile/App_mobile.vue";
// import AppDesktop from "./views/desktop/App_desktop.vue";
// // const mobileApp = createApp(App);
// (window as any).__isMobile__ = isMobile();
// if ((window as any).__isMobile__) {
//   console.log("isMobile");
//   const vueAppMobile = createApp(AppMobile);
//   vueAppMobile
//     .use(i18n)
//     .use(Button)
//     .use(Form)
//     .use(Field)
//     .use(CellGroup)
//     .use(Cell)
//     .use(Icon)
//     .use(Tag)
//     .use(Checkbox)
//     .use(CheckboxGroup)
//     .use(Popup)
//     .use(Cascader)
//     .use(Empty)
//     .use(ActionSheet)
//     .use(DropdownMenu)
//     .use(DropdownItem)
//     .use(Progress)
//     .use(Loading)
//     .use(createPinia())
//     .use(routerMobile)
//     .mount("#app");
// } else {
//   console.log("isPC");
//   const vueAppDesktop = createApp(AppDesktop);
//   // 注册全局属性
//   // 专门给模板中调试事件用的 @click="$log"
//   vueAppDesktop.config.globalProperties.$log = console.log;
//   // 专门给模板用的提取最后一个元素
//   vueAppDesktop.config.globalProperties.$lastOfArray = lastOfArray;
//   vueAppDesktop
//     .use(i18n)
//     .use(ConfigProvider)
//     .use(Menu)
//     .use(Dropdown)
//     .use(AForm)
//     .use(Select)
//     .use(ACheckbox)
//     .use(AButton)
//     .use(Input)
//     .use(InputNumber)
//     .use(Row)
//     .use(Col)
//     .use(Tooltip)
//     .use(Divider)
//     .use(Breadcrumb)
//     .use(Avatar)
//     .use(Tabs)
//     .use(Table)
//     .use(Upload)
//     .use(Drawer)
//     .use(AProgress)
//     .use(ATag)
//     .use(Modal)
//     .use(Tree)
//     .use(Radio)
//     .use(Spin)
//     .use(Result)
//     .use(Popover)
//     .use(Alert)
//     .use(Layout)
//     .use(createPinia())
//     .use(routerDesktop)
//     .mount("#app");
// }
