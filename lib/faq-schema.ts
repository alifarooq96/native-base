/**
 * Builds schema.org FAQPage JSON-LD for Google rich results.
 * https://developers.google.com/search/docs/appearance/structured-data/faqpage
 */
export function buildFAQPageSchema(
  faqs: Array<{ question: string; answer: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question' as const,
      name: question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: answer,
      },
    })),
  };
}
