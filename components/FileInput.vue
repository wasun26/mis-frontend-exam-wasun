<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: any;
    oldFiles?: any;
    oldFileKey?: string;
    oldFileName?: string;
    oldFileUrl?: string;
    accept?: string;
    imageOnly?: boolean;
    multiple?: boolean;
    disabled?: boolean;
  }>(),
  {
    imageOnly: false,
    multiple: false,
    disabled: false,
    oldFileKey: "id",
    oldFileName: "name",
    oldFileUrl: "url",
  }
);
const dragOver = ref<boolean>(false);
const input = ref<HTMLInputElement | null>(null);

const emits = defineEmits<{
  (e: "update:modelValue", value: any): void;
  (e: "change", value: any): void;
  (e: "removeOldFile", value: number): void;
  (e: "clear"): void;
}>();

const selectFile = () => {
  const html = input.value as HTMLInputElement;
  html.value = "";
  input.value?.click();
};

const onFileChanged = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    keepData(props.multiple ? target.files : target.files[0]);
  }
};

const onDrop = (event: DragEvent) => {
  if (
    !props.disabled &&
    (props.multiple || (!props.multiple && !props.oldFiles))
  ) {
    dragOver.value = false;
    const dataTransfer = event.dataTransfer as DataTransfer;
    if (dataTransfer.files && dataTransfer.files.length > 0) {
      keepData(props.multiple ? dataTransfer.files : dataTransfer.files[0]);
    }
  }
};

const keepData = (file: any) => {
  if (props.multiple) {
    let payload: any[] = [];
    if (props.modelValue) {
      payload = [...props.modelValue];
    }
    payload = [...payload, ...file];
    emits("update:modelValue", payload);
    emits("change", file);
  } else {
    emits("update:modelValue", file);
    emits("change", file);
  }
};
const onRemoveFile = (index: number): void => {
  if (props.multiple) {
    const newModelValue = [...props.modelValue];
    newModelValue.splice(index, 1);
    emits("update:modelValue", newModelValue);
    emits("change", newModelValue);
    if (newModelValue.length === 0) {
      emits("clear");
    }
    return;
  } else {
    emits("update:modelValue", undefined);
    emits("change", undefined);
    emits("clear");
  }
};

const onRemoveOldFile = (key: number): void => {
  emits("removeOldFile", key);
};

const createObjectURL = (file: File) => {
  return URL.createObjectURL(file);
};
</script>

<template>
  <div
    :class="[
      'overflow-hidden rounded-md border bg-white border-gray-300 shadow-sm focus-within:ring-1',
      disabled
        ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
        : dragOver
        ? 'ring-1 border-primary ring-primary'
        : 'focus-within:border-primary focus-within:ring-primary text-gray-500',
    ]"
    @drop.prevent="onDrop"
    @dragover.prevent="dragOver = !disabled"
    @dragenter.prevent="dragOver = !disabled"
    @dragleave.prevent="dragOver = false"
  >
    <input
      ref="input"
      type="file"
      :multiple="multiple"
      :accept="imageOnly ? 'image/*' : accept"
      hidden
      @input="onFileChanged($event)"
    />
    <button
      v-if="(!modelValue && !multiple && !oldFiles) || multiple"
      type="button"
      :class="[
        'inline-flex items-center w-full px-5 py-3',
        disabled ? 'cursor-not-allowed' : '',
      ]"
      @click="selectFile"
      :disabled="disabled"
    >
      <div class="flex items-center">
        <UIcon
          name="i-fa6-solid-cloud-arrow-up"
          class="text-xl"
          :class="['text-xl', dragOver && !disabled ? 'fa-bounce' : '']"
        />
        <div
          :class="[
            `ml-3 text-left text-sm`,
            dragOver && !disabled ? 'font-medium' : '',
          ]"
        >
          <p>
            {{ imageOnly ? "ลากรูปภาพมาวางที่นี่" : "ลากไฟล์มาวางที่นี่" }}
            หรือ
            {{ imageOnly ? "คลิกเพื่อเรียกดูรูปภาพ" : "คลิกเพื่อเรียกดูไฟล์" }}
          </p>
        </div>
      </div>
    </button>
    <div v-if="modelValue || multiple" class="m-0 w-full">
      <hr
        v-if="
          multiple &&
          (modelValue.length > 0 || (oldFiles && oldFiles.length > 0))
        "
        class="bg-gray-300"
      />
      <div
        class="flex hover:bg-gray-100 px-3 py-2 w-full"
        v-for="(oldFile, index) in oldFiles"
        :key="index"
      >
        <div class="flex w-full grow text-gray-500">
          <FileIcon
            :name="oldFile[oldFileName] || oldFile[oldFileUrl]"
            :url="oldFile[oldFileUrl]"
          />
          <div
            class="ml-3 text-left max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
          >
            <p v-if="oldFile[oldFileName]" class="font-medium text-sm truncate">
              {{ oldFile[oldFileName] }}
            </p>
            <a
              :href="oldFile[oldFileUrl]"
              target="_blank"
              class="text-xs text-info"
            >
              เรียกดูไฟล์
            </a>
          </div>
        </div>
        <div
          v-if="!disabled"
          class="w-5 flex items-center justify-center shrink-0"
        >
          <UIcon
            name="i-fa6-regular-circle-xmark"
            class="text-gray-300 hover:text-gray-dark cursor-pointer"
            @click="onRemoveOldFile(oldFile[oldFileKey!])"
          />
        </div>
      </div>
      <div
        class="flex hover:bg-gray-100 px-3 py-2 w-full"
        v-for="(file, index) in multiple ? modelValue : [modelValue]"
        :key="index"
      >
        <div class="flex w-full grow">
          <FileIcon :name="file.name" :url="createObjectURL(file)" />
          <div
            class="ml-3 text-left max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
          >
            <p class="font-medium text-sm truncate">
              {{ file.name }}
            </p>
            <p class="text-xs">
              {{ formatBytes(file.size) }}
            </p>
          </div>
        </div>
        <div class="w-5 flex items-center justify-center shrink-0">
          <UIcon
            name="i-fa6-regular-circle-xmark"
            class="text-gray-300 hover:text-gray-dark cursor-pointer"
            @click="onRemoveFile(index)"
          />
        </div>
      </div>
    </div>
    <div v-else-if="!modelValue && !multiple && oldFiles" class="m-0 w-full">
      <div class="flex hover:bg-gray-100 px-3 py-2 w-full">
        <div class="flex w-full grow">
          <FileIcon
            :name="oldFiles[oldFileName] || oldFiles[oldFileUrl]"
            :url="oldFiles[oldFileUrl]"
          />
          <div
            class="ml-3 text-left max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
          >
            <p
              v-if="oldFiles[oldFileName]"
              class="font-medium text-sm truncate"
            >
              {{ oldFiles[oldFileName] }}
            </p>
            <a
              :href="oldFiles[oldFileUrl]"
              target="_blank"
              class="text-xs text-info"
            >
              เรียกดูไฟล์
            </a>
          </div>
        </div>
        <div
          v-if="!disabled"
          class="w-5 flex items-center justify-center shrink-0"
        >
          <UIcon
            name="i-fa6-regular-circle-xmark"
            class="text-gray-300 hover:text-gray-dark cursor-pointer"
            @click="onRemoveOldFile(oldFiles[oldFileKey!])"
          />
        </div>
      </div>
    </div>
  </div>
  <slot name="hint"> </slot>
</template>
