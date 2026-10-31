<template>
  <div v-if="service" class="relative overflow-hidden text-left">
    <!-- Breadcrumb & Top Bar -->
    <div class="border-b border-brand-anthracite-border bg-brand-black-soft/90 py-8 sm:py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AppBreadcrumb :items="breadcrumbItems" />

        <div class="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-7">
            <AppBadge variant="gold" size="sm" dot class="mb-3">
              İzmir & Ege Bölgesi
            </AppBadge>

            <!-- Single H1 for SEO -->
            <h1 class="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              İzmir {{ service.title }}
            </h1>

            <p class="mt-2 text-base font-medium text-brand-gold-light sm:text-lg">
              {{ service.subtitle }}
            </p>

            <p class="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base max-w-2xl">
              {{ service.description }}
            </p>

            <!-- Action Buttons with pre-selected service query -->
            <div class="mt-8 flex flex-col sm:flex-row gap-4">
              <AppButton
                :to="`/ucretsiz-kesif?hizmet=${service.slug}`"
                variant="primary"
                size="lg"
                class="w-full sm:w-auto"
              >
                <ClipboardCheck class="h-5 w-5" />
                <span>Bu Hizmet İçin Keşif İste</span>
              </AppButton>

              <AppButton
                :to="getWhatsAppUrl(`Merhaba, ${service.title} hizmetiniz için bilgi ve keşif almak istiyorum.`)"
                variant="whatsapp"
                size="lg"
                class="w-full sm:w-auto"
              >
                <MessageCircle class="h-5 w-5" />
                <span>WhatsApp ile Danış</span>
              </AppButton>
            </div>
          </div>

          <!-- Cover Image Card -->
          <div class="lg:col-span-5">
            <div class="overflow-hidden rounded-3xl border border-brand-gold/30 bg-brand-anthracite-card p-2 shadow-2xl">
              <div class="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-brand-black">
                <img
                  :src="service.coverImageUrl"
                  :alt="`${service.title} - İzmir Atalay Dekorasyon profesyonel uygulama`"
                  width="800"
                  height="600"
                  fetchpriority="high"
                  decoding="async"
                  class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent" />
                <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                  <span class="rounded-full bg-brand-black/90 px-3 py-1 font-semibold text-brand-gold-light border border-brand-gold/30">
                    Yerinde Ücretsiz Keşif
                  </span>
                  <span class="rounded-full bg-brand-anthracite px-3 py-1 text-slate-300">
                    Garantili İşçilik
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Application Scope (Uygulama Kapsamı) -->
    <section class="border-b border-brand-anthracite-border bg-brand-black py-16 sm:py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Kapsam"
          title="Neler Yapıyoruz? Uygulama Kapsamımız"
          :description="`${service.title} kapsamında sunduğumuz detaylı işçilik ve uygulama başlıkları.`"
          align="left"
          size="md"
        />

        <div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(item, index) in service.scope"
            :key="index"
            class="flex items-start gap-3.5 rounded-2xl border border-brand-anthracite-border bg-brand-anthracite-card/70 p-5 transition-all hover:border-brand-gold/40 hover:bg-brand-anthracite-card"
          >
            <div class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-brand-gold/10 text-brand-gold">
              <Check class="h-4 w-4" />
            </div>
            <p class="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
              {{ item }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5-Step Process (Uygulama Süreci) -->
    <section class="border-b border-brand-anthracite-border bg-brand-black-soft/50 py-16 sm:py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="İş Akışı"
          title="Uygulama Sürecimiz Nasıl İlerliyor?"
          description="Sürprizlere yer bırakmayan, planlı ve şeffaf çalışma aşamalarımız."
          align="left"
          size="md"
        />

        <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <div
            v-for="(step, sIdx) in service.processSteps"
            :key="sIdx"
            class="rounded-2xl border border-brand-anthracite-border bg-brand-anthracite-card p-5 flex flex-col justify-between"
          >
            <div>
              <span class="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-gold to-brand-gold-dark font-display text-xs font-bold text-brand-black mb-3">
                0{{ sIdx + 1 }}
              </span>
              <h3 class="font-display text-sm font-semibold text-white">
                {{ step.title }}
              </h3>
              <p class="mt-2 text-xs leading-relaxed text-slate-400">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Standards & Material Quality (Doğrulanmış Kalite) -->
    <section class="border-b border-brand-anthracite-border bg-brand-black py-16 sm:py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-6">
            <AppBadge variant="gold" size="sm" dot class="mb-3">
              Standartlarımız
            </AppBadge>
            <h2 class="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Malzeme Kalitesi ve Teknik Standartlarımız
            </h2>
            <p class="mt-4 text-xs sm:text-sm leading-relaxed text-slate-300">
              Uygulamalarımızda merdiven altı veya garantisi olmayan malzemeler asla kullanılmaz. Uzun yıllar dayanıklılık sağlayacak TSE belgeli ürünler ve ustalık kuralları uygulanır.
            </p>

            <ul class="mt-6 space-y-3">
              <li
                v-for="(std, sIndex) in service.technicalStandards"
                :key="sIndex"
                class="flex items-center gap-3 text-xs sm:text-sm text-slate-300"
              >
                <ShieldCheck class="h-5 w-5 shrink-0 text-brand-gold" />
                <span>{{ std }}</span>
              </li>
            </ul>
          </div>

          <div class="lg:col-span-6">
            <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite-card p-6 sm:p-8">
              <h3 class="font-display text-lg font-bold text-white">
                Bu Hizmet İçin Fiyatlandırma Nasıl Belirlenir?
              </h3>
              <p class="mt-3 text-xs sm:text-sm leading-relaxed text-slate-300">
                Fiyatlandırmamızda m² büyüklüğü, mevcut yüzey hasar durumu, kullanılacak malzeme markası ve uygulama katmanı belirleyicidir. Ezbere sabit fiyat vermek yerine;
              </p>
              <div class="mt-4 space-y-2 border-l-2 border-brand-gold pl-4 text-xs text-slate-400">
                <p>1. İzmir içindeki adresinize gelip <strong>ücretsiz yerinde keşif</strong> yapıyoruz.</p>
                <p>2. İhtiyacınıza uygun malzeme alternatiflerini listeliyoruz.</p>
                <p>3. Net metraj üzerinden <strong>şeffaf yazılı teklif</strong> hazırlıyoruz.</p>
                <p class="pt-1 text-slate-300">Detaylı maliyet faktörlerini öğrenmek için <NuxtLink to="/fiyat-rehberi" class="text-brand-gold hover:underline font-semibold">Fiyat Rehberimizi inceleyin</NuxtLink>.</p>
              </div>

              <div class="mt-6">
                <AppButton
                  :to="`/ucretsiz-kesif?hizmet=${service.slug}`"
                  variant="primary"
                  block
                  size="md"
                >
                  <ClipboardCheck class="h-4 w-4" />
                  <span>Ücretsiz Keşif Talep Et</span>
                </AppButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQs Section -->
    <section v-if="service.faqs && service.faqs.length" class="border-b border-brand-anthracite-border bg-brand-black-soft/50 py-16 sm:py-20">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Merak Edilenler"
          :title="`${service.title} Hakkında Sıkça Sorulanlar`"
          description="Uygulama öncesinde en çok merak edilen sorular ve profesyonel yanıtları."
          align="center"
          size="md"
          class="mb-8"
        />

        <AppAccordion :items="formattedFaqs" :default-open-id="formattedFaqs[0]?.id" />
      </div>
    </section>

    <!-- Related Services (İlgili Hizmetler) -->
    <section v-if="relatedServices.length" class="border-b border-brand-anthracite-border bg-brand-black py-16 sm:py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Benzer Çözümler"
          title="İlginizi Çekebilecek Diğer Hizmetlerimiz"
          description="Eviniz veya binanız için bir arada tercih edebileceğiniz tamamlayıcı uygulamalar."
          align="center"
          size="md"
          class="mb-10"
        />

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AppCard
            v-for="rel in relatedServices"
            :key="rel.slug"
            as="article"
            variant="default"
            padding="md"
            hoverable
            class="flex flex-col justify-between"
          >
            <div>
              <h3 class="font-display text-base font-semibold text-white">
                {{ rel.title }}
              </h3>
              <p class="mt-2 text-xs text-slate-400 line-clamp-3">
                {{ rel.shortDescription }}
              </p>
            </div>

            <NuxtLink
              :to="`/hizmetlerimiz/${rel.slug}`"
              class="mt-4 inline-flex items-center text-xs font-semibold text-brand-gold hover:text-white transition-colors"
            >
              <span>İncele</span>
              <ArrowRight class="ml-1 h-3.5 w-3.5" />
            </NuxtLink>
          </AppCard>
        </div>
      </div>
    </section>

    <!-- Related Projects (Bu Hizmete Ait Örnek Projeler) -->
    <section v-if="relatedProjects.length" class="border-b border-brand-anthracite-border bg-brand-black/95 py-14">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Şantiye Referansları"
          title="Bu Hizmete Ait Örnek Uygulamalarımız"
          description="İzmir'de tamamladığımız gerçek müşteri teslim fotoğrafları ve detayları."
          align="center"
          size="sm"
          class="mb-8"
        />

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AppCard
            v-for="proj in relatedProjects"
            :key="proj.slug"
            as="article"
            variant="default"
            padding="none"
            hoverable
            class="flex flex-col overflow-hidden"
          >
            <div class="relative aspect-[16/10] w-full overflow-hidden bg-brand-anthracite">
              <img
                :src="proj.afterImageUrl"
                :alt="`${proj.title} - Atalay Dekorasyon İzmir`"
                width="640"
                height="400"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              >
            </div>
            <div class="p-5 flex flex-col justify-between flex-1">
              <div>
                <p class="text-[11px] font-semibold text-brand-gold uppercase tracking-wider mb-1">
                  {{ proj.location }}
                </p>
                <h3 class="font-display text-sm font-bold text-white line-clamp-2">
                  {{ proj.title }}
                </h3>
                <p class="mt-2 text-xs text-slate-400 line-clamp-2">
                  {{ proj.summary }}
                </p>
              </div>

              <NuxtLink
                :to="`/projeler/${proj.slug}`"
                class="mt-4 inline-flex items-center text-xs font-semibold text-brand-gold hover:text-white transition-colors"
              >
                <span>Projeyi İncele</span>
                <ArrowRight class="ml-1 h-3.5 w-3.5" />
              </NuxtLink>
            </div>
          </AppCard>
        </div>
      </div>
    </section>

    <!-- Bottom Conversion CTA -->
    <ContactCtaSection />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ClipboardCheck, MessageCircle, Check, ShieldCheck, ArrowRight } from 'lucide-vue-next'
import AppBreadcrumb from '~/components/ui/AppBreadcrumb.vue'
import AppBadge from '~/components/ui/AppBadge.vue'
import AppButton from '~/components/common/AppButton.vue'
import AppCard from '~/components/ui/AppCard.vue'
import SectionHeading from '~/components/ui/SectionHeading.vue'
import AppAccordion from '~/components/ui/AppAccordion.vue'
import ContactCtaSection from '~/components/common/ContactCtaSection.vue'
import { useServices } from '~/composables/useServices'
import { useProjects } from '~/composables/useProjects'
import { useSiteConfig } from '~/composables/useSiteConfig'

const route = useRoute()
const slug = String(route.params.slug)

const { getServiceBySlug, getRelatedServices } = useServices()
const { getAllProjects } = useProjects()
const { getWhatsAppUrl } = useSiteConfig()

const service = getServiceBySlug(slug)

// Graceful 404 handling if service does not exist
if (!service) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Aradığınız hizmet sayfası bulunamadı veya taşınmış olabilir.',
    fatal: true
  })
}

// Breadcrumb
const breadcrumbItems = computed(() => [
  { label: 'Hizmetlerimiz', to: '/hizmetlerimiz' },
  { label: service.title }
])

// Formatted FAQs for accordion
const formattedFaqs = computed(() => {
  return (service.faqs || []).map((f, i) => ({
    id: `faq-${i}`,
    title: f.question,
    content: f.answer
  }))
})

// Related Services
const relatedServices = computed(() => {
  return getRelatedServices(service.relatedSlugs || [])
})

// Related Projects (Bi-directional internal linking)
const relatedProjects = computed(() => {
  return getAllProjects()
    .filter(p => p.serviceSlug === service.slug || p.category === service.slug.split('-')[0])
    .slice(0, 3)
})

// SEO, Canonical, Open Graph & Schema.org JSON-LD
const canonicalPath = `/hizmetlerimiz/${service.slug}`
const canonicalUrl = `https://www.atalaylardekorasyon.com${canonicalPath}`

useAppSeo({
  title: `${service.title} | İzmir Atalay Dekorasyon`,
  description: `${service.shortDescription} İzmir'in tüm ilçelerinde yerinde ücretsiz keşif ve garantili işçilik.`,
  path: canonicalPath,
  image: service.coverImageUrl,
  type: 'article',
  jsonLd: [
    buildServiceSchema(service, canonicalUrl),
    buildBreadcrumbSchema([
      { name: 'Ana Sayfa', path: '/' },
      { name: 'Hizmetlerimiz', path: '/hizmetlerimiz' },
      { name: service.title, path: canonicalPath }
    ])
  ]
})
</script>
