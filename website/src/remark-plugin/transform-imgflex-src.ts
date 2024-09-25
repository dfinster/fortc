// src/remark-plugin/transform-imgflex-src.ts
import { visit } from 'unist-util-visit';
import { Plugin } from 'unified';
import { Node } from 'unist';

// Define a type for MDX attributes
interface MDXAttribute {
  name: string;
  type: string;
  value: string | null | {
    type: 'mdxJsxExpression';
    value: string;
  };
}

// Define the type of the MDX JSX nodes
interface JSXNode extends Node {
  type: 'jsx' | 'mdxJsxFlowElement' | 'mdxJsxTextElement';
  value?: string;  // For regular `jsx` nodes
  name?: string;   // For MDX JSX nodes (e.g., `mdxJsxFlowElement`)
  attributes?: MDXAttribute[];  // Attributes array for MDX JSX nodes
}

const transformImgFlexSrc: Plugin = () => {
  console.log('Top of transformImgFlexSrc:');  // Debugging statement

  return (tree: Node) => {
    visit(tree, (node: JSXNode) => {
      // Handle `jsx` type nodes (regular JSX inside MDX)
      if (node.type === 'jsx' && node.value) {
        const jsxString = node.value;
        console.log('transformImgFlexSrc (jsx):', jsxString);  // Debugging statement

        // Regular expression to match <ImgFlex src='./path/to/file.png' />
        const regex = /<ImgFlex\s+src=['"](.+?)['"]\s*(.*)\/>/g;

        // Replace src='./path/to/file.png' with src={require('./path/to/file.png')}
        const transformedString = jsxString.replace(regex, (match, p1, p2) => {
          return `<ImgFlex src={require('${p1}')} ${p2}/>`;
        });

        console.log('transformImgFlexSrc (jsx transformed):', transformedString);  // Debugging statement

        // Update the node value with the transformed string
        node.value = transformedString;
      }

      // Handle MDX JSX nodes (mdxJsxFlowElement and mdxJsxTextElement)
      if ((node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') && node.name === 'ImgFlex') {
        console.log('transformImgFlexSrc (MDX JSX):', node);  // Debugging statement

        // Find the `src` attribute and transform it
        node.attributes?.forEach((attr) => {
          if (attr.name === 'src' && typeof attr.value === 'string') {
            const originalSrc = attr.value;
            console.log('Original src:', originalSrc);  // Debugging statement

            // Ensure the `src` attribute is set as an MDX JSX expression
            attr.type = 'mdxJsxExpression';  // Important to mark it as an expression
            attr.value = `{require('${originalSrc}')}`;

            console.log('Transformed src (as expression):', attr.value);  // Debugging statement
          }
        });
      }
    });
  };
};

export default transformImgFlexSrc;
