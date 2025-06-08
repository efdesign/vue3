<script setup>
import { computed, ref, watch, toRaw, watchEffect, watchPostEffect } from 'vue';
import Flex from './Flex.vue';

const gap = "0"

const formData = ref({
    firstName: '',
    lastName: '',
    job: '',
    dateOfBirth: '',
    single: false,
    numberOfChildren: 0,

})

const age = computed(() => {
    const today = new Date();
    const birthDate = new Date(formData.value.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
});


// make a sample watcher for formData using watch ,
// watch also has immediate, single, and flush:post options (access dom after update)
// flush sync ( triggers before vue managed updates)
watch(formData, (newValue, oldValue, onCleanup) => {
    // since newValue and oldValue are proxies, log their actual values
    // console.log('Form data changed:', toRaw(newValue), 'oldValue:', toRaw(oldValue));

    onCleanup(() => {
        console.log('Cleanup function called');
    });
}, { deep: true });


// implemnt watchEffect to log formData changes
// watchEffect(() => {
//     console.log('Form data changed (watchEffect):', formData);
// });

const unwatchPostEffect = watchPostEffect(() => {
    const { firstName, lastName, job, dateOfBirth, single, numberOfChildren } = formData.value;

    console.log('Form data changed (watchPostEffect):', {
        firstName,
        lastName,
        job,
        dateOfBirth,
        single,
        numberOfChildren
    });
});

// make this after 5 seconds
setTimeout(() => {
    unwatchPostEffect(); // Stop watching after 5 seconds
    console.log('Stopped watching formData changes');
}, 10000); // 10 seconds



</script>

<template>

    <form @submit.prevent="submitForm">
        <Flex direction="column" :gap>
            <h2>Form Example</h2>
            <p>Fill out the form below:</p>
            <Flex direction="column" :gap>
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" v-model.trim="formData.firstName" required>
            </Flex>
            <Flex direction="column" :gap>
                <label for="lastName">Last Name (lazy input):</label>
                <input type="text" id="lastName" v-model.lazy.trim="formData.lastName" required>
            </Flex>
            <!-- <div>
            <label for="job">Job:</label>
            <input type="text" id="job" v-model="formData.job" required>
        </div> -->
            <Flex direction="column" :gap>
                <label for="job">Job:</label>
                <select id="job" v-model="formData.job" required>
                    <option value="" disabled>Select a job</option>
                    <option value="developer">Developer</option>
                    <option value="designer">Designer</option>
                    <option value="manager">Manager</option>
                    <option value="other">Other</option>
                </select>
            </Flex>
            <Flex direction="column" :gap>
                <label for="dateOfBirth">Date of Birth {{ age }}:</label>
                <input type="date" id="dateOfBirth" v-model="formData.dateOfBirth" required>
            </Flex>

            <Flex direction="column" :gap alignItems="flex-start" justifyContent="flex-start">
                <label for="single">Single:</label>
                <span><input type="checkbox" id="single" v-model="formData.single"> {{ formData.single ? "single" :
                    "married"
                }}</span>
            </Flex>
            <Flex v-if="!formData.single" direction="column" :gap>
                <label for="numberOfChildren">Number of Children:</label>
                <input type="number" id="numberOfChildren" v-model.number="formData.numberOfChildren" min="0" required>
            </Flex>

        </Flex>

    </form>

    <div class="output">
        <h3>Form Data:</h3>
        <pre>{{ formData }}</pre>
    </div>


</template>

<style scoped></style>