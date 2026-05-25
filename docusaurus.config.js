// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OpenConnect – RAAST Integration Docs',
  tagline: 'Technical Specification Guides for Raast Bulk Sending, P2P, P2M, PISP & Remittance via OpenConnect Middleware',
  favicon: 'img/favicon.png',

  url: 'https://paysyslab.github.io',
  baseUrl: '/raast-openconnect-docs/',
  organizationName: 'paysyslab',
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

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          editUrl: 'https://github.com/paysyslab/raast-openconnect-docs/tree/main/',
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
      image: 'img/social-card.png',

      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },

      navbar: {
        title: 'OpenConnect',
        logo: {
          alt: 'Paysys Labs Logo',
          src: 'img/PaysysLogo.png',
        },
        items: [
          { to: '/', label: 'Overview', position: 'left', activeBaseRegex: '^/$' },
          { to: '/product-feature', label: 'Product Features', position: 'left' },
          { to: '/authentication', label: 'Authentication', position: 'left' },
          {
            type: 'dropdown',
            label: 'Modules',
            position: 'left',
            items: [
              { label: 'Bulk Sending (v1.10)', to: '/bulk-sending/' },
              { label: 'P2P (v3.5)', to: '/p2p/' },
              { label: 'P2M – Merchant (v1.8.2)', to: '/p2m/' },
              { label: 'PISP (v1.9)', to: '/pisp/' },
              { label: 'Remittance (v1.5)', to: '/remittance/' },
            ],
          },
          {
            href: 'https://github.com/paysyslab/raast-openconnect-docs',
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
              { label: 'Introduction', to: '/' },
              { label: 'Product Features', to: '/product-feature' },
              { label: 'Authentication', to: '/authentication' },
            ],
          },
          {
            title: 'Modules',
            items: [
              { label: 'Bulk Sending', to: '/bulk-sending/' },
              { label: 'P2P', to: '/p2p/' },
              { label: 'P2M', to: '/p2m/' },
              { label: 'PISP', to: '/pisp/' },
              { label: 'Remittance', to: '/remittance/' },
            ],
          },
          {
            title: 'Legal',
            items: [
              { label: 'Privacy Policy', href: 'https://paysyslabs.com/privacy' },
              { label: 'Terms of Service', href: 'https://paysyslabs.com/terms' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Paysys Labs. All rights reserved.`,
      },

      prism: {
        theme: prismThemes.nightOwl,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['json', 'bash'],
      },
    }),
};

export default config;
