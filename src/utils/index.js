export const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "fixed";
  el.style.left = "100%";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

export const getDataFunction = (month, year) => `function copyToClipboard(str) {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "fixed";
  el.style.left = "100%";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

function getCreditTable (month, year){
  const monthData = $('.acc_item_active + div [ng-repeat*="txn in creditCardTransactions"]').map((_, row) => {
      var cells = $(row).find('.tbl-cell').toArray();
      var [date, description, amount, debitOrCredit] = cells;
      return {
          date : date.innerText.trim(),
          description: description.innerText.trim(),
          amount: Number(amount.innerText.trim().replace(',', '')),
          debitOrCredit: debitOrCredit.innerText.trim()
      }
  }).toArray();

  const jsonData = monthData.filter(row => {
      const [, rowMonth, rowYear] = row.date.split('/');
      return rowMonth == month && rowYear == year && row.debitOrCredit !== 'Credit'
  });

  const accountKey = $('.acc_item_active .acc_name .acc_label').text();

  if(monthData.length > 0) {
    copyToClipboard(JSON.stringify({ accountKey, jsonData}));
    alert('Data for card '+ accountKey + ' are copied successfully.\\nPast them in the JSON Data field!');
  }
  else alert('Please open a desired credit card tab to copy the data.')
}
getCreditTable(${month}, ${year})`;

export const constructDateOutOfXls = (date) => {
  const months = {
    JAN: 1,
    FEB: 2,
    MAR: 3,
    APR: 4,
    MAY: 5,
    JUN: 6,
    JUL: 7,
    AUG: 8,
    SEP: 9,
    OCT: 10,
    NOV: 11,
    DEC: 12,
  };
  const day = date.slice(0, 2);
  const month = months[date.slice(2, 5)];
  const year = `20${date.slice(-2)}`;

  return `${day}/${month}/${year}`;
};
