import { createApp } from 'vue';

createApp({
  data() {
    return {
      message: 'Hello vue!',
    };
  },
  mounted() {
    // console.log(this.message);
  },
}).mount('#test');
