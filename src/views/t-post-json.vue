<template>
  <TSwitchTheme />
  <div class="post-json">
    <div class="post-title">帖子返回内容 JSON</div>
    <JsonViewer :value="jsonData" copyable boxed />
    <div class="post-title" v-show="!isEmpty">结构化内容解析</div>
    <JsonViewer v-if="!isEmpty" :value="parseData" copyable boxed />
  </div>
</template>
<script lang="ts" setup>
import TSwitchTheme from "@comp/app/t-switchTheme.vue";
import showLoading from "@comp/func/loading.js";
import showSnackbar from "@comp/func/snackbar.js";
import Mys from "@Mys/index.js";
import { onMounted, ref, shallowRef } from "vue";
import JsonViewer from "vue-json-viewer";
import { useRoute } from "vue-router";

import TGLogger from "@/utils/TGLogger.js";

const postId = Number(useRoute().params.post_id);
const isEmpty = ref<boolean>(false);
const jsonData = shallowRef<TGApp.Plugins.Mys.Post.FullData>();
const parseData = shallowRef<Array<TGApp.Plugins.Mys.SctPost.Base>>();

onMounted(async () => {
  await showLoading.start(`正在获取帖子数据`);
  if (!postId) {
    await showLoading.empty("未获取到PostID");
    return;
  }
  const resp = await Mys.Post.getPostFull(postId);
  if ("retcode" in resp) {
    await showLoading.empty("获取数据失败", `[${resp.retcode}]${resp.message}`);
    showSnackbar.error(`[${resp.retcode}]${resp.message}`);
    await TGLogger.Error(`[${postId}]获取帖子数据失败：${resp.retcode} ${resp.message}`);
    return;
  }
  await showLoading.update("正在渲染帖子数据");
  jsonData.value = resp;
  try {
    parseData.value = JSON.parse(jsonData.value.post.content);
  } catch (err) {
    try {
      parseData.value = JSON.parse(jsonData.value.post.structured_content);
    } catch (e) {
      isEmpty.value = true;
      await TGLogger.Error(`[${postId}]解析帖子数据失败：${e}`);
    }
    console.warn(`[${postId}]解析帖子数据失败：${err}`);
  }
  await showLoading.end();
});
</script>
<style lang="css" scoped>
.post-json {
  padding: 20px;
  border-radius: 20px;
  font-family: var(--font-text);
}

.post-title {
  width: 100%;
  margin: 10px 0;
  color: #546d8b;
  font-family: var(--font-title);
  font-size: 20px;
  font-weight: 600;
  text-align: right;
}

.jv-container {
  background: var(--box-bg-2) !important;
}

.jv-key,
.jv-array {
  color: var(--box-text-4) !important;
}
</style>
