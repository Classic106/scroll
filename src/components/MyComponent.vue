<script setup lang="ts">
import { ref } from "vue";

import SearchComponent from "@/components/SearchComponent.vue";
import ListItems from "@/components/ListItems.vue";

const text = ref("");
</script>

<template>
  <div class="container">
    <SearchComponent v-model="text" />
    <ListItems :text="text" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
