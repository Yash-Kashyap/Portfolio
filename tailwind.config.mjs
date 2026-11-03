/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        mute: 'var(--mute)',
        hair: 'var(--hair)',
        surf: 'var(--surf)',
        acc: 'var(--acc)',
        onink: 'var(--onink)',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
        sans: ['"Inter Tight"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      screens: {
        md: '768px',
      },
    },
  },
  plugins: [],
};

