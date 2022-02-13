/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['links.papareact.com', 'jsonkeeper.com/', 'upload.wikimedia.org'],
  },
  env: {
    mapbox_token:
      'pk.eyJ1IjoidHVyZXgwNCIsImEiOiJja3pmeTBuM2UwdzBsMndwanF0dXNoZHUxIn0.5D4CaU4s5tyFjcfXAKZ0Tw',
  },
}
