import { visit } from 'unist-util-visit';

const imgFlexSrc = (options) => {
  console.log('in imgFlexSrc'); // Debugging statement
  const transformer = async (ast) => {
    visit(ast, 'mdxJsxFlowElement', (node: any) => {
      if (node.name !== 'ImgFlex') {
        return;
      }
      console.log('Visiting node:', node.name); // Debugging statement
      console.log('Visiting node:', node); // Debugging statement

      const srcAttribute = node.attributes.find(attr => attr.name === 'src');
      if (srcAttribute) {
        const filePath = srcAttribute.value;
        console.log('Match found:', filePath); // Debugging statement

        // Modify the src attribute to use require
        srcAttribute.type = 'mdxJsxAttributeValueExpression';
        srcAttribute.value = `require('${filePath}')`;
        console.log('Node value after replacement:', node); // Debugging statement
      }
    });
  };
  return transformer;
};

export default imgFlexSrc;
