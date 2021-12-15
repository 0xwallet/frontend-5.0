export const PRODUCT_NAME = "BitDrive";
export const DEFAULT_LANG = "zh_CN";
export const QR_CODE_URL = "https://vvbin.cn/next/login";
// export const MAX_UPLOAD_SIZE = 1024 * 1024 * 20; // 20 mb
// 2021-07-12 测试大文件上传,这里先写1G
export const MAX_UPLOAD_SIZE = 1024 * 1024 * 1024; // 1 Gb
export const FILE_TYPE_MAP = {
  image: ["jpg", "jpeg", "gif", "png", "webp"],
  text: ["js", "md", "txt", "log"],
  archive: ["jar", "rar", "zip", "7z", "apk"],
  audio: ["mp3", "m4a", "flac"],
  video: ["mp4", "3gp", "avi", "wmv"],
};
/** 最大传输单元20kb */
export const MAX_MTU = 1024 * 20;
/** nkn multiclient 数量 */
export const NKN_SUB_CLIENT_COUNT = 12;
/** 表示 [header长度] 的uint8Array 的长度 */
export const LEN_OF_HEADER_U8_LENGTH = 4;
/** 最多打开的窗口数量 */
export const MAX_FILEITEM_COUNT = 100;
/** 上传错误对象 */
export const UPLOAD_MSG = {
  success_sessionWrite: "session成功写入",
  err_noNknClient: "multiClient未初始化",
  err_noClientSession: "no clientSession",
  err_noParams: "noParams",
  err_sessionClosed: "session_closed",
  err_pauseByUser: "用户手动暂停",
};
/** 正则 */
export const REG_OBJ = {
  email:
    // eslint-disable-next-line
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

const colorList = [
  "#479FF8",
  "#54AE32",
  "#F09A37",
  "#f50",
  "#2db7f5",
  "#87d068",
  "#108ee9",
  "#55acee",
];
/** 标签固定颜色序列 */
export const TAG_COLOR_LIST = new Proxy(colorList, {
  get(target, key: string) {
    // 超过colorList的长度就循环从index0 开始
    const arrayIdx = +key % colorList.length;
    return Reflect.get(target, arrayIdx);
  },
});
