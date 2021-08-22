<template>
  <modal>
    <template #title>
      Delete Todo
    </template>
    <template #body>
      Are you sure want to delete this todo?
    </template>
    <template #footer>
      <button 
        type="button" 
        class="btn btn-secondary" 
        @click="onClose"
      >
        Close
      </button>
      <button 
        type="button"
        class="btn btn-primary"
        @click="onDelete"
      >
        Delete
      </button>
    </template>
  </modal>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  components: {
    Modal
  },
  setup(props, { emit }) {
    const onClose = () => {
      emit('close');
    }
    const onDelete = () => {
      emit('delete');
    }
    return {
      onClose,
      onDelete
    }
  }
}
</script>