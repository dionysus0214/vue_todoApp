<template>
  <h2>To-Do Page</h2>
  <todo-form
    :editing="true"
  />
</template>

<script>
import TodoForm from '@/components/TodoForm.vue';

export default {
  components: {
    TodoForm
  }
}
</script>