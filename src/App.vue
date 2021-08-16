<template>
  <div class="container">
    <h2>To-Do List</h2>
    <input
      class="form-control"
      type="text" 
      v-model="searchText"
      placeholder="Search"
    >
    <hr/>
    <todo-simple-form
      @add-todo="addTodo"
    />
    <div style="color: red">
      {{ error }}
    </div>
    <div v-if="!filteredTodos.length">
      There is nothing to display.
    </div>
    <todo-list
      :todos="filteredTodos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios';

export default {
  components: {
    TodoSimpleForm,
    TodoList
  },
  setup() {
    const todos = ref([]);
    const error = ref('');

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    };

    const addTodo = (todo => {
      error.value = '';
      axios.post('http://localhost:3000/todos', {
        subject: todo.subject,
        completed: todo.completed,
      }).then(res => {
        console.log(res);
        todos.value.push(res.data);
      }).catch(err => {
        console.log(err);
        error.value = 'Something went wrong.'
      });
    });

    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed;
    };

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    const searchText = ref('');

    const filteredTodos = computed(() => {
      if(searchText.value) {
        return todos.value.filter(todo => {
          return todo.subject.includes(searchText.value);
        });
      }

      return todos.value;
    });

    return {
      todos,
      todoStyle,
      addTodo,
      toggleTodo,
      deleteTodo,
      searchText,
      filteredTodos,
      error
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