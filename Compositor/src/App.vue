<script setup lang='ts'>
import { computed } from 'vue';
// Components are now globally available through the plugin system
// No need to import Panel, Grid, Flex, Layout, Icon, CustomDirective anymore
import { provideAppConfig } from './plugins/useAppConfig';
import AsyncHeavy from './components/AsyncHeavy.vue';
import Compositor from './components/Compositor.vue';
import MouseCoordinatesDisplay from './assets/MouseCoordinatesDisplay.vue';
import PictureInPictureDemo from './components/PictureInPictureDemo.vue';


import { useAppStore } from './store/store';
import StoreWatcher from './components/StoreWatcher.vue';
// Provide the app configuration to all child components
const config = provideAppConfig();
const store = useAppStore();
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

const updateStateDirect = (event: MouseEvent) => {
  console.log('updateState called with event:', event);
  store.appName = 'Nice App';
  store.appVersion = '1.1.18';
};

const patchState = (event: MouseEvent) => {
  console.log('patchState called with event:', event);
  store.$patch({
    appName: 'Patch State App',
    appVersion: '2.2.18',
  });
};

const updateStateFunction = (event: MouseEvent) => {
  console.log('updateStateFunction called with event:', event);
  store.$patch((state) => {
    state.appName = 'Function State App';
    state.appVersion = '2.3.18';
  });
};
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
      <Panel title="Async" subtitle="Async Components, Artificial Promise Wait" :style="toolPanelStyle"
        :is-open="false">
        <AsyncHeavy flex="1" />
      </Panel>
      <Panel title="Composable" subtitle="Reusable State, Mouse coordinates" :style="toolPanelStyle" :is-open="true">
        <MouseCoordinatesDisplay />
      </Panel>
      <Panel title="Custom Directive" subtitle="Low level DOM interaction" :style="toolPanelStyle" :is-open="true">
        <CustomDirective />
      </Panel>

      <Panel title="Store Watcher" subtitle="he's looking!" :style="toolPanelStyle" :is-open="true">
        <StoreWatcher />
      </Panel>

      <!-- <Panel title="Picture-in-Picture Demo" subtitle="Document Picture-in-Picture API" :style="toolPanelStyle"
        :is-open="true">
        <PictureInPictureDemo />
      </Panel> -->
      <Panel title="Teleport" subtitle="Teleport Showcase" :style="toolPanelStyle" :is-open="true">
        There is conttent below and it will be teleported
        <Teleport to="#teleport-target">
          <div class="teleport-demo">
            <h2>Teleport Example</h2>
            <p>This content has been teleported to the #teleport-target element.</p>


            <h3>State management (Pinia) Example</h3>
            <p>for app: {{ store.appName }} version:
              {{
                store.appVersion
              }}</p>
            <button @click="store.incrementVersion()">Increment Counter</button>
            <button @click="store.$reset()">Reset Store</button>

            <button @click="($event) => updateStateDirect($event,)">updateState direct</button>
            <button @click="($event) => patchState($event)">patchState with event</button>
            <button @click="($event) => updateStateFunction($event)">updateState function</button>
          </div>
        </Teleport>
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
