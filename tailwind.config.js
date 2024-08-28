export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './slices/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    colors: {
      primary: 'var(--primary-color)',
      secondary: 'var(--secondary-color)',
      third: 'var(--third-color)',
      white: '#ffffff',
    },
    fontFamily: {
      body: 'var(--font-body)',
      display: 'var(--font-display)',
    },
    fontSize: {
      base: ['22px'],
      base_mb: ['20px'],

      xxl: [
        '150px',
        {
          lineHeight: 1,
        },
      ],
      xxl_mb: [
        '72px',
        {
          lineHeight: 1,
        },
      ],

      hero: [
        '130px',
        {
          lineHeight: 1,
        },
      ],
      hero_mb: [
        '52px',
        {
          lineHeight: 1,
        },
      ],

      xl: [
        '120px',
        {
          lineHeight: 1,
        },
      ],
      xl_mb: [
        '56px',
        {
          lineHeight: 1,
        },
      ],

      medium: [
        '45px',
        {
          lineHeight: 1,
        },
      ],
      medium_mb: [
        '24px',
        {
          lineHeight: 1,
        },
      ],

      headline: [
        '100px',
        {
          lineHeight: 1,
        },
      ],
      headline_mb: [
        '56px',
        {
          lineHeight: 1,
        },
      ],

      canvas: [
        '90px',
        {
          lineHeight: 1,
        },
      ],
      canvas_mb: [
        '40px',
        {
          lineHeight: 1,
        },
      ],

      subheadline: [
        '70px',
        {
          lineHeight: 1,
        },
      ],
      subheadline_mb: [
        '56px',
        {
          lineHeight: 1,
        },
      ],

      link: ['18px'],

      stats: [
        '130px',
        {
          lineHeight: 1,
        },
      ],
      stats_mb: [
        '72px',
        {
          lineHeight: 1,
        },
      ],
      stats_s: [
        '42px',
        {
          lineHeight: 1,
        },
      ],
      stats_s_mb: [
        '28px',
        {
          lineHeight: 1,
        },
      ],

      /* download: [
        '2.8rem',
        {
          fontWeight: '400',
        },
      ],
      readmore: [
        '3.4rem',
        {
          fontWeight: '400',
        },
      ],
      xsm: [
        '1.8rem',
        {
          lineHeight: '2.8rem',
          fontWeight: '400',
        },
      ],
      sm: [
        '2rem',
        {
          lineHeight: '3rem',
          fontWeight: '400',
        },
      ],
      base: [
        '2.2rem',
        {
          lineHeight: '3.5rem',
          fontWeight: '400',
        },
      ],
      md: [
        '4.5rem',
        {
          lineHeight: '6.3rem',
          fontWeight: '400',
        },
      ],
      lg: [
        '7rem',
        {
          lineHeight: '8.4rem',
          fontWeight: '700',
        },
      ],
      xl: [
        '10rem',
        {
          lineHeight: '11rem',
          fontWeight: '700',
        },
      ],
      '2xl': [
        '12rem',
        {
          lineHeight: '12rem',
          fontWeight: '700',
        },
      ],
      '3xl': [
        '13rem',
        {
          lineHeight: '13rem',
          fontWeight: '700',
        },
      ],
      '4xl': [
        '15rem',
        {
          lineHeight: '15rem',
          fontWeight: '700',
        },
      ], */
    },
    screens: {
      sm: '768px',
      md: '1024px',
      lg: '1440px',
      xl: '1680px',
    },
    container: {
      center: true,
    },
    spacing: {
      ...new Array(1001)
        .fill()
        .map((_, i) => i)
        .reduce((acc, val) => {
          acc[val] = `${val / 10}rem`;
          return acc;
        }, {}),
    },
    extend: {
      transitionTimingFunction: {
        'expo-in': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'expo-out': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      keyframes: {
        noise: {
          '0%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-5%,-5%)' },
          '20%': { transform: 'translate(-10%,5%)' },
          '30%': { transform: 'translate(5%,-10%)' },
          '40%': { transform: 'translate(-5%,15%)' },
          '50%': { transform: 'translate(-10%,5%)' },
          '60%': { transform: 'translate(15%,0)' },
          '70%': { transform: 'translate(0,10%)' },
          '80%': { transform: 'translate(-15%,0)' },
          '90%': { transform: 'translate(10%,5%)' },
          '100%': { transform: 'translate(5%,0)' },
        },
      },
      animation: {
        rotate: 'spin 10s linear infinite',
      },
      transform: {
        '-translate-y-1/2': '-50%',
        '-translate-x-1/2': '-50%',
      },
    },
  },
  plugins: [require('tailwindcss-3d')({ legacy: true })],
};
