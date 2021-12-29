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
          <!--
            기존에는 v-model="item.completed" 였던 걸 :checked="item.completed"로 바꾸고 @change 이벤트 걸어줌
            자식 component에서는 값 변경이 안되기 때문
          -->
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
  // props는 one-way-down binding(부모에서 자식으로만 데이터를 내려줌)
  // 자식 component에서 부모 component의 값을 변경하면 안됨
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  // vue.js 3부터 적용된 것으로 emits 속성에 emit로 사용한 함수명 적어줘야 함
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