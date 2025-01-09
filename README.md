# Gerenciamento de Produtos para a Loja AgilStore

## Descrição do Projeto

Este projeto foi desenvolvido para a **AgilStore**, uma pequena loja de eletrônicos que expandiu seu catálogo de produtos. Com o aumento do número de produtos e a diversidade das categorias, surgiu a necessidade de otimizar o controle do inventário. A aplicação desenvolvida permite a gestão automatizada do inventário de produtos, facilitando operações como adicionar novos produtos, listar produtos existentes, atualizar informações e remover itens obsoletos.

## Funcionalidades

### 1. **Adicionar Produto**
- Permite adicionar um novo produto ao inventário.
- Solicita os seguintes dados:
  - Nome do Produto
  - Categoria
  - Quantidade em Estoque
  - Preço
- Gera um **ID único** automaticamente para cada produto.

### 2. **Listar Produtos**
- Exibe todos os produtos cadastrados em uma tabela com as seguintes colunas:
  - **ID**
  - **Nome do Produto**
  - **Categoria**
  - **Quantidade em Estoque**
  - **Preço**
- Permite opções de **filtragem** por categoria ou **ordenação** por nome, quantidade ou preço (opcional).

### 3. **Atualizar Produto**
- Atualiza as informações de um produto existente, identificado pelo seu **ID**.
- Solicita ao usuário quais campos deseja atualizar:
  - Nome
  - Categoria
  - Quantidade
  - Preço
- Valida os novos dados antes de salvar as alterações.

### 4. **Excluir Produto**
- Remove um produto do inventário pelo seu **ID**.
- Confirma a ação com o usuário antes de excluir (opcional).

### 5. **Buscar Produto**
- Busca e exibe detalhes de um produto específico:
  - Pelo **ID**.
- Exibe todas as informações detalhadas do produto encontrado.
- Exibe mensagem apropriada se nenhum produto for encontrado.

## Requisitos Extras (Opcional)

### **Persistência de Dados**
- Implementa **salvamento automático** dos dados em um arquivo JSON para que os produtos não sejam perdidos ao encerrar a aplicação.

## Instalação

1. **Clone o repositório:**
   git clone https://github.com/seu-usuario/agilstore.git
2. **Instale as dependências:**
   npm install
3. **Execute o aplicativo:**
   node main.js

