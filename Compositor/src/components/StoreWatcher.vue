<script setup lang='ts'>
import { useAppStore } from '@/store/store';
import { ref } from 'vue';

const store = useAppStore();
const appName = ref("some initial value");
const watchersData1 = ref("watchersData1");
const watchersData2 = ref("watchersData2");

store.$subscribe((mutation, state) => {
    console.log('Store mutation:', mutation);
    //console.log('New state:', state);
    appName.value = state.appName;
    watchersData1.value = `Store mutation: ${mutation.type} with payload: ${JSON.stringify(mutation.payload)}`;

});

store.$onAction(({ name, args }) => {
    console.log(`Action ${name} was called with arguments:`, args);
    watchersData2.value = `Action ${name} was called with arguments: ${JSON.stringify(args)}`;
});



</script>
<template>
    <p>{{ appName }}</p>
    <p>{{ watchersData1 }}</p>
    <p>{{ watchersData2 }}</p>
</template>
<style scoped></style>