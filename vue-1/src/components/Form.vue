<script setup>
import { computed, ref } from 'vue';
import Flex from './Flex.vue';

const gap = "0"

const formData = ref({
    firstName: '',
    lastName: '',
    job: '',
    dateOfBirth: '',
    single: false,

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


</script>

<template>

    <form @submit.prevent="submitForm">
        <Flex direction="column" :gap>
            <h2>Form Example</h2>
            <p>Fill out the form below:</p>
            <Flex direction="column" :gap>
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" v-model="formData.firstName" required>
            </Flex>
            <Flex direction="column" :gap>
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" v-model="formData.lastName" required>
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
        </Flex>

    </form>

    <div class="output">
        <h3>Form Data:</h3>
        <pre>{{ formData }}</pre>
    </div>


</template>

<style scoped></style>