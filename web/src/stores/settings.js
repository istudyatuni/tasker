import { localStore } from 'svelte-storages'

/**
 * Settings
 *
 * Keys
 *
 *  - `show_finished`
 *  - `show_trash`
 *  - `strict_line_breaks`
 *  - `editor`
 *     - `state`
 *     - `task`
 *  - `offline`
 *  - `filterSubject`
 *
 * @type {Writable}
 */
export const settings = localStore('settings')
