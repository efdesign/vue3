<script setup>
import Badge from './Badge.vue';
import { computed,ref } from 'vue';
import Flex from './Flex.vue';

import { badgeTypes } from './BadgeTypes.js';

const combination = ref(null);
// const combination = ref(null);
const keyboardHandler = (event) => {
    console.log('Event object:', event);
    combination.value = {
        key: event.key,
        code: event.code,
        keyCode: event.keyCode
    };
};

const combinationDisplay = computed(() => {
    if(combination.value === null) {
        return 'Press any key';
    }
    return `Key: ${combination.value.key}, Code: ${combination.value.code}, KeyCode: ${combination.value.keyCode}`;
});

const color = ref('blue');

const randomBadgeType = computed(() => {
    return badgeTypes[Math.floor(Math.random() * badgeTypes.length)];
}); 

</script>

<template>
   <Flex direction="column" @keydown="keyboardHandler($event)" tabindex="0">
       <div class="name">Event Tester</div>
       <div>Press any key to see the event in the console.</div>
       <Badge :type="randomBadgeType" :attachEvent="false">{{combinationDisplay}}</Badge>

       <!-- v-model, but in this case we want to just output conmbinations of keys -->
       <input value="type, value will be captured but not reflected in this box" @keypress.prevent.stop="keyboardHandler($event)">
   </Flex>
</template>

