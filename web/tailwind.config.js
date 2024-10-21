/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sidebar: '#1C1E26',
        card: '#F2F4F7',
        main: '#FF6A3D',
        mainDark: '#D14F2B',
        input: '#F9FAFB',
        textPrimary: '#212B36',
        textSecondary: '#9CA3AF',
        modalBg: '#FFFFFF',

        infoLight: '#BFDBFE',
        infoPrimary: '#3B82F6',
        attentionLight: '#FEF3C7',
        attentionOPrimary: '#F59E0B',
        warnLight: '#FED7AA',
        warnPrimary: '#F97316',
        errorLight: '#FECACA',
        errorPrimary: '#EF4444',
        successLight: '#A7F3D0',
        successPrimary: '#10B981',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
