import { BrowserKey } from '@/lib/definitions'

export const DATA = {
  name: 'Drowser, explore new way to write tests',
  url: 'https://drowser.kinotio.io',
  description: 'A easy way to implement and write Selenium with TypeScript using Deno',
  social_url: {
    github: 'https://github.com/kinotio',
    discord: 'https://discord.gg/cskvbKQA',
    linkedin: 'https://linkedin.com/company/kinotio',
    x: 'https://x.com/kinotiodotio'
  },
  repo: 'https://github.com/kinotio/drowser',
  doc_repo: 'https://github.com/kinotio/drowser/tree/main',
  keywords: [
    'Drowser',
    'Drowser Studio',
    'Open Source',
    'Test',
    'Testing',
    'e2e',
    'Free',
    'Selenium'
  ],
  color: {
    gradient: {
      from: '#6048e7',
      to: '#56d49e'
    },
    base: {
      dark: '#000000',
      light: '#ffffff'
    }
  },
  navbar: [
    {
      href: 'https://docs.kinotio.io/docs/drowser',
      name: 'Docs'
    }
  ],
  footer: {
    contact: [
      {
        icon: 'Mail',
        href: 'mailto:contact@kinotio.io',
        label: 'contact@kinotio.io'
      }
    ],
    help: [
      {
        href: '#faq',
        name: 'FAQ'
      },
      {
        href: 'https://github.com/kinotio/drowser/issues',
        name: 'Issues (Drowser)'
      },
      {
        href: 'https://github.com/kinotio/drowser-studio/issues',
        name: 'Issues (Drowser Studio)'
      }
    ],
    legal: [
      {
        href: '/legal/terms',
        name: 'Terms'
      },
      {
        href: '/legal/privacy',
        name: 'Privacy'
      }
    ],
    socials: [
      {
        icon: 'Github',
        href: 'https://github.com/kinotio',
        name: 'github'
      },
      {
        icon: 'X',
        href: 'https://x.com/kinotiodotio',
        label: 'X'
      },
      {
        icon: 'Linkedin',
        href: 'https://linkedin.com/company/kinotio',
        label: 'LinkedIn'
      },
      {
        icon: 'MessageCircle',
        href: 'https://discord.gg/cskvbKQA',
        label: 'Discord'
      }
    ]
  },
  trustedBy: [
    {
      icon: 'Crown',
      name: 'Your company'
    },
    {
      icon: 'Crown',
      name: 'Your company'
    },
    {
      icon: 'Crown',
      name: 'Your company'
    },
    {
      icon: 'Crown',
      name: 'Your company'
    }
  ],
  features: {
    lib: {},
    studio: [
      {
        title: 'Monitoring',
        description:
          'Easily monitor application performance with real-time insights, powered by Drowser’s automated testing capabilities.',
        icon: 'MonitorCheck'
      },
      {
        title: 'Friendly User Interface',
        description:
          'Access and visualize test reports through a user-friendly interface designed for clarity and ease of use.',
        icon: 'Handshake'
      },
      {
        title: 'Productivity',
        description:
          'Improve your workflow by quickly analyzing test results and making informed decisions with streamlined reporting tools.',
        icon: 'TrendingUp'
      },
      {
        title: 'Graph Visualization',
        description:
          'Easily interpret test results with dynamic graph visualizations, turning complex data into clear, actionable insights.',
        icon: 'Share2'
      }
    ]
  },
  faq: [
    {
      question: 'What is this package used for?',
      answer:
        "This package allows you to write end-to-end (E2E) tests using Selenium WebDriver in Deno. It's designed to automate browser actions, enabling testing of web applications in different environments."
    },
    {
      question: 'Why use Deno instead of Node.js?',
      answer:
        "Deno offers several advantages over Node.js, such as TypeScript support out of the box, secure by default (no access to files, network, or environment variables unless explicitly enabled), and a modern standard library. It's also designed with ES Modules, making it a good fit for modern JavaScript development."
    },
    {
      question: 'What browsers are supported?',
      answer:
        "The package supports major browsers like Chrome, Firefox, and Edge. Ensure you have the corresponding WebDriver executable installed and available in your system's PATH."
    }
  ],
  supportedBrowsers: ['chrome', 'firefox', 'edge', 'safari'] as BrowserKey[]
}
