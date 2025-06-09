import { ref, onMounted, onUnmounted } from 'vue';
export const useMouseCoordinates = () => {
  const mouseX = ref(0);
  const mouseY = ref(0);

  const updateMouseCoordinates = (event: MouseEvent) => {
    mouseX.value = event.clientX;
    mouseY.value = event.clientY;
  };

  onMounted(() => {
    window.addEventListener('mousemove', updateMouseCoordinates);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', updateMouseCoordinates);
  });

  return { mouseX, mouseY };
}