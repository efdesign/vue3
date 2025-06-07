<script setup>
import Badge from './Badge.vue';
import { computed } from 'vue';
const props = defineProps ({
    name: {
        type: String,
        required: false,
        default: 'Enrico Bianchi',},
    age: {
        type: Number,
        required: false,
        default: 50,
    },
    married: {
        type: Boolean,
        required: true,        
    },
    
})


</script>

<template>
    <div class="name"> name: {{name}} age {{age}}</div>
    <div>{{ name }} is {{ age }} years old and he is 
        <Badge :type="married ? 'married' : 'single'">
            
        {{ props.married ? "married" : "single" }}
        </Badge>
         {{ married ? "married" : "single" }}
          {{ props.married }}
    </div>
</template>

<style scoped>
.name {
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--color-text);
    margin: 0.5rem 0;
}
</style>