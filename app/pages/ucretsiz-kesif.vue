<template>
  <div class="min-h-screen bg-brand-black text-slate-100">
    <!-- Breadcrumb & Hero Header -->
    <section class="relative overflow-hidden border-b border-brand-anthracite-border/70 bg-gradient-to-b from-brand-black-soft via-brand-anthracite/60 to-brand-black py-12 sm:py-16">
      <div
        class="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand-gold/10 blur-3xl"
        aria-hidden="true"
      />

      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AppBreadcrumb
          :items="[
            { label: 'Ana Sayfa', to: '/' },
            { label: 'Ücretsiz Keşif ve Fiyat Teklifi' }
          ]"
          class="mb-6"
        />

        <div class="max-w-3xl">
          <AppBadge variant="gold" size="sm" dot class="mb-4">
            İzmir Genelinde Yerinde Keşif
          </AppBadge>
          <h1 class="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ücretsiz Keşif ve <span class="bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-muted bg-clip-text text-transparent">Yazılı Fiyat Teklifi</span>
          </h1>
          <p class="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            Ezbere verilen fiyatlar yerine adresinize gelip metraj çıkarıyor, mekanın hasar durumunu inceliyor ve en şeffaf malzeme/işçilik teklifini hazırlıyoruz. Keşif hizmetimiz tamamen ücretsizdir.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content Grid -->
    <section class="py-12 sm:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <!-- Sol Sütun: Keşif Formu (8 Col) -->
          <div class="lg:col-span-8">
            <QuoteRequestForm :initial-service-slug="selectedServiceSlug" />
          </div>

          <!-- Sağ Sütun: Avantajlar, Süreç ve Hızlı İletişim (4 Col) -->
          <div class="space-y-6 lg:col-span-4">
            <!-- Hızlı İletişim Kartı -->
            <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite/80 p-6 shadow-xl backdrop-blur-md">
              <h3 class="font-display text-lg font-bold text-white">
                Form Doldurmak İstemiyor musunuz?
              </h3>
              <p class="mt-2 text-xs leading-relaxed text-slate-300">
                Bizi doğrudan arayabilir veya fotoğrafları WhatsApp hattımıza hemen gönderebilirsiniz.
              </p>

              <div class="mt-5 space-y-3">
                <a
                  v-if="isPhoneConfigured"
                  :href="getPhoneCallUrl()"
                  class="flex items-center justify-between rounded-xl border border-brand-gold/30 bg-brand-black/60 p-3.5 text-xs font-semibold text-white transition-all hover:border-brand-gold hover:text-brand-gold min-h-[46px]"
                >
                  <div class="flex items-center">
                    <Phone class="mr-2.5 h-4 w-4 text-brand-gold" />
                    <span>{{ config.contact.phoneFormatted }}</span>
                  </div>
                  <span class="text-[11px] text-brand-gold">Hemen Ara →</span>
                </a>
                <div
                  v-else
                  class="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300"
                >
                  Telefon hattı yapılandırılmamıştır.
                </div>

                <a
                  v-if="isWhatsAppConfigured"
                  :href="getWhatsAppUrl('Merhaba, Atalay Dekorasyon hizmetleriniz hakkında bilgi ve yerinde keşif randevusu almak istiyorum.')"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-between rounded-xl bg-emerald-600/90 p-3.5 text-xs font-semibold text-white transition-all hover:bg-emerald-600 min-h-[46px]"
                >
                  <div class="flex items-center">
                    <MessageSquare class="mr-2.5 h-4 w-4 text-white" />
                    <span>WhatsApp Keşif Hattı</span>
                  </div>
                  <span class="text-[11px] text-white/80">Mesaj Yaz →</span>
                </a>
                <div
                  v-else
                  class="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300"
                >
                  WhatsApp hattı yapılandırılmamıştır.
                </div>
              </div>
            </div>

            <!-- Keşif Süreci Kartı -->
            <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite/60 p-6 shadow-xl">
              <h3 class="font-display text-base font-bold text-white flex items-center">
                <ShieldCheck class="mr-2 h-5 w-5 text-brand-gold" />
                Nasıl Çalışıyoruz?
              </h3>

              <div class="mt-4 space-y-4 text-xs">
                <div class="flex items-start space-x-3">
                  <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 font-bold text-brand-gold">
                    1
                  </div>
                  <div>
                    <strong class="block font-semibold text-white">Randevu Teyidi:</strong>
                    <span class="text-slate-300">Talebiniz bize ulaştıktan sonra 24 saat içinde sizi arayıp en uygun keşif saatini belirliyoruz.</span>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 font-bold text-brand-gold">
                    2
                  </div>
                  <div>
                    <strong class="block font-semibold text-white">Lazer Terazili Yerinde Ölçüm:</strong>
                    <span class="text-slate-300">İzmir'deki adresinize bizzat gelerek metraj, rutubet ve yüzey durumunu analiz ediyoruz.</span>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 font-bold text-brand-gold">
                    3
                  </div>
                  <div>
                    <strong class="block font-semibold text-white">Yazılı Şeffaf Teklif:</strong>
                    <span class="text-slate-300">Kullanılacak TSE standartlı malzeme markaları ve teslim takvimini içeren resmi teklif dosyasını sunuyoruz.</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Keşif Güvenceleri -->
            <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite/40 p-6 text-xs text-slate-300 space-y-3">
              <div class="flex items-center space-x-2 text-white font-medium">
                <CheckCircle2 class="h-4 w-4 text-brand-gold shrink-0" />
                <span>%100 Ücretsiz ve Taahhütsüz Keşif</span>
              </div>
              <div class="flex items-center space-x-2 text-white font-medium">
                <CheckCircle2 class="h-4 w-4 text-brand-gold shrink-0" />
                <span>Gizli veya Ek Maliyet Yok</span>
              </div>
              <div class="flex items-center space-x-2 text-white font-medium">
                <CheckCircle2 class="h-4 w-4 text-brand-gold shrink-0" />
                <span>İzmir'in 30 İlçesine Hizmet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Keşif Hakkında Sıkça Sorulan Sorular -->
    <section class="border-t border-brand-anthracite-border/70 bg-brand-black-soft/50 py-16">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Merak Edilenler"
          title="Keşif ve Teklif Süreci Hakkında Sorular"
          subtitle="Aklınıza takılan soruların yanıtlarını inceleyin."
          centered
          class="mb-10"
        />

        <div class="space-y-4">
          <AppAccordion :items="discoveryFaqItems" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Phone, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-vue-next'
import AppBreadcrumb from '~/components/ui/AppBreadcrumb.vue'
import AppBadge from '~/components/ui/AppBadge.vue'
import SectionHeading from '~/components/ui/SectionHeading.vue'
import AppAccordion from '~/components/ui/AppAccordion.vue'
import QuoteRequestForm from '~/components/quote/QuoteRequestForm.vue'
import { useSiteConfig } from '~/composables/useSiteConfig'

const route = useRoute()
const { config, isPhoneConfigured, isWhatsAppConfigured, getPhoneCallUrl, getWhatsAppUrl } = useSiteConfig()

// URL query ?hizmet=alci-uygulamalari parametresini yakala
const selectedServiceSlug = computed(() => {
  const queryHizmet = route.query.hizmet
  return typeof queryHizmet === 'string' ? queryHizmet : ''
})

const discoveryFaqItems = [
  {
    id: 'faq-1',
    title: 'Keşif için herhangi bir ücret veya yol parası talep ediyor musunuz?',
    content: 'Hayır. İzmir merkez ve çevre ilçelerinde (Karşıyaka, Bornova, Konak, Çiğli, Buca, Gaziemir, Urla, Torbalı, Menemen vb.) keşif hizmetimiz tamamen ücretsizdir. Teklifi kabul etmeseniz dahi hiçbir ücret ödemezsiniz.'
  },
  {
    id: 'faq-2',
    title: 'Telefonda neden sabit fiyat vermiyorsunuz?',
    content: 'Her yapının tavan yüksekliği, sıva hasar durumu, rutubet seviyesi ve malzeme ihtiyacı farklıdır. Telefonda görmeden verilen yaklaşık fiyatlar şantiye başladığında ek maliyetlere dönüşür. Atalay Dekorasyon olarak dürüstlük prensibimiz gereği yerinde net metraj çıkararak tek seferlik kesin teklif hazırlarız.'
  },
  {
    id: 'faq-3',
    title: 'Keşiften sonra teklif ne kadar sürede hazır olur?',
    content: 'Standart daire boya ve alçı işlerinde keşif anında veya aynı gün içinde yazılı teklif sunulur. Komple tadilat, bina mantolama ve çatı izolasyonu gibi kapsamlı projelerde malzeme şartnamesiyle birlikte en geç 24-48 saat içinde resmi teklif teslim edilir.'
  },
  {
    id: 'faq-4',
    title: 'Teklif onaylandıktan sonra işe ne zaman başlanır?',
    content: 'Karşılıklı sözleşme imzalanıp iş takvimi belirlendikten sonra genellikle 2 ila 4 iş günü içinde malzeme sevkiyatı yapılarak uygulamaya başlanır.'
  }
]

useAppSeo({
  title: 'İzmir Ücretsiz Keşif ve Fiyat Teklifi | Atalay Dekorasyon',
  description: 'İzmir genelinde alçı, boya, sıva, çatı izolasyonu ve komple tadilat projeleriniz için yerinde ücretsiz keşif talep edin. Net metraj ve şeffaf fiyat garantisi.',
  path: '/ucretsiz-kesif',
  image: '/images/hero-decoration.jpg',
  jsonLd: buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Ücretsiz Keşif', path: '/ucretsiz-kesif' }
  ])
})
</script>
