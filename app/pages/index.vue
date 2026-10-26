<template>
  <div class="relative overflow-hidden">
    <!-- ================================================================= -->
    <!-- 1. HERO SECTION -->
    <!-- ================================================================= -->
    <section class="relative border-b border-brand-anthracite-border bg-gradient-to-b from-brand-black-soft via-brand-black to-brand-black pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32">
      <!-- Ambient Lighting -->
      <div
        class="pointer-events-none absolute -top-40 left-1/2 h-[450px] w-[550px] -translate-x-1/2 rounded-full bg-brand-gold/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute bottom-10 right-0 h-80 w-80 rounded-full bg-amber-600/5 blur-[100px]"
        aria-hidden="true"
      />

      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <!-- Left Column: Copy & Actions -->
          <div class="text-left lg:col-span-7">
            <!-- Location Badge -->
            <AppBadge variant="gold" size="md" dot class="mb-6">
              İzmir Genelinde Güvenilir Yapı & İzolasyon Çözümleri
            </AppBadge>

            <!-- Main Heading (Single H1 for SEO) -->
            <h1 class="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[52px] lg:leading-[1.15]">
              İzmir Yapı, İzolasyon ve Anahtar Teslim Dekorasyonda
              <span class="block mt-2 bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-muted bg-clip-text text-transparent">
                Ustalık ve Şeffaf Güven
              </span>
            </h1>

            <!-- Subtitle Description -->
            <p class="mt-6 text-sm leading-relaxed text-slate-300 sm:text-base md:text-lg max-w-2xl">
              Alçı, boya, sıva, çatı izolasyonu, su ve ısı yalıtımı ile komple ev ve ofis tadilatı. İzmir'in tüm ilçelerinde yerinde ücretsiz keşif, kaliteli malzeme ve sözleşmeli teslimat.
            </p>

            <!-- Call to Actions -->
            <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <AppButton
                to="/ucretsiz-kesif"
                variant="primary"
                size="lg"
                class="w-full sm:w-auto"
              >
                <ClipboardCheck class="h-5 w-5" />
                <span>Ücretsiz Keşif Talebi</span>
              </AppButton>

              <AppButton
                :to="getWhatsAppUrl()"
                variant="whatsapp"
                size="lg"
                class="w-full sm:w-auto"
              >
                <MessageCircle class="h-5 w-5" />
                <span>WhatsApp ile Hızlı Ulaş</span>
              </AppButton>
            </div>

            <!-- Trust Bullets -->
            <div class="mt-10 grid grid-cols-2 gap-3 sm:gap-4 border-t border-brand-anthracite-border/70 pt-6 text-xs text-slate-300">
              <div class="flex items-center gap-2">
                <CheckCircle2 class="h-4 w-4 shrink-0 text-brand-gold" />
                <span>Yerinde Ücretsiz Keşif</span>
              </div>
              <div class="flex items-center gap-2">
                <CheckCircle2 class="h-4 w-4 shrink-0 text-brand-gold" />
                <span>TSE Belgeli Malzemeler</span>
              </div>
              <div class="flex items-center gap-2">
                <CheckCircle2 class="h-4 w-4 shrink-0 text-brand-gold" />
                <span>Zamanında Teslim Garantisi</span>
              </div>
              <div class="flex items-center gap-2">
                <CheckCircle2 class="h-4 w-4 shrink-0 text-brand-gold" />
                <span>Şeffaf Yazılı Fiyatlandırma</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Visual Hero Card -->
          <div class="lg:col-span-5">
            <div class="relative mx-auto max-w-lg lg:max-w-none">
              <div class="relative overflow-hidden rounded-3xl border border-brand-gold/30 bg-brand-anthracite-card p-2 shadow-2xl">
                <div class="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-brand-black">
                  <img
                    src="/images/hero-decoration.jpg"
                    alt="Atalaylar Dekorasyon - İzmir lüks alçı tavan, gizli aydınlatma ve modern salon dekorasyon uygulaması"
                    width="800"
                    height="600"
                    fetchpriority="high"
                    class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  >
                  <!-- Gradient Overlay -->
                  <div class="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />

                  <!-- Bottom Caption Card -->
                  <div class="absolute bottom-4 inset-x-4 rounded-xl border border-brand-anthracite-border/80 bg-brand-black/85 p-3.5 backdrop-blur-md">
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-[11px] uppercase tracking-wider text-brand-gold-light font-semibold">
                          Mimari Dekorasyon & Alçıpan
                        </p>
                        <p class="text-xs font-medium text-white">
                          İzmir Konut & Ofis Yenileme Çözümleri
                        </p>
                      </div>
                      <NuxtLink
                        to="/ucretsiz-kesif"
                        class="rounded-lg bg-brand-gold/20 px-2.5 py-1.5 text-[11px] font-semibold text-brand-gold-light hover:bg-brand-gold hover:text-brand-black transition-colors"
                      >
                        Keşif İste
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- 2. HİZMETLER BÖLÜMÜ -->
    <!-- ================================================================= -->
    <section class="border-b border-brand-anthracite-border bg-brand-black-soft/50 py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Hizmetlerimiz"
          title="İzmir Genelinde Uzmanlık Alanlarımız"
          description="Eviniz, iş yeriniz veya binanız için sunduğumuz profesyonel yapı, yalıtım ve dekorasyon uygulamaları."
          align="center"
          size="md"
        />

        <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AppCard
            v-for="service in services"
            :key="service.slug"
            as="article"
            variant="default"
            padding="md"
            hoverable
            class="group flex flex-col justify-between"
          >
            <div>
              <!-- Icon Header -->
              <div class="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-gold/30 bg-brand-black text-brand-gold transition-colors group-hover:bg-brand-gold group-hover:text-brand-black">
                <component :is="service.icon" class="h-6 w-6" />
              </div>

              <!-- Title -->
              <h3 class="mt-5 font-display text-lg font-semibold text-white transition-colors group-hover:text-brand-gold-light">
                {{ service.title }}
              </h3>

              <!-- Description -->
              <p class="mt-2 text-xs leading-relaxed text-slate-300">
                {{ service.desc }}
              </p>

              <!-- Features Bullets -->
              <ul class="mt-4 space-y-1.5 border-t border-brand-anthracite-border/60 pt-4 text-xs text-slate-400">
                <li v-for="feat in service.features" :key="feat" class="flex items-center gap-2">
                  <Check class="h-3.5 w-3.5 text-brand-gold shrink-0" />
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </div>

            <!-- Card Action Link -->
            <NuxtLink
              :to="`/hizmetlerimiz/${service.slug}`"
              class="mt-6 inline-flex items-center text-xs font-semibold text-brand-gold transition-colors hover:text-white"
            >
              <span>Hizmet Detayı ve Fiyat Al</span>
              <ArrowRight class="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </NuxtLink>
          </AppCard>
        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- 3. HAKKIMIZDA ÖZETİ (Doğrulanmış Bilgiler) -->
    <!-- ================================================================= -->
    <section class="border-b border-brand-anthracite-border bg-brand-black py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <!-- Text -->
          <div class="lg:col-span-7 text-left">
            <AppBadge variant="gold" size="sm" dot class="mb-4">
              Hakkımızda
            </AppBadge>

            <h2 class="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              İzmir'de Dürüst Ustalık ve Kalıcı Yapı Çözümleri
            </h2>

            <p class="mt-5 text-sm leading-relaxed text-slate-300 sm:text-base">
              <strong>Atalaylar Dekorasyon</strong>, İzmir ve çevre ilçelerde faaliyet gösteren; alçı dekorasyondan dış cephe boyaya, su ve ısı yalıtımından komple çatı izolasyonuna kadar yapı sektöründeki temel gereksinimleri profesyonel iş disipliniyle karşılayan bir uygulama firmasıdır.
            </p>

            <p class="mt-3 text-sm leading-relaxed text-slate-400">
              Uygulamalarımızda rastgele malzeme veya geçici çözümler yerine; doğru yüzey hazırlığı, TSE standartlarına uygun ürünler ve sözleşmeli teslimat anlayışını benimsiyoruz. Her projeye yerinde ücretsiz keşifle başlayarak müşterilerimize net metraj ve şeffaf fiyatlandırma sunuyoruz.
            </p>

            <div class="mt-6 flex flex-wrap gap-4">
              <AppButton to="/hakkimizda" variant="secondary" size="md">
                <span>Daha Fazla Bilgi Al</span>
                <ArrowRight class="ml-1.5 h-4 w-4" />
              </AppButton>
              <AppButton to="/ucretsiz-kesif" variant="primary" size="md">
                <span>Keşif Randevusu Al</span>
              </AppButton>
            </div>
          </div>

          <!-- Feature Cards Highlights -->
          <div class="lg:col-span-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AppCard variant="elevated" padding="sm" class="text-left">
              <ShieldCheck class="h-7 w-7 text-brand-gold mb-3" />
              <h4 class="font-display text-sm font-semibold text-white">Yerinde Keşif</h4>
              <p class="text-xs text-slate-400 mt-1">İzmir genelinde adresinize gelerek metraj ve hasar tespitini ücretsiz gerçekleştiriyoruz.</p>
            </AppCard>

            <AppCard variant="elevated" padding="sm" class="text-left">
              <CheckCircle2 class="h-7 w-7 text-brand-gold mb-3" />
              <h4 class="font-display text-sm font-semibold text-white">Kaliteli Malzeme</h4>
              <p class="text-xs text-slate-400 mt-1">Yalnızca TSE ve CE belgeli, kendini kanıtlamış marka boya ve yalıtım ürünleri kullanıyoruz.</p>
            </AppCard>

            <AppCard variant="elevated" padding="sm" class="text-left">
              <Clock class="h-7 w-7 text-brand-gold mb-3" />
              <h4 class="font-display text-sm font-semibold text-white">Zamanında Teslim</h4>
              <p class="text-xs text-slate-400 mt-1">Sözleşmede belirlenen teslim tarihine sadık kalarak planlı ve düzenli ilerliyoruz.</p>
            </AppCard>

            <AppCard variant="elevated" padding="sm" class="text-left">
              <Sparkles class="h-7 w-7 text-brand-gold mb-3" />
              <h4 class="font-display text-sm font-semibold text-white">Temiz Teslimat</h4>
              <p class="text-xs text-slate-400 mt-1">Eşyaları titizlikle maskeliyor, çalışma bitiminde mekanınızı temizleyerek teslim ediyoruz.</p>
            </AppCard>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- 4. NEDEN ATALAYLAR DEKORASYON (Kalite Standartları) -->
    <!-- ================================================================= -->
    <section class="border-b border-brand-anthracite-border bg-brand-black-soft/40 py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Neden Biz?"
          title="Fark Yaratan Hizmet Yaklaşımımız"
          description="İzmir'de dekorasyon ve yalıtım yaptırırken neden Atalaylar Dekorasyon'u tercih etmelisiniz?"
          align="center"
          size="md"
        />

        <div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AppCard
            v-for="(pillar, idx) in qualityPillars"
            :key="idx"
            as="div"
            variant="default"
            padding="md"
            class="text-left"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-anthracite border border-brand-gold/30 text-brand-gold">
                <component :is="pillar.icon" class="h-5 w-5" />
              </div>
              <span class="text-xs font-bold text-brand-gold-light/60 font-mono">
                0{{ idx + 1 }}
              </span>
            </div>

            <h3 class="font-display text-base font-semibold text-white">
              {{ pillar.title }}
            </h3>

            <p class="mt-2 text-xs leading-relaxed text-slate-300">
              {{ pillar.description }}
            </p>
          </AppCard>
        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- 5. PROJELER VE ÖNCESİ / SONRASI VİTRİNİ (Demo Olarak İşaretli) -->
    <!-- ================================================================= -->
    <section class="border-b border-brand-anthracite-border bg-brand-black py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div class="text-left max-w-2xl">
            <AppBadge variant="gold" size="sm" dot class="mb-3">
              Referans Uygulamalar
            </AppBadge>
            <h2 class="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Tamamlanan Uygulamalar ve Dönüşümler
            </h2>
            <p class="mt-3 text-xs sm:text-sm text-slate-400">
              İzmir genelinde gerçekleştirdiğimiz örnek işçilik detayları ve interaktif öncesi/sonrası kıyaslaması.
            </p>
          </div>

          <div class="shrink-0 flex items-center gap-3">
            <span class="rounded-full bg-brand-anthracite-border px-3 py-1 text-[11px] font-medium text-slate-300">
              Örnek Gösterim / Demo Vitrini
            </span>
            <NuxtLink
              to="/projeler"
              class="inline-flex items-center text-xs font-semibold text-brand-gold hover:text-white transition-colors"
            >
              <span>Tüm Projeler</span>
              <ArrowRight class="ml-1 h-3.5 w-3.5" />
            </NuxtLink>
          </div>
        </div>

        <!-- Before / After Slider Showcase -->
        <div class="mb-12">
          <BeforeAfterSlider
            before-image="/images/hero-decoration.jpg"
            after-image="/images/project-facade.jpg"
            title="Urla / Müstakil Konut Çatı İzolasyonu ve Dış Cephe Mantolama"
            description="Kiremit altı su yalıtımı, taşyünü mantolama ve silikonlu dış cephe boya uygulaması."
            before-label="Eski / İşlem Öncesi"
            after-label="Teslim Edilen Yeni Durum"
          />
        </div>

        <!-- Project Cards Grid -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AppCard
            v-for="(project, pIdx) in demoProjects"
            :key="pIdx"
            variant="default"
            padding="none"
            hoverable
            class="overflow-hidden flex flex-col text-left group"
          >
            <div class="relative aspect-[16/10] overflow-hidden bg-brand-anthracite">
              <img
                :src="project.image"
                :alt="`${project.title} - ${project.location} Atalaylar Dekorasyon`"
                loading="lazy"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              >
              <div class="absolute top-3 left-3 flex gap-2">
                <span class="rounded-full bg-brand-black/80 px-2.5 py-0.5 text-[10px] font-semibold text-brand-gold-light border border-brand-gold/30 backdrop-blur-md">
                  {{ project.category }}
                </span>
                <span class="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-slate-300 backdrop-blur-md">
                  Örnek Uygulama
                </span>
              </div>
            </div>

            <div class="p-5 flex-1 flex flex-col justify-between">
              <div>
                <p class="text-[11px] font-medium text-brand-gold-muted">{{ project.location }}</p>
                <h3 class="mt-1 font-display text-base font-semibold text-white group-hover:text-brand-gold transition-colors">
                  {{ project.title }}
                </h3>
                <p class="mt-2 text-xs text-slate-400 line-clamp-2">{{ project.desc }}</p>
              </div>

              <div class="mt-4 pt-4 border-t border-brand-anthracite-border/70 flex items-center justify-between text-xs">
                <span class="text-slate-400 text-[11px]">{{ project.duration }}</span>
                <NuxtLink to="/ucretsiz-kesif" class="text-brand-gold font-semibold hover:underline">
                  Benzer İş İçin Teklif Al
                </NuxtLink>
              </div>
            </div>
          </AppCard>
        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- 6. İŞ SÜRECİ (5 Adımda Çalışma Şeması) -->
    <!-- ================================================================= -->
    <section class="border-b border-brand-anthracite-border bg-brand-black-soft/50 py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Nasıl Çalışıyoruz?"
          title="5 Adımda Sorunsuz ve Planlı İş Süreci"
          description="İlk iletişimden anahtar teslime kadar sürecin her aşamasını şeffaf ve organize yönetiyoruz."
          align="center"
          size="md"
        />

        <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <div
            v-for="(step, sIdx) in processSteps"
            :key="sIdx"
            class="relative rounded-2xl border border-brand-anthracite-border bg-brand-anthracite-card p-5 text-left flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-gold to-brand-gold-dark font-display text-xs font-bold text-brand-black">
                  {{ sIdx + 1 }}
                </span>
                <component :is="step.icon" class="h-5 w-5 text-slate-400" />
              </div>
              <h3 class="font-display text-sm font-semibold text-white">{{ step.title }}</h3>
              <p class="mt-2 text-xs leading-relaxed text-slate-400">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- 7. SIKÇA SORULAN SORULAR (Interactive Accordion) -->
    <!-- ================================================================= -->
    <section class="border-b border-brand-anthracite-border bg-brand-black py-16 sm:py-24">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Merak Edilenler"
          title="Sıkça Sorulan Sorular"
          description="İzmir'de dekorasyon ve yalıtım projeleriyle ilgili müşterilerimizden en sık aldığımız soruların yanıtları."
          align="center"
          size="md"
          class="mb-10"
        />

        <AppAccordion :items="faqItems" default-open-id="faq-1" />

        <div class="mt-8 rounded-2xl border border-brand-anthracite-border bg-brand-anthracite-card/60 p-5 text-center">
          <p class="text-xs text-slate-300">
            Farklı bir sorunuz veya özel bir proje talebiniz mi var?
            <NuxtLink to="/iletisim" class="font-semibold text-brand-gold hover:underline ml-1">
              Bize doğrudan ulaşın
            </NuxtLink>
            veya
            <a :href="getWhatsAppUrl()" class="font-semibold text-emerald-400 hover:underline ml-1">
              WhatsApp'tan danışın
            </a>.
          </p>
        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- 8. İZMİR ODAKLI İLETİŞİM / TEKLİF CTA -->
    <!-- ================================================================= -->
    <ContactCtaSection />
  </div>
</template>

<script setup lang="ts">
import {
  ClipboardCheck,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  Check,
  ShieldCheck,
  Clock,
  Sparkles,
  Layers,
  Paintbrush,
  Hammer,
  Home,
  Shield,
  Palette,
  FileText,
  BadgeDollarSign,
  Wrench,
  Search,
  CheckSquare
} from 'lucide-vue-next'
import AppBadge from '~/components/ui/AppBadge.vue'
import AppButton from '~/components/common/AppButton.vue'
import AppCard from '~/components/ui/AppCard.vue'
import SectionHeading from '~/components/ui/SectionHeading.vue'
import ContactCtaSection from '~/components/common/ContactCtaSection.vue'
import AppAccordion from '~/components/ui/AppAccordion.vue'
import BeforeAfterSlider from '~/components/home/BeforeAfterSlider.vue'
import { useSiteConfig } from '~/composables/useSiteConfig'

const { getWhatsAppUrl } = useSiteConfig()

// SEO Metadata, Canonical & JSON-LD
useAppSeo({
  title: 'Atalaylar Dekorasyon | İzmir Dekorasyon ve Tadilat',
  description: 'İzmir\'de dekorasyon ve tadilat hizmetleri için Atalaylar Dekorasyon ile iletişime geçin. Hizmetlerimizi inceleyin ve projeniz için teklif isteyin.',
  path: '/',
  image: '/images/hero-decoration.jpg',
  jsonLd: buildLocalBusinessSchema()
})

// 6 Core Services
const services = [
  {
    title: 'Alçı Uygulamaları',
    slug: 'alci-uygulamalari',
    icon: Layers,
    desc: 'Asma tavan, kartonpiyer, gizli LED ışık bantları, niş tasarımı ve alçıpan bölme duvar sistemleri.',
    features: ['Akustik & Estetik Asma Tavan', 'Gizli Işık ve Gergi Tavan', 'Alçıpan Oda Bölme']
  },
  {
    title: 'İç ve Dış Cephe Boya',
    slug: 'ic-cephe-boya',
    icon: Paintbrush,
    desc: 'Silikonlu dış cephe, İtalyan dekoratif efekt boya, silinebilir su bazlı iç mekan boya işçiliği.',
    features: ['İtalyan Efekt & Mermer Boya', 'Dış Cephe Koruyucu Boya', 'Temiz Maskeleme Disiplini']
  },
  {
    title: 'Sıva ve Duvar Uygulamaları',
    slug: 'siva-ve-duvar-uygulamalari',
    icon: Hammer,
    desc: 'Kara sıva, pürüzsüz alçı sıva düzeltme, dekoratif kültür taşı, tuğla ve panel kaplama işleri.',
    features: ['Pürüzsüz Yüzey Hazırlığı', 'Dekoratif Taş & Tuğla Panel', 'Çatlak & Hasar Onarımı']
  },
  {
    title: 'Çatı İzolasyonu',
    slug: 'cati-izolasyonu',
    icon: Home,
    desc: 'Kiremit altı membran, shingle, trapez sac ve su sızıntılarını kalıcı olarak önleyen profesyonel çatı yalıtımı.',
    features: ['Kiremit Altı Su Yalıtımı', 'Shingle & Sandviç Panel', 'Oluk & Dere İzolasyonu']
  },
  {
    title: 'Su ve Isı Yalıtımı',
    slug: 'su-yalitimi',
    icon: Shield,
    desc: 'Bina mantolama, temel bohçalama, perde beton ve teras su izolasyonu ile yüksek enerji tasarrufu.',
    features: ['Taşyünü & EPS Mantolama', 'Teras & Balkon Su Yalıtımı', '%40’a Varan Enerji Tasarrufu']
  },
  {
    title: 'Dekorasyon ve Tadilat',
    slug: 'dekorasyon-ve-tadilat',
    icon: Palette,
    desc: 'Komple daire, villa ve iş yeri yenileme; mutfak, banyo, elektrik ve sıhhi tesisat dahil anahtar teslim tadilat.',
    features: ['Komple Ev & Mutfak Yenileme', 'Banyo & Tesisat Revizyonu', 'Tek Elden Proje Yönetimi']
  }
]

// Quality Pillars
const qualityPillars = [
  {
    icon: BadgeDollarSign,
    title: 'Şeffaf Metraj & Net Teklif',
    description: 'İşe başlamadan önce yerinde detaylı metraj çıkarır, şeffaf malzeme ve işçilik teklifimizi yazılı olarak sunarız. Sonradan sürpriz ek maliyet çıkmaz.'
  },
  {
    icon: ShieldCheck,
    title: 'TSE Standartlarında Malzeme',
    description: 'Uygulamalarımızda kalitesi tescillenmiş, uzun ömürlü marka boya, alçı ve izolasyon ürünleri kullanırız. Ucuz ve dayanıksız malzemelere yer vermeyiz.'
  },
  {
    icon: Clock,
    title: 'Zamanında Teslim Sözü',
    description: 'Anlaşılan iş takvimine ve bitiş tarihine harfiyen uyarız. Sürecin her adımında ev veya iş yeri sahibini düzenli olarak bilgilendiririz.'
  },
  {
    icon: Sparkles,
    title: 'Temiz & Titiz Çalışma',
    description: 'Çalışma alanındaki mobilya ve zeminleri koruyucu naylonlarla maskeleriz. Gün sonunda kaba temizliği yaparak alanı düzenli teslim ederiz.'
  },
  {
    icon: Wrench,
    title: 'Uzman Usta Kadrosu',
    description: 'Alçı, boya, çatı ve yalıtımın her biri için alanında deneyimli, mesleki yeterliliğe sahip ustalarımızla uygulama yaparız.'
  },
  {
    icon: FileText,
    title: 'Yazılı İş Sözleşmesi',
    description: 'Yapılacak işlerin kapsamını, kullanılacak malzemeleri ve ödeme planını yazılı sözleşmeye bağlayarak karşılıklı güven inşa ederiz.'
  }
]

// Demo / Placeholder Projects
const demoProjects = [
  {
    title: 'Salon Asma Tavan & Gizli Aydınlatma',
    location: 'Karşıyaka / İzmir',
    category: 'Alçı & Boya',
    image: '/images/hero-decoration.jpg',
    desc: 'Modern alçıpan ışık bandı tavan tasarımı, saten alçı düzeltme ve silinebilir iç mekan boya uygulaması.',
    duration: 'Tamamlanma Süresi: 6 Gün'
  },
  {
    title: 'Villa Çatı İzolasyonu & Dış Mantolama',
    location: 'Urla / İzmir',
    category: 'İzolasyon & Çatı',
    image: '/images/project-facade.jpg',
    desc: 'Kiremit altı membran su izolasyonu ve 5 cm taşyünü dış cephe mantolama ile enerji verimliliği sağlandı.',
    duration: 'Tamamlanma Süresi: 12 Gün'
  },
  {
    title: 'Komple Daire Tadilatı & Zemin Duvar Uygulaması',
    location: 'Bornova / İzmir',
    category: 'Dekorasyon & Tadilat',
    image: '/images/hero-decoration.jpg',
    desc: 'Anahtar teslim ev tadilatı kapsamında alçıpan duvar bölme, İtalyan dekoratif boya ve aydınlatma revizyonu.',
    duration: 'Tamamlanma Süresi: 18 Gün'
  }
]

// 5 Process Steps
const processSteps = [
  {
    icon: MessageCircle,
    title: '1. Talep & Ön Görüşme',
    desc: 'Web sitemiz, telefon veya WhatsApp üzerinden bize ulaşarak talebinizi iletirsiniz.'
  },
  {
    icon: Search,
    title: '2. Ücretsiz Keşif',
    desc: 'İzmir içi adresinize gelerek metraj, hasar durumu ve malzeme gereksinimlerini yerinde inceleriz.'
  },
  {
    icon: FileText,
    title: '3. Şeffaf Teklif',
    desc: 'Malzeme markaları, işçilik kalemleri ve takvimi içeren ayrıntılı fiyat teklifimizi sunarız.'
  },
  {
    icon: Wrench,
    title: '4. Titiz Uygulama',
    desc: 'Maskeleme önlemlerini alarak profesyonel ustalıkla uygulamayı takvime göre başlatırız.'
  },
  {
    icon: CheckSquare,
    title: '5. Kontrol & Teslim',
    desc: 'Sizinle birlikte son kontrolleri yapar, temizlenmiş olarak projenizi eksiksiz teslim ederiz.'
  }
]

// FAQ Items
const faqItems = [
  {
    id: 'faq-1',
    title: 'İzmir genelinde keşif hizmetiniz gerçekten ücretsiz mi?',
    content: 'Evet, İzmir merkez ve çevre ilçelerinde (Karşıyaka, Bornova, Konak, Çiğli, Buca, Gaziemir, Menemen, Torbalı, Urla vb.) yerinde keşif hizmetimiz tamamen ücretsizdir. Adresinize gelerek metraj çıkarır ve net teklif hazırlarız; herhangi bir taahhüt zorunluluğunuz bulunmaz.'
  },
  {
    id: 'faq-2',
    title: 'Malzemeyi siz mi temin ediyorsunuz yoksa biz alabilir miyiz?',
    content: 'Her iki seçeneğe de açığız. Dilerseniz TSE belgeli kaliteli malzemeleri toptan temin avantajımızla anahtar teslim olarak biz getiriyoruz; dilerseniz yalnızca işçilik hizmeti de talep edebilirsiniz.'
  },
  {
    id: 'faq-3',
    title: 'Çatı ve su yalıtımı uygulamalarında garanti veriyor musunuz?',
    content: 'Evet. Yaptığımız çatı izolasyonu, membran kaplama, teras ve temel su yalıtımı işlerinde kullanılan malzeme ve işçiliğimiz yazılı iş sözleşmesi kapsamında garanti altındadır.'
  },
  {
    id: 'faq-4',
    title: 'Ev eşyalıyken boya veya alçı tadilatı yaptırabilir miyiz?',
    content: 'Kesinlikle. Eşyalı evlerde çalışırken tüm mobilyaları odanın ortasında toplayarak kalın koruma naylonlarıyla bantlıyoruz. Zeminleri kaplayarak toza ve boya sıçramalarına karşı %100 koruma sağlıyoruz.'
  },
  {
    id: 'faq-5',
    title: 'İş bitiminde ödeme planı ve süreç nasıl işliyor?',
    content: 'İşin kapsamına göre makul bir malzeme/başlangıç avansı sonrası, kalan bakiye iş tamamen bitip müşteriyle birlikte kontrol edildikten sonra tahsil edilir. Tüm aşamalar sözleşmede açıkça yazılır.'
  }
]
</script>
