<template>
  <list
    :items="todos"
  >
    <template #default="{ item, index }">  
      <div 
        class="card-body p-2 d-flex align-items-center"
        style="cursor: pointer"
        @click="moveToPage(item.id)"
      >
      <!-- 부모 element에서 d-flex 하고 자식 element에서 flex-grow-1 하면 inline으로 변경 -->
        <div class="flex-grow-1">
          <input
            class="m-2"
            type="checkbox"
            :checked="item.completed"
            @change="toggleTodo(index, $event)"
            @click.stop
          >
          <!--
            :class="{active: isActive}"
            active는 key값, isActive는 boolean
            isActive가 true일 때 class가 추가
          -->
          <span
            :class="{ todo: item.completed }"
          >
            {{ item.subject }}
          </span>
        </div>
        <div>
          <button
            class="btn btn-danger btn-sm"
            @click.stop="openModal(item.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </template>
  </list>
  <teleport to="#modal">
    <modal
      v-if="showModal"
      @close="closeModal"
      @delete="deleteTodo"
    />
  </teleport>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Modal from '@/components/DeleteModal.vue';
import List from '@/components/List.vue';

export default {
  components: {
    Modal,
    List
  },
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  emits: ['toggle-todo', 'delete-todo'],
  setup(props, { emit }) {
    const router = useRouter();
    const showModal = ref(false);
    const todoDeleteId = ref(null);

    const toggleTodo = (index, event) => {
      emit('toggle-todo', index, event.target.checked);
    };

    const openModal = (id) => {
      todoDeleteId.value = id;
      showModal.value = true;
    };

    const closeModal = () => {
      todoDeleteId.value = null;
      showModal.value = false;
    };

    const deleteTodo = () => {
      emit('delete-todo', todoDeleteId.value);
    };

    const moveToPage = (todoId) => {
      router.push({
        name: 'Todo',
        params: {
          id: todoId
        }
      });
    };

    return {
      toggleTodo,
      deleteTodo,
      moveToPage,
      showModal,
      openModal,
      closeModal
    };
  }
}
</script>