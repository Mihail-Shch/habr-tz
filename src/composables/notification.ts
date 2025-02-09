import { ref } from "vue";

const notifications = ref<Array<string>>([]);

export const useNotification = () => {
  const notify = (message: string) => {
    notifications.value.push(message);
  };

  return {
    notify,
    notifications,
  };
};
