/** Renders schema.org structured data. Produces no visible output. */
export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.filter(Boolean).map((item, idx) => {
        const enriched = (typeof item === 'object' && item !== null && !('@context' in item))
          ? { '@context': 'https://schema.org', ...item }
          : item;
        return (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(enriched).replace(/</g, '\\u003c') }}
          />
        );
      })}
    </>
  );
}
