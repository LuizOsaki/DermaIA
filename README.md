# DermaIA 🩺🤖

Plataforma de **saúde e conscientização sobre a pele**, desenvolvida com uma arquitetura que combina **Inteligência Artificial, análise de imagens, chatbot, informações climáticas e recursos de gamificação**.

O DermaIA tem como objetivo utilizar tecnologia para auxiliar usuários na **identificação de possíveis sinais de alerta em manchas da pele**, além de fornecer informações e ferramentas relacionadas à prevenção e aos cuidados com a saúde da pele.

> ⚠️ **Aviso:** o DermaIA é uma ferramenta de apoio e conscientização. Seus resultados não substituem uma avaliação médica ou um diagnóstico realizado por um profissional de saúde.

## 🧠 Sobre o projeto

O DermaIA utiliza Inteligência Artificial para analisar imagens de manchas de pele e fornecer uma **estimativa de probabilidade relacionada ao melanoma**.

Além da análise de imagens, a plataforma reúne diferentes funcionalidades para tornar a experiência mais completa, combinando recursos de IA, educação em saúde e interação com o usuário.

O projeto possui um frontend desenvolvido com **React**, enquanto diferentes funcionalidades utilizam backends e APIs específicos.

## ✨ Funcionalidades

### 🔬 Análise de manchas de pele

A principal funcionalidade do DermaIA é a análise de imagens de manchas da pele.

Por meio de um backend em **Python**, a aplicação utiliza Inteligência Artificial para processar a imagem e retornar uma **probabilidade estimada de melanoma**.

O resultado tem caráter informativo e deve ser utilizado como um possível alerta para buscar avaliação profissional, não como diagnóstico.

### 💬 Chatbot com IA

A plataforma conta com um **chatbot** integrado a um backend desenvolvido em **Node.js**.

O chatbot permite que o usuário interaja com a aplicação e obtenha informações relacionadas à saúde da pele.

### ☀️ Alerta climático

O DermaIA possui um sistema de **alerta climático**, utilizando um backend em Node.js e integração com a **API da OpenAI**.

O objetivo é fornecer informações que possam auxiliar o usuário a compreender condições ambientais relacionadas à exposição solar e aos cuidados com a pele.

### 🎮 Gamificação

A aplicação também utiliza elementos de **gamificação** para incentivar o usuário a interagir com a plataforma e desenvolver hábitos relacionados à prevenção e aos cuidados com a saúde.

### 🩹 Dicas de saúde e prevenção

O DermaIA disponibiliza conteúdos educativos com **dicas de saúde, prevenção e cuidados com a pele**, buscando tornar informações importantes mais acessíveis.

### ☀️ Blog

A plataforma conta ainda com uma área de **blog**, destinada à publicação de conteúdos e curiosidades sobre temas como:

* Exposição ao sol
* Cuidados com a pele
* Prevenção
* Saúde dermatológica
* Curiosidades relacionadas à pele

## 🛠️ Tecnologias

### Frontend

* React
* JavaScript / JSX
* CSS

### Backend e Inteligência Artificial

* Python
* Node.js
* OpenAI API
* Modelo de IA para análise de imagens

A arquitetura é dividida em diferentes serviços, permitindo que funcionalidades como análise de imagens, chatbot e alertas climáticos sejam implementadas de maneira independente.

## 📁 Estrutura do Frontend

Os principais componentes da interface estão organizados em `src/components/`:

```text
src/
└── components/
    ├── AiSection.jsx
    ├── Apoio.jsx
    ├── CardsSaude.jsx
    ├── Carousel.jsx
    ├── ChatModal.jsx
    ├── Contato.jsx
    ├── FloatingMascot.jsx
    ├── Footer.jsx
    ├── Hero.jsx
    ├── Navbar.jsx
    ├── Planos.jsx
    ├── ProtectedRoute.jsx
    ├── Sidebar.jsx
    ├── Sobre.jsx
    └── floatingMascot.css
```

### Principais componentes

| Componente           | Responsabilidade                                          |
| -------------------- | --------------------------------------------------------- |
| `AiSection.jsx`      | Seção relacionada aos recursos de Inteligência Artificial |
| `Apoio.jsx`          | Conteúdo relacionado a apoio e suporte                    |
| `CardsSaude.jsx`     | Exibição de informações e dicas de saúde                  |
| `Carousel.jsx`       | Componente para apresentação de conteúdo em carrossel     |
| `ChatModal.jsx`      | Interface do chatbot                                      |
| `Contato.jsx`        | Seção de contato                                          |
| `FloatingMascot.jsx` | Mascote flutuante da aplicação                            |
| `Footer.jsx`         | Rodapé da aplicação                                       |
| `Hero.jsx`           | Seção principal da página                                 |
| `Navbar.jsx`         | Barra de navegação                                        |
| `Planos.jsx`         | Apresentação dos planos da plataforma                     |
| `ProtectedRoute.jsx` | Controle de acesso a rotas protegidas                     |
| `Sidebar.jsx`        | Menu lateral da aplicação                                 |
| `Sobre.jsx`          | Informações sobre o projeto                               |
| `floatingMascot.css` | Estilos do mascote flutuante                              |

## 🏗️ Arquitetura

De forma simplificada, o funcionamento da plataforma pode ser representado da seguinte maneira:

```text
                    ┌─────────────────┐
                    │    Frontend     │
                    │     React       │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
       ┌────────────┐ ┌────────────┐ ┌─────────────┐
       │  Backend   │ │  Backend   │ │   Serviços  │
       │  Python    │ │   Node.js  │ │     IA      │
       └─────┬──────┘ └─────┬──────┘ └──────┬──────┘
             │              │               │
             ▼              ▼               ▼
       Análise de       Chatbot        OpenAI /
         imagens       e serviços       APIs
```

Essa separação permite que cada parte da aplicação tenha uma responsabilidade específica, facilitando a evolução do projeto.

## 🎯 Objetivos

O DermaIA foi desenvolvido com os seguintes objetivos:

* Utilizar Inteligência Artificial como ferramenta de apoio à saúde;
* Facilitar o acesso a informações sobre cuidados com a pele;
* Incentivar a prevenção de doenças dermatológicas;
* Alertar usuários sobre possíveis sinais que merecem atenção;
* Promover hábitos relacionados à proteção solar;
* Tornar conteúdos de saúde mais interativos;
* Explorar aplicações práticas de IA em uma plataforma web.

## ⚠️ Responsabilidade e uso

A análise de imagens realizada pelo DermaIA fornece uma **estimativa baseada em Inteligência Artificial** e não deve ser interpretada como diagnóstico médico.

Uma alteração na pele pode possuir diversas causas, e somente um profissional qualificado pode realizar uma avaliação clínica adequada.

Em caso de dúvidas ou alterações suspeitas na pele, recomenda-se procurar um **dermatologista ou outro profissional de saúde habilitado**.

## 🚧 Status

O projeto reúne diferentes funcionalidades de IA, backend e frontend e pode continuar recebendo melhorias, novos recursos e aprimoramentos na experiência do usuário.

---

**DermaIA — tecnologia e inteligência artificial aplicadas à conscientização e aos cuidados com a saúde da pele.**
