<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import MoonIcon from '@/assets/svg/moon.svg?component'
import SunIcon from '@/assets/svg/sun.svg?component'
import GithubIcon from '@/assets/svg/github.svg?component'
import LinkedinIcon from '@/assets/svg/linkedin.svg?component'
import TwitterIcon from '@/assets/svg/twitter.svg?component'

const isDark = defineModel<boolean>('isDark')

const { t, locale, availableLocales } = useI18n()

const SPEAKING = {
  spanish: 'native',
  english: 'fluent',
  portuguese: 'fluent',
  german: 'beginner'
}

const filteredAvailableLocales = computed(() => availableLocales.filter((i) => i !== locale.value))

const fileName = computed(() => {
  return t('about.link') + '.pdf'
})

const downloadName = computed(() => {
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

onMounted(() => {
  isDark.value = checkDarkMode()
})
</script>

<template>
  <aside class="flex flex-col items-center bg-gray-300 py-8 dark:bg-gray-800 lg:col-span-3 lg:p-8">
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
        class="dark:hover:text-teal-400 text-teal-800 hover:text-teal-500 dark:text-green-500"
        v-for="locale in filteredAvailableLocales"
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
            srcset="/src/assets/img/pic_w_300.webp 1x, /src/assets/img/pic_w_300@3x.webp 3x"
            type="image/webp"
            media="(max-width: 360px)"
          />
          <source
            srcset="/src/assets/img/pic_w_300.jpg 1x, /src/assets/img/pic_w_300@3x.jpg 3x"
            type="image/jpg"
            media="(max-width: 360px)"
          />

          <source
            srcset="/src/assets/img/pic_w_320.webp 1x, /src/assets/img/pic_w_320@3x.webp 3x"
            type="image/webp"
          />
          <source
            srcset="/src/assets/img/pic_w_320.jpg 1x, /src/assets/img/pic_w_320@3x.jpg 3x"
            type="image/jpg"
          />

          <img
            class="c-size mx-auto mb-3 box-content rounded border-2 shadow-md"
            src="/src/assets/img/pic_w_320.jpg"
            srcset="/src/assets/img/pic_w_320.jpg 1x, /src/assets/img/pic_w_320@3x.jpg 3x"
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
              class="dark:hover:text-teal-400 w-10 fill-current hover:text-teal-500 dark:text-green-500"
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
              class="dark:hover:text-teal-400 w-10 fill-current hover:text-teal-500 dark:text-green-500"
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
              class="dark:hover:text-teal-400 w-10 fill-current hover:text-teal-500 dark:text-green-500"
            />
          </a>
        </div>
        <hr
          class="-mx-6 mb-6 mt-8 box-border border border-gray-500 bg-gray-500 opacity-75 dark:border-gray-700 dark:bg-gray-700 sm:hidden lg:block"
        />
        <table class="mb-6 lg:mb-12">
          <tbody>
            <tr>
              <td class="pr-5 text-gray-900 dark:text-gray-400">{{ $t('about.nationality') }}:</td>
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
                  class="dark:hover:text-teal-400 text-teal-800 hover:text-teal-500 dark:text-green-500"
                  href="mailto:d1urno@gmx.com"
                >
                  d1urno@gmx.com
                </a>
              </td>
            </tr>
            <tr>
              <td class="pr-5 text-gray-900 dark:text-gray-400">{{ $t('about.location') }}:</td>
              <td class="text-gray-900 dark:text-gray-400">Cape Town, South Africa</td>
            </tr>
          </tbody>
        </table>
        <h2 class="text-xl font-bold opacity-75 dark:text-white">{{ $t('about.idioms') }}:</h2>
        <hr
          class="-mx-6 my-2 box-border border border-gray-500 bg-gray-500 opacity-75 dark:border-gray-700 dark:bg-gray-700"
        />
        <table class="mb-4 text-gray-900 dark:text-gray-400">
          <tbody>
            <tr v-for="(value, key) in SPEAKING" :key="key">
              <td class="pr-5 text-gray-900 dark:text-gray-400">{{ $t('about.' + key) }}:</td>
              <td class="text-gray-900 dark:text-gray-400">{{ $t('about.' + value) }}</td>
            </tr>
          </tbody>
        </table>
        <div class="pt-10 text-center print:hidden">
          <a
            class="rounded-full bg-teal-700 px-4 py-1 text-center font-bold text-white no-underline shadow hover:bg-teal-500"
            type="button"
            :href="fileName"
            :download="downloadName"
          >
            {{ $t('about.download') }}
          </a>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped lang="postcss">
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
