<template>
  <Navbar />  
  <div class="container">
    <router-view/>
  </div>
  <Toast />
</template>

<script>
import Toast from '@/components/Toast.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Toast,
    Navbar
  }
}
</script>

// Vue.js 2에서는 root element로 감싸줘야 했으나
// Vue.js 3에서는 최상위에 여러 개의 태그를 나란히 둬도 됨

// ref는 기본 자료형, Object, Array 모두 사용 가능하며 사용 시 .value를 붙여줘야 함
// Object, Array를 사용할 때엔 ref 대신 reactive를 사용해도 됨
// 이 경우 .value를 붙이지 않아도 바로 사용 가능