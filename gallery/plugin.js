"use strict";
var plugin = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/mactv.ts
  var mactv_exports = {};
  __export(mactv_exports, {
    handle: () => handle
  });

  // src/core.ts
  function createGallery(resources) {
    return {
      async handle(action, input = {}) {
        if (!["browse", "search"].includes(action)) throw Error("Unsupported gallery action");
        const reference = input.folder || input.reference || "";
        if (reference.length > 8192 || (input.query || "").length > 200) throw Error("Gallery request exceeds its limits");
        const page = await resources.browse({ ...input, reference });
        if (!page || !Array.isArray(page.items) || page.items.length > 200) throw Error("Invalid photo page");
        if (page.next !== void 0 && (typeof page.next !== "string" || !page.next.length)) throw Error("Invalid photo cursor");
        const items = page.items.map((item) => {
          if (!item || !["photo", "folder"].includes(item.kind) || !item.id || !item.reference || !item.title) throw Error("Invalid photo entry");
          return {
            id: item.id,
            title: item.title,
            reference: item.reference,
            kind: item.kind,
            subtitle: item.subtitle || "",
            overview: item.overview || ""
          };
        });
        return { ...page.next === void 0 ? {} : { next: page.next }, items };
      }
    };
  }

  // src/mactv.ts
  async function handle(action, input = {}) {
    const page = await createGallery({ browse: (request) => host.library("photos", request) }).handle(action, input);
    return { ...page, items: page.items.map((item) => ({ ...item, source: "community.gallery" })) };
  }
  return __toCommonJS(mactv_exports);
})();
