<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <MyComponent />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import MyComponent from "@/components/MyComponent.vue"; // @ is an alias to /src

@Options({
  components: {
    // HelloWorld,
    MyComponent,
  },
})
export default class HomeView extends Vue {}
</script>
