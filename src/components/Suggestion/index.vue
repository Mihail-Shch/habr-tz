<script lang="ts" setup>
import { SuggestionDTO, SuggestionType } from "@/types";
import { defineEmits, defineProps, PropType } from "vue";
defineProps({
  item: {
    type: Object as PropType<SuggestionDTO>,
    required: true,
  },
});
const emit = defineEmits<{
  (e: "selectSuggestion", alias: string): void;
}>();
</script>

<template>
  <div
    class="autocomplete__suggestion"
    @click="emit('selectSuggestion', item.alias)"
  >
    <img
      class="autocomplete__suggestion-logo"
      :src="item.avatar || require('@/assets/zaglushka.jpg')"
      width="48"
      height="48"
      alt="sugesstion logo"
    />
    <div class="autocomplete__suggestion-description">
      <p class="autocomplete__suggestion-name">{{ item.name }}</p>
      <p class="autocomplete__suggestion-alias">
        {{
          item.type === SuggestionType.COMPANY ? "Компания" : `@${item.alias}`
        }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.autocomplete__suggestion {
  display: flex;
  align-items: center;
  height: 70px;

  padding: 10px;

  transition: background-color 0.1s linear;
  cursor: pointer;
}

.autocomplete__suggestion:hover {
  background-color: #ebeaea;
}

.autocomplete__suggestion-logo {
  margin-right: 10px;
}

.autocomplete__suggestion-name {
  color: black;
  font-weight: 600;

  margin-bottom: 3px;
}

.autocomplete__suggestion-alias {
  color: #818181;
}
</style>
