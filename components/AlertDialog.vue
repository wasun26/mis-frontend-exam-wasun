<script setup lang="ts">
type DialogTypes = "notice" | "confirm" | "delete";

const props = withDefaults(
  defineProps<{
    type: DialogTypes;
    closeBtnColor?: string;
    closeBtnText?: string;
    closeBtnIcon?: string;
    closeBtnVariant?: string;
    confirmBtnColor?: string;
    confirmBtnText?: string;
    confirmBtnIcon?: string;
    isCloseBtn?: boolean;
    disableConfirm?: boolean;
    icon?: string;
    iconClass?: string;
    iconBackgroundColor?: string;
    ui?: object;
    detailText?: string;
    headerText?: string;
  }>(),
  {
    closeBtnColor: "",
    confirmBtnColor: "",
    confirmBtnIcon: "",
    isCloseBtn: true,
    disableConfirm: false,
    detailText: "",
  }
);

const titleText = ref<string>("");
const headerText = ref<string>("ยืนยันการลบ");

if (props.headerText) {
  headerText.value = props.headerText;
}

const isNotice = computed<boolean>(() => {
  return props.type === "notice";
});

const isDelete = computed<boolean>(() => {
  return props.type === "delete";
});

const renderCloseBtnText = computed<string>(() => {
  return props.closeBtnText
    ? props.closeBtnText
    : isNotice.value
    ? "ยืนยัน"
    : "ยกเลิก";
});
const renderConfirmBtnText = computed<string>(() => {
  return props.confirmBtnText
    ? props.confirmBtnText
    : isDelete.value
    ? "ลบ"
    : "ยืนยัน";
});

const renderSize = computed<string>(() => {
  return isNotice.value
    ? "w-full sm:max-w-md"
    : isDelete.value
    ? "w-full sm:max-w-sm"
    : "w-full sm:max-w-lg";
});

const isOpen = ref<boolean>(false);
const payload = ref<any | undefined>();

defineShortcuts({
  escape: {
    usingInput: true,
    handler: () => {
      isOpen.value = false;
    },
  },
});

const emit = defineEmits<{
  (e: "confirm", payload: any): void;
  (e: "close", payload: any): void;
}>();

const onConfirm = (): void => {
  emit("confirm", payload.value);
  isOpen.value = false;
};
const onClose = (): void => {
  emit("close", payload.value);
  isOpen.value = false;
};

const show = (
  title?: string,
  data?: any,
  header?: string,
  detail?: string
): void => {
  payload.value = data;
  if (title) titleText.value = title;
  if (header) headerText.value = header;
  isOpen.value = true;
};

const close = (): void => {
  isOpen.value = false;
};

defineExpose({
  show,
  close,
});
</script>

<template>
  <UModal v-model="isOpen" prevent-close :ui="ui ? ui : { width: renderSize }">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <div class="flex flex-col gap-y-5">
        <slot :payload="payload" :title="headerText" :detail="detailText">
          <div v-if="isDelete" class="flex items-center justify-center gap-x-3">
            <div class="space-y-4 text-center">
              <span
                v-if="icon"
                :class="[
                  'inline-flex items-center justify-center rounded-full h-20 w-20',
                  `bg-error-100`,
                ]"
              >
                <UIcon
                  name="i-fa6-solid-trash-can"
                  class="text-4xl text-red-600"
                />
              </span>
              <p class="text-2xl font-bold whitespace-pre-wrap text-red-600">
                {{ headerText }}
              </p>
              <p v-if="detailText" class="text-sm text-red-600">
                {{ detailText }}
              </p>
              <p v-if="titleText" class="text-sm text-red-600">
                {{ titleText }}
              </p>
            </div>
          </div>
          <div v-else>
            <div class="space-y-4 text-center">
              <span
                v-if="icon"
                :class="[
                  'inline-flex items-center justify-center rounded-full h-20 w-20',
                  `bg-${iconBackgroundColor}`,
                ]"
              >
                <UIcon :name="icon" :class="iconClass" />
              </span>
              <p class="text-2xl font-bold whitespace-pre-wrap">
                {{ titleText }}
              </p>
              <slot name="detail"> </slot>
            </div>
          </div>
        </slot>
        <div class="flex justify-center items-center gap-5">
          <UButton
            v-if="isCloseBtn"
            size="xl"
            :icon="closeBtnIcon"
            :color="closeBtnColor || (isNotice ? 'info' : 'gray')"
            :variant="closeBtnVariant || 'outline'"
            class="justify-center text-center"
            :class="isNotice ? 'w-60' : 'min-w-20'"
            :label="renderCloseBtnText"
            @click="onClose"
          />

          <UButton
            v-if="!isNotice"
            size="xl"
            :icon="confirmBtnIcon"
            :disabled="disableConfirm"
            :color="confirmBtnColor || (isDelete ? 'red' : 'primary-highlight')"
            class="min-w-20 justify-center text-center"
            :label="renderConfirmBtnText"
            @click="onConfirm"
          />
        </div>
      </div>
    </UCard>
  </UModal>
</template>
