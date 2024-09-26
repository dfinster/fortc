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

        // Assign the unique ID and class to the table
        node.properties.id = tableId;
        node.properties.className = (node.properties.className || []).concat('sortable-table');

        console.log(`Processing table with ID: ${tableId}`);

        // Look for [!tablesort] directive in the first row (headers)
        node.children?.forEach((child: any) => {
          if (child.tagName === 'thead' && child.children) {
            child.children?.forEach((row: any) => {
              let isFirstColumn = true; // Track the first column
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

                    // If this is the first column, add the data-sort-default attribute
                    if (isFirstColumn) {
                      th.properties = th.properties || {};
                      th.properties['data-sort-default'] = true;
                      isFirstColumn = false; // Set to false after processing the first column
                      console.log(`Added data-sort-default to first column: ${textNode.value}`);
                    }
                  }
                });
              });
            });
          }
        });

        // If it's a sortable table, look for [!!number] and [!!date] directives in the headers
        if (isSortableTable) {
          node.children?.forEach((child: any) => {
            if (child.tagName === 'thead' && child.children) {
              child.children?.forEach((row: any) => {
                row.children?.forEach((th: any) => {
                  th.children?.forEach((textNode: any) => {
                    if (textNode?.type === 'text') {
                      // Look for the [!!number] or [!!date] directives
                      const match = textNode.value.match(/\[!!(number|date|filesize|monthname|dotsep)\]/);
                      if (match) {
                        const sortType = match[1];
                        th.properties = th.properties || {};
                        th.properties['data-sort-method'] = sortType;
                        // Remove the sorting directive from the visible text
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
