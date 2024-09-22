import { visit } from 'unist-util-visit';

const imgFlexSrc = (options) => {
  const transformer = async (ast) => {
    visit(ast, 'mdxJsxFlowElement', (node) => {
      console.log('Visiting node:', node.name); // Debugging statement
      if (node.name === 'ImgFlex') {
        console.log('Value:', node.value); // Debugging statement
        console.log('Attributes:', node.attributes); // Debugging statement
        const src = node.attributes.find((attr) => attr.name === 'src');
        if (src) {
          console.log('Src:', src.value); // Debugging statement
          src.value = `{require('${src.value}')}`;
          console.log('Src after replacement:', src.value); // Debugging statement
        }
      }
      // const imgFlexRegex = /<ImgFlex\s+src=['"](.+?)['"]\s*\/>/g;
      // const matches = imgFlexRegex.exec(node.value);
      // if (matches) {
      //   const filePath = matches[1];
      //   console.log('Match found:', filePath); // Debugging statement
      //   node.value = node.value.replace(imgFlexRegex, `<ImgFlex src={require('${filePath}')} />`);
      //   console.log('Node value after replacement:', node.value); // Debugging statement
      // }
    });
  };
  return transformer;
};

export default imgFlexSrc;
