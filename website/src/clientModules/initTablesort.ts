import Tablesort from '../js/tablesort/tablesort';
import '../js/tablesort/sorts/tablesort.dotsep.js';
import '../js/tablesort/sorts/tablesort.date.js';
import '../js/tablesort/sorts/tablesort.filesize.js';
import '../js/tablesort/sorts/tablesort.monthname.js';
import '../js/tablesort/sorts/tablesort.number.js';

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// Function to initialize Tablesort on tables with the 'sortable-table' class
const applyTablesort = () => {
  const tables = document.querySelectorAll('table.sortable-table');
  tables.forEach((table) => {
    if (!table.hasAttribute('data-tablesort-applied')) {
      Tablesort(table);
      table.setAttribute('data-tablesort-applied', 'true'); // Ensure it doesn't reapply
      console.log(`Tablesort applied to table with ID: ${table.id}`);
    }
  });
};

// Ensure this only runs in the browser
if (ExecutionEnvironment.canUseDOM) {
  // Apply Tablesort on the initial page load
  window.addEventListener('load', applyTablesort);

  // Apply Tablesort on every route update in Docusaurus
  window.addEventListener('docusaurus.routeDidUpdate', applyTablesort);

  // Use a MutationObserver to handle any DOM changes dynamically
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        applyTablesort(); // Reapply Tablesort when the DOM changes
      }
    }
  });

  // Start observing changes in the body of the document
  observer.observe(document.body, {
    childList: true,
    subtree: true, // Watch all children and subtrees for changes
  });
}
