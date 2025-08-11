# Simulador de Votação - Frontend

Interface web para o sistema de votação de filmes e séries.

## Tecnologias
- HTML5
- CSS3 (com variáveis e flexbox/grid)
- JavaScript vanilla (sem frameworks)

## Funcionalidades
- Listagem de filmes/séries com votação
- Sistema de votos positivos e negativos
- Cadastro de novos itens
- Contadores totais de votos
- Design responsivo
- Interface moderna e intuitiva

## Como executar
1. Clone o repositório
2. Configure o backend (ver ../backend/README.md)
3. **IMPORTANTE**: Para funcionar corretamente, você deve:
   - Usar um servidor web local (ex: Live Server do VSCode)
   - NÃO abrir o index.html diretamente no navegador
   - Ter o backend rodando em http://localhost:3000

### Usando VSCode + Live Server
1. Instale a extensão "Live Server"
2. Clique com botão direito no index.html
3. Selecione "Open with Live Server"
4. O site abrirá em http://127.0.0.1:5500 (ou similar)

### Problemas comuns
- Se abrir o arquivo diretamente (file://), a comunicação com o backend não funcionará
- Certifique-se que o backend está rodando antes de usar o frontend

## Estrutura
```
frontend/
  ├── index.html    # Página principal
  ├── style.css     # Estilos e layout
  ├── app.js        # Lógica e integração com API
  └── README.md     # Esta documentação
```
"# VotacaoFilmes_frontend" 
