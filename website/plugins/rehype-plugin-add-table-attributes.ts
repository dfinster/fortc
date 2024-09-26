import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { Element } from 'hast';

const tablesortPlugin: Plugin = () => {
  let tableCount = 0; // To track the sequence number of tables on the page

  return (tree: any) => {
    visit(tree, 'element', (node: Element) => {
      // Only process table elements
      if (node.tagName === 'table' && node.properties) {
        let isSortableTable = false;

        // Increment the table count to assign a unique ID
        tableCount += 1;
        const tableId = `sortable-table-${tableCount}`;

        // Look for [!tablesort] directive in the first row (headers)
        node.children?.forEach((child: any) => {
          if (child.tagName === 'thead' && child.children) {
            child.children?.forEach((row: any) => {
              row.children?.forEach((th: any) => {
                th.children?.forEach((textNode: any) => {
                  if (textNode?.type === 'text') {
                    // Check for the [!tablesort] directive
                    if (textNode.value.includes('[!tablesort]')) {
                      isSortableTable = true;
                      // Remove the [!tablesort] directive from the text
                      textNode.value = textNode.value.replace('[!tablesort]', '').trim();
                      console.log(`Found [!tablesort] directive, making table sortable with ID: ${tableId}`);
                    }
                  }
                });
              });
            });
          }
        });

        // If it's a sortable table, assign ID and class
        if (isSortableTable) {
          node.properties.id = tableId;
          node.properties.className = Array.isArray(node.properties.className)
            ? node.properties.className.concat('sortable-table')
            : [node.properties.className, 'sortable-table'].filter((item): item is string | number => Boolean(item));

          // Add the data-sort-default attribute to the first column
          node.children?.forEach((child: any) => {
            if (child.tagName === 'thead' && child.children) {
              child.children?.forEach((row: any) => {
                let isFirstColumn = true;
                row.children?.forEach((th: any) => {
                  if (isFirstColumn) {
                    th.properties = th.properties || {};
                    th.properties['data-sort-default'] = true;
                    isFirstColumn = false;
                    console.log(`Added data-sort-default to first column of table with ID: ${tableId}`);
                  }
                });
              });
            }
          });
        }
      }
    });
  };
};

export default tablesortPlugin;
