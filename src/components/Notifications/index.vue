<script lang="ts" setup>
import { Notification } from "@/components";
import { useNotification } from "@/composables/notification";

const { notifications } = useNotification();
</script>

<template>
  <div class="notifications">
    <Notification
      v-for="(notification, index) in notifications"
      :key="notification + index"
      :message="notification"
    />
  </div>
</template>

<style scoped>
.notifications {
  position: absolute;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
}
</style>
