const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  }
]

module.exports = {
  //assetPrefix: './',
  exportPathMap: () => {
    return { '/': { page: '/' } };
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}