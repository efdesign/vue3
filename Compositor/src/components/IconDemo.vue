<script setup lang='ts'>
import Flex from './Flex.vue';
import Icon from './Icon.vue';
import Panel from './Panel/Panel.vue';
import Badge from './Badge.vue';
import Grid from './Grid.vue';
</script>
<template>
    <Flex direction="column" gap="2rem" padding="2rem">
        <Panel title="Icon and Badge Examples" subtitle="Using Compositor Components" icon="fi-brands-amazon">
            <Flex gap="1rem" align-items="center">
                <Icon name="fi-rr-eye" :size="16" />
                <Icon name="fi-rr-heart" :size="20" color="red" />
                <Icon name="fi-rr-star" :size="24" color="gold" />
                <Icon name="fi-sr-home" :size="18" color="blue" />
                <Icon name="fi-brands-github" :size="22" />
                <Icon name="fi-rr-settings" :size="16" />
            </Flex>
        </Panel>

        <Panel title="Badge Examples" subtitle="Using Compositor Components" icon="fi-brands-amazon">
            <Grid :columns="3" :rows="2" :gap="10" :padding="10">
                <Badge type="primary">Badge 1</Badge>
                <Badge type="secondary">Badge 2</Badge>
                <Badge type="married">Badge 3</Badge>
                <Badge type="single">Badge 4</Badge>
                <Badge type="success">Badge 5</Badge>
                <Badge type="warning">Badge 6</Badge>
            </Grid>
        </Panel>

        <Panel title="Icon + Badge Combinations" subtitle="Using Compositor Components" icon="fi-brands-amazon">
            <Flex gap="1rem" align-items="center">
                <Flex gap="0.5rem" align-items="center">
                    <Icon name="fi-rr-bell" :size="16" />
                    <Badge type="danger">3</Badge>
                </Flex>
                <Flex gap="0.5rem" align-items="center">
                    <Icon name="fi-rr-mail" :size="16" />
                    <Badge type="info">12</Badge>
                </Flex>
                <Flex gap="0.5rem" align-items="center">
                    <Icon name="fi-rr-shopping-cart" :size="16" />
                    <Badge type="success">Cart</Badge>
                </Flex>
            </Flex>
        </Panel>
    </Flex>

</template>
<style scoped></style>