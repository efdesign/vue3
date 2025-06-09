import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Composable for tracking mouse coordinates in real-time
 * @returns {Object} Object containing reactive mouseX and mouseY coordinates
 */
export function useMouseCoordinates() {
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
