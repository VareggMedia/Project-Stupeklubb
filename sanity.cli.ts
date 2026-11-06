import { defineCliConfig } from "@sanity/cli";

// Only for TypeGen. The schema and Studio live in VareggMedia/Stupeklubb-CMS:
// after a schema change, run `npm run schema:extract` there, copy its schema.json here,
// then `npm run typegen`.
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  typegen: {
    path: "./{src,sanity}/**/*.{ts,tsx}",
    schema: "schema.json",
    generates: "./sanity.types.ts",
    overloadClientMethods: true,
  },
});
