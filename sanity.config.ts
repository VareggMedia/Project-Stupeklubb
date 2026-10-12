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
  plugins: [structureTool()],
});
