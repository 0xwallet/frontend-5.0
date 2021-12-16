### BitDrive

### tips

原来的 build 命令是 vue-tsc --noEmit && vite build ,如下:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview"
  }
}
```

但是在这个文件中 \src\components\desktop\XTableFiles.vue ; vue-tsc 会将

```vue
<template
  v-for="slotName in slots"
  :key="slotName"
  #[slotName]="data"
></template>
```

里面的 #[slotName]="data" 报错导致无法通过,实际上这不是真实错误,只是 vue-tsc 的 bug.所以现在将 script 改成如下:

```json
{
  "scripts": {
    "dev": "vite",
    "checkAndBuild": "vue-tsc --noEmit && vite build",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```
