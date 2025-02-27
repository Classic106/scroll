<script setup lang="ts">
import { IProduct } from "@/interfaces";
import { defineProps } from "vue";

defineProps<{ product: IProduct }>();
</script>

<template>
  <div class="item">
    <img :src="product.thumbnail" :alt="product.title" />
    <div class="details">
      <div class="title">{{ product.title }}</div>
      <div class="description">{{ product.description }}</div>
      <div class="row">
        <div class="discount">Discount {{ product.discountPercentage }}%</div>
        <div class="brand">{{ product.brand }}</div>
      </div>
      <div class="row">
        <div class="price">${{ product.price }}</div>
        <div class="rating">⭐ {{ product.rating }}</div>
        <div class="category">{{ product.category }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  align-items: center;
  margin-bottom: 0.2rem;
  border-bottom: 1px solid #ddd;
  padding: 0.3rem;
  font-size: 0.8rem;
  /* max-height: 100px; */
}
.item img {
  width: 4.6rem;
  height: 4.6rem;
  border-radius: 5px;
  margin-right: 10px;
}
.details {
  flex-grow: 1;
}
.title {
  font-weight: bold;
  margin-bottom: 0.3rem;
}
.description {
  font-size: 0.5rem;
  color: #555;
  margin-bottom: 0.3rem;
}
.discount {
  color: red;
  font-size: 0.5rem;
  margin-right: 0.5rem;
}
.brand {
  font-size: 0.5rem;
  color: #007bff;
}
.category {
  background: green;
  color: white;
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 0.5rem;
  margin-right: 0.5rem;
}
.price {
  color: green;
  font-weight: bold;
  font-size: 0.5rem;
  margin-right: 0.5rem;
}
.rating {
  color: gold;
  font-size: 0.5rem;
  margin-right: 0.5rem;
}
.row {
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
}
</style>
