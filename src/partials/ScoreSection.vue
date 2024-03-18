<script setup lang="ts">
import InfoIcon from '@/assets/svg/info.svg?component'
</script>

<template>
  <section>
    <div class="ml-auto flex items-center text-2xl uppercase">
      <h2 class="ml-auto text-teal-700 dark:text-white">{{ $t('ScoreSection.title') }}</h2>
      <InfoIcon class="ml-2 w-12 text-teal-500 dark:text-green-500" />
    </div>
    <hr
      class="-mx-6 my-4 box-border border border-gray-500 bg-gray-500 opacity-75 dark:border-gray-500 dark:bg-gray-300"
    />
    <p class="text-gray-900 dark:text-gray-400">
      {{ $t('ScoreSection.text1') }}
      <a
        class="hover:text-teal-400 dark:text-green-500 dark:hover:text-teal-400"
        href="https://github.com/d1urno/profile"
        target="_blank"
        rel="noopener nofollow"
        >{{ $t('ScoreSection.text2') }}</a
      >{{ $t('ScoreSection.text3') }}<br /><br />

      <a
        class="hover:text-teal-400 dark:text-green-500 dark:hover:text-teal-400"
        href="https://pagespeed.web.dev/analysis/https-pablomiceli-dev/k68o40ae1w?form_factor=mobile"
        target="_blank"
        rel="noopener nofollow"
      >
        {{ $t('ScoreSection.score') }}
      </a>
      <br /><br />
    </p>
    <a
      class="mx-auto mb-8 block text-center text-teal-700 dark:text-white"
      href="https://pagespeed.web.dev/analysis/https-pablomiceli-dev/k68o40ae1w?form_factor=mobile"
      target="_blank"
      rel="noopener nofollow"
    >
      <picture>
        <source
          srcset="/src/assets/img/score_w_248.webp 1x, /src/assets/img/score_w_248@3x.webp 3x"
          type="image/webp"
          media="(max-width: 360px)"
        />
        <source
          srcset="/src/assets/img/score_w_248.png 1x, /src/assets/img/score_w_248@3x.png 3x"
          type="image/jpg"
          media="(max-width: 360px)"
        />

        <source
          srcset="/src/assets/img/score_w_832.webp 1x, /src/assets/img/score_w_832@3x.webp 3x"
          type="image/webp"
        />
        <source
          srcset="/src/assets/img/score_w_832.png 1x, /src/assets/img/score_w_832@3x.png 3x"
          type="image/jpg"
        />

        <img
          class="c-size mx-auto object-contain"
          src="/src/assets/img/score_w_832.png"
          :alt="$t('ScoreSection.score')"
          loading="lazy"
        />
      </picture>
    </a>
  </section>
</template>

<style scoped lang="postcss">
.c-size {
  height: 75px;
  width: 300px;
  @screen sm {
    height: 133px;
    width: 528px;
  }
  @screen lg {
    height: 129px;
    width: 512px;
  }
  @screen xl {
    height: 169px;
    width: 672px;
  }
  @screen 2xl {
    height: 209px;
    width: 832px;
  }
}
</style>
