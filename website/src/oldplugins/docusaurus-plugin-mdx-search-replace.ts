import { Plugin } from '@docusaurus/types';

type ContentLoadedProps = {
  content?: string; // The content might be undefined, so let's mark it optional
  actions: {
    setGlobalData: (data: any) => void;
  };
};

// Helper function to perform search and replace
const searchAndReplaceInMDX = (content: string): string => {
  if (!content) {
    // Handle the case where content is empty or undefined
    return '';
  }
  // Use regular expressions or string replace functions to modify the MDX content
  // Example: Replace <TagA> with <TagB>
  return content.replace(/<ImgFlex/g, '<br /><br /><br /><br /><br /><br /><br /><br /><br /><img class="finster"');
};

const pluginMdxSearchReplace = (): Plugin => {
  return {
    name: 'docusaurus-plugin-mdx-search-replace',

    // Hook into the loadContent lifecycle phase
    async loadContent(): Promise<void> {
      // This hook happens before the content is converted to MDAST
      // Perform any necessary async tasks here, if needed
    },

    // Hook into the contentLoaded lifecycle phase
    async contentLoaded({ content, actions }: ContentLoadedProps): Promise<void> {
      const { setGlobalData } = actions;

      // Ensure content is defined before passing it to searchAndReplaceInMDX
      const updatedContent = content ? searchAndReplaceInMDX(content) : '';

      // Set the modified content to be used globally in the build
      setGlobalData(updatedContent);
    },

    configureWebpack(config, isServer, utils) {
      // Any Webpack configuration customizations can go here
      return {};
    },
  };
};

export default pluginMdxSearchReplace;
