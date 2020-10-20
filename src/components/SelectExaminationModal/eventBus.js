import Vue from 'vue';
export const eventBus = new Vue();

/* 使用方式
EventBus.$emit('i-got-clicked', param);//发送消息
EventBus.$on('i-got-clicked', ()=>{});// Listen to the event.
EventBus.$off('i-got-clicked', ()=>{});// Stop listening.
*/