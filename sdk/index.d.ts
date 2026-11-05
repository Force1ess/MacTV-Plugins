export type Input = Readonly<Record<string,string>>;
export interface MediaItem {
  id: string;
  title: string;
  subtitle: string;
  overview: string;
  source: string;
  reference?: string;
  kind?: 'video' | 'folder' | 'photo' | 'audio';
  poster?: string;
  collectionReference?: string;
  artworkReference?: string;
}
export interface Page {items: MediaItem[]; next?: string; requiresLogin?: boolean}
export interface Continuation {currentReference:string; collectionReference:string; label:string; next:MediaItem|null}
export interface Playback {
  url:string;
  audioURL?:string;
  transport?:'indexed-fmp4'|'original-matroska'|'original-file';
  headers?:Partial<Record<'User-Agent'|'Referer',string>>;
  quality?:number;
  qualityTitle?:string;
  qualities?:{id:number;title:string;available:boolean;reason?:string}[];
  height?:number;
  bandwidth?:number;
  expiresAt?:number;
  continuation?:Continuation;
}
export interface Login {state:'waiting'|'scanned'|'expired'|'authorized';message?:string;qrURL?:string;token?:string;expiresAt?:number;displayName?:string}
export type Result = Page|Playback|Continuation|Login;
export interface Plugin {handle(action:string,input:Input):Result|Promise<Result>}
export interface Host {
  readonly apiVersion:2;
  readonly sessionAvailable:boolean;
  readonly limits:Readonly<{maxRequests:number;maxConcurrency:number;timeoutMS:number;maxPayloadBytes:number}>;
  library(service:'photos'|'music',input?:Input):Promise<Page>;
  fetchJSON(url:string,options?:{authenticated?:boolean;captureSession?:boolean;method?:'GET'|'POST';body?:Record<string,unknown>}):Promise<unknown>;
}
export const API_VERSION:2;
export function definePlugin(handler:Plugin['handle']):Readonly<Plugin>;
export type ApplicationLaunch = {
  bundleID:string;
  url:string;
  instructions?:Readonly<Record<string,string>>;
  readyWhen?:'application-running'|'visible-window';
} & ({returnWhen:'fullscreen-window-closes';preferredPresentation?:'unchanged';windowTitles?:readonly string[]} |
     {returnWhen:'matched-window-closes';preferredPresentation?:'fullscreen'|'unchanged';windowTitles:readonly string[]});
