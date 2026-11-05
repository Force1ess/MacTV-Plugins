// MacTV executes the reviewed, immutable launch declaration, not script output.
export async function handle(action: string) {
  if (action !== 'browse') throw Error('Unsupported Steam UI action');
  return {items:[]};
}
