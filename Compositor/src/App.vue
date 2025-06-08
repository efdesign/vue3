<script setup lang='ts'>
import { computed, provide, ref } from 'vue';
import Panel from './components/Panel/Panel.vue';

import Grid from './components/Grid.vue';
import type { AppConfig } from './AppConfig';
import { configKey } from './AppConfig'; // Import the configKey
import Flex from './components/Flex.vue';

import Layout from './components/Layout.vue';
import Icon from './components/Icon.vue';
import type { Ref } from 'vue';





const iconSize = 15;
const panelBackgroundColor = '#f0f0f0';
const defaultPadding = '1rem';
const defaultBorderRadius = '2px';
const defaultBoxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
const toolbarGap = 5;
const toolbarPadding = 5;

const toolPanelStyle = {
  backgroundColor: panelBackgroundColor,
  padding: defaultPadding,
  borderRadius: defaultBorderRadius,
  boxShadow: defaultBoxShadow,
  width: '200px',
};

const compositionPanelStyle = {
  backgroundColor: panelBackgroundColor,
  padding: defaultPadding,
  borderRadius: defaultBorderRadius,
  boxShadow: defaultBoxShadow,
  width: '400px',
};

const toolbarWidth = computed(() => {
  return ((iconSize * 2) + 10) + (toolbarGap) + (2 * toolbarPadding);

})

const gridToolbarStyle = {
  boxSizing: 'border-box',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',

};



const config: Ref<AppConfig> = ref({
  iconSize: iconSize,
  panelBackgroundColor: panelBackgroundColor,
  defaultPadding: defaultPadding,
  defaultBorderRadius: defaultBorderRadius,
  defaultBoxShadow: defaultBoxShadow,
  toolbarGap: toolbarGap,
  toolbarPadding: toolbarPadding,
  toolbarWidth: toolbarWidth.value,
  gridToolbarStyle: gridToolbarStyle
});

provide(configKey, config);

</script>
<template>



  <Layout>
    <template #tools>
      <Panel title="Tools" subtitle="Available tools" :style="toolPanelStyle">
        <!-- generate 10 random <Icon> components with same size and color, not badges, no IconDemo-->
        <Flex direction="column" gap="0" align-items="center" justify-content="center">
          <Grid :columns="2" :rows="10" :gap="toolbarGap" :padding="toolbarPadding" :width="toolbarWidth"
            :style="gridToolbarStyle">
            <Icon name="fi-rr-eye" :size="iconSize" />
            <Icon name="fi-rr-heart" :size="iconSize" />
            <Icon name="fi-rr-star" :size="iconSize" />
            <Icon name="fi-sr-home" :size="iconSize" />
            <Icon name="fi-brands-github" :size="iconSize" />
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
      <Panel title="Layers" subtitle="reorganize images" :style="toolPanelStyle">
        <p>Panels content goes here.</p>
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
