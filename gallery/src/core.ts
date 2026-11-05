/** Portable Gallery behavior. Connections and folders are resources, not plugins. */
export interface PhotoEntry {
  id: string;
  title: string;
  reference: string;
  kind: 'photo' | 'folder';
  subtitle?: string;
  overview?: string;
}
export interface PhotoPage { items: PhotoEntry[]; next?: string }
export interface PhotoResources { browse(input: Record<string, string>): PhotoPage | Promise<PhotoPage> }

export function createGallery(resources: PhotoResources) {
  return {
    async handle(action: string, input: Record<string, string> = {}): Promise<PhotoPage> {
      if (!['browse', 'search'].includes(action)) throw Error('Unsupported gallery action');
      const reference = input.folder || input.reference || '';
      if (reference.length > 8192 || (input.query || '').length > 200) throw Error('Gallery request exceeds its limits');
      const page = await resources.browse({...input, reference});
      if (!page || !Array.isArray(page.items) || page.items.length > 200) throw Error('Invalid photo page');
      if (page.next !== undefined && (typeof page.next !== 'string' || !page.next.length)) throw Error('Invalid photo cursor');
      const items = page.items.map(item => {
        if (!item || !['photo', 'folder'].includes(item.kind) || !item.id || !item.reference || !item.title) throw Error('Invalid photo entry');
        // Only presentation metadata crosses into the experience. Preserve names
        // and opaque references; never forward provider URLs or credentials.
        return {id:item.id, title:item.title, reference:item.reference, kind:item.kind,
          subtitle:item.subtitle || '', overview:item.overview || ''};
      });
      return {...(page.next === undefined ? {} : {next:page.next}), items};
    }
  };
}
