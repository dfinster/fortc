import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { Element } from 'hast';

const tablesortPlugin: Plugin = () => {
  let tableCount = 0;

  const setSortable = (th: any, textNode: any) => {
    const match = textNode.value.match(/\[!!(number|date|filesize|monthname|dotsep)\]/);
    if (match) {
      const sortType = match[1];
      th.properties = th.properties || {};
      th.properties['data-sort-method'] = sortType;
      textNode.value = textNode.value.replace(/\[!!(number|date|filesize|monthname|dotsep)\]/, '').trim();
    }
  };

  const addTableAttributes = (node: Element, tableId: string) => {
    node.properties.id = tableId;
    node.properties.className = Array.isArray(node.properties.className)
      ? node.properties.className.concat('sortable-table')
      : [node.properties.className, 'sortable-table'].filter(Boolean);
  };

  return (tree: any) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'table' || !node.properties) return;

      tableCount += 1;
      const tableId = `sortable-table-${tableCount}`;
      let isSortableTable = false;

      node.children?.forEach((child: any) => {
        if (child.tagName === 'thead') {
          child.children?.forEach((row: any) => {
            row.children?.forEach((th: any) => {
              th.children?.forEach((textNode: any) => {
                if (textNode?.type === 'text') {
                  if (textNode.value.includes('[!tablesort]')) {
                    isSortableTable = true;
                    textNode.value = textNode.value.replace('[!tablesort]', '').trim();
                  }
                  setSortable(th, textNode);
                }
              });
            });
          });
        }
      });

      if (!isSortableTable) return;

      addTableAttributes(node, tableId);

      node.children?.forEach((child: any) => {
        if (child.tagName === 'thead') {
          child.children?.forEach((row: any) => {
            row.children?.forEach((th: any, index: number) => {
              if (index === 0) {
                th.properties = th.properties || {};
                th.properties['data-sort-default'] = true;
              }
            });
          });
        }
      });
    });
  };
};

export default tablesortPlugin;
