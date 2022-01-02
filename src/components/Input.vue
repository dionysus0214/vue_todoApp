<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input
      :value="subject"
      @input="onInput"
      type="text"
      class="form-control"
    >
    <div 
      v-if="error"
      class="text-red"
    >
      {{ error }}
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue';

export default {
  props: {
    label: {
      type: String,
      required: true
    },
    error: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    }
  },
  setup() {
    // setup(props, { emit })에서 props를 사용하지 않을 경우 { emit }만 함수 내에서 불러와 사용할 수 있음 -> getCurrnetInstance
    const { emit } = getCurrentInstance;
    const onInput = (e) => {
      emit('update:subject', e.target.value);
    };

    return {
      onInput
    };
  }
}
</script>

<style scoped>
.text-red {
  color: red;
}
</style>