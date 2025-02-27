<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps(["modelValue"]);
const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const updateText = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="search">
    <input :value="modelValue" @input="updateText" />
  </div>
</template>

<style scoped>
.search {
  margin-bottom: 0.5rem;
}
</style>
