// plugins/docusaurus-plugin-imgflex-transform/transform-imgflex-src.ts
import { visit } from 'unist-util-visit';
import { Plugin } from 'unified';
import { Node } from 'unist';

interface MDXAttribute {
  name: string;
  type: string;
  value: string | null | {
    type: 'mdxJsxExpression';
    value: string;
  };
}

interface JSXNode extends Node {
  type: 'jsx' | 'mdxJsxFlowElement' | 'mdxJsxTextElement';
  value?: string;
  name?: string;
  attributes?: MDXAttribute[];
}

const transformImgFlexSrc: Plugin = () => {
  return (tree: Node) => {
    visit(tree, (node: JSXNode) => {
      if (node.type === 'jsx' && node.value) {
        const jsxString = node.value;
        const regex = /<ImgFlex\s+src=['"](.+?)['"]\s*(.*)\/>/g;
        const transformedString = jsxString.replace(regex, (match, p1, p2) => {
          return `<ImgFlex src={require('${p1}')} ${p2}/>`;
        });
        node.value = transformedString;
      }

      // Handle MDX JSX nodes (mdxJsxFlowElement and mdxJsxTextElement)
      if ((node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') && node.name === 'ImgFlex') {
        node.attributes?.forEach((attr) => {
          if (attr.name === 'src' && typeof attr.value === 'string') {
            const originalSrc = attr.value;
            attr.type = 'mdxJsxExpression';
            attr.value = `require('${originalSrc}')`;
          }
        });
      }
    });
  };
};

export default transformImgFlexSrc;
