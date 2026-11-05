import {createGallery, type PhotoPage} from './core';

/** The only MacTV binding. The feature library has no host global. */
declare const host: {library(service: 'photos', input: Record<string, string>): Promise<PhotoPage>};
export async function handle(action: string, input: Record<string, string> = {}) {
  const page = await createGallery({browse: request => host.library('photos', request)}).handle(action, input);
  return {...page, items:page.items.map(item => ({...item, source:'community.gallery'}))};
}
