import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Formatter from './formatter'

Vue.use(VueI18n)

const locale = 'en-US' // default locale
const formatter = new Formatter({ locale })

export default new VueI18n({
  locale,
  formatter,
  messages: {
    'en-US': {
      'en-US': 'English',
      es: 'Español',
      pt: 'Português',
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
        beginner: 'Beginner'
      },
      profile: {
        title: 'Profile',
        text: `Argentine living in São Paulo since January 2019, passionate about design, programming, logic and new challenges. Started creating apps since I was a teenager, going from java game plugins to financial tools for personal use. Always based on continuous and self-taught learning of new technologies to better achieve my goals. Nowadays I'm focusing in websites/apps projects both as freelancer or employee.`
      },
      skills: {
        title: 'Technical Skills',
        subtitle1: 'Languages',
        subtitle2: 'Libraries/Frameworks',
        subtitle3: 'Other',
        subtitle4: 'Ops',
        text: `Ordered from top to bottom, skills I'll be more likely to work with. The horizontal extension of each bar represents actual knowledge/experience I do have on such.`
      },
      experience: {
        title: 'Recent experiences',
        exp1: {
          title: 'Institutional Website - Matera Fintech (ongoing)',
          text: `Project lead developer, code review, dedicated both on backend and frontend using Drupal Headless, GraphQL API. Frontend using NuxtJS with Vuex, i18n for internationalization, TailwindCSS, static generated configuration (JAMStack) and my own custom module`
        },
        exp2: {
          title: 'Institutional Website - Paraná Banco',
          text: `Project lead developer, dedicated to backend using Drupal Headless exposing a GraphQL endpoint and DevOps tasks as CI/CD in cooperation with Bank's developer team. Collaborated on frontend with my team using React (Hooks, Styled components, Redux) and Apollo Client.`
        },
        exp3: {
          title: 'Fullstack Developer - Ctrl365',
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
        text4: `Lighthouse 6.0 score:`
      }
    },
    es: {
      'en-US': 'English',
      es: 'Español',
      pt: 'Português',
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
        beginner: 'Principiante'
      },
      profile: {
        title: 'Perfil',
        text: `Argentino viviendo en São Paulo desde enero de 2019, apasionado por el diseño, la programación, la lógica y los nuevos desafíos. Comencé a crear aplicaciones desde que era adolescente, pasando de plugins para juegos en Java hasta herramientas financieras de uso personal. Siempre basado en el aprendizaje continuo y autodidacta de nuevas tecnologías para lograr mejor mis objetivos. Hoy en día me estoy centrando en proyectos de sitios web/aplicaciones tanto como freelance o empleado.`
      },
      skills: {
        title: 'Habilidades Técnicas',
        subtitle1: 'Lenguajes',
        subtitle2: 'Librerías/Frameworks',
        subtitle3: 'Otros',
        subtitle4: 'Ops',
        text: `Ordenadas de arriba a abajo, habilidades con las que estaría mas dispuesto a trabajar. La extensión horizontal de cada barra representa el conocimiento/experiencia que tengo al respecto.`
      },
      experience: {
        title: 'Experiencias recientes',
        exp1: {
          title: 'Website Institucional - Matera Fintech (en proceso)',
          text: `Desarrollador líder del proyecto, revisión de código, dedicado tanto en backend como en frontend usando Drupal Headless y API GraphQL. Frontend usando NuxtJS con Vuex, i18n para internacionalización, TailwindCSS, con una configuración de generación estatica (JAMStack) y mi propio módulo personalizado`
        },
        exp2: {
          title: 'Website Institucional - Paraná Banco',
          text: `Desarrollador líder del proyecto, dedicado en backend usando Drupal Headless para contenido siendo servido a traves de GraphQL y tareas DevOps como CI/CD en cooperación con el equipo de desarrolladores del Banco. Colaboré en frontend con mi equipo usando React (Hooks, Styled components, Redux) y Apollo Client.`
        },
        exp3: {
          title: 'Desarrollador Fullstack - Ctrl365',
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
        text4: `Puntuación Lighthouse 6.0:`
      }
    },
    pt: {
      'en-US': 'English',
      es: 'Español',
      pt: 'Português',
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
        beginner: 'Principiante'
      },
      profile: {
        title: 'Perfil',
        text: `Argentino morando em São Paulo desde janeiro de 2019, apaixonado por design, programação, lógica e novos desafios. Comecei a criar aplicativos desde a adolescência, passando de plug-ins para jogos em java a ferramentas financeiras de uso pessoal. Sempre com base no aprendizado contínuo e autodidata de novas tecnologias para melhor alcançar meus objetivos. Atualmente, estou focando em projetos de sites/aplicativos, tanto como freelancer ou funcionário.`
      },
      skills: {
        title: 'Habilidades técnicas',
        subtitle1: 'Línguas',
        subtitle2: 'Bibliotecas/Frameworks',
        subtitle3: 'Outros',
        subtitle4: 'Ops',
        text: `Ordenadas de cima para baixo, habilidades com as quais estou mais disposto a trabalhar. A extensão horizontal de cada barra representa o conhecimento/experiência que tenho naquele item.`
      },
      experience: {
        title: 'Experiências recentes',
        exp1: {
          title: 'Site institucional - Matera Fintech (em andamento)',
          text: `Desenvolvedor líder do projeto, revisão de código, dedicado no back-end e front-end usando uma API GraphQL no Drupal Headless. Frontend usando NuxtJS com Vuex, i18n para internacionalização, TailwindCSS, configurado para geração estatica (JAMStack) e meu próprio módulo personalizado`
        },
        exp2: {
          title: 'Site institucional - Paraná Banco',
          text: `Desenvolvedor líder do projeto, dedicado ao back-end usando o Drupal Headless, expondo uma api GraphQL e tarefas de DevOps como CI/CD em cooperação com a equipe de desenvolvedores do Banco. Colaborei no frontend com minha equipe usando React (Hooks, Styled components, Redux) e Apollo Client.`
        },
        exp3: {
          title: 'Desenvolvedor Fullstack - Ctrl365',
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
        text4: `Puntuação Lighthouse 6.0:`
      }
    }
  }
})
