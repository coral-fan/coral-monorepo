module.exports = {
  content: ['./src/components/features/home/*.tsx', './pages/exclusive-content/vb-on-road/*.tsx'],
  mode: 'jit',
  theme: {
    extend: {
      screens: {
        's-1': '1900px',
        's-2': '1100px',
      },
      width: {
        'w-1': '60px',
      },
      height: {
        'h-1': '60px',
      },
      minHeight: {
        'min-h-1': '335px',
      },
      margin: {
        'm-1': '1.375rem',
        'm-2': '1.125rem',
        'm-3': '8.25rem',
        'm-4': '5.625rem',
        'm-5': '6.75rem',
        'm-6': '4.625rem',
      },
      fontSize: {
        1: '2.125rem',
        2: '4rem',
        3: '5rem',
        4: '3.25rem',
        6: '0.9375rem',
      },
      lineHeight: {
        'lh-1': '0.875rem',
        'lh-2': '3.875rem',
        'lh-3': '1.375rem',
      },
      letterSpacing: {
        1: '0.05em',
        2: '0.01em',
        3: '-0.02em',
        4: '-0.005em',
        5: '-0.03em',
      },
      borderRadius: {
        1: '1.25rem',
        2: '6.25rem',
        3: '0.625rem',
        4: '3.125rem',
        5: '2.1875rem',
        6: '1.5625rem',
        7: '0.875rem',
      },
      backgroundImage: {
        1: 'linear-gradient(90deg, rgba(30,30,30,80%) 90%, rgba(30, 30, 30, 0) 100%)',
      },
      colors: {
        gray: {
          1: '#1E1E1E',
          2: '#F0F0F0',
          3: '#333333',
        },
        orange: {
          1: '#FFB890',
        },
      },
      dropShadow: {
        1: '0px 0px 50px rgba(0,0,0,1)',
      },
    },
  },
  plugins: [],
};
