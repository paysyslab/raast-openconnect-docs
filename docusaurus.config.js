// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OpenConnect — RAAST Integration Docs',
  tagline: 'Technical Specification Guides for RAAST Bulk Sending, P2P, P2M, PISP & Remittance via OpenConnect Middleware',
  favicon: 'img/favicon.png',

  url: 'https://1912152.github.io',
  baseUrl: '/raast-openconnect-docs/',
  organizationName: '1912152',
  projectName: 'raast-openconnect-docs',

  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      '@scalar/docusaurus',
      {
        id: 'raast-openconnect',
        label: 'API Specification',
        route: '/api-specifications',
        showNavLink: false,
        configuration: {
          url: 'openapi/raast-openconnect-api.yml',
          layout: 'modern',
          theme: 'default',
          darkMode: true,
          defaultOpenAllTags: false,
          hideModels: false,
          hideTestRequestButton: false,
          hideSearch: false,
          hideDarkModeToggle: false,
          hideLogo: false,
          proxyUrl: 'https://proxy.scalar.com',
          branding: {
            title: 'OpenConnect RAAST API',
            logo: '/img/PaysysLogo.png',
            favicon: '/img/favicon.png',
          },
        },
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          editUrl: 'https://github.com/1912152/raast-openconnect-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/OpenConnect.png',

      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },

      navbar: {
        logo: {
          alt: 'Paysys Labs',
          src: 'img/PaysysLogo.png',
          href: '/',
        },
        items: [
          { to: '/', label: 'Overview', position: 'left', activeBaseRegex: '^/raast-openconnect-docs/$' },
          { to: '/introduction', label: 'Documentation', position: 'left' },
          { to: '/api-specifications', label: 'API Specification', position: 'left' },
          {
            type: 'dropdown',
            label: 'Modules',
            position: 'left',
            items: [
              { label: 'Bulk Sending (v1.10)', to: '/bulk-sending/' },
              { label: 'P2P (v3.5)',           to: '/p2p/' },
              { label: 'P2M (v1.8.2)',         to: '/p2m/' },
              { label: 'PISP (v1.9)',           to: '/pisp/' },
              { label: 'Remittance (v1.5)',     to: '/remittance/' },
            ],
          },
          {
            href: 'https://github.com/1912152/raast-openconnect-docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },

      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              { label: 'Introduction',    to: '/introduction' },
              { label: 'Product Feature', to: '/product-feature' },
              { label: 'Authentication',  to: '/authentication' },
            ],
          },
          {
            title: 'Modules',
            items: [
              { label: 'Bulk Sending', to: '/bulk-sending/' },
              { label: 'P2P',         to: '/p2p/' },
              { label: 'P2M',         to: '/p2m/' },
              { label: 'PISP',        to: '/pisp/' },
              { label: 'Remittance',  to: '/remittance/' },
            ],
          },
          {
            title: 'API',
            items: [
              { label: 'API Reference (OpenAPI)', to: '/api-specifications' },
            ],
          },
          {
            title: 'Legal',
            items: [
              { label: 'Privacy Policy',  href: 'https://paysyslabs.com/privacy' },
              { label: 'Terms of Service', href: 'https://paysyslabs.com/terms' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Paysys Labs. All rights reserved.`,
      },

      prism: {
        theme: prismThemes.nightOwl,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['json', 'bash', 'yaml'],
      },
    }),
};

export default config;
