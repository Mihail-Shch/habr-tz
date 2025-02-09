<script lang="ts" setup>
import { useNotification } from "@/composables/notification";
import { defineProps } from "vue";

defineProps({
  message: {
    type: String,
    required: true,
  },
});

const { notifications } = useNotification();

setTimeout(() => {
  notifications.value.shift();
}, 2000);
</script>

<template>
  <div class="notification">
    <span class="notification__message">{{ message }}</span>
  </div>
</template>

<style scoped>
.notification {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 200px;
  height: 50px;

  padding: 10px;
  margin-bottom: 10px;

  background-color: #bd0202;
  border-radius: 5px;
}

.notification__message {
  color: #fff;
}
</style>
