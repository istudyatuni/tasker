import{get as o}from"../../snowpack/pkg/svelte/store.js";import{settings as i}from"../stores/settings.js";import{tasks as r}from"../stores/tasks.js";const n=new Set(["close","edit","create"]);export function edit(t,s=""){if(!n.has(t))throw"Unknown editor state";i.set("editor",{state:t,task:t==="edit"?{...o(r).find(e=>e.task_id===s)}:{}})}
