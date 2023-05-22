<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import MoonIcon from '@/assets/svg/moon.svg?component'
import SunIcon from '@/assets/svg/sun.svg?component'
import GithubIcon from '@/assets/svg/github.svg?component'
import LinkedinIcon from '@/assets/svg/linkedin.svg?component'
import TwitterIcon from '@/assets/svg/twitter.svg?component'
import ProfileIcon from '@/assets/svg/profile.svg?component'
import CodeIcon from '@/assets/svg/code.svg?component'
import ComputerIcon from '@/assets/svg/computer.svg?component'
import InfoIcon from '@/assets/svg/info.svg?component'
import CaseIcon from '@/assets/svg/case.svg?component'

const { t, locale, availableLocales } = useI18n()

const isDark = ref(false)

function getBirth() {
  return new Date(472964400000).toLocaleString(locale.value, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })
}

function checkDarkMode() {
  return document.documentElement.classList.contains('dark')
}

function toggleDarkMode() {
  if (!checkDarkMode()) {
    document.documentElement.classList.add('dark')
    isDark.value = true
  } else {
    document.documentElement.classList.remove('dark')
    isDark.value = false
  }
}

const _availableLocales = computed(() => availableLocales.filter((i) => i !== locale.value))

/**
 * PDF file according to current locale
 */
const _fileName = computed(() => {
  return t('about.link') + '.pdf'
})

/**
 * Download name suggestion with current date
 */
const _downloadName = computed(() => {
  return (
    t('about.link') +
    '_' +
    new Date().toLocaleString(locale.value, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    }) +
    '.pdf'
  )
})

onMounted(() => {
  isDark.value = checkDarkMode()
})

/**
 * Static properties
 */
const languages = {
  TypeScript: 9,
  JavaScript: 10,
  Go: 5,
  FQL: 9,
  Kotlin: 3,
  Java: 8,
  HTML5: 10,
  CSS3: 9,
  PHP: 8,
  SCSS: 7,
  SQL: 6
}

const libs = {
  'Vue 3 (composition API)': 9,
  TailwindCSS: 10,
  FaunaDB: 9,
  GraphQL: 10,
  Apollo: 8,
  NuxtJS: 10,
  ExpressJS: 8,
  Laravel: 7,
  'Android SDK': 5,
  React: 4,
  Bootstrap: 8
}

const ops = {
  Netlify: 9,
  Vercel: 8,
  GitFlow: 10,
  'CI/CD': 6,
  GCP: 7,
  AWS: 3,
  'Digital Ocean': 7,
  Heroku: 8
}

const other = {
  Vite: 9,
  JAMStack: 8,
  'Drupal (Headless)': 10,
  GitHub: 9,
  Rollup: 7,
  Docker: 7,
  Parcel: 5,
  Gulp: 8
}

const speaking = {
  spanish: 'native',
  english: 'fluent',
  portuguese: 'fluent',
  german: 'beginner'
}
</script>

<template>
  <div class="mx-auto md:container lg:grid lg:grid-cols-8">
    <aside
      class="flex flex-col items-center bg-gray-300 py-8 dark:bg-gray-800 lg:col-span-3 lg:p-8"
    >
      <div class="-mt-4 mb-4 ml-auto mr-8 flex space-x-5 lg:mr-5 xl:mr-8">
        <button
          type="button"
          class="focus-visible:shadow-outline w-5 transform hover:scale-125 focus:outline-none print:hidden"
          aria-label="Switch colors"
          @click="toggleDarkMode"
        >
          <MoonIcon v-if="!isDark" class="fill-current text-teal-800 hover:text-teal-400" />
          <SunIcon v-else class="fill-current text-green-500 hover:text-teal-400" />
        </button>
        <router-link
          class="dark-hover:text-teal-400 text-teal-800 hover:text-teal-500 dark:text-green-500"
          v-for="locale in _availableLocales"
          :key="locale"
          :to="locale !== 'en' ? '?lang=' + locale : '/'"
        >
          {{ $t(locale) }}
        </router-link>
      </div>
      <div class="sm:mt-3 sm:flex lg:mt-0 lg:block">
        <div>
          <picture>
            <source
              srcset="src/assets/img/pic_w_300.webp 1x, src/assets/img/pic_w_300@3x.webp 3x"
              type="image/webp"
              media="(max-width: 360px)"
            />
            <source
              srcset="src/assets/img/pic_w_300.jpg 1x, src/assets/img/pic_w_300@3x.jpg 3x"
              type="image/jpg"
              media="(max-width: 360px)"
            />

            <source
              srcset="src/assets/img/pic_w_320.webp 1x, src/assets/img/pic_w_320@3x.webp 3x"
              type="image/webp"
            />
            <source
              srcset="src/assets/img/pic_w_320.jpg 1x, src/assets/img/pic_w_320@3x.jpg 3x"
              type="image/jpg"
            />

            <img
              class="c-size mx-auto mb-3 box-content rounded border-2 shadow-md"
              src="src/assets/img/pic_w_320.jpg"
              srcset="src/assets/img/pic_w_320.jpg 1x, src/assets/img/pic_w_320@3x.jpg 3x"
              alt="Face picture"
            />
          </picture>
          <div class="my-6 px-6 text-center print:my-2 sm:text-left">
            <h1 class="opacity-75 dark:opacity-100">
              <span class="inline-block text-4xl font-bold dark:text-white">Pablo Miceli</span>
              <br />
              <span class="inline-block text-xl text-gray-900 dark:text-gray-500">
                {{ $t('about.title') }}
              </span>
            </h1>
          </div>
        </div>
        <div class="px-6">
          <div class="mb-6 flex justify-center space-x-5 lg:mb-0">
            <a
              class="transform hover:scale-125"
              href="https://github.com/d1urno"
              aria-label="GitHub"
              target="_blank"
              rel="noopener nofollow"
            >
              <GithubIcon
                class="dark-hover:text-teal-400 w-10 fill-current hover:text-teal-500 dark:text-green-500"
              />
            </a>
            <a
              class="transform hover:scale-125"
              href="https://www.linkedin.com/in/pmicel/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener nofollow"
            >
              <LinkedinIcon
                class="dark-hover:text-teal-400 w-10 fill-current hover:text-teal-500 dark:text-green-500"
              />
            </a>
            <a
              class="transform hover:scale-125"
              href="https://twitter.com/d1urno"
              aria-label="Twitter"
              target="_blank"
              rel="noopener nofollow"
            >
              <TwitterIcon
                class="dark-hover:text-teal-400 w-10 fill-current hover:text-teal-500 dark:text-green-500"
              />
            </a>
          </div>
          <hr
            class="-mx-6 mb-6 mt-8 box-border border border-gray-500 bg-gray-500 opacity-75 dark:border-gray-700 dark:bg-gray-700 sm:hidden lg:block"
          />
          <table class="mb-6 lg:mb-12">
            <tbody>
              <tr>
                <td class="pr-5 text-gray-900 dark:text-gray-400">
                  {{ $t('about.nationality') }}:
                </td>
                <td class="text-gray-900 dark:text-gray-400">Argentina</td>
              </tr>
              <tr>
                <td class="pr-5 text-gray-900 dark:text-gray-400">{{ $t('about.birth') }}:</td>
                <td class="text-gray-900 dark:text-gray-400">
                  {{ getBirth() }}
                </td>
              </tr>
              <tr>
                <td class="pr-5 text-gray-900 dark:text-gray-400">E-mail:</td>
                <td class="text-gray-900 dark:text-gray-400">
                  <a
                    class="dark-hover:text-teal-400 text-teal-800 hover:text-teal-500 dark:text-green-500"
                    href="mailto:d1urno@gmx.com"
                    >d1urno@gmx.com</a
                  >
                </td>
              </tr>
              <tr>
                <td class="pr-5 text-gray-900 dark:text-gray-400">{{ $t('about.location') }}:</td>
                <td class="text-gray-900 dark:text-gray-400">La Plata, Argentina</td>
              </tr>
            </tbody>
          </table>
          <h2 class="text-xl font-bold opacity-75 dark:text-white">{{ $t('about.idioms') }}:</h2>
          <hr
            class="-mx-6 my-2 box-border border border-gray-500 bg-gray-500 opacity-75 dark:border-gray-700 dark:bg-gray-700"
          />
          <table class="mb-4 text-gray-900 dark:text-gray-400">
            <tbody>
              <tr v-for="(value, key) in speaking" :key="key">
                <td class="pr-5 text-gray-900 dark:text-gray-400">{{ $t('about.' + key) }}:</td>
                <td class="text-gray-900 dark:text-gray-400">{{ $t('about.' + value) }}</td>
              </tr>
            </tbody>
          </table>
          <div class="pt-10 text-center print:hidden">
            <a
              class="rounded-full bg-teal-700 px-4 py-1 text-center font-bold text-white no-underline shadow hover:bg-teal-500"
              type="button"
              :href="_fileName"
              :download="_downloadName"
            >
              {{ $t('about.download') }}
            </a>
          </div>
        </div>
      </div>
    </aside>

    <div class="px-16 py-8 lg:col-span-5">
      <!-- Profile -->
      <section>
        <div class="ml-auto flex items-center text-2xl uppercase">
          <h2 class="ml-auto text-teal-700 dark:text-white">{{ $t('profile.title') }}</h2>
          <ProfileIcon class="ml-2 w-12 text-teal-500 dark:text-green-500" />
        </div>
        <hr
          class="-mx-6 my-4 box-border border border-gray-500 bg-gray-500 opacity-75 dark:border-gray-500 dark:bg-gray-300"
        />
        <p class="mb-8 text-gray-900 dark:text-gray-400">{{ $t('profile.text') }}</p>
      </section>
      <!-- End: Profile -->

      <!-- Skills -->
      <section>
        <div class="ml-auto flex items-center text-2xl uppercase">
          <h2 class="ml-auto text-teal-700 dark:text-white">{{ $t('skills.title') }}</h2>
          <CodeIcon class="-mb-1 ml-2 w-12 text-teal-500 dark:text-green-500" />
        </div>
        <hr
          class="-mx-6 my-4 box-border border border-gray-500 bg-gray-500 opacity-75 dark:border-gray-500 dark:bg-gray-300"
        />
        <p class="mb-8 text-gray-900 dark:text-gray-400">{{ $t('skills.text') }}</p>
        <div class="mb-10 grid gap-6 sm:grid-cols-2">
          <div class="col-span-1">
            <h3 class="mb-4 text-sm font-semibold opacity-75 dark:text-white">
              {{ $t('skills.subtitle1') }}
            </h3>
            <svg
              v-for="(value, key) in languages"
              :key="key"
              viewBox="0 0 90 8"
              class="mb-2 h-6 flex-1 text-teal-500 lg:h-5 xl:h-6"
            >
              <rect
                rx="3"
                ry="5"
                :width="value * 10 + '%'"
                height="100%"
                style="fill: currentColor"
              />
              <text x="4" y="5.6" fill="white" font-weight="bold" font-size=".33rem">
                {{ key }}
              </text>
              Sorry, your browser does not support inline SVG.
            </svg>
          </div>
          <div class="col-span-1 print:pb-5">
            <h3 class="mb-4 text-sm font-semibold opacity-75 dark:text-white">
              {{ $t('skills.subtitle2') }}
            </h3>
            <svg
              v-for="(value, key) in libs"
              :key="key"
              viewBox="0 0 90 8"
              class="mb-2 h-6 flex-1 text-teal-800 opacity-75 lg:h-5 xl:h-6"
            >
              <rect
                rx="4"
                ry="5"
                :width="value * 10 + '%'"
                height="100%"
                style="fill: currentColor"
              />
              <text x="4" y="5.6" fill="white" font-weight="bold" font-size=".33rem">
                {{ key }}
              </text>
              Sorry, your browser does not support inline SVG.
            </svg>
          </div>
          <div class="col-span-1">
            <h3 class="mb-4 text-sm font-semibold opacity-75 dark:text-white">
              {{ $t('skills.subtitle3') }}
            </h3>
            <svg
              v-for="(value, key) in other"
              :key="key"
              viewBox="0 0 90 8"
              class="mb-2 h-6 flex-1 text-teal-800 opacity-75 lg:h-5 xl:h-6"
            >
              <rect
                rx="3"
                ry="5"
                :width="value * 10 + '%'"
                height="100%"
                style="fill: currentColor"
              />
              <text x="4" y="5.6" fill="white" font-weight="bold" font-size=".33rem">
                {{ key }}
              </text>
              Sorry, your browser does not support inline SVG.
            </svg>
          </div>
          <div class="col-span-1">
            <h3 class="mb-4 text-sm font-semibold opacity-75 dark:text-white">
              {{ $t('skills.subtitle4') }}
            </h3>
            <svg
              v-for="(value, key) in ops"
              :key="key"
              viewBox="0 0 90 8"
              class="mb-2 h-6 flex-1 text-teal-800 opacity-75 lg:h-5 xl:h-6"
            >
              <rect
                rx="3"
                ry="5"
                :width="value * 10 + '%'"
                height="100%"
                style="fill: currentColor"
              />
              <text x="4" y="5.6" fill="white" font-weight="bold" font-size=".33rem">
                {{ key }}
              </text>
              Sorry, your browser does not support inline SVG.
            </svg>
          </div>
        </div>
      </section>
      <!-- End: Skills -->

      <!-- Experiences -->
      <section class="print:pb-10">
        <div class="ml-auto flex items-center text-2xl uppercase">
          <h2 class="ml-auto text-teal-700 dark:text-white">{{ $t('experience.title') }}</h2>
          <CaseIcon class="ml-2 w-12 text-teal-500 dark:text-green-500" />
        </div>
        <hr
          class="-mx-6 my-4 box-border border border-gray-500 bg-gray-500 opacity-75 dark:border-gray-500 dark:bg-gray-300"
        />
        <span class="text-sm dark:text-gray-400">2021</span>
        <h3 class="text-2xl font-bold opacity-75 dark:text-white dark:opacity-100">
          {{ $t('experience.exp4.title') }}
        </h3>
        <a
          class="dark-hover:text-teal-400 font-semibold hover:text-teal-400 dark:text-green-500"
          rel="noopener nofollow"
          href="https://joinairbank.com"
          target="_blank"
        >
          https://joinairbank.com
        </a>
        <p class="mb-8 text-gray-400 text-gray-900 text-opacity-75 dark:text-gray-400">
          {{ $t('experience.exp4.text') }}
        </p>
        <span class="text-sm dark:text-gray-400">2020</span>
        <h3 class="text-2xl font-bold opacity-75 dark:text-white dark:opacity-100">
          {{ $t('experience.exp3.title') }}
        </h3>
        <a
          class="dark-hover:text-teal-400 font-semibold hover:text-teal-400 dark:text-green-500"
          rel="noopener nofollow"
          href="https://matera.com"
          target="_blank"
        >
          https://matera.com
        </a>
        <p class="mb-8 text-gray-400 text-gray-900 text-opacity-75 dark:text-gray-400">
          {{ $t('experience.exp3.text') }}
          <a
            class="dark-hover:text-teal-400 hover:text-teal-400 dark:text-green-500"
            href="https://www.npmjs.com/package/nuxt-image-extractor"
            rel="noopener nofollow"
            target="_blank"
          >
            nuxt-image-extractor</a
          >.
        </p>
        <span class="text-sm dark:text-gray-400">2019</span>
        <h3 class="text-2xl font-bold opacity-75 dark:text-white dark:opacity-100">
          {{ $t('experience.exp2.title') }}
        </h3>
        <a
          class="dark-hover:text-teal-400 font-semibold hover:text-teal-400 dark:text-green-500"
          rel="noopener nofollow"
          href="https://paranabanco.com.br"
          target="_blank"
        >
          https://paranabanco.com.br
        </a>
        <p class="mb-8 text-gray-900 text-opacity-75 dark:text-gray-400">
          {{ $t('experience.exp2.text') }}
        </p>
        <span class="text-sm dark:text-gray-400">2019</span>
        <h3 class="text-2xl font-bold opacity-75 dark:text-white dark:opacity-100">
          {{ $t('experience.exp1.title') }}
        </h3>
        <a
          class="dark-hover:text-teal-400 font-semibold hover:text-teal-400 dark:text-green-500"
          rel="noopener nofollow"
          href="https://ctrl365.com.br"
          target="_blank"
        >
          https://ctrl365.com.br
        </a>
        <p class="mb-8 text-gray-900 text-opacity-75 dark:text-gray-400 print:pb-16">
          {{ $t('experience.exp1.text1') }}
          <a
            class="dark-hover:text-teal-400 hover:text-teal-400 dark:text-green-500"
            rel="noopener nofollow"
            href="https://dev.ctrl365.com.br/acer/predator-thronos/"
            target="_blank"
            >Acer</a
          >,
          <a
            class="dark-hover:text-teal-400 hover:text-teal-400 dark:text-green-500"
            rel="noopener nofollow"
            href="https://dev.ctrl365.com.br/whirlpool/consul/refrigeracao/geladeira/freezer-embaixo-inox/"
            target="_blank"
          >
            Consul
          </a>
          {{ $t('experience.exp1.text2') }}
          <a
            class="dark-hover:text-teal-400 hover:text-teal-400 dark:text-green-500"
            rel="noopener nofollow"
            href="https://dev.ctrl365.com.br/nestle/mucilon/cereal-infantil/aveia-ameixa/"
            target="_blank"
          >
            Nestle
          </a>
          {{ $t('experience.exp1.text3') }}
          <a
            class="dark-hover:text-teal-400 hover:text-teal-400 dark:text-green-500"
            href="https://intranet-vue.now.sh"
            target="_blank"
            rel="noopener nofollow"
            >intranet</a
          >
          {{ $t('experience.exp1.text4') }}
        </p>
      </section>
      <!-- End: Experiences -->

      <!-- Tests -->
      <section class="print:pb-10">
        <div class="ml-auto flex items-center text-2xl uppercase">
          <h2 class="ml-auto text-teal-700 dark:text-white">Tests</h2>
          <ComputerIcon class="ml-2 w-12 text-teal-500 dark:text-green-500" />
        </div>
        <hr
          class="-mx-6 my-4 box-border border border-gray-500 bg-gray-500 opacity-75 dark:border-gray-500 dark:bg-gray-300"
        />
        <span class="text-sm dark:text-gray-400">2020</span>
        <h3 class="text-2xl font-bold opacity-75 dark:text-white dark:opacity-100">
          Dryve frontend test
        </h3>
        <p class="mb-8 text-gray-900 text-opacity-75 dark:text-gray-400">
          <a
            class="dark-hover:text-teal-400 font-semibold hover:text-teal-400 dark:text-green-500"
            rel="noopener nofollow"
            href="https://dryve-frontend-test.netlify.app"
            target="_blank"
          >
            Live deploy
          </a>
          -
          <a
            class="dark-hover:text-teal-400 inline-flex font-semibold hover:text-teal-400 dark:text-green-500"
            rel="noopener nofollow"
            href="https://github.com/d1urno/dryve-frontend-test"
            target="_blank"
          >
            Repository
          </a>
          <br />
          Stack: Vue 3 - Vite - TypeScript - TailwindCSS - Jest
        </p>
        <span class="text-sm dark:text-gray-400">2020</span>
        <h3 class="text-2xl font-bold opacity-75 dark:text-white dark:opacity-100">
          Dog & Pony Studios frontend test
        </h3>
        <p class="mb-8 text-gray-900 text-opacity-75 dark:text-gray-400">
          <a
            class="dark-hover:text-teal-400 font-semibold hover:text-teal-400 dark:text-green-500"
            rel="noopener nofollow"
            href="https://dps-senior-frontend-test.netlify.app"
            target="_blank"
          >
            Live deploy
          </a>
          -
          <a
            class="dark-hover:text-teal-400 inline-flex font-semibold hover:text-teal-400 dark:text-green-500"
            rel="noopener nofollow"
            href="https://github.com/d1urno/senior-frontend-test"
            target="_blank"
          >
            Repository
          </a>
          <br />
          Stack: Nuxt - TailwindCSS - Jest
        </p>
        <span class="text-sm dark:text-gray-400">2020</span>
        <h3 class="text-2xl font-bold opacity-75 dark:text-white dark:opacity-100">
          Doc88 frontend challenge
        </h3>
        <p class="mb-8 text-gray-900 text-opacity-75 dark:text-gray-400">
          <a
            class="dark-hover:text-teal-400 font-semibold hover:text-teal-400 dark:text-green-500"
            rel="noopener nofollow"
            href="https://doc88-frontend-challenge.netlify.app"
            target="_blank"
          >
            Live deploy
          </a>
          -
          <a
            class="dark-hover:text-teal-400 inline-flex font-semibold hover:text-teal-400 dark:text-green-500"
            rel="noopener nofollow"
            href="https://github.com/d1urno/doc88-frontend-challenge"
            target="_blank"
          >
            Repository
          </a>
          <br />
          Stack: Vue 2.6 - TypeScript - TailwindCSS - Jest
        </p>
      </section>
      <!-- End: Tests -->

      <!-- Score -->
      <div class="ml-auto flex items-center text-2xl uppercase">
        <h2 class="ml-auto text-teal-700 dark:text-white">{{ $t('score.title') }}</h2>
        <InfoIcon class="ml-2 w-12 text-teal-500 dark:text-green-500" />
      </div>
      <hr
        class="-mx-6 my-4 box-border border border-gray-500 bg-gray-500 opacity-75 dark:border-gray-500 dark:bg-gray-300"
      />
      <section>
        <p class="text-gray-900 dark:text-gray-400">
          {{ $t('score.text1') }}
          <a
            class="dark-hover:text-teal-400 hover:text-teal-400 dark:text-green-500"
            href="https://github.com/d1urno/profile"
            target="_blank"
            rel="noopener nofollow"
            >{{ $t('score.text2') }}</a
          >{{ $t('score.text3') }}<br /><br />
          {{ $t('score.text4') }}
          <br /><br />
        </p>
        <picture>
          <source
            srcset="src/assets/img/score_w_248.webp 1x, src/assets/img/score_w_248@3x.webp 3x"
            type="image/webp"
            media="(max-width: 360px)"
          />
          <source
            srcset="src/assets/img/score_w_248.jpg 1x, src/assets/img/score_w_248@3x.jpg 3x"
            type="image/jpg"
            media="(max-width: 360px)"
          />

          <source
            srcset="src/assets/img/score_w_598.webp 1x, src/assets/img/score_w_598@3x.webp 3x"
            type="image/webp"
          />
          <source
            srcset="src/assets/img/score_w_598.jpg 1x, src/assets/img/score_w_598@3x.jpg 3x"
            type="image/jpg"
          />

          <img
            class="mx-auto"
            src="src/assets/img/score_w_598.jpg"
            srcset="src/assets/img/score_w_598.jpg 1x, src/assets/img/score_w_598@3x.jpg 3x"
            alt="Lighthouse 6.0 score 100"
            loading="lazy"
          />
        </picture>
      </section>
      <!-- End: Score -->
    </div>
  </div>
</template>

<style>
html {
  font-size: 14px;
  min-width: 320px;
  @screen lg {
    font-size: 16px;
  }
}
a {
  @apply text-teal-700 underline;
}

svg {
  transition: fill 0.3s;
}

* {
  @apply transition duration-300;
}

@media print {
  @page {
    size: 210mm 297mm;
    margin: 0;
  }
}

.c-size {
  height: 300px;
  width: 300px;
  @screen sm {
    height: 220px;
    width: 220px;
  }
  @screen lg {
    height: 260px;
    width: 260px;
  }
  @screen xl {
    height: 320px;
    width: 320px;
  }
}
</style>
