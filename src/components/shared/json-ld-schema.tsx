import {
  BRAND_NAME,
  WEBSITE_URL,
  CONTACT_PHONE,
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
        'logo': `${WEBSITE_URL}/logo.svg`,
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': CONTACT_PHONE,
          'contactType': 'Customer Service'
        },
        'sameAs': [
          SOCIAL_FACEBOOK,
          SOCIAL_INSTAGRAM
        ]
      },
      {
        '@type': 'WebSite',
        'url': WEBSITE_URL,
        'name': BRAND_NAME,
        'publisher': {
          '@id': `${WEBSITE_URL}#organization`
        }
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${WEBSITE_URL}#organization`,
        'name': BRAND_NAME,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Rampally',
          'addressLocality': 'Hyderabad',
          'addressRegion': 'TS',
          'postalCode': '501301',
          'addressCountry': 'IN'
        },
        'telephone': CONTACT_PHONE,
        'url': WEBSITE_URL,
        'image': `${WEBSITE_URL}/og-image.png`,
        'priceRange': '$$',
        'openingHours': 'Mo-Su 10:00-21:00',
        'sameAs': [
          SOCIAL_FACEBOOK,
          SOCIAL_INSTAGRAM
        ],
        'geo': {
            '@type': 'GeoCoordinates',
            'latitude': '17.485122', 
            'longitude': '78.601931'
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
