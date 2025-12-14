import {
  BRAND_NAME,
  WEBSITE_URL,
  CONTACT_PHONE,
  STORE_LOCATION,
  SOCIAL_FACEBOOK,
  SOCIAL_INSTAGRAM,
} from '@/lib/constants';

const JsonLdSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        'name': BRAND_NAME,
        'url': WEBSITE_URL,
        'logo': `${WEBSITE_URL}/logo.png`, // To be replaced with actual logo
        'sameAs': [
          SOCIAL_FACEBOOK,
          SOCIAL_INSTAGRAM
        ]
      },
      {
        '@type': 'LocalBusiness',
        'name': BRAND_NAME,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Rampally',
          'addressLocality': 'Hyderabad',
          'addressRegion': 'TS',
          'addressCountry': 'IN'
        },
        'telephone': CONTACT_PHONE,
        'url': WEBSITE_URL,
        'image': `${WEBSITE_URL}/og-image.jpg`, // To be replaced
        'priceRange': '$$',
        'sameAs': [
          SOCIAL_FACEBOOK,
          SOCIAL_INSTAGRAM
        ],
        'geo': {
            '@type': 'GeoCoordinates',
            // These are approximate coordinates for Rampally. To be replaced with exact location.
            'latitude': '17.4771', 
            'longitude': '78.6015'
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default JsonLdSchema;
