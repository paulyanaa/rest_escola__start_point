-- Inserts de exemplo (>= 10 por tabela)
SET search_path TO escola, public;

-- titulos
INSERT INTO titulo (tx_descricao) VALUES
('Bacharel'), ('Licenciado'), ('Especialista'), ('Mestre'), ('Doutor'),
('PhD'), ('Pós-doc'), ('Tecnólogo'), ('Professor Associado'), ('Professor Titular');

-- tipo_curso
INSERT INTO tipo_curso (tx_descricao) VALUES
('Bacharelado'), ('Licenciatura'), ('Tecnólogo'), ('Pós-Graduação Lato Sensu'), ('Mestrado'),
('Doutorado'), ('MBA'), ('Sequencial'), ('Extensão'), ('Livre');

-- tipo_disciplina
INSERT INTO tipo_disciplina (tx_descricao) VALUES
('Obrigatória'), ('Optativa'), ('Eletiva'), ('Laboratório'), ('Estágio'),
('Projeto'), ('TCC'), ('Complementar'), ('Nivelamento'), ('Línguas');

-- instituicao
INSERT INTO instituicao (tx_sigla, tx_descricao) VALUES
('UFSP','Universidade Federal de São Paulo'),
('IFSP','Instituto Federal de São Paulo'),
('USP','Universidade de São Paulo'),
('UNICAMP','Universidade Estadual de Campinas'),
('PUC','Pontifícia Universidade Católica'),
('UFRJ','Universidade Federal do Rio de Janeiro'),
('UFMG','Universidade Federal de Minas Gerais'),
('UFRGS','Universidade Federal do Rio Grande do Sul'),
('UNB','Universidade de Brasília'),
('UERJ','Universidade do Estado do Rio de Janeiro');

-- curso (depende de instituicao e tipo_curso)
INSERT INTO curso (id_instituicao, id_tipo_curso, tx_descricao) VALUES
(1, 1, 'Ciência da Computação'),
(1, 2, 'Matemática'),
(2, 3, 'Análise e Desenvolvimento de Sistemas'),
(2, 1, 'Engenharia de Computação'),
(3, 1, 'Direito'),
(4, 1, 'Medicina'),
(5, 4, 'MBA em Gestão'),
(6, 5, 'Mestrado em Engenharia'),
(7, 6, 'Doutorado em Física'),
(8, 1, 'Arquitetura');

-- professor (depende de titulo)
INSERT INTO professor (id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone) VALUES
(5, 'Ana Souza', 'f', 'c', '1980-01-10', '11999990001'),
(4, 'Bruno Lima', 'm', 's', '1985-02-20', '11999990002'),
(3, 'Carla Dias', 'f', 'd', '1978-03-15', '11999990003'),
(6, 'Daniel Alves', 'm', 'c', '1975-04-12', '11999990004'),
(2, 'Eduarda Pires', 'f', 's', '1990-05-05', '11999990005'),
(1, 'Fabio Nunes', 'm', 's', '1992-06-18', '11999990006'),
(7, 'Gabriela Rocha', 'f', 'c', '1983-07-22', '11999990007'),
(8, 'Henrique Costa', 'm', 'd', '1979-08-30', '11999990008'),
(9, 'Isabela Martins', 'f', 'c', '1981-09-09', '11999990009'),
(10, 'João Pedro', 'm', 's', '1987-10-11', '11999990010');

-- disciplina (depende de curso e tipo_disciplina)
INSERT INTO disciplina (id_curso, id_tipo_disciplina, tx_sigla, tx_descricao, in_periodo, in_carga_horaria) VALUES
(1, 1, 'ALG1', 'Algoritmos I', 1, 60),
(1, 1, 'ALG2', 'Algoritmos II', 2, 60),
(1, 4, 'LP1L', 'Laboratório de Programação I', 1, 60),
(1, 4, 'LP2L', 'Laboratório de Programação II', 2, 60),
(1, 1, 'BD1', 'Bancos de Dados I', 3, 60),
(2, 1, 'CALC1', 'Cálculo I', 1, 60),
(2, 1, 'ALGL', 'Álgebra Linear', 2, 60),
(3, 1, 'ADS1', 'Fundamentos de ADS', 1, 60),
(3, 1, 'WEB1', 'Desenvolvimento Web I', 2, 60),
(4, 2, 'ROB', 'Robótica', 6, 60);

-- leciona (associação professor-disciplina)
INSERT INTO leciona (id_professor, id_disciplina) VALUES
(1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10);

-- aluno
INSERT INTO aluno (tx_nome, tx_sexo, dt_nascimento) VALUES
('Alice', 'f', '2000-01-01'),
('Bernardo', 'm', '1999-02-02'),
('Camila', 'f', '2001-03-03'),
('Diego', 'm', '2000-04-04'),
('Evelyn', 'f', '1998-05-05'),
('Felipe', 'm', '1997-06-06'),
('Gisele', 'f', '2001-07-07'),
('Heitor', 'm', '2002-08-08'),
('Ingrid', 'f', '1999-09-09'),
('Julio', 'm', '2000-10-10');

-- cursa
INSERT INTO cursa (id_aluno, id_disciplina, in_ano, in_semestre, in_faltas, nm_nota1, nm_nota2, nm_nota3, bl_aprovado) VALUES
(1,1,2024,1,2,7.0,8.5,9.0,true),
(2,2,2024,1,0,6.0,7.0,8.0,true),
(3,3,2024,1,5,5.0,6.5,7.0,false),
(4,4,2024,1,1,8.0,8.0,8.0,true),
(5,5,2024,1,3,7.5,7.5,7.5,true),
(6,6,2024,1,4,6.5,6.0,6.0,false),
(7,7,2024,1,0,9.0,9.0,9.0,true),
(8,8,2024,1,2,7.0,7.0,7.0,true),
(9,9,2024,1,6,5.5,5.5,5.5,false),
(10,10,2024,1,1,8.5,8.5,8.5,true);
