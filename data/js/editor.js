var editor = CodeMirror.fromTextArea(document.getElementById('edtdeclaracao'), {
        mode: "text/x-sql",
        theme: "default",
        lineNumbers: true,
        matchBrackets: true,
        autofocus: true,
        styleActiveLine: true
  });

applyUserConfig();
