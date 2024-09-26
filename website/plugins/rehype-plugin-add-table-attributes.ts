import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { Element } from 'hast';

const tablesortPlugin: Plugin = () => {
  let tableCount = 0; // Track the sequence number of tables on the page

  return (tree: any) => {
    visit(tree, 'element', (node: Element) => {
      // Only process table elements
      if (node.tagName === 'table' && node.properties) {
        let isSortableTable = false;

        // Increment the table count to assign a unique ID
        tableCount += 1;
        const tableId = `sortable-table-${tableCount}`;

        // Check for the [!tablesort] directive in the first row (headers)
        node.children?.forEach((child: any) => {
          if (child.tagName === 'thead' && child.children) {
            child.children?.forEach((row: any) => {
              row.children?.forEach((th: any) => {
                th.children?.forEach((textNode: any) => {
                  if (textNode?.type === 'text') {
                    // Apply sorting only if the [!tablesort] directive is found
                    if (textNode.value.includes('[!tablesort]')) {
                      isSortableTable = true;
                      textNode.value = textNode.value.replace('[!tablesort]', '').trim();
                      console.log(`Found [!tablesort] directive, making table sortable with ID: ${tableId}`);
                    }
                  }
                });
              });
            });
          }
        });

        // Only make the table sortable if the [!tablesort] directive was found
        if (isSortableTable) {
          // Assign the unique ID and class to the table
          node.properties.id = tableId;
          node.properties.className = Array.isArray(node.properties.className)
            ? node.properties.className.concat('sortable-table')
            : [node.properties.className, 'sortable-table'].filter((item): item is string | number => Boolean(item));

          console.log(`Processing sortable table with ID: ${tableId}`);

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

          // Look for [!!number], [!!date], and other column sorting directives
          node.children?.forEach((child: any) => {
            if (child.tagName === 'thead' && child.children) {
              child.children?.forEach((row: any) => {
                row.children?.forEach((th: any) => {
                  th.children?.forEach((textNode: any) => {
                    if (textNode?.type === 'text') {
                      const match = textNode.value.match(/\[!!(number|date|filesize|monthname|dotsep)\]/);
                      if (match) {
                        const sortType = match[1];
                        th.properties = th.properties || {};
                        th.properties['data-sort-method'] = sortType;
                        textNode.value = textNode.value.replace(/\[!!(number|date|filesize|monthname|dotsep)\]/, '').trim();
                        console.log(`Modified header: ${textNode.value}, data-sort-method: ${sortType}`);
                      }
                    }
                  });
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
