# Cadastro carro

**RF** => Requisitos funcionais

- Deve ser possível castrar um novo carro
- Deve ser possível listar todas as categorias

**RN** => Regra de negócio

- Não deve ser possivel cadastr um carro com a mesma placa
- Não deve ser possivel alterar a placa de um carro já existente
- O carro deve ser cadastrado com a opção de disponivel por padrão
- O usuário respónsavel pelo cadastro deve ser um adm

# Listagem de carros

**RF**

- Deve ser possivel listar todos os carros disponiveis
- Deve ser possivel listar todos os carros disponiveis pelo nome da categoria
- Deve ser possivel listar todos os carros disponiveis pelo nome marca

**RN**

- O usuário não precisa estar logado para reliazar a listagem

# Cadastro de especificação no carro

**RF**

- Deve ser possível cadastrar uma especificação para um carro
- Deve ser possível listar todas as especificações
- Deve ser possível listar todas os carros

**RN**

- Não deve ser possivel cadastrar uma especificação para um carro não cadastrado
- Não deve ser possivel cadastrar uma especificação já existente para o mesmo carro
- O usuário respónsavel pelo cadastro deve ser um adm

# Cadastro de imagem do carro

**RF**

- Deve ser possivel cadastrar imagem para o carro
- Deve ser possivel listar todos os carros

**RNF**

- Utilizar multer para upload dos arquivos

**RN**

- O usuario deve poder cadastrar mais de uma imagem para o mesmo carro
- O usuário respónsavel pelo cadastro deve ser um adm

# Agendamento de aluguel

**RN**

- Deve ser possivel cadastrar um aluguel

**RN**

- O aluguel deve ter duração min de 24hrs
- O usuário não deve poder alugar mais de um carro por periodo
- O carro não podera ser alugado caso exista um aluguel aberto para o mesmo
