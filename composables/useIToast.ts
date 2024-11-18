export const useIToast = () => {
  const defaultNotifiers: Record<string, any> = {
    success: {
      icon: "i-fa6-solid-check",
      color: "success",
    },
    info: {
      icon: "i-fa6-solid-circle-info",
      color: "info",
    },
    warning: {
      icon: "i-fa6-solid-triangle-exclamation",
      color: "warning",
    },
    error: {
      icon: "i-fa6-solid-circle-xmark",
      color: "error",
    },
    delete: {
      icon: "i-fa6-solid-trash-can",
      color: "rose",
    },
  };

  const toast = useToast();

  const onNotifier = (
    id: string,
    title: string | number,
    description?: string
  ) =>
    toast.add({
      id,
      icon: defaultNotifiers[id].icon,
      color: defaultNotifiers[id].color,
      title: title.toString(),
      description,
      ui: {
        icon: { base: "shrink-0 w-10 h-10" },
        title: `text-base font-semibold text-${defaultNotifiers[id].color}-500 dark:text-white`,
      },
    });

  const onSuccess = (title: string | number, description?: string) =>
    onNotifier("success", title, description);
  const onInfo = (title: string | number, description?: string) =>
    onNotifier("info", title, description);
  const onWarning = (title: string | number, description?: string) =>
    onNotifier("warning", title, description);
  const onError = (title: string | number, description?: string) =>
    onNotifier("error", title, description);
  const onDelete = (title: string | number, description?: string) =>
    onNotifier("delete", title, description);
  const onCustom = (options: NotificationOptions) => toast.add(options);

  return { onSuccess, onInfo, onWarning, onError, onDelete, onCustom };
};
