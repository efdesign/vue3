<script setup lang='ts'>
// import { useQuery } from '@tanstack/vue-query'


const getUser = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};



const user = await getUser();
console.log('getUser', user);

// const { isPending, isFetching, isError, data, error } = useQuery({
//     queryKey: ['todos'],
//     queryFn: getTodos,
// })



</script>
<template>
    <div class="user">
        <h1>User</h1>
        <dl>
            <dt>Name:</dt>
            <dd>{{ user.name }}</dd>

            <dt>Email:</dt>
            <dd>{{ user.email }}</dd>

            <dt>Phone:</dt>
            <dd>{{ user.phone }}</dd>

            <dt>Website:</dt>
            <dd>{{ user.website }}</dd>
        </dl>
    </div>
</template>
<style scoped>
.user {
    dd {
        font-weight: bold;
    }
}
</style>