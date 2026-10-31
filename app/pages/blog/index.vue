<template>
  <div class="relative overflow-hidden text-left">
    <!-- Header Section -->
    <section class="border-b border-brand-anthracite-border bg-brand-black-soft/90 py-10 sm:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AppBreadcrumb
          :items="[
            { label: 'Ana Sayfa', to: '/' },
            { label: 'Blog & Rehber' }
          ]"
          class="mb-6"
        />

        <div class="max-w-3xl">
          <AppBadge variant="gold" size="sm" dot class="mb-3">
            Usta Rehberi & Bilgi Bankası
          </AppBadge>
          <h1 class="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            İzmir Tadilat, İzolasyon ve <span class="bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-muted bg-clip-text text-transparent">Boya Rehberi</span>
          </h1>
          <p class="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
            Çatı akıntılarından dış cephe mantolamaya, daire tadilat takviminden boya badana metraj hesabına kadar ev sahiplerine rehberlik eden teknik ve maliyet odaklı makaleler.
          </p>
        </div>
      </div>
    </section>

    <!-- Articles Grid Section -->
    <section class="border-b border-brand-anthracite-border bg-brand-black py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AppCard
            v-for="post in BLOG_POSTS"
            :key="post.slug"
            as="article"
            variant="default"
            padding="none"
            hoverable
            class="group flex flex-col justify-between overflow-hidden"
          >
            <!-- Card Header / Meta -->
            <div class="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between gap-2 mb-3">
                  <span class="rounded-full bg-brand-gold/15 px-2.5 py-1 text-[11px] font-semibold text-brand-gold-light border border-brand-gold/25">
                    {{ post.category }}
                  </span>
                  <span class="text-[11px] text-slate-400 font-mono">
                    {{ post.readingTime }}
                  </span>
                </div>

                <h2 class="font-display text-lg font-bold text-white transition-colors group-hover:text-brand-gold-light leading-snug">
                  <NuxtLink :to="`/blog/${post.slug}`">
                    {{ post.title }}
                  </NuxtLink>
                </h2>

                <p class="mt-3 text-xs leading-relaxed text-slate-300 line-clamp-3">
                  {{ post.summary }}
                </p>
              </div>

              <div class="mt-6 pt-4 border-t border-brand-anthracite-border/70 flex items-center justify-between text-xs">
                <span class="text-slate-400 text-[11px]">
                  {{ post.author.name }}
                </span>
                <NuxtLink
                  :to="`/blog/${post.slug}`"
                  class="font-semibold text-brand-gold group-hover:text-white transition-colors flex items-center"
                >
                  <span>Yazıyı Oku</span>
                  <ArrowRight class="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </NuxtLink>
              </div>
            </div>
          </AppCard>
        </div>

        <!-- Banner to Price Guide -->
        <div class="mt-16 rounded-2xl border border-brand-gold/30 bg-brand-anthracite-card p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="text-left max-w-xl">
            <h2 class="font-display text-lg sm:text-xl font-bold text-white">
              Net Maliyet Faktörlerini İncelemek İster Misiniz?
            </h2>
            <p class="mt-2 text-xs sm:text-sm text-slate-300">
              İzmir genelinde boya badana, asma tavan, mantolama ve çatı tadilatlarında bütçeyi nelerin değiştirdiğini Fiyat Rehberimizden detaylı inceleyebilirsiniz.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <AppButton to="/fiyat-rehberi" variant="secondary" size="md">
              <span>Fiyat Rehberi</span>
              <ArrowRight class="ml-1.5 h-4 w-4" />
            </AppButton>
            <AppButton to="/ucretsiz-kesif" variant="primary" size="md">
              <span>Ücretsiz Keşif Al</span>
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import AppBreadcrumb from '~/components/ui/AppBreadcrumb.vue'
import AppBadge from '~/components/ui/AppBadge.vue'
import AppCard from '~/components/ui/AppCard.vue'
import AppButton from '~/components/common/AppButton.vue'
import { BLOG_POSTS } from '~/data/blog-posts'
import { useAppSeo } from '~/composables/useAppSeo'

useAppSeo({
  title: 'Tadilat, İzolasyon ve Boya Rehberi | Atalay Dekorasyon',
  description: 'İzmir\'de ev tadilatı, çatı izolasyonu, dış cephe mantolama ve boya badana süreçlerine dair usta tavsiyeleri, maliyet rehberleri ve teknik ipuçları.',
  path: '/blog',
  image: '/images/hero-decoration.jpg',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Atalay Dekorasyon Bilgi ve Fiyat Rehberi',
      url: 'https://www.atalaylardekorasyon.com/blog',
      description: 'İzmir genelinde yapı, tadilat, yalıtım ve dekorasyon rehberi.',
      blogPost: BLOG_POSTS.map(p => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `https://www.atalaylardekorasyon.com/blog/${p.slug}`,
        datePublished: p.publishedAt,
        author: {
          '@type': 'Person',
          name: p.author.name
        }
      }))
    }
  ]
})
</script>

