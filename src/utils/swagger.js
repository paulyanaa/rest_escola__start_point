const swaggerSpec = {
  openapi: '3.0.3',
  info: {
    title: 'API REST Escola',
    version: '1.0.0',
    description: 'API REST para CRUD de entidades escolares'
  },
  servers: [{ url: 'http://localhost:3000' }],
  components: {
    schemas: {
      Error: {
        type: 'object',
        properties: {
          error: { type: 'string' },
          message: { type: 'string' }
        }
      }
    }
  },
  paths: {
    '/alunos': {
      get: {
        tags: ['Alunos'],
        summary: 'Lista todos os alunos',
        responses: {
          200: {
            description: 'Lista de alunos'
          }
        }
      },
      post: {
        tags: ['Alunos'],
        summary: 'Cria um novo aluno',
        responses: {
          201: {
            description: 'Aluno criado com sucesso'
          }
        }
      }
    },
    '/cursos': {
      get: {
        tags: ['Cursos'],
        summary: 'Lista todos os cursos',
        responses: {
          200: {
            description: 'Lista de cursos'
          }
        }
      },
      post: {
        tags: ['Cursos'],
        summary: 'Cria um novo curso',
        responses: {
          201: {
            description: 'Curso criado com sucesso'
          }
        }
      }
    },
    '/disciplinas': {
      get: {
        tags: ['Disciplinas'],
        summary: 'Lista todas as disciplinas',
        responses: {
          200: {
            description: 'Lista de disciplinas'
          }
        }
      },
      post: {
        tags: ['Disciplinas'],
        summary: 'Cria uma nova disciplina',
        responses: {
          201: {
            description: 'Disciplina criada com sucesso'
          }
        }
      }
    },
    '/disciplinas/por-curso': {
      get: {
        tags: ['Disciplinas'],
        summary: 'Retorna quantidade de disciplinas por curso',
        responses: {
          200: {
            description: 'Lista de disciplinas por curso',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      curso: {
                        type: 'string',
                        description: 'Nome do curso'
                      },
                      quantidade_disciplinas: {
                        type: 'integer',
                        description: 'Quantidade de disciplinas no curso'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/instituicoes': {
      get: {
        tags: ['Instituições'],
        summary: 'Lista todas as instituições',
        responses: {
          200: {
            description: 'Lista de instituições'
          }
        }
      },
      post: {
        tags: ['Instituições'],
        summary: 'Cria uma nova instituição',
        responses: {
          201: {
            description: 'Instituição criada com sucesso'
          }
        }
      }
    },
    '/professores': {
      get: {
        tags: ['Professores'],
        summary: 'Lista todos os professores',
        responses: {
          200: {
            description: 'Lista de professores'
          }
        }
      },
      post: {
        tags: ['Professores'],
        summary: 'Cria um novo professor',
        responses: {
          201: {
            description: 'Professor criado com sucesso'
          }
        }
      }
    },
    '/tipo-curso': {
      get: {
        tags: ['Tipos de Curso'],
        summary: 'Lista todos os tipos de curso',
        responses: {
          200: {
            description: 'Lista de tipos de curso'
          }
        }
      },
      post: {
        tags: ['Tipos de Curso'],
        summary: 'Cria um novo tipo de curso',
        responses: {
          201: {
            description: 'Tipo de curso criado com sucesso'
          }
        }
      }
    },
    '/tipo-disciplina': {
      get: {
        tags: ['Tipos de Disciplina'],
        summary: 'Lista todos os tipos de disciplina',
        responses: {
          200: {
            description: 'Lista de tipos de disciplina'
          }
        }
      },
      post: {
        tags: ['Tipos de Disciplina'],
        summary: 'Cria um novo tipo de disciplina',
        responses: {
          201: {
            description: 'Tipo de disciplina criado com sucesso'
          }
        }
      }
    },
    '/titulos': {
      get: {
        tags: ['Títulos'],
        summary: 'Lista todos os títulos',
        responses: {
          200: {
            description: 'Lista de títulos'
          }
        }
      },
      post: {
        tags: ['Títulos'],
        summary: 'Cria um novo título',
        responses: {
          201: {
            description: 'Título criado com sucesso'
          }
        }
      }
    }
  }
};

module.exports = { swaggerSpec };