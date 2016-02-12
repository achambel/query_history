function generateInsert (tableName) {
  var fields = document.querySelectorAll('#GridResultado th').textContent();
  var _values = document.querySelectorAll('#GridResultado td').textContent();

  var sql = [];

  _values.each_slice(
    fields.length, v => {
      sql.push(`INSERT INTO ${tableName}(${fields.join(", ")}) VALUES( ${v.map(str => toSqlType(str)).join(", ")} );`);
    }
  );

  return sql;
}

function toSqlType (data) {
    // number
    if (/^\d+$/.test(data)) {
      return data;
    }

    // date
    else if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(data)) {
      return `to_date('${data}', 'DD/MM/YYYY')`;
    }

    // timestamp
    else if (/^\d{1,2}\/\d{1,2}\/\d{4} \d{2}:\d{2}:\d{2}$/.test(data)) {
      return `to_timestamp('${data}', 'DD/MM/YYYY HH24:MI:SS')`;
    }

    // null
    else if (data.trim() === '') {
      return 'NULL';
    }

    // currency
    else if (/^\d{1,15},\d{2}$/.test(data)) {
      return data.replace(',', '.');
    }

    // varchar
    else {
      return `'${data}'`;
    }
}

function exportInsert () {
  var tableName = prompt('Infome o nome da tabela');
  var ele = document.querySelector('#exportar-insert');

  if (tableName != '' && tableName != null) {
    ele.setAttribute('download', `query_simples_insert_in_${tableName}_${Date.now()}.sql`);

    var data = generateInsert(tableName).join("\n");
    ele.setAttribute('href', 'data:text/sql;charset=utf-8,' + encodeURIComponent(data));
  }
  else {
    ele.removeAttribute('href');
    alert('Infome o nome da tabela para geração do arquivo!');
  }
}
