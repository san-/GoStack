# Recuperação de senha

**RF** Requisitos funcionais
- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF** Requisitos não funcionais (Libs, banco de dados, infra)
- Utiliar Mailtrap para envios em ambiente de desenvolvimento;
- Utiliar o Amazon SES para envios em produção;
- O envio de e-mail deve acontecer em segundo plano (background job);

**RN** Regras de negócio
- O link enviado por e-mail para resetar senha deve expirar em 2 horas;
- O usuário precisa confirmar a nova senha digitando uma segunda vez;

# Atualizaçãod o perfil

**RF**
- O usuário deve poder atualizar seu nome, email e senha;

**RNF**

**RN**
- O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha o usuário deve informar a senha antiga;
- Para atualizar sua senha o usuário precisa confirmar digitando uma segunda vez;

# Painel do prestador

**RF**
- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**
- Os agendamentos do prestador devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificaçoes do prestador devem ser enviadas em tempo real via Socket.IO;

**RN**
- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar.

# Agendamento de serviços

**RF**
- O usuário deve poder listar todos os prestadores cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis de um prestador em um dia específico;
- O usuário deve poder realizar um novo agendamento com um prestador

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h;
- Os agendamentos devem ser entre 8h e 18h;
- O usuário não pode agendar em horário já ocupado;
- O usuário não pode agendar em horário passado;
- O usuário não pode agendar serviços consigo mesmo;
