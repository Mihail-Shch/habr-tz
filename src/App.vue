<script lang="ts" setup>
import { Autocomplete, Notifications } from "./components";
</script>

<template>
  <Autocomplete class="autocomplete" />
  <Notifications />
</template>

<style>
*,
*:after,
*:before {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Goudy Bookletter 1911", sans-serif;
}

#app {
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;

  height: 100vh;
}

.autocomplete {
  width: 50%;
}
</style>
