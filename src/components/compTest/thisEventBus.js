import Vue from 'vue';
export const eventBus = new Vue();
console.log('创建event-bus success')
/* 使用方式
eventBus.$emit('i-got-clicked', param);//发送消息
eventBus.$on('i-got-clicked', ()=>{});// Listen to the event.
eventBus.$off('i-got-clicked', ()=>{});// Stop listening.
*/