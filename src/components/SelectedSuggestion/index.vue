<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  alias: {
    type: String,
    required: true,
  },
});
const emit = defineEmits<{
  (e: "deleteSuggestion", alias: string): void;
}>();
</script>

<template>
  <div class="autocomplete__suggestion-selected" :key="alias">
    <span class="autocomplete__suggestion-selected-alias">{{
      `@${alias}`
    }}</span>
    <img
      class="autocomplete__suggestion-selected-close"
      src="@/assets/close.svg"
      width="12"
      height="12"
      alt="close"
      @click="emit('deleteSuggestion', alias)"
    />
  </div>
</template>

<style scoped>
.autocomplete__suggestion-selected {
  display: flex;
  align-items: center;

  height: 40px;

  background-color: #0030ff99;
  color: #fff;

  border-radius: 5px;
  padding: 0 10px;
}

.autocomplete__suggestion-selected-alias {
  margin-right: 5px;
}

.autocomplete__suggestion-selected-close {
  cursor: pointer;
}
</style>
