<script lang="ts" setup>
import { SuggestionDTO } from "@/types";
import { Suggestion, SelectedSuggestion } from "@/components";

import { debounce } from "@/utils";
import { ref, defineProps, computed, useTemplateRef, watch } from "vue";
import { useNotification } from "@/composables/notification";

const props = defineProps({
  label: {
    type: String,
    default: "Пользователь или компания",
  },
  placeholder: {
    type: String,
    default: "Введите логин",
  },
  maxItems: {
    type: Number,
    default: 1,
  },
});

const { notify } = useNotification();

const selectedSuggestions = ref<Array<string>>([]);
const suggestions = ref<Array<SuggestionDTO>>([]);
const isInputFocused = ref(false);
const searchQuery = ref("");

const input = useTemplateRef("input");

const handleInputWrapperClick = () => input.value && input.value.focus();

const fetchSuggestions = async () => {
  try {
    const request = await fetch(
      `${process.env.VUE_APP_API_URL}?q=${searchQuery.value}`
    );
    const response = await request.json();
    if (response.errorCode) {
      notify(response.message);
    } else {
      suggestions.value = response.data;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      notify(error.message);
    }
  }
};

const deleteSelectedSuggestion = (alias: string) => {
  const filteredSelectedSuggestions = selectedSuggestions.value.filter(
    (item) => item !== alias
  );
  selectedSuggestions.value = filteredSelectedSuggestions;
};

const selectSuggestion = (alias: string) => {
  searchQuery.value = "";
  if (selectedSuggestions.value.length + 1 <= props.maxItems) {
    selectedSuggestions.value.push(alias);
  }
};
const debouncedFetch = debounce(fetchSuggestions);

const showPlaceholder = computed(() => {
  return (
    !selectedSuggestions.value.length &&
    !isInputFocused.value &&
    !searchQuery.value
  );
});

const showSuggestions = computed(
  () => searchQuery.value.length > 2 && !!suggestions.value.length
);

watch(searchQuery, () => {
  if (searchQuery.value.length > 2) {
    suggestions.value = [];
    debouncedFetch();
  }
});
</script>

<template>
  <div class="autocomplete">
    <span class="autocomplete__label">
      <b class="autocomplete__label-star">*</b>{{ label }}</span
    >
    <div class="autocomplete__input-wrapper" @click="handleInputWrapperClick">
      <SelectedSuggestion
        v-for="item in selectedSuggestions"
        class="autocomplete__suggestion-selected"
        :key="item"
        :alias="item"
        @delete-suggestion="deleteSelectedSuggestion"
      />
      <span v-show="showPlaceholder" class="autocomplete__placeholder">{{
        placeholder
      }}</span>
      <input
        v-model="searchQuery"
        ref="input"
        class="autocomplete__input"
        type="text"
        :disabled="selectedSuggestions.length === maxItems"
        @focus="isInputFocused = true"
        @blur="isInputFocused = false"
      />
    </div>
    <div v-show="showSuggestions" class="autocomplete__suggestions">
      <Suggestion
        v-for="item in suggestions"
        :key="item.alias"
        :item="item"
        @select-suggestion="selectSuggestion"
      />
    </div>
  </div>
</template>

<style scoped>
.autocomplete {
  position: relative;
}

.autocomplete__label {
  color: rgb(73, 64, 64);
  font-weight: bold;
}

.autocomplete__label-star {
  color: red;

  margin-right: 3px;
}

.autocomplete__input-wrapper {
  display: flex;
  align-items: center;

  height: 50px;

  border: 1px solid #d0d0d0;
  border-radius: 5px;

  padding-left: 10px;
  margin-top: 10px;
}

.autocomplete__suggestion-selected {
  margin-right: 5px;
}

.autocomplete__placeholder {
  color: #b0b0b0;
}

.autocomplete__input {
  align-self: center;

  height: 40px;

  outline: 0;
  border: 0;
  background: transparent;
}

.autocomplete__suggestions {
  position: absolute;
  width: 100%;

  height: 280px;

  overflow-y: scroll;
  box-shadow: 4px 4px 15px 0px rgba(34, 60, 80, 0.3);
}
</style>
