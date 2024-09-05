import {
  ref,
  onMounted
} from 'vue'
/**
 * Loading效果
 */
export default function useLoading() {
  //  是否显示loading
  const isLoading = ref(true)
  onMounted(() => {
    setTimeout(() => {
      isLoading.value = false
    }, 700)
  })
  return {
    isLoading
  }
}