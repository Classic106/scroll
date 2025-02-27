<script setup lang="ts">
import { IProduct } from "@/interfaces";
import { useStore } from "vuex";
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  defineProps,
  onBeforeMount,
  onUpdated,
  nextTick,
} from "vue";

import ItemComponent from "@/components/ItemComponent.vue";

const props = defineProps<{ text: string }>();

const store = useStore();
const getProducts = async () => await store.dispatch("getProducts");
const products = computed<IProduct[]>(() => store.state.products);

const containerHeight = 300;
const scrollTop = ref(0);
const itemHeight = ref(30);
const isItemHeight = ref(false);
const listRef = ref<HTMLElement | null>(null);
const firstItemRef = ref<HTMLElement[] | null>(null);

const visibleCount = computed<number>(
  () => Math.ceil(containerHeight / itemHeight.value) + 4
);
const totalHeight = computed<number>(
  () => products.value.length * itemHeight.value
);
const startIndex = computed<number>(() =>
  Math.max(0, Math.floor(scrollTop.value / itemHeight.value))
);
const endIndex = computed<number>(() =>
  Math.min(products.value.length, startIndex.value + visibleCount.value)
);

const productsFilter = (text: string): IProduct[] => {
  return products.value.filter((item) => {
    const { title, price, brand } = item;
    const newText = +text;

    const isPrice = isNaN(newText) && newText === price;
    const isTitle = title && title.includes(text);
    const isBrand = brand && brand.includes(text);

    if (isTitle || isBrand || isPrice) return true;
    return false;
  });
};

const visibleProducts = computed<IProduct[]>(() => {
  if (props.text) {
    return productsFilter(props.text).slice(startIndex.value, endIndex.value);
  }
  return products.value.slice(startIndex.value, endIndex.value);
});
const offsetY = computed<number>(() => startIndex.value * itemHeight.value);

const onScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  scrollTop.value = target.scrollTop;
};

const updateItemHeight = () => {
  if (firstItemRef.value) {
    itemHeight.value = firstItemRef.value[0].getBoundingClientRect().height;
    isItemHeight.value = true;
  }
};

onBeforeMount(async () => await getProducts());

onMounted(async () => {
  const container = listRef.value;
  if (container) {
    container.addEventListener("scroll", onScroll);
  }
  window.addEventListener("resize", updateItemHeight);
});

onUpdated(async () => {
  await nextTick();
  if (!isItemHeight.value) {
    updateItemHeight();
  }
});

onUnmounted(() => {
  const container = listRef.value;
  if (container) {
    container.removeEventListener("scroll", onScroll);
  }
  window.removeEventListener("resize", updateItemHeight);
});
</script>

<template>
  <div ref="listRef" id="virtual-list" class="list-container">
    <div :style="{ height: totalHeight + 'px', position: 'relative' }">
      <div
        v-for="(product, index) in visibleProducts"
        :key="startIndex + index"
        :style="{ transform: `translateY(${offsetY}px)` }"
        :ref="index === 0 ? 'firstItemRef' : ''"
      >
        <ItemComponent :product="product" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-container {
  overflow-y: auto;
  height: 300px;
  border: 1px solid black;
  position: relative;
  width: 300px;
}
</style>
