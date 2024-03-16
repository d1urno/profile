<script setup lang="ts">
import InfoIcon from '@/assets/svg/info.svg?component'
</script>

<template>
  <section>
    <div class="ml-auto flex items-center text-2xl uppercase">
      <h2 class="ml-auto text-teal-700 dark:text-white">{{ $t('score.title') }}</h2>
      <InfoIcon class="ml-2 w-12 text-teal-500 dark:text-green-500" />
    </div>
    <hr
      class="-mx-6 my-4 box-border border border-gray-500 bg-gray-500 opacity-75 dark:border-gray-500 dark:bg-gray-300"
    />
    <p class="text-gray-900 dark:text-gray-400">
      {{ $t('score.text1') }}
      <a
        class="dark:hover:text-teal-400 hover:text-teal-400 dark:text-green-500"
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
        srcset="/src/assets/img/score_w_248.webp 1x, /src/assets/img/score_w_248@3x.webp 3x"
        type="image/webp"
        media="(max-width: 360px)"
      />
      <source
        srcset="/src/assets/img/score_w_248.jpg 1x, /src/assets/img/score_w_248@3x.jpg 3x"
        type="image/jpg"
        media="(max-width: 360px)"
      />

      <source
        srcset="/src/assets/img/score_w_598.webp 1x, /src/assets/img/score_w_598@3x.webp 3x"
        type="image/webp"
      />
      <source
        srcset="/src/assets/img/score_w_598.jpg 1x, /src/assets/img/score_w_598@3x.jpg 3x"
        type="image/jpg"
      />

      <img
        class="mx-auto"
        src="/src/assets/img/score_w_598.jpg"
        srcset="/src/assets/img/score_w_598.jpg 1x, /src/assets/img/score_w_598@3x.jpg 3x"
        alt="Lighthouse 6.0 score 100"
        loading="lazy"
      />
    </picture>
  </section>
</template>
