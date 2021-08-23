<template>
  <div>
    Home Page
  </div>
  <div>{{ count }}</div>
  <button class="btn btn-dark" @click="count++">Add</button>
</template>

<script>
import { useCount } from '@/composables/count';

export default {
  setup () {
    const { count } = useCount();

    return {
      count
    };
  }
}
</script>