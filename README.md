# Oak Tecnologias

Este é o frontend da aplicação de cadastro e listagem de produtos. Ele foi desenvolvido utilizando **HTML**, **CSS**, e **JavaScript**, com integração ao backend desenvolvido em **Java 21** e **Spring Boot**. O objetivo do projeto é oferecer uma interface amigável para cadastrar e listar produtos, conforme os requisitos abaixo.

## Requisitos da Aplicação

### Cadastro de Produtos:
- Formulário com os seguintes campos:
  - **Nome do Produto** (campo de texto)
  - **Descrição do Produto** (campo de texto)
  - **Valor do Produto** (campo de valor)
  - **Disponível para Venda** (campo com duas opções: Sim / Não)

### Listagem de Produtos:
- A listagem deve ser ordenada do valor **menor para o maior**
- Após o cadastro de um novo produto, a listagem deve ser exibida automaticamente
- Um botão para cadastrar novos produtos deve estar disponível na página de listagem

## Configuração do Projeto

## Executando o Frontend
- Clone este repositório e abra o projeto em seu editor de código preferido.
- Certifique-se de que o backend da aplicação (https://github.com/euvitorti/OakTecnologiaDesafio) esteja rodando.
- Para rodar o frontend, abra o arquivo signin.html diretamente em seu navegador, ou utilize um servidor local (como Live Server no VSCode) para facilitar a execução.

## Tecnologias Utilizadas
- HTML5
- CSS3
- JavaScript
- Fetch API para integração com o backend

## Funcionalidades da Aplicação
- Cadastro de Produtos: A aplicação possui um formulário para cadastrar novos produtos com nome, descrição, valor e disponibilidade para venda.
- Listagem de Produtos: Exibe todos os produtos cadastrados, ordenados pelo valor do menor para o maior.
- Integração com o Backend: A aplicação consome a API REST desenvolvida em Java para realizar o cadastro e a listagem de produtos.
