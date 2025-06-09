<script setup lang='ts'>
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import Loading from './Loading.vue';


const getUser = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};


// const fetcher = async (id: number): Promise<Post> =>
//   await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(
//     (response) => response.json(),
//   )


// const user = await getUser();
// console.log('getUser', user);


const queryClient = useQueryClient();
const { isPending, isFetching, isError, data: user, error } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
})

</script>
<template>
    <div class="user" v-if="!isPending && !isFetching && !isError && user">
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
    <Loading v-else-if="isPending || isFetching" />

</template>
<style scoped>
.user {
    dd {
        font-weight: bold;
    }
}
</style>