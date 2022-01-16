module.exports = {
   // mode: 'jit',
   prefix: 'tw-',
   important: true,
   content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            primary: '#0367a6',
            secondary: '#ff8c0a',
         },
         screens: {
            '3xl': '1792px',
            '4xl': '2048px',
         },
      },
   },
   plugins: [require('@tailwindcss/typography')],
};
