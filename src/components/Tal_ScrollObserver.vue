<template>
    <div ref="trigger"></div>
</template>
<script>
import {
  defineComponent, onMounted, onUnmounted, ref
} from 'vue'

export default defineComponent({
  setup (props, { emit }) {
    const trigger = ref()
    const options = {
      root: null,
      threshold: 0.001 // 해당 컴포넌트가 얼마나 보였을 때를 감지 1은 100% 0.1은 10%
    }
    let observer = null
    const handleIntersect = (entry) => {
      if (entry.isIntersecting) emit('triggerIntersected', trigger.value)
    }

    onMounted(() => {
      try {
        observer = new IntersectionObserver((entries) => {
          handleIntersect(entries[0])
        }, options)
        observer.observe(trigger.value)
      } catch (err) {
        console.error(err)
      }
    })

    onUnmounted(() => {
      observer.disconnect()
    //   observer.value.disconnect();
    })

    return {
      trigger
    }
  }
})
</script>
