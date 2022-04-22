import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const locale = 'en-US' // default locale

export default new VueI18n({
  locale,
  messages: {
    'en-US': {
      'en-US': 'English',
      es: 'Español',
      pt: 'Português',
      title: 'Pablo Miceli | Full-stack Senior Developer',
      description:
        'Resume of a full-stack software developer with +10 years of experience looking for new remote job opportunities.',
      about: {
        title: 'Full-stack Senior Developer',
        nationality: 'Nationality',
        birth: 'Birth',
        location: 'Current location',
        idioms: 'Idioms',
        spanish: 'Spanish',
        english: 'English',
        portuguese: 'Portuguese',
        german: 'German',
        native: 'Native',
        fluent: 'Fluent',
        beginner: 'Beginner',
        download: 'Download PDF',
        link: 'Pablo_Miceli_-_Fullstack_Senior_Developer_(English)'
      },
      profile: {
        title: 'Profile',
        text: `Digital nomad since January 2019 (Brazil, US, South Africa), passionate about design, programming, logic and new challenges. Always based on continuous and self-taught learning of new technologies to better achieve my goals. Started creating apps since I was a teenager, going from Java game plugins to financial tools. Nowadays I find myself focusing in APIs and large scale websites/apps involving TypeScript, Vue3/Nuxt, TailwindCSS, Graphql and serverless architectures as my main stack.`
      },
      skills: {
        title: 'Technical Skills',
        subtitle1: 'Languages',
        subtitle2: 'Libraries/Frameworks',
        subtitle3: 'Other',
        subtitle4: 'Infrastructure',
        text: `Ordered from top to bottom, skills I'll be more likely to work with. The horizontal extension of each bar represents actual knowledge/experience I do have on such.`
      },
      experience: {
        title: 'Recent experiences',
        exp4: {
          title: 'Web app - Airbank',
          text: `Full time tech lead developer, app architect using modular Apollo Server, FaunaDB, Open Banking API, Rollup and TypeScript on backend. And Vue 3 composition API (modular architecture), TypeScript, Apollo Client as local management system, TailwindCSS, and Vite.`
        },
        exp3: {
          title: 'Institutional Website - Matera Fintech',
          text: `Project lead developer, code review, dedicated both on backend and frontend using Drupal Headless, GraphQL API. Frontend using NuxtJS with Vuex, i18n for internationalization, TailwindCSS, static generated configuration (JAMStack) and my own open-source module`
        },
        exp2: {
          title: 'Institutional Website - Paraná Banco',
          text: `Project lead developer, dedicated to backend using Drupal Headless exposing a GraphQL endpoint and DevOps tasks as CI/CD in cooperation with Bank's developer team. Collaborated on frontend with my team using React (Hooks, Styled components, Redux) and Apollo Client.`
        },
        exp1: {
          title: 'Full-stack Developer - Ctrl365',
          text1: `During this period I've been responsibly for different tasks, such as responsive landing pages for brands like`,
          text2: `or`,
          text3: `in parallel with art department, I've built a complete`,
          text4: `with login and notifications, or APIs and database administration tasks. I did many job interviews with candidates to grow our team, among other team management tasks.`
        }
      },
      score: {
        title: 'Notes',
        text1: `You can inspect the `,
        text2: `source code`,
        text3: ` of this page, it was made using Vue, TailwindCSS, i18n and Parcel.`,
        text4: `Lighthouse 6.0 desktop score:`
      }
    },
    es: {
      'en-US': 'English',
      es: 'Español',
      pt: 'Português',
      title: 'Pablo Miceli | Desarrollador Full-stack Senior',
      description:
        'Curriculum de un desarrollador full-stack con +10 años de experiencia buscando por nuevas oportunidades de trabajo remoto.',
      about: {
        title: 'Desarrollador Full-stack Senior',
        nationality: 'Nacionalidad',
        birth: 'Nacimiento',
        location: 'Ubicación actual',
        idioms: 'Idiomas',
        spanish: 'Español',
        english: 'Inglés',
        portuguese: 'Portugués',
        german: 'Alemán',
        native: 'Nativo',
        fluent: 'Fluente',
        beginner: 'Principiante',
        download: 'Descargar PDF',
        link: 'Pablo_Miceli_-_Fullstack_Senior_Developer_(Español)'
      },
      profile: {
        title: 'Perfil',
        text: `Nómade digital desde enero de 2019 (Brasil, USA, Sudáfrica), apasionado por diseño, programación, lógica y nuevos desafíos. Basado en el aprendizaje continuo y autodidacta de nuevas tecnologías para lograr mejor mis objetivos. Comencé a crear aplicaciones desde adolescente, pasando de plugins para juegos en Java hasta herramientas financieras. Actualmente estoy centrado en APIs y aplicaciones web de larga escala utilizando TypeScript, Vue3/Nuxt, TailwindCSS, Graphql y arquitecturas serverless como stack principal.`
      },
      skills: {
        title: 'Habilidades Técnicas',
        subtitle1: 'Lenguajes',
        subtitle2: 'Librerías/Frameworks',
        subtitle3: 'Otros',
        subtitle4: 'Infraestructura',
        text: `Ordenadas de arriba a abajo, habilidades con las que estaría mas dispuesto a trabajar. La extensión horizontal de cada barra representa el conocimiento/experiencia que tengo al respecto.`
      },
      experience: {
        title: 'Experiencias recientes',
        exp4: {
          title: 'Web app - Airbank',
          text: `Desarrollador tech lead de tiempo completo, arquitecto de la aplicación usando Apollo Server modular, FaunaDB, Open Banking API, Rollup y TypeScript en backend. Y Vue 3 composition API (arquitectura modular), TypeScript, Apollo Client como sistema de gerenciamiento de estados, TailwindCSS, y Vite.`
        },
        exp3: {
          title: 'Website Institucional - Matera Fintech',
          text: `Desarrollador tech lead, revisión de código, dedicado tanto en backend como en frontend usando Drupal Headless y API GraphQL. Frontend usando NuxtJS con Vuex, i18n para internacionalización, TailwindCSS, con una configuración de generación estatica (JAMStack) y mi propio módulo open-source`
        },
        exp2: {
          title: 'Website Institucional - Paraná Banco',
          text: `Desarrollador líder del proyecto, dedicado en backend usando Drupal Headless para contenido siendo servido a traves de GraphQL y tareas DevOps como CI/CD en cooperación con el equipo de desarrolladores del Banco. Colaboré en frontend con mi equipo usando React y Apollo Client.`
        },
        exp1: {
          title: 'Desarrollador Full-stack - Ctrl365',
          text1: `Durante este período, fui responsable por diferentes tareas, como crear landing pages responsivas para marcas como`,
          text2: `o`,
          text3: `en paralelo con el área de creación, desarrollé un completo`,
          text4: `con inicio de sesión y notificaciones, hice trabajos de API y administración de bases de datos. Realicé algunas entrevistas de trabajo con candidatos para hacer crecer nuestro equipo, entre otras tareas de gestión de equipo.`
        }
      },
      score: {
        title: 'Notas',
        text1: `Puede revisar el `,
        text2: `código fuente`,
        text3: ` de esta página, fue desarrollada utilizando Vue, TailwindCSS, i18n y Parcel.`,
        text4: `Puntuación desktop Lighthouse 6.0:`
      }
    },
    pt: {
      'en-US': 'English',
      es: 'Español',
      pt: 'Português',
      title: 'Pablo Miceli | Desenvolvedor Full-stack Senior',
      description:
        'Currículo de um desenvolvedor full-stack com +10 anos de experiência procurando por novas oportunidades de trabalho remoto.',
      about: {
        title: 'Desenvolvedor Full-stack Senior',
        nationality: 'Nacionalidade',
        birth: 'Nascimento',
        location: 'Localização atual',
        idioms: 'Idiomas',
        spanish: 'Espanhol',
        english: 'Inglês',
        portuguese: 'Português',
        german: 'Alemão',
        native: 'Nativo',
        fluent: 'Fluente',
        beginner: 'Principiante',
        download: 'Baixar PDF',
        link: 'Pablo_Miceli_-_Fullstack_Senior_Developer_(Português)'
      },
      profile: {
        title: 'Perfil',
        text: `Nômade digital desde janeiro de 2019 (Brasil, US, Africa do Sul), apaixonado por design, programação, lógica e novos desafios. Baseado no aprendizado contínuo e autodidata de novas tecnologias para melhor alcançar meus objetivos. Criei aplicativos desde a adolescência, passando de plug-ins para jogos em Java até ferramentas financeiras. Atualmente, estou focando em APIs e aplicativos web de grande escala, envolvendo TypeScript, Vue3/Nuxt, TailwindCSS, Graphql e arquiteturas serverless como stack principal.`
      },
      skills: {
        title: 'Habilidades técnicas',
        subtitle1: 'Línguas',
        subtitle2: 'Bibliotecas/Frameworks',
        subtitle3: 'Outros',
        subtitle4: 'Infraestrutura',
        text: `Ordenadas de cima para baixo, habilidades com as quais estou mais disposto a trabalhar. A extensão horizontal de cada barra representa o conhecimento/experiência que tenho naquele item.`
      },
      experience: {
        title: 'Experiências recentes',
        exp4: {
          title: 'Web app - Airbank',
          text: `Desenvolvedor tech lead de tempo completo, arquiteto do aplicativo usando Apollo Server modular, FaunaDB, API Open Banking, Rollup e TypeScript no backend. E Vue 3 composition API (arquitetura modular), TypeScript, Apollo Client como sistema de gerenciamento de estado, TailwindCSS e Vite .`
        },
        exp3: {
          title: 'Site institucional - Matera Fintech',
          text: `Desenvolvedor líder do projeto, revisão de código, dedicado no back-end e front-end usando uma API GraphQL no Drupal Headless. Frontend usando NuxtJS com Vuex, i18n para internacionalização, TailwindCSS, configurado para geração estatica (JAMStack) e o meu próprio módulo open-source`
        },
        exp2: {
          title: 'Site institucional - Paraná Banco',
          text: `Desenvolvedor líder do projeto, dedicado ao back-end usando o Drupal Headless, expondo uma api GraphQL e tarefas de DevOps como CI/CD em cooperação com a equipe de desenvolvedores do Banco. Colaborei no frontend com minha equipe usando React e Apollo Client.`
        },
        exp1: {
          title: 'Desenvolvedor Full-stack - Ctrl365',
          text1: `Durante esse período, fui responsável por diferentes tarefas, como a criação de landing pages responsivas para marcas como`,
          text2: `ou`,
          text3: `em paralelo com a área de criação, desenvolvi um completo`,
          text4: `com login e notificações, fiz trabalhos em APIs e administração de banco de dados. Fiz algumas entrevistas de emprego com candidatos para aumentar nossa equipe, entre outras tarefas de gerenciamento de equipe.`
        }
      },
      score: {
        title: 'Notas',
        text1: `Pode revisar o `,
        text2: `código fonte`,
        text3: ` desta página, foi desenvolvida utilizando Vue, TailwindCSS, i18n e Parcel.`,
        text4: `Puntuação desktop Lighthouse 6.0:`
      }
    }
  }
})
