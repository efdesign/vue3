<script setup lang='ts'>
import { computed } from 'vue';
import Panel from './components/Panel/Panel.vue';
import Grid from './components/Grid.vue';
import Flex from './components/Flex.vue';
import Layout from './components/Layout.vue';
import Icon from './components/Icon.vue';
import { provideAppConfig } from './components/useAppConfig';
import AsyncHeavy from './components/AsyncHeavy.vue';

// Provide the app configuration to all child components
const config = provideAppConfig();

// Create computed styles directly using the config
const toolPanelStyle = computed(() => ({
  backgroundColor: config.value.panelBackgroundColor,
  padding: config.value.defaultPadding,
  borderRadius: config.value.defaultBorderRadius,
  boxShadow: config.value.defaultBoxShadow,
  width: '200px',
}));

const compositionPanelStyle = computed(() => ({
  backgroundColor: config.value.panelBackgroundColor,
  padding: config.value.defaultPadding,
  borderRadius: config.value.defaultBorderRadius,
  boxShadow: config.value.defaultBoxShadow,
  width: '400px',
}));

// Access config values directly for template usage
const toolbarWidth = computed(() => config.value.toolbarWidth);
const toolbarGap = computed(() => config.value.toolbarGap);
const toolbarPadding = computed(() => config.value.toolbarPadding);
const gridToolbarStyle = computed(() => config.value.gridToolbarStyle);
const iconSize = computed(() => config.value.iconSize);
</script>
<template>



  <Layout>
    <template #tools>
      <Panel title="Tools" subtitle="Available tools" :style="toolPanelStyle">
        <!-- generate 10 random <Icon> components with same size and color, not badges, no IconDemo-->
        <Flex direction="column" gap="0" align-items="center" justify-content="center">
          <Grid :columns="2" :rows="10" :gap="toolbarGap" :padding="toolbarPadding" :width="toolbarWidth"
            :style="gridToolbarStyle">
            <Icon name="fi-rr-eye" :size="iconSize" :color="config.iconColor" />
            <Icon name="fi-rr-heart" :size="iconSize" :colo="config.iconColor" />
            <Icon name="fi-rr-star" :size="iconSize" :color="config.iconColor" />
            <Icon name="fi-sr-home" :size="iconSize" :color="config.iconColor" />
            <Icon name="fi-brands-github" :size="iconSize" :color="config.iconColor" />
          </Grid>
        </Flex>
      </Panel>
    </template>

    <template #composition>
      <Panel title="Composition" subtitle="Compose your image" :style="compositionPanelStyle">
        <p>There will be a full compositor component soon here</p>
      </Panel>
    </template>
    <template #panels>
      <Panel title="Layers" subtitle="reorganize images" :style="toolPanelStyle" :is-open="false">
        <AsyncHeavy flex="1" />
      </Panel>
    </template>
  </Layout>

  <!-- <Flex>
    <Panel title="Icon and Badge Examples" subtitle="Using Compositor Components" >


      <Badge type="primary">Badge</Badge>

      <Grid :columns="3" :rows="2" :gap="10" :padding="10">
        <Badge type="primary">Badge 1</Badge>
        <Badge type="secondary">Badge 2</Badge>
        <Badge type="married">Badge 3</Badge>
        <Badge type="single">Badge 4</Badge>
        <Badge type="success">Badge 5</Badge>
        <Badge type="warning">Badge 6</Badge>
      </Grid>
    </Panel>
    <Panel title="Icon Examples" subtitle="Using Compositor Components" icon="fi-brands-amazon">
      <IconDemo></IconDemo>
    </Panel>

  </Flex> -->
</template>
<style scoped></style>
