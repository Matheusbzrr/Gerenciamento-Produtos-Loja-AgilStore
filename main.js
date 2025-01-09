import fs from 'fs';
import readline from 'readline';

const bancoTxt = './produtos.txt';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

if (!fs.existsSync(bancoTxt)) {
    fs.writeFileSync(bancoTxt, '');
    console.log(`Arquivo ${bancoTxt} criado com sucesso!`);
  }

function salvarNoArquivo(dados) {
    try {
        const dadosString = JSON.stringify(dados, null, 2);
        fs.writeFileSync(bancoTxt, dadosString, 'utf-8');
    } catch (err) {
        console.error('Erro ao salvar os dados:', err);
    }
}

function lerArquivo() {
    try {
        const dados = fs.readFileSync(bancoTxt, 'utf-8');
        return JSON.parse(dados) || [];
    } catch (erro) {
        return [];
    }
}


async function adicionarNovoProduto() {
    return new Promise((resolve) => {
        rl.question('Digite o nome do produto: ', (nameProduto) => {
            rl.question('Digite a categoria do produto: ', (categoria) => {
                rl.question('Digite a quantidade: ', (quantidade) => {
                    rl.question('Digite o preço: ', (preco) => {
                        const novoProduto = {
                            id: Date.now(),
                            nameProduto,
                            categoria,
                            quantidade: parseInt(quantidade),
                            preco: parseFloat(preco)
                        };

                        const produtos = lerArquivo();
                        produtos.push(novoProduto);
                        salvarNoArquivo(produtos);

                        console.log('\nProduto criado com sucesso!\n');
                        resolve();  
                    });
                });
            });
        });
    });
}

async function listarTodosProdutos(){
    const produtos = lerArquivo();
    if (produtos.length === 0) {
        console.log('Nenhum produto encontrado.');
        return;
    }

    console.log('\nPRODUTOS:\n');
    produtos.forEach((produto) => {
        console.log(`ID: ${produto.id}`);
        console.log(`Nome: ${produto.nameProduto}`);
        console.log(`Categoria: ${produto.categoria}`);
        console.log(`Quantidade: ${produto.quantidade}`);
        console.log(`Preço: ${produto.preco}`);
        console.log('---');
    });
}

async function buscarProduto() {
    return new Promise((resolve, reject) => {
        const produtos = lerArquivo();
        
        rl.question('Digite o ID do produto para busca: ', (input) => {
            const id = parseInt(input);
            const produto = produtos.find((p) => p.id === id);

            if (produto) {
                console.log('\nProduto Encontrado:');
                console.log(`ID: ${produto.id}`);
                console.log(`Nome: ${produto.nameProduto}`);
                console.log(`Categoria: ${produto.categoria}`);
                console.log(`Quantidade: ${produto.quantidade}`);
                console.log(`Preço: ${produto.preco}`);
                console.log('---');
                resolve();
            } else {
                console.log('Produto não encontrado!');
                reject();
            }
        });
    });
}

async function editarProduto() {
    return new Promise((resolve, reject) => {
        const produtos = lerArquivo();  
        rl.question('Digite o ID do produto a ser editado: ', (id) => {
            const produto = produtos.find((p) => p.id === parseInt(id));
            if (!produto) {
                console.log('Produto não encontrado!');
                reject();
            }
            
            
            rl.question(` (opcional) Digite o novo nome para o produto  ${produto.nameProduto}: `, (nomeProduto) => {
                rl.question(` (opcional) Digite a nova categoria para o produto  ${produto.categoria}: `, (categoria) => {
                    rl.question(` (opcional) Digite a nova quantidade para o produto  ${produto.quantidade}: `, (quantidade) => {
                        rl.question(` (opcional) Digite o novo preço para o produto  ${produto.preco}: `, (preco) => {

                            
                            if (nomeProduto) produto.nameProduto = nomeProduto;
                            if (categoria) produto.categoria = categoria;
                            if (quantidade) produto.quantidade = parseInt(quantidade);
                            if (preco) produto.preco = parseFloat(preco);

                            salvarNoArquivo(produtos); 
                            console.log('\nProduto atualizado com sucesso!\n');
                            resolve();
                            
                        });
                    });
                });
            });
        });
    })
}

async function removerProduto(){
    return new Promise((resolve, reject) => {
        const produtos = lerArquivo();
        rl.question('Digite o id do produto que será excluido: ', (idProdutos) =>{
            const produto = produtos.find((p) => p.id === parseInt(idProdutos));
            if (!produto) {
                console.log('Produto não encontrado!');
                reject();
                return
            }

            const index = produtos.indexOf(produto);
            if (index > -1) {
                produtos.splice(index, 1);
                salvarNoArquivo(produtos);
                console.log('\nProduto excluido com sucesso!\n');
                resolve();
            }
        })
    }) 
}





async function menu() {
    console.log('1 - Adicionar novo produto');
    console.log('2 - Listar todos os produtos');
    console.log('3 - Buscar produto por ID');
    console.log('4 - Editar um produto');
    console.log('5 - Remover um produto');
    console.log('0 - Sair');

    
    const option = await new Promise((resolve) => {
        rl.question('Escolha uma opção: ', (input) => {
            resolve(parseInt(input));
        });
    });

    switch (option) {
        case 1:
            await adicionarNovoProduto();
            break;
        case 2:
            await listarTodosProdutos();
            break;
        case 3:
            await buscarProduto();
            break;
        case 4:
            await editarProduto(); 
            break;
        case 5:
            await removerProduto(); 
            break;
        case 0:
            rl.close();
            break;
        default:
            console.log('Opção inválida!');
            break;
    }

    return option;
}


async function main() {
    let option = -1;
    while (option !== 0) {
        option = await menu(); 
    }
}

main();
