<script setup>

import { ref, reactive, computed } from 'vue'
import Name from './components/Name.vue'
import RedBox from './components/RedBox.vue'
import Badge from './components/Badge.vue'
import Flex from './components/Flex.vue'
import EventTester from './components/EventTester.vue'
import Form from './components/Form.vue'

const aReactivePerson = reactive({
    name: 'Enrico Bianchi',
    age: 50,
    married: true,
});

const activePersonComputed = computed(() => {
    return `computed: ${aReactivePerson.name} is ${aReactivePerson.age} years old and he is ${aReactivePerson.married ? "married" : "single"} successRate ${successRate.value}`;
});

const successRate = ref(1);

const incrementRate = () => {
    successRate.value += 1;

};
/**
 * Component props definition
 * @prop {String} msg - Required message to be displayed by the component
 */
const props = defineProps({
    msg: {
        type: String,
        required: true,
    },
    married: {
        type: Boolean,
        required: true,
        default: false,
    },
})

const chores = reactive([
    { id: 1, name: 'Clean the house', done: false },
    { id: 2, name: 'Do the laundry', done: true },
    { id: 3, name: 'Buy groceries', done: false },
]);

// const msg1 = 'Hello Vue 3! from msg1';



// declare reactive variable equivalent to data() in Vue 2 and useState in React
const name = ref('Enrico Bianchi');

const marriedLocal = ref(props.married);
const rawHtml = "<span class='enrico'>Hello</span> <span class='enrico'>this is raw html!</span>";
// declare reactive object
const object1 = ref({ person: { name: "enrico", age: 50 } });
const aFunction = (event, customParam) => {
    console.log('Event object:', event);
    console.log('Event type:', event.type);
    console.log('Target element:', event.target);
    console.log('Button clicked:', event.button); // 0=left, 1=middle, 2=right

    // alert(`This is a function ${name.value}, ${customParam}`);

    // incrementing age
    if (event.button === 0) object1.value.person.age++;
    if (event.button === 2) object1.value.person.age--;
    if (event.button === 1) marriedLocal.value = !marriedLocal.value;
    // setting value
    // name.value = 'Enrico Bianchi';
};
</script>

<template>
    <Flex direction="column" justifyContent="center" alignItems="flex-start" gap="1ch">

        <!-- <div>Your name {{ name }}</div> -->
        <!-- <div>raw html {{ rawHtml }}</div> -->
        <!-- <div v-html="rawHtml"></div> -->
        <!-- <div :class="{ 'alert': marriedLocal }">
            <Name :name="object1.person.name" :age="object1.person.age" :married="marriedLocal" />
        </div> -->

        <!-- <div>{{ msg }}</div>
        <div>{{ msg1 }}</div> -->

        <button @click.left="aFunction($event, 'left')">Click me left {{ name }}</button>
        <button @click.middle="aFunction($event, 'surprise')">Click me middle {{ name }}</button>
        <button @click.right.prevent="aFunction($event, 'right')">Click me right {{ name }}</button>
        <button @click.left="incrementRate">incrementRate {{ successRate }}</button>
        <button @click.left="successRate++">incrementRate {{ successRate }}</button>
        <button @click.left="successRate++">Increment success rate</button>

        <!-- <div>Success rate: {{ successRate }}</div> -->
        <!-- <div class="enrico">This is a reactive object: {{ object1.person.name }} is {{ object1.person.age }} years old
            and he is {{ marriedLocal ? "married" : "single" }}</div> -->
        <!-- <div class="enrico">This is a reactive variable: {{ name }}</div> -->
        <!-- <div class="enrico">This is a reactive variable: {{ rawHtml }}</div> -->
        {{ activePersonComputed }}

        <RedBox v-if="marriedLocal">
            <div class="enrico">This is a container for married people</div>
            <Name :name="aReactivePerson.name" :age="aReactivePerson.age" :married="marriedLocal" />
        </RedBox>

        <div v-else="!marriedLocal">
            <div class="enrico">This is a container for other people</div>
            <Name :name="aReactivePerson.name" :age="aReactivePerson.age" :married="marriedLocal" />
        </div>

        <div v-show="!marriedLocal">
            <RedBox>
                sorry, you are <Badge type="single" :attachEvent="true">not married</Badge> !
                (Event enabled: <Badge type="danger" :attachEvent="false">Click me - No event!</Badge>)
            </RedBox>
        </div>

        <div v-for="(item, index) in chores" :key="item.id" :class="'item'+index">
            <Flex direction="row" justifyContent="space-evenly" alignItems="center" gap="2ch" width="100%">
                <!-- {{ item.done ? "Done" : "Not done" }} {{ item.name }} -->
                <input type="checkbox" v-model="item.done" :name="'input'+index"/>
                <span>{{ item.name }}</span> - 
                <span v-if="item.done"> done</span>
                <span v-else>{{ marriedLocal ? " do it now" : " take it easy" }}</span>
            </Flex>

        </div>
    </Flex>

    <EventTester></EventTester>

    <Form></Form>
</template>

<style scoped>
.enrico {
    color: red
}

.flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.21lh;

    .alert {
        border: 1px solid red;
        padding: 1ch;

    }
}
</style>
