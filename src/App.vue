<template>
  <div class="container">
    <h2>To-Do List</h2>
    <todo-simple-form
      @add-todo="addTodo"
    />
    <div v-if="!todos.length">
      추가된 To-Do가 없습니다.
    </div>
    <todo-list
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';

export default {
  components: {
    TodoSimpleForm,
    TodoList
  },
  setup() {
    const todos = ref([]);

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    };

    const addTodo = (todo => {
      todos.value.push(todo);
    });

    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed;
    };

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    return {
      todos,
      todoStyle,
      addTodo,
      toggleTodo,
      deleteTodo,
    };
  }
}
</script>

<style>
  .todo {
    color: gray;
    text-decoration: line-through;
  }
  .flex-grow-1 {
    margin-right: 8px;
  }
</style>