<p align="center">
  <a href="https://vestibular.fiap.com.br" target="blank"><img src="https://vestibular.fiap.com.br/imagens/logo-fiap.png" width="120" alt="Fiap Logo" /></a>
</p>


## Descrição
Projeto de uma lanchonete para a pós de arquitetura de software.

<br>

## Desenho da Arquitetura
<div align="center">
  <img src="./assets/img/Architecture.png" width="400">
</div>

<br>

## Rodando a infraestrutura kubernetes

```bash
$ kubectl apply -f .\k8s\infra

$ kubectl apply -f .\k8s\services

$ kubectl apply -f .\k8s\deployment
```

<br>

##  Swagger
http://localhost:3000/api
