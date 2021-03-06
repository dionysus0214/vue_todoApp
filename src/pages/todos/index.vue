<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h2>To-Do List</h2>
      <buttton
        class="btn btn-primary"
        @click="moveToCreatePage"
      >
        Create Todo
      </buttton>
    </div>

    <input
      class="form-control"
      type="text" 
      v-model="searchText"
      placeholder="Search"
      @keyup.enter="searchTodo"
    >
    <hr/>
    <div v-if="!todos.length">
      There is nothing to display.
    </div>
    <todo-list
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <hr />
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="currentPage !== 1" class="page-item">
          <a class="page-link" @click="getTodos(currentPage - 1)">
            Previous
          </a>
        </li>
        <li
          v-for="page in numberOfPages"
          :key="page"
          class="page-item"
          :class="currentPage === page ? 'active' : ''"
        >
          <a class="page-link" @click="getTodos(page)">{{ page }}</a>
        </li>
        <li v-if="numberOfPages !== currentPage" class="page-item">
          <a class="page-link" @click="getTodos(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import axios from '@/axios';
import TodoList from '@/components/TodoList.vue';
import { useToast } from '@/composables/toast';
import { useRouter } from 'vue-router';

export default {
  components: {
    TodoList
  },
  setup() {
    const router = useRouter();
    const todos = ref([]);
    const error = ref('');
    const searchText = ref('');
    const numberOfTodos = ref(0);
    let limit = 5;
    const currentPage = ref(1);
    
    // 다른 state에 의존하는 state를 만들고 싶을 때 computed 사용
    // computed는 내부에 있는 reactive state가 있고 변경될 때만 그 값을 변수에 저장(값을 인자로 받아오지 못함)
    // computed는 값을 캐시함 
    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value/limit);
    });

    const {
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast
    } = useToast();

    // 동기: 서버에 요청을 보냈을 때 응답이 돌아와야 다음 동작 수행
    // 비동기: 응답 상태와 상관 없이 다음 동작 수행 가능
    // async, await로 비동기 처리 가능
    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(
          `todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
        );
        numberOfTodos.value = res.headers['x-total-count'];
        todos.value = res.data;
      } catch (err) {
        console.log(err);
        triggerToast('Something went wrong.', 'danger');
      }
    };

    getTodos();

    // json server 설치 후 데이터베이스에 저장
    // 명령어: json-server --watch db.json
    const addTodo = async (todo) => {
      error.value = '';
      try {
        await axios.post('todos', {
          subject: todo.subject,
          completed: todo.completed,
        });
        getTodos(1);
      } catch (err) {
        console.log(err);
        triggerToast('Something went wrong.', 'danger');
      }
    };

    const toggleTodo = async (index, checked) => {
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.patch('todos/' + id, {
          completed: checked
        });
        todos.value[index].completed = checked;
      } catch (err) {
        console.log(err);
        triggerToast('Something went wrong.', 'danger');
      }
    };

    const deleteTodo = async (id) => {
      error.value = '';
      try {
        await axios.delete('todos/' + id);
        getTodos(1);
      } catch (err) {
        console.log(err);
        triggerToast('Something went wrong.', 'danger');
      }
    };

    const moveToCreatePage = () => {
      router.push({
        name: 'TodoCreate'
      });
    };

    let timeout = null;

    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    };

    // watch effect는 의존성이 있는 데이터에 대해 즉시 실행
    // watch effect 내부의 reactive state 값(ref, reactive, props, computed)이 변경되면 watch 실행(처음에도 실행)
    // watch는 새로운 데이터와 이전 데이터를 모두 가져올 수 있음
    watch(searchText, () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getTodos(1);
      }, 1000);
    });

    return {
      todos,
      addTodo,
      toggleTodo,
      deleteTodo,
      searchText,
      error,
      numberOfPages,
      currentPage,
      getTodos,
      searchTodo,
      showToast,
      toastMessage,
      toastAlertType,
      moveToCreatePage
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
  .pagination a {
    cursor: pointer;
  }
</style>