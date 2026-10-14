"use client";

// Sanity Studio, embedded in the site at /studio (decided with Kristoffer, #42).
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "stupeklubb",
  title: "Bergen Stupeklubb",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      // News newest first, by article date – the same order as the site
      structure: (S) =>
        S.list()
          .title("Innhold")
          .items([
            S.listItem()
              .id("nyhet")
              .title("Nyheter")
              .schemaType("nyhet")
              .child(S.documentTypeList("nyhet").title("Nyheter").defaultOrdering([{ field: "dato", direction: "desc" }])),
          ]),
    }),
  ],
});
