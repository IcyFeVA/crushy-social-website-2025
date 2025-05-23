import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    // {
    //   text: 'The App',
    //   links: [
    //     {
    //       text: 'Features (Anchor Link)',
    //       href: getPermalink('/#features'),
    //     },
    //     {
    //       text: 'Services',
    //       href: getPermalink('/services'),
    //     },
    //     {
    //       text: 'Pricing',
    //       href: getPermalink('/pricing'),
    //     },
    //     {
    //       text: 'About us',
    //       href: getPermalink('/about'),
    //     },
    //     {
    //       text: 'Contact',
    //       href: getPermalink('/contact'),
    //     },
    //     {
    //       text: 'Terms',
    //       href: getPermalink('/terms'),
    //     },
    //     {
    //       text: 'Privacy policy',
    //       href: getPermalink('/privacy'),
    //     },
    //   ],
    // },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
    {
      text: 'Blog',
      href: getPermalink('/blog'),
    },
  ],
  // actions: [{ text: 'Download the App', href: 'https://github.com/onwidget/astrowind', target: '_blank' }],
  actions: [{ text: '2025 Dating App Analysis', href: getPermalink('/research/dating-app-pain-points') }],
};

export const footerData = {
  links: [
    {
      title: "We’re here to help you connect, one vibe at a time. Reach out to us anytime.",
    },
    {
      title: 'Platform',
      links: [
        { text: 'Features', href: "/#features" },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'Help', href: getPermalink('/contact') },
        { text: 'Feedback', href: getPermalink('/contact') },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: getPermalink('/about') },
        { text: 'Blog', href: getPermalink('/blog') },
        // { text: 'Careers', href: '#' },
        // { text: 'Press', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'TikTok', icon: 'tabler:brand-tiktok', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    // { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    // { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/onwidget/astrowind' },
  ],
  footNote: `
    Copyright 2025 by Crushy Social Inc. · All rights reserved.
  `,
};
