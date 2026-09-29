import type { Preview } from '@storybook/react-vite';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'white',
      values: [{ name: 'white', value: '#FFFFFF' }],
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
