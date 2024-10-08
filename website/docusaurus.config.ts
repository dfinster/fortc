import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'David Finster',
  // tagline: "",
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://fortc.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'dfinster', // Usually your GitHub org/user name.
  projectName: 'fortc', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onBrokenAnchors: 'throw',
  onDuplicateRoutes: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          path: 'docs',
          editUrl: 'https://github.com/dfinster/fortc/blob/main/website/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: false,
          blogTitle: "David Finster's Blog",
          blogDescription: '',
          editUrl: 'https://github.com/dfinster/fortc/blob/main/website/',
          feedOptions: {
            title: "David Finster's Blog",
            description: '',
            copyright: 'Copyright ©️ David Finster',
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    // Replace with your project's social card
    image: 'img/web-profile.png',
    navbar: {
      title: 'David Finster',
      logo: {
        alt: 'Logo',
        src: 'img/logo.png',
        width: 32,
        height: 32,
      },
      items: [
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          type: 'doc',
          position: 'left',
          docId: 'index',
          label: 'Docs',
        },
        {
          href: 'https://github.com/dfinster',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: '<a href="https://github.com/dfinster/fortc/blob/main/LICENSE.md">License</a>',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
