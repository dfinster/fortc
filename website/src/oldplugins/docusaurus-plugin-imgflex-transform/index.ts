// plugins/docusaurus-plugin-imgflex-transform/index.ts
import transformImgFlexSrc from './transform-imgflex-src';

export default function myDocusaurusPlugin(context, options) {
  console.log('Initializing myDocusaurusPlugin...');

  return {
    name: 'docusaurus-plugin-imgflex-transform',

    beforeDefaultRemarkPlugins() {
      console.log('Applying ImgFlex transformation...');
      // Inject our Remark plugin before Docusaurus's default ones
      return [transformImgFlexSrc];
    },
  };
}
