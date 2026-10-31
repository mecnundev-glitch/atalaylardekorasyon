<template>
  <div v-if="post" class="relative overflow-hidden text-left bg-brand-black min-h-screen">
    <!-- Header Section -->
    <section class="border-b border-brand-anthracite-border bg-brand-black-soft/90 py-10 sm:py-16">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <AppBreadcrumb
          :items="[
            { label: 'Ana Sayfa', to: '/' },
            { label: 'Blog & Rehber', to: '/blog' },
            { label: post.category }
          ]"
          class="mb-6"
        />

        <div class="flex items-center gap-3 mb-4">
          <AppBadge variant="gold" size="sm" dot>
            {{ post.category }}
          </AppBadge>
          <span class="text-xs text-slate-400 font-mono">
            {{ post.readingTime }}
          </span>
        </div>

        <h1 class="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl leading-tight">
          {{ post.title }}
        </h1>

        <!-- Author Bar -->
        <div class="mt-6 flex items-center gap-3 border-t border-brand-anthracite-border/70 pt-4 text-xs text-slate-300">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold font-bold">
            MU
          </div>
          <div>
            <p class="font-semibold text-white">{{ post.author.name }}</p>
            <p class="text-[11px] text-brand-gold-muted">{{ post.author.role }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Body -->
    <section class="py-12 sm:py-16">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <!-- Article Content -->
          <article class="lg:col-span-8">
            <div
              class="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-p:text-slate-300 prose-p:text-sm sm:prose-p:text-base prose-p:leading-relaxed prose-p:mb-4 prose-li:text-slate-300 prose-li:text-sm sm:prose-li:text-base prose-strong:text-brand-gold-light prose-ul:my-4 prose-ol:my-4"
              v-html="post.content"
            />

            <!-- Related Service Box -->
            <div class="mt-12 rounded-2xl border border-brand-gold/30 bg-brand-anthracite-card p-6">
              <span class="text-[11px] font-semibold text-brand-gold uppercase tracking-wider">İlgili Hizmetimiz</span>
              <h3 class="mt-1 font-display text-lg font-bold text-white">
                {{ post.relatedServiceTitle }}
              </h3>
              <p class="mt-2 text-xs text-slate-300 leading-relaxed">
                İzmir genelinde yerinde ücretsiz keşif, TSE standartlarında kaliteli malzeme ve sözleşmeli teslimatla yanınızdayız.
              </p>
              <div class="mt-4 flex flex-wrap gap-3">
                <NuxtLink
                  :to="`/hizmetlerimiz/${post.relatedServiceSlug}`"
                  class="inline-flex items-center text-xs font-semibold text-brand-gold hover:text-white transition-colors"
                >
                  <span>Hizmet Detaylarını İncele</span>
                  <ArrowRight class="ml-1.5 h-3.5 w-3.5" />
                </NuxtLink>
                <NuxtLink
                  to="/ucretsiz-kesif"
                  class="inline-flex items-center text-xs font-semibold text-white bg-brand-gold/20 hover:bg-brand-gold hover:text-brand-black px-3 py-1.5 rounded-lg transition-colors ml-auto"
                >
                  <span>Ücretsiz Keşif İste</span>
                </NuxtLink>
              </div>
            </div>
          </article>

          <!-- Sidebar Sticky CTA -->
          <aside class="lg:col-span-4 space-y-6">
            <div class="sticky top-24 rounded-2xl border border-brand-anthracite-border bg-brand-anthracite-card/80 p-5 backdrop-blur-sm">
              <h3 class="font-display text-base font-bold text-white">
                Yerinde Ücretsiz Keşif
              </h3>
              <p class="mt-2 text-xs text-slate-300 leading-relaxed">
                Eviniz veya iş yeriniz için ezbere fiyat yerine, Mehmet Usta ile adresinizde lazer metreyle ölçüm yapıp şeffaf maliyet tablosu çıkaralım.
              </p>

              <div class="mt-5 space-y-3">
                <AppButton to="/ucretsiz-kesif" variant="primary" size="sm" class="w-full">
                  <ClipboardCheck class="h-4 w-4" />
                  <span>Keşif Randevusu Al</span>
                </AppButton>

                <AppButton :to="getWhatsAppUrl()" variant="whatsapp" size="sm" class="w-full">
                  <MessageCircle class="h-4 w-4" />
                  <span>WhatsApp ile Danış</span>
                </AppButton>

                <AppButton to="/fiyat-rehberi" variant="secondary" size="sm" class="w-full">
                  <span>Fiyat Rehberini Oku</span>
                </AppButton>
              </div>

              <!-- Other Articles List -->
              <div class="mt-8 border-t border-brand-anthracite-border/70 pt-5">
                <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Diğer Rehber Yazıları
                </h4>
                <ul class="space-y-3">
                  <li
                    v-for="other in otherPosts"
                    :key="other.slug"
                    class="text-xs"
                  >
                    <NuxtLink
                      :to="`/blog/${other.slug}`"
                      class="text-slate-300 hover:text-brand-gold transition-colors block line-clamp-2"
                    >
                      • {{ other.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, createError } from '#imports'
import { ArrowRight, ClipboardCheck, MessageCircle } from 'lucide-vue-next'
import AppBreadcrumb from '~/components/ui/AppBreadcrumb.vue'
import AppBadge from '~/components/ui/AppBadge.vue'
import AppButton from '~/components/common/AppButton.vue'
import { BLOG_POSTS, getBlogPostBySlug } from '~/data/blog-posts'
import { useAppSeo } from '~/composables/useAppSeo'
import { useSiteConfig } from '~/composables/useSiteConfig'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))
const post = computed(() => getBlogPostBySlug(slug.value))

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Aradığınız rehber yazısı bulunamadı.'
  })
}

const otherPosts = computed(() => {
  return BLOG_POSTS.filter(p => p.slug !== slug.value).slice(0, 4)
})

const { getWhatsAppUrl } = useSiteConfig()

useAppSeo({
  title: `${post.value.title} | Atalay Dekorasyon`,
  description: post.value.metaDescription,
  path: `/blog/${post.value.slug}`,
  image: post.value.image,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.value.title,
      description: post.value.metaDescription,
      datePublished: post.value.publishedAt,
      dateModified: post.value.publishedAt,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://www.atalaylardekorasyon.com/blog/${post.value.slug}`
      },
      author: {
        '@type': 'Person',
        name: post.value.author.name,
        jobTitle: post.value.author.role
      },
      publisher: {
        '@type': 'Organization',
        name: 'Atalay Dekorasyon',
        url: 'https://www.atalaylardekorasyon.com/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.atalaylardekorasyon.com/logo.png'
        }
      }
    }
  ]
})
</script>

