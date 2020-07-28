<template>
  <div class="mx-auto md:container lg:grid lg:grid-cols-8">
    <aside class="flex flex-col items-center py-8 bg-gray-400 lg:p-8 lg:col-span-3">
      <div class="mb-4 ml-auto mr-8 -mt-4 lg:mr-5 xl:mr-8">
        <locale-switcher />
      </div>
      <div class="sm:flex sm:mt-3 lg:block lg:mt-0">
        <div>
          <picture>
            <source srcset="img/pic_w_300.webp" type="image/webp" media="(max-width: 360px)" />
            <source srcset="img/pic_w_300.jpg" type="image/jpg" media="(max-width: 360px)" />

            <source srcset="img/pic_w_320.webp" type="image/webp" />
            <source srcset="img/pic_w_320.jpg" type="image/jpg" />

            <img class="mx-auto mb-3 border-2 rounded shadow-md c-height" src="img/pic_w_320.jpg" alt="Face picture" />
          </picture>
          <div class="px-6 text-center sm:text-left">
            <h1 class="text-4xl font-bold opacity-75">Pablo Miceli</h1>
            <p class="mb-6 text-xl text-gray-900 opacity-75">{{ $t('about.title') }}</p>
          </div>
        </div>
        <div class="px-6">
          <div class="flex justify-center mb-6 space-x-5 lg:mb-0">
            <a href="https://github.com/d1urno" aria-label="GitHub" target="_blank" rel="noopener">
              <svg
                class="w-10 transition-colors duration-300 opacity-75 fill-current hover:text-teal-500"
                viewBox="0 0 1024 1024"
                height="100%"
                width="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M512 0C229.25 0 0 229.25 0 512c0 226.25 146.688 418.125 350.156 485.812 25.594 4.688 34.938-11.125 34.938-24.625 0-12.188-0.469-52.562-0.719-95.312C242 908.812 211.906 817.5 211.906 817.5c-23.312-59.125-56.844-74.875-56.844-74.875-46.531-31.75 3.53-31.125 3.53-31.125 51.406 3.562 78.47 52.75 78.47 52.75 45.688 78.25 119.875 55.625 149 42.5 4.654-33 17.904-55.625 32.5-68.375C304.906 725.438 185.344 681.5 185.344 485.312c0-55.938 19.969-101.562 52.656-137.406-5.219-13-22.844-65.094 5.062-135.562 0 0 42.938-13.75 140.812 52.5 40.812-11.406 84.594-17.031 128.125-17.219 43.5 0.188 87.312 5.875 128.188 17.281 97.688-66.312 140.688-52.5 140.688-52.5 28 70.531 10.375 122.562 5.125 135.5 32.812 35.844 52.625 81.469 52.625 137.406 0 196.688-119.75 240-233.812 252.688 18.438 15.875 34.75 47 34.75 94.75 0 68.438-0.688 123.625-0.688 140.5 0 13.625 9.312 29.562 35.25 24.562C877.438 930 1024 738.125 1024 512 1024 229.25 794.75 0 512 0z"
                />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/pmicel/" aria-label="LinkedIn" target="_blank" rel="noopener">
              <svg
                class="w-10 transition-colors duration-300 opacity-75 fill-current hover:text-teal-500"
                enable-background="new 0 0 56.693 56.693"
                height="100%"
                id="Layer_1"
                viewBox="0 0 56.693 56.693"
                width="100%"
                xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path d="M30.071,27.101v-0.077c-0.016,0.026-0.033,0.052-0.05,0.077H30.071z" />
                  <path
                    d="M49.265,4.667H7.145c-2.016,0-3.651,1.596-3.651,3.563v42.613c0,1.966,1.635,3.562,3.651,3.562h42.12   c2.019,0,3.654-1.597,3.654-3.562V8.23C52.919,6.262,51.283,4.667,49.265,4.667z M18.475,46.304h-7.465V23.845h7.465V46.304z    M14.743,20.777h-0.05c-2.504,0-4.124-1.725-4.124-3.88c0-2.203,1.67-3.88,4.223-3.88c2.554,0,4.125,1.677,4.175,3.88   C18.967,19.052,17.345,20.777,14.743,20.777z M45.394,46.304h-7.465V34.286c0-3.018-1.08-5.078-3.781-5.078   c-2.062,0-3.29,1.389-3.831,2.731c-0.197,0.479-0.245,1.149-0.245,1.821v12.543h-7.465c0,0,0.098-20.354,0-22.459h7.465v3.179   c0.992-1.53,2.766-3.709,6.729-3.709c4.911,0,8.594,3.211,8.594,10.11V46.304z"
                  />
                </g>
              </svg>
            </a>
            <a href="https://twitter.com/d1urno" aria-label="Twitter" target="_blank" rel="noopener">
              <svg
                class="w-10 transition-colors duration-300 opacity-75 fill-current hover:text-teal-500"
                height="100%"
                id="Layer_1"
                viewBox="0 0 512 512"
                width="100%"
                xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M492,109.5c-17.4,7.7-36,12.9-55.6,15.3c20-12,35.4-31,42.6-53.6c-18.7,11.1-39.4,19.2-61.5,23.5  C399.8,75.8,374.6,64,346.8,64c-53.5,0-96.8,43.4-96.8,96.9c0,7.6,0.8,15,2.5,22.1C172,179,100.6,140.4,52.9,81.7  c-8.3,14.3-13.1,31-13.1,48.7c0,33.6,17.1,63.3,43.1,80.7C67,210.7,52,206.3,39,199c0,0.4,0,0.8,0,1.2c0,47,33.4,86.1,77.7,95  c-8.1,2.2-16.7,3.4-25.5,3.4c-6.2,0-12.3-0.6-18.2-1.8c12.3,38.5,48.1,66.5,90.5,67.3c-33.1,26-74.9,41.5-120.3,41.5  c-7.8,0-15.5-0.5-23.1-1.4C62.9,432,113.8,448,168.4,448C346.6,448,444,300.3,444,172.2c0-4.2-0.1-8.4-0.3-12.5  C462.6,146,479,128.9,492,109.5z"
                />
              </svg>
            </a>
          </div>
          <hr class="mt-8 mb-6 -mx-6 border border-gray-500 sm:hidden lg:block" />
          <table class="mb-6 lg:mb-12">
            <tbody>
              <tr>
                <td class="pr-5">{{ $t('about.nationality') }}:</td>
                <td>Argentina</td>
              </tr>
              <tr>
                <td class="pr-5">{{ $t('about.birth') }}:</td>
                <td>
                  {{ getBirth() }}
                </td>
              </tr>
              <tr>
                <td class="pr-5">E-mail:</td>
                <td>d1urno@gmx.com</td>
              </tr>
              <tr>
                <td class="pr-5">{{ $t('about.location') }}:</td>
                <td>São Paulo, Brazil</td>
              </tr>
            </tbody>
          </table>
          <h2 class="text-xl font-bold opacity-75">{{ $t('about.idioms') }}:</h2>
          <hr class="my-2 -mx-6 border border-gray-500" />
          <table class="mb-4">
            <tbody>
              <tr v-for="(value, key) in $options.speaking" :key="key">
                <td class="pr-5">{{ $t('about.' + key) }}:</td>
                <td>{{ $t('about.' + value) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </aside>

    <div class="px-16 py-8 lg:col-span-5">
      <!-- Profile -->
      <section>
        <div class="flex items-end ml-auto text-2xl uppercase">
          <h2 class="ml-auto text-teal-700">{{ $t('profile.title') }}</h2>
          <svg class="w-12 ml-2 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <hr class="my-4 -mx-6 border border-gray-500" />
        <p class="mb-8">{{ $t('profile.text') }}</p>
      </section>
      <!-- End: Profile -->

      <!-- Skills -->
      <section>
        <div class="flex items-end ml-auto text-2xl uppercase">
          <h2 class="ml-auto text-teal-700">{{ $t('skills.title') }}</h2>
          <svg class="w-12 ml-2 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <hr class="my-4 -mx-6 border border-gray-500" />
        <p class="mb-8">{{ $t('skills.text') }}</p>
        <div class="grid gap-6 row-gap-16 mb-10 sm:grid-cols-2">
          <div class="col-span-1">
            <h3 class="mb-4 text-sm font-semibold opacity-75">{{ $t('skills.subtitle1') }}</h3>
            <svg
              v-for="(value, key) in $options.languages"
              :key="key"
              viewBox="0 0 90 8"
              class="flex-1 h-6 mb-2 text-teal-500 lg:h-5 xl:h-6"
            >
              <rect rx="3" ry="5" :width="value * 10 + '%'" height="100%" style="fill: currentColor;" />
              <text x="4" y="5.6" fill="white" font-weight="bold" font-size=".33rem">{{ key }}</text>
              Sorry, your browser does not support inline SVG.
            </svg>
          </div>
          <div class="col-span-1">
            <h3 class="mb-4 text-sm font-semibold opacity-75">{{ $t('skills.subtitle2') }}</h3>
            <svg
              v-for="(value, key) in $options.libs"
              :key="key"
              viewBox="0 0 90 8"
              class="flex-1 h-6 mb-2 text-teal-800 opacity-75 lg:h-5 xl:h-6"
            >
              <rect rx="4" ry="5" :width="value * 10 + '%'" height="100%" style="fill: currentColor;" />
              <text x="4" y="5.6" fill="white" font-weight="bold" font-size=".33rem">{{ key }}</text>
              Sorry, your browser does not support inline SVG.
            </svg>
          </div>
          <div class="col-span-1">
            <h3 class="mb-4 text-sm font-semibold opacity-75">{{ $t('skills.subtitle3') }}</h3>
            <svg
              v-for="(value, key) in $options.other"
              :key="key"
              viewBox="0 0 90 8"
              class="flex-1 h-6 mb-2 text-teal-800 opacity-75 lg:h-5 xl:h-6"
            >
              <rect rx="3" ry="5" :width="value * 10 + '%'" height="100%" style="fill: currentColor;" />
              <text x="4" y="5.6" fill="white" font-weight="bold" font-size=".33rem">{{ key }}</text>
              Sorry, your browser does not support inline SVG.
            </svg>
          </div>
          <div class="col-span-1">
            <h3 class="mb-4 text-sm font-semibold opacity-75">{{ $t('skills.subtitle4') }}</h3>
            <svg
              v-for="(value, key) in $options.ops"
              :key="key"
              viewBox="0 0 90 8"
              class="flex-1 h-6 mb-2 text-teal-800 opacity-75 lg:h-5 xl:h-6"
            >
              <rect rx="3" ry="5" :width="value * 10 + '%'" height="100%" style="fill: currentColor;" />
              <text x="4" y="5.6" fill="white" font-weight="bold" font-size=".33rem">{{ key }}</text>
              Sorry, your browser does not support inline SVG.
            </svg>
          </div>
        </div>
      </section>
      <!-- End: Skills -->

      <!-- Experiences -->
      <section>
        <div class="flex items-end ml-auto text-2xl uppercase">
          <h2 class="ml-auto text-teal-700">{{ $t('experience.title') }}</h2>
          <svg class="w-12 ml-2 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
            <path
              d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"
            ></path>
          </svg>
        </div>
        <hr class="my-4 -mx-6 border border-gray-500" />
        <span class="text-sm">2020</span>
        <h3 class="text-2xl font-bold opacity-75">{{ $t('experience.exp1.title') }}</h3>
        <a class="font-semibold" rel="noopener" href="https://matera-institucional.now.sh" target="_blank">
          https://matera-institucional.now.sh
        </a>
        <p class="mb-8 text-gray-900 text-opacity-75">
          {{ $t('experience.exp1.text') }}
          <a href="https://www.npmjs.com/package/nuxt-image-extractor" rel="noopener" target="_blank">
            nuxt-image-extractor</a
          >.
        </p>
        <span class="text-sm">2019</span>
        <h3 class="text-2xl font-bold opacity-75">{{ $t('experience.exp2.title') }}</h3>
        <a class="font-semibold" rel="noopener" href="https://paranabanco.com.br" target="_blank">
          https://paranabanco.com.br
        </a>
        <p class="mb-8 text-gray-900 text-opacity-75">{{ $t('experience.exp2.text') }}</p>
        <span class="text-sm">2019</span>
        <h3 class="text-2xl font-bold opacity-75">{{ $t('experience.exp3.title') }}</h3>
        <a class="font-semibold" rel="noopener" href="https://ctrl365.com.br" target="_blank">
          https://ctrl365.com.br
        </a>
        <p class="mb-8 text-gray-900 text-opacity-75">
          {{ $t('experience.exp3.text1') }}
          <a rel="noopener" href="https://dev.ctrl365.com.br/acer/predator-thronos/" target="_blank">Acer</a>,
          <a
            rel="noopener"
            href="https://dev.ctrl365.com.br/whirlpool/consul/refrigeracao/geladeira/freezer-embaixo-inox/"
            target="_blank"
          >
            Consul
          </a>
          {{ $t('experience.exp3.text2') }}
          <a
            rel="noopener"
            href="https://dev.ctrl365.com.br/nestle/mucilon/cereal-infantil/aveia-ameixa/"
            target="_blank"
          >
            Nestle
          </a>
          {{ $t('experience.exp3.text3') }}
          <a href="https://intranet-vue.now.sh" target="_blank" rel="noopener">intranet</a>
          {{ $t('experience.exp3.text4') }}
        </p>
      </section>
      <!-- End: Experiences -->
    </div>
  </div>
</template>

<script>
import LocaleSwitcher from './components/LocaleSwitcher'

export default {
  components: { LocaleSwitcher },
  data() {
    return { locale: 'en-US' }
  },
  methods: {
    getBirth() {
      return new Date(472964400000).toLocaleString(this.$i18n.locale, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      })
    }
  },
  languages: {
    Go: 5,
    TypeScript: 7,
    JavaScript: 9,
    Kotlin: 3,
    Java: 8,
    PHP: 8,
    HTML5: 10,
    CSS3: 8,
    SCSS: 7,
    MySQL: 6
  },
  libs: {
    Vue: 9,
    NuxtJS: 10,
    TailwindCSS: 10,
    FaunaDB: 7,
    GraphQL: 8,
    Laravel: 7,
    Apollo: 7,
    'Android SDK': 5,
    React: 4,
    Bootstrap: 8
  },
  ops: {
    AWS: 3,
    Netlify: 7,
    Vercel: 9,
    GitFlow: 10,
    'CI/CD': 6,
    Pipelines: 6,
    'Digital Ocean': 7,
    Heroku: 8
  },
  other: {
    JAMStack: 8,
    'Drupal (Headless)': 10,
    API: 9,
    Docker: 7,
    GitHub: 7,
    BitBucket: 8,
    Parcel: 5,
    Gulp: 8
  },
  speaking: {
    spanish: 'native',
    english: 'fluent',
    portuguese: 'fluent',
    german: 'beginner'
  }
}
</script>

<style lang="scss">
html {
  font-size: 14px;
  min-width: 320px;
  @screen lg {
    font-size: 16px;
  }
}
a {
  @apply text-teal-700 underline transition-colors duration-300;
  &:hover {
    @apply text-teal-400;
  }
}

@media print {
  @page {
    size: 210mm 297mm;
    margin: 0;
  }
}

.c-height {
  height: 300.01px;
  @screen sm {
    height: 220.01px;
  }
  @screen lg {
    height: 260.01px;
  }
  @screen xl {
    height: 320.01px;
  }
}
</style>
