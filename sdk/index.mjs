export const API_VERSION=2;
/** Structural helper; ports are supplied by MacTV or a standalone consumer. */
export function definePlugin(handler) {
  if(typeof handler!=='function')throw TypeError('A plugin handler is required');
  return Object.freeze({async handle(action,input={}) {return await handler(action,input);}});
}
