var editor = CodeMirror.fromTextArea(document.getElementById('edtdeclaracao'), {
        mode: "text/x-sql",
        extraKeys: {"Ctrl-Space": "autocomplete"}, // To invoke the auto complete
        hint: CodeMirror.hint.sql,
        theme: "default",
        lineNumbers: true,
        matchBrackets: true,
        autofocus: true,
        styleActiveLine: true
  });

applyUserConfig();
