import{LoadTasksLocal as l}from"../api/LoadTasks.js";import{notify as n}from"./notify.js";import{offlineReady as o}from"./offline.js";const a={types:[{description:"JSON",accept:{"application/json":[".json"]}}],excludeAcceptAllOption:!0},s={...a,multiple:!1},c={...a,suggestedName:"tasker-data.json"};let e=null;function p(t){return new Blob([JSON.stringify(t,null,2)+`
`],{type:"application/json"})}export function isFsSupported(){return window.showOpenFilePicker&&window.showSaveFilePicker}function r(t){document.title+=" - "+t}export async function openLocalFile(){if([e]=await window.showOpenFilePicker(s),!e)return n("Couldn't open file","warning");r(e.name),o(),l()}export async function createLocalFile(){if(e=await window.showSaveFilePicker(c),!e)return n("Couldn't create file","warning");await writeFile([]),r(e.name),o()}export async function writeFile(t){if(!e)return;const i=await e.createWritable();await i.write(p(t)),await i.close()}export async function readFile(){if(!e)return;const t=await e.getFile();return JSON.parse(await t.text())}
