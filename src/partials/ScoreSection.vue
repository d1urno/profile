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
      href="https://pagespeed.web.dev/analysis/https-pablomiceli-dev/maxe81qq7x?form_factor=mobile"
      target="_blank"
      rel="noopener nofollow"
    >
      <picture>
        <source
          :srcset="`https://res.cloudinary.com/cosmic-devs/image/upload/q_auto,w_300/v1710761790/pablomiceli/static/score.webp 1x,
            https://res.cloudinary.com/cosmic-devs/image/upload/q_auto,w_600/v1710761790/pablomiceli/static/score.webp 2x,
            https://res.cloudinary.com/cosmic-devs/image/upload/q_auto,w_900/v1710761790/pablomiceli/static/score.webp 3x`"
          type="image/webp"
          media="(max-width: 412px)"
        />

        <source
          :srcset="`https://res.cloudinary.com/cosmic-devs/image/upload/q_auto,w_300/v1710761790/pablomiceli/static/score.jpg 1x,
            https://res.cloudinary.com/cosmic-devs/image/upload/q_auto,w_600/v1710761790/pablomiceli/static/score.jpg 2x,
            https://res.cloudinary.com/cosmic-devs/image/upload/q_auto,w_900/v1710761790/pablomiceli/static/score.jpg 3x`"
          type="image/jpg"
          media="(max-width: 412px)"
        />

        <source
          :srcset="`https://res.cloudinary.com/cosmic-devs/image/upload/q_auto,w_832/v1710761790/pablomiceli/static/score.webp  1x,
            https://res.cloudinary.com/cosmic-devs/image/upload/q_auto,w_1664/v1710761790/pablomiceli/static/score.webp 2x,
            https://res.cloudinary.com/cosmic-devs/image/upload/q_auto,w_2496/v1710761790/pablomiceli/static/score.webp 3x`"
          type="image/webp"
        />

        <source
          :srcset="`https://res.cloudinary.com/cosmic-devs/image/upload/q_auto,w_832/v1710761790/pablomiceli/static/score.jpg  1x,
            https://res.cloudinary.com/cosmic-devs/image/upload/q_auto,w_1664/v1710761790/pablomiceli/static/score.jpg 2x,
            https://res.cloudinary.com/cosmic-devs/image/upload/q_auto,w_2496/v1710761790/pablomiceli/static/score.jpg 3x`"
          type="image/jpg"
        />

        <img
          class="c-size mx-auto object-contain"
          src="https://res.cloudinary.com/cosmic-devs/image/upload/q_auto,w_832,f_auto/v1710761790/pablomiceli/static/score"
          :alt="$t('ScoreSection.score')"
          loading="lazy"
        />
      </picture>
    </a>
  </section>
</template>

<style scoped lang="postcss">
.c-size {
  height: 71px;
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
