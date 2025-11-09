import { MetadataRoute } from 'next';

/**
 * Genera el manifest.json para PWA
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'La Última Medina',
    short_name: 'LUM',
    description: 'Educación islámica accesible, rigurosa y transformadora',
    start_url: '/es',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1a5632',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['education', 'religion'],
    lang: 'es',
  };
}

