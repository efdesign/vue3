<script setup>

const extractCoordinates = (event) => {
    return {
        x: event.clientX,
        y: event.clientY
    };
};

const extractLayerCoordinates = (event) => {
    return {
        x: event.layerX,
        y: event.layerY
    };
};

const extractOffsetCoordinates = (event) => {
    return {
        x: event.offsetX,
        y: event.offsetY
    };
};

const dumpCoordinates = (event) => {
    return {
        coordinates: extractCoordinates(event),
        layerCoordinates: extractLayerCoordinates(event),
        offsetCoordinates: extractOffsetCoordinates(event),
        position: extractPosition(event),
        pointerPosition: extractPointerPosition(event)
    };
};

const extractPosition = (event) => {
    return {
        x: event.pageX,
        y: event.pageY
    };
};

const extractPointerPosition = (event) => {
    return {
        x: event.screenX,
        y: event.screenY
    };
};

const method = (event)=>{
    alert('Hello from RedBox component' + JSON.stringify(dumpCoordinates(event)));
    console.log('Event object:', event);
}
</script>

<template>
    <div class="redBorder" @click="method($event)">
        married container
        <slot></slot>
    </div>
</template>

<style scoped>
.redBorder {
    border: 1px solid red;
    padding: 1ch;
}
</style>