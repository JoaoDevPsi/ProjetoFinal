<<<<<<< HEAD
Sistema de Gestão de Segurança e Recursos das Indústrias Wayne
Visão Geral do Projeto
Este projeto é uma aplicação web full stack desenvolvida para otimizar os processos internos e fortalecer a segurança de Gotham City, atendendo às necessidades das renomadas Indústrias Wayne. A plataforma oferece um sistema robusto de gerenciamento de segurança e recursos, com controle de acesso e visualização de dados em tempo real.

Funcionalidades Implementadas
Sistema de Gerenciamento de Segurança:

Autenticação de Usuários: Permite registro de novos funcionários, login seguro e controle de sessão através de JSON Web Tokens (JWT).

Autorização e Controle de Acesso: Implementa diferentes níveis de acesso (Funcionário, Gerente, Administrador de Segurança), garantindo que apenas usuários autorizados possam realizar operações específicas (e.g., adicionar/editar/remover recursos).

Login e Logout: Gerenciamento completo do fluxo de autenticação.

Gestão de Recursos Internos:

Inventário de Equipamentos: Interface completa para listar, adicionar, editar e excluir informações de equipamentos.

Gestão de Veículos: Funcionalidades CRUD (Create, Read, Update, Delete) para o parque de veículos das Indústrias Wayne.

Dispositivos de Segurança: Gerenciamento de câmeras, sensores e outros dispositivos de segurança, incluindo status e localização.

Dashboard de Visualização:

Painel de controle interativo e visualmente atraente que exibe estatísticas em tempo real sobre o total de recursos e sua distribuição por status (ativo, em manutenção, operacional, etc.), utilizando gráficos para facilitar a análise.

Interface de Usuário (UI/UX):

Design moderno e funcional, com uma paleta de cores escura e detalhes que remetem ao estilo das Indústrias Wayne e do Batman, proporcionando uma experiência de usuário intuitiva.

Animação de introdução personalizada na tela inicial.

Tecnologias Utilizadas
Este projeto foi construído com as seguintes tecnologias:

Backend:

Python: Linguagem de programação principal.

Django: Framework web para construção rápida e segura de aplicações.

Django REST Framework (DRF): Extensão para Django que facilita a criação de APIs RESTful.

Django REST Framework Simple JWT: Para autenticação baseada em JSON Web Tokens.

Django CORS Headers: Para permitir a comunicação segura entre o frontend e o backend em domínios diferentes.

SQLite: Banco de dados padrão para desenvolvimento.

Frontend:

React: Biblioteca JavaScript para construção de interfaces de usuário dinâmicas.

Vite: Ferramenta de build para React, otimizando o desenvolvimento com recarregamento rápido.

Axios: Cliente HTTP baseado em Promises para fazer requisições à API do backend.

React Router DOM: Para gerenciamento de rotas e navegação na aplicação Single Page Application (SPA).

Chart.js / React-Chartjs-2: Biblioteca para criação de gráficos interativos no Dashboard.

CSS Puro: Estilização personalizada para um design coeso.

Como Rodar o Projeto Localmente
Siga estas instruções para configurar e executar o projeto em seu ambiente de desenvolvimento.

Pré-requisitos
Certifique-se de ter instalado em seu sistema:

Python 3.9+

Node.js 18+ e npm (geralmente vêm juntos)

1. Clonar o Repositório (Se estiver usando Git)
Se o seu projeto estiver em um repositório Git, use:

Bash

git clone <URL_DO_SEU_REPOSITORIO>
cd projeto_final
Caso contrário, apenas navegue até a pasta projeto_final no seu terminal.

2. Configurar o Backend (Django)
No seu terminal (PowerShell no Windows):

Navegue até a pasta backend:

PowerShell

cd backend
Crie e ative o ambiente virtual:

PowerShell

python -m venv .venv
.\.venv\Scripts\Activate.ps1
Confirme que (.venv) aparece no seu prompt.

Instale as dependências do Python:

PowerShell

pip install Django djangorestframework djangorestframework-simplejwt django-cors-headers
Crie o projeto Django e os apps (se não estiverem criados):

PowerShell

django-admin startproject wayne_industries .
python manage.py startapp users
python manage.py startapp resources
Obs: Se as pastas wayne_industries, users e resources já existirem na sua backend/, ignore estes dois últimos comandos.

Aplique as migrações no banco de dados:

PowerShell

python manage.py makemigrations
python manage.py migrate
Crie um superusuário:

PowerShell

python manage.py createsuperuser
Siga as instruções para criar um nome de usuário (ex: superadmin) e uma senha forte. Lembre-se dessas credenciais!

Se você já possui um superusuário e quer utilizá-lo, suas credenciais de exemplo são:

Usuário: Admin

Senha: SenhaSegura123

Inicie o servidor backend:

PowerShell

python manage.py runserver
Deixe este terminal aberto e rodando! O backend estará acessível em http://127.0.0.1:8000/.

3. Configurar o Frontend (React)
Abra uma nova janela do terminal (PowerShell). Não feche o terminal do backend!

Navegue até a pasta frontend:

PowerShell

cd C:\Users\usuário\OneDrive\Desktop\Programação\INFINITY\projeto_final\front_end
(Ajuste o caminho conforme o seu setup).

Instale as dependências do Node.js:

PowerShell

npm install
Instale bibliotecas adicionais (Axios, React Router DOM, Chart.js):

PowerShell

npm install axios react-router-dom react-chartjs-2 chart.js
Crie o arquivo de variáveis de ambiente (.env):

Crie um arquivo chamado .env na raiz da pasta frontend/ e adicione a seguinte linha:

VITE_APP_API_URL=http://127.0.0.1:8000/api/
Salve o arquivo.

Inicie o servidor frontend:

PowerShell

npm run dev
O frontend estará acessível em http://localhost:5173/ (a porta pode variar).

Como Usar a Aplicação
Acesse a Aplicação: Abra seu navegador e vá para a URL fornecida pelo npm run dev (geralmente http://localhost:5173/).

Animação Inicial: Na página inicial, você verá uma animação de morcegos subindo que transiciona para o símbolo do Batman.

Registro de Usuários:

Clique no link "Registrar" na barra de navegação.

Preencha os dados e clique em "Registrar". Você será redirecionado para a página de Login.

Login de Usuários:

Clique no link "Login" na barra de navegação (ou use o redirecionamento pós-registro).

Para testar todas as funcionalidades de gestão, faça login com o superusuário que você criou (ex: superadmin).

Após o login, você será redirecionado para o Dashboard.

Navegação:

Utilize a barra de navegação superior para alternar entre as seções do sistema:

Dashboard: Visualize as estatísticas gerais dos recursos.

Equipamentos: Gerencie o inventário de equipamentos.

Veículos: Gerencie a frota de veículos.

Dispositivos de Segurança: Gerencie os dispositivos de vigilância.

Gestão de Recursos:

Nas páginas de Equipamentos, Veículos e Dispositivos de Segurança, você poderá:

Adicionar: Clicar no botão "Adicionar Novo [Recurso]" para preencher um formulário.

Visualizar: Ver a lista de itens cadastrados em uma tabela.

Editar: Clicar no botão "Editar" ao lado de um item para modificar suas informações.

Excluir: Clicar no botão "Excluir" para remover um item.

Nota: As ações de Adicionar, Editar e Excluir são visíveis apenas para usuários com permissões de gerenciamento (superusuário, Gerente, Administrador de Segurança).

Utilização do Google Gemini para correção da gramática do Readme.md
=======
# ProjetoFinal
Projeto final da Infinity School. Apesar de ser projeto do curso, conta com uma complexidade de códigos. Usados node.js, django e react.js.
>>>>>>> 83cc93d21557a6c7c4f2960285cd3501e059de18
