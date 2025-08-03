// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  contentApiUrlOverride: true ? "http://localhost:4001/graphql" : void 0,
  // Let it use TinaCloud in production
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "metrics",
        label: "Metrics",
        path: "content/metrics",
        format: "json",
        fields: [
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true
          },
          {
            type: "string",
            name: "week",
            label: "Week",
            required: true
          },
          {
            type: "object",
            name: "data",
            label: "Data",
            fields: [
              {
                type: "number",
                name: "value",
                label: "Value"
              },
              {
                type: "string",
                name: "unit",
                label: "Unit"
              },
              {
                type: "string",
                name: "trend",
                label: "Trend"
              }
            ]
          }
        ]
      },
      {
        name: "findings",
        label: "Findings",
        path: "content/findings",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: ["WORK", "LIFE"],
            required: true
          },
          {
            type: "string",
            name: "week",
            label: "Week",
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      },
      {
        name: "apps",
        label: "Apps",
        path: "content/apps",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "status",
            label: "Status",
            options: ["concept", "development", "testing", "launched"]
          },
          {
            type: "string",
            // ← Change from 'rich-text' to 'string'
            name: "description",
            label: "Description",
            ui: {
              component: "textarea"
              // Allow multi-line text
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
