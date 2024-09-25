// plugins/my-remark-plugin.ts
import transformImgFlexSrc from './transform-imgflex-src'; // Adjust this path as needed

export default function myRemarkPlugin(context, options) {
  console.log('Running myRemarkPlugin initialization...');

  return {
    name: 'remark-plugin-transform-imgflex-src',

    async loadContent() {
      console.log('Running loadContent...');
      return {};  // Returning empty content to ensure it's called
    },

    configureMDX() {
      console.log('Configuring MDX...');

      return {
        remarkPlugins: [
          transformImgFlexSrc,
          () => {
            console.log('Custom MDX plugin is running');
          },
        ],
      };
    },

    async contentLoaded({ content, actions }) {
      console.log('Content loaded:', content);
    },
  };
}
