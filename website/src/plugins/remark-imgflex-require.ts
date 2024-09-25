// plugins/remark-imgflex-require.ts

import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import type { Node } from 'unist';
import {
  MdxJsxFlowElement,
  MdxJsxAttribute,
  MdxJsxAttributeValueExpression,
} from 'mdast-util-mdx-jsx';
import * as acorn from 'acorn';
import { Program, ExpressionStatement, Expression } from 'estree';

const remarkImgFlexRequire: Plugin = () => {
  return (tree: Node) => {
    visit(tree, 'mdxJsxFlowElement', (node) => {
      const mdxNode = node as MdxJsxFlowElement;

      if (mdxNode.name === 'ImgFlex') {
        // Function to process an attribute
        const processAttribute = (attrName: string) => {
          // Find the attribute
          const attribute = mdxNode.attributes.find(
            (attr): attr is MdxJsxAttribute =>
              attr.type === 'mdxJsxAttribute' && attr.name === attrName
          );

          if (attribute && typeof attribute.value === 'string') {
            // Prepare the expression
            const expression = `require('${attribute.value}')`;

            // Parse the expression into an ESTree Expression node
            const parsedExpression = acorn.parseExpressionAt(expression, 0, {
              ecmaVersion: 2020,
              sourceType: 'module',
            }) as Expression;

            // Wrap the Expression in a Program node
            const estree: Program = {
              type: 'Program',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: parsedExpression,
                } as ExpressionStatement,
              ],
              sourceType: 'module',
            };

            // Set the attribute value as an expression
            const newValue: MdxJsxAttributeValueExpression = {
              type: 'mdxJsxAttributeValueExpression',
              value: expression,
              data: {
                estree,
              },
            };

            attribute.value = newValue;
          }
        };

        // Process 'src' attribute
        processAttribute('src');

        // Process 'darksrc' attribute if it exists
        processAttribute('darksrc');
      }
    });
  };
};

export default remarkImgFlexRequire;
