import { defineArrayMember, defineField, defineType } from "sanity";

// Én nyhetssak. Feltnavnene er norske, som resten av domenet (påmelding, medlemstype).
export const nyhetType = defineType({
  name: "nyhet",
  title: "Nyhet",
  type: "document",
  fields: [
    defineField({
      name: "tittel",
      title: "Tittel",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Adresse (slug)",
      description: "Lages fra tittelen – brukes i lenken til saken.",
      type: "slug",
      options: { source: "tittel", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dato",
      title: "Dato",
      type: "date",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hovedbilde",
      title: "Hovedbilde",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternativ tekst",
          description: "Hva viser bildet? Leses opp for blinde.",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ingress",
      title: "Ingress",
      description: "Kort sammendrag til nyhetslisten. Tomt = starten av teksten.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "innhold",
      title: "Innhold",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Overskrift", value: "h2" },
            { title: "Underoverskrift", value: "h3" },
          ],
          lists: [
            { title: "Punktliste", value: "bullet" },
            { title: "Nummerert liste", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Fet", value: "strong" },
              { title: "Kursiv", value: "em" },
            ],
            annotations: [
              defineArrayMember({
                name: "link",
                title: "Lenke",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.required().uri({ scheme: ["http", "https", "mailto", "tel"] }),
                  }),
                ],
              }),
            ],
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "bilder",
      title: "Flere bilder",
      description: "Vises som et bildegalleri under teksten.",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternativ tekst",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "bildetekst", title: "Bildetekst", type: "string" }),
          ],
        }),
      ],
    }),
  ],
  orderings: [
    { title: "Nyeste først", name: "datoDesc", by: [{ field: "dato", direction: "desc" }] },
  ],
  preview: {
    select: { title: "tittel", subtitle: "dato", media: "hovedbilde" },
  },
});
