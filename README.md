# Bem vindo ao Query History! Seu addon realmente SIMPLES!

### Projeto descontinuado porque foi migrado como extensão do Chrome
- [Novo repositório git](https://github.com/achambel/chrome-query-history)
- [Extensão na Chrome Web Store](https://chrome.google.com/webstore/detail/query-history/fndkobkoibdcgncjboobhfmkaikhndhg)

### Recursos

- Visual moderno
- Editor de query com autocomplete
- Salve suas queries e recupere-as a um click
- Exporte suas queries para um arquivo.sql
- Exporte suas queries em JSON  e utilize-as em outro browser com o Query History instalado
- Gere DML INSERT com os resultados das consultas
- Visualize linhas do resultado das consultas na vertical

### Shortcuts
| Atalho     | Função          |
|------------|-----------------|
| Ctrl+Enter | Executa a query |
| Ctrl+Space | Autocomplete    |

### Página antes do addon
![](data/img/before.png?raw=true)

### Página depois do addon
![](data/img/demo.gif?raw=true)

### Instalação:

- Este add-on está disponível apenas para [Firefox 39+](https://www.mozilla.org/pt-BR/firefox/new/)
- Faça o download da extensão clicando [aqui](https://github.com/achambel/query_history/blob/master/xpi/query_history.xpi?raw=true)
- Abra o arquivo query_history.xpi diretamente pelo browser
![](data/img/install-step-1.png?raw=true)
![](data/img/install-step-2.png?raw=true)

- Clique no botão instalar agora
![](data/img/install-step-3.png?raw=true)

- Pronto!!! Toda vez que acessar a URL de execução direta do SIMPLES, o addon entrará em ação!

### Colabore:

1. Foi utilizado o addon-sdk-1.17, e à época ainda utilizava a tool cfx. Mais informações [aqui](https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Installation).
2. Depois de realizado o download do sdk, é preciso adicionar o cfx no PATH da sua command line. Siga as instruções do link acima.
3. Mantenha atualizado o arquivo package.json e lembre-se de ao gerar o pacote xpi, utilizar as opções de atualização:


```
$ cfx xpi --output-file xpi/query_history.xpi --update-link https://github.com/achambel/query_history/blob/master/xpi/query_history.xpi?raw=true --update-url https://raw.githubusercontent.com/achambel/query_history/master/query_history.update.rdf
```

4. Clone o projeto:

```
$ git clone https://github.com/achambel/query_history.git
$ cd query_history
```

5. Crie um branch com um nome amigável:

```
$ git branch <seu_nome_amigavel>
```

6. Marque suas alterações. Adicione/altere README e CHANGELOG se necessário
7. Dê um push nas suas alterações para criar o branch
8. Crie um pull request
9. Divirta-se!!!
