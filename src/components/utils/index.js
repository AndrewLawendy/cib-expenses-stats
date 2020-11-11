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
  const jsonData = $('[ng-repeat*="txn in creditCardTransactions"]').map((_, row) => {
      var cells = $(row).find('.tbl-cell').toArray();
      var [date, description, amount, debitOrCredit] = cells;
      return {
          date : date.innerText.trim(),
          description: description.innerText.trim(),
          amount: amount.innerText.trim().replace(',', ''),
          debitOrCredit: debitOrCredit.innerText.trim()
      }
  }).toArray();

  const monthFilteredData = jsonData.filter(row => {
      const [, rowMonth, rowYear] = row.date.split('/');
      return rowMonth == month && rowYear == year && row.debitOrCredit !== 'Credit'
  });

  copyToClipboard(JSON.stringify(monthFilteredData))
}
getCreditTable(${month}, ${year})`;
