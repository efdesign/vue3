<script setup lang='ts'>
import { useAppConfig } from '../plugins/useAppConfig';
const config = useAppConfig();
</script>
<template>
    <Flex direction="column" gap="2rem" padding="2rem">
        <Panel title="Icon and Badge Examples" subtitle="Using Compositor Components" icon="fi-brands-amazon">
            <Flex gap="1rem" align-items="center">
                <Icon name="fi-rr-eye" :size="config.iconSize" />
                <Icon name="fi-rr-heart" :size="config.iconSize" color="red" />
                <Icon name="fi-rr-star" :size="config.iconSize" color="gold" />
                <Icon name="fi-sr-home" :size="config.iconSize" color="blue" />
                <Icon name="fi-brands-github" :size="config.iconSize" />
                <Icon name="fi-rr-settings" :size="config.iconSize" />
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
                    <Icon name="fi-rr-bell" :size="config.iconSize" />
                    <Badge type="danger">3</Badge>
                </Flex>
                <Flex gap="0.5rem" align-items="center">
                    <Icon name="fi-rr-mail" :size="config.iconSize" />
                    <Badge type="info">12</Badge>
                </Flex>
                <Flex gap="0.5rem" align-items="center">
                    <Icon name="fi-rr-shopping-cart" :size="config.iconSize" />
                    <Badge type="success">Cart</Badge>
                </Flex>
            </Flex>
        </Panel>
    </Flex>

</template>
<style scoped></style>