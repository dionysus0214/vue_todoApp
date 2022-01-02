<template>
  <form @submit.prevent="onSubmit">
    <div class="d-flex">
      <div class="flex-grow-1">
        <input
          class="form-control"
          type="text" 
          v-model="todo"
          placeholder="Type new to-do"
        >
      </div>
      <div>
        <button 
          class="btn btn-primary"
          type="submit"
        >
          Add
        </button>
      </div>
    </div>
    <div v-show="hasError" style="color: red">
      This field cannot be empty!
    </div>
  </form>
</template>

<script>
import { ref, getCurrentInstance } from 'vue';

export default {
  emits: ['add-todo'],
  // 자식 component에서 부모 component로 데이터를 보낼 때 필요한 게 setup(props, context)에서 context 안에 들어있음
  setup() {
    const { emit } = getCurrentInstance;
    const todo = ref('');
    const hasError = ref(false);

    const onSubmit = () => {
      if (todo.value === '') {
        hasError.value = true;
      } else {
        // emit(이벤트 이름, 올려주고 싶은 데이터)
        emit('add-todo', {
          id: Date.now(),
          subject: todo.value,
          completed: false,
        });
        hasError.value = false;
        todo.value = '';
      }
    };

    return {
      todo,
      hasError,
      onSubmit,
    };
  }
}
</script>
