// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  // Comment out or remove this line to always use TinaCloud
  // contentApiUrlOverride: 
  //   process.env.NODE_ENV === "development" 
  //     ? "http://localhost:4001/graphql" 
  //     : undefined,
  branch: "main",
  clientId: process.env.TINA_CLIENT_ID || process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
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
          // Simplified: Use individual fields instead of nested object
          {
            type: "string",
            // Changed from number to string
            name: "value",
            label: "Value",
            required: false,
            ui: {
              description: "Metric value (can be a number or text)"
            }
          },
          {
            type: "string",
            name: "unit",
            label: "Unit",
            required: false,
            ui: {
              description: "e.g., hours, dollars, percentage"
            }
          },
          {
            type: "string",
            name: "trend",
            label: "Trend",
            required: false,
            options: ["up", "down", "stable", "n/a"]
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
            required: true,
            ui: {
              dateFormat: "YYYY-MM-DD"
            }
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
            options: ["concept", "development", "testing", "launched"],
            required: false
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: false,
            ui: {
              component: "textarea"
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
