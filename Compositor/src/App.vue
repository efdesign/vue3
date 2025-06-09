<script setup lang='ts'>
import { computed } from 'vue';
// Components are now globally available through the plugin system
// No need to import Panel, Grid, Flex, Layout, Icon, CustomDirective anymore
import { provideAppConfig } from './plugins/useAppConfig';
import AsyncHeavy from './components/AsyncHeavy.vue';
import Compositor from './components/Compositor.vue';
import MouseCoordinatesDisplay from './assets/MouseCoordinatesDisplay.vue';
import PictureInPictureDemo from './components/PictureInPictureDemo.vue';

// Provide the app configuration to all child components
const config = provideAppConfig();

// Create computed styles directly using the config
const toolPanelStyle = computed(() => ({
  backgroundColor: config.value.panelBackgroundColor,
  padding: config.value.defaultPadding,
  borderRadius: config.value.defaultBorderRadius,
  boxShadow: config.value.defaultBoxShadow,
  width: '300px',
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
      <Panel title="Assets" subtitle="Asset loading, Icon system, configuration, sample styles, computed props"
        :style="toolPanelStyle">
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
      <Panel title="Loading" subtitle="Api Call, Tanstack useQuery, Suspense" :style="compositionPanelStyle">
        <Suspense>
          <Compositor />
        </Suspense>
      </Panel>
    </template>
    <template #panels>
      <Panel title="Async" subtitle="Async Coponents, Artificial Promise Wait" :style="toolPanelStyle" :is-open="false">
        <AsyncHeavy flex="1" />
      </Panel>
      <Panel title="Composable" subtitle="Reusable State, Mouse coordinates" :style="toolPanelStyle" :is-open="true">
        <MouseCoordinatesDisplay />
      </Panel>
      <Panel title="Custom Direcive" subtitle="Low leve DOM interaction" :style="toolPanelStyle" :is-open="true">
        <CustomDirective />
      </Panel>
      <Panel title="Picture-in-Picture Demo" subtitle="Document Picture-in-Picture API" :style="toolPanelStyle"
        :is-open="true">
        <PictureInPictureDemo />
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
