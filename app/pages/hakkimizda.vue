<template>
  <div class="relative overflow-hidden text-left">
    <!-- Breadcrumb & Header Banner -->
    <div class="border-b border-brand-anthracite-border bg-brand-black-soft/90 py-8 sm:py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AppBreadcrumb :items="breadcrumbItems" />

        <div class="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div class="max-w-3xl">
            <AppBadge variant="gold" size="sm" dot class="mb-3">
              Kurumsal & Ustalık Hikayemiz
            </AppBadge>
            <!-- Single H1 for SEO -->
            <h1 class="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              İzmir'de 15+ Yıllık Güven ve Zanaat: <span class="bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-muted bg-clip-text text-transparent">Atalaylar Dekorasyon</span>
            </h1>
            <p class="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              Alçı, asma tavan, boya, çatı izolasyonu ve komple daire tadilatında İzmir genelinde sözleşmeli teslimat ve tavizsiz işçilik standardı sunuyoruz.
            </p>
          </div>

          <div class="shrink-0 flex items-center gap-3">
            <AppButton to="/ucretsiz-kesif" variant="primary" size="md">
              <Sparkles class="mr-1.5 h-4 w-4" />
              <span>Ücretsiz Keşif İste</span>
            </AppButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <section class="border-b border-brand-anthracite-border bg-brand-anthracite/40 py-10">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div class="rounded-2xl border border-brand-anthracite-border bg-brand-black-soft/80 p-6">
            <div class="font-display text-3xl sm:text-4xl font-extrabold text-brand-gold">15+</div>
            <p class="mt-2 text-xs sm:text-sm font-semibold text-white">Yıllık Saha Tecrübesi</p>
            <p class="mt-0.5 text-[11px] text-slate-400">İzmir ve Ege Bölgesi</p>
          </div>
          <div class="rounded-2xl border border-brand-anthracite-border bg-brand-black-soft/80 p-6">
            <div class="font-display text-3xl sm:text-4xl font-extrabold text-brand-gold">450+</div>
            <p class="mt-2 text-xs sm:text-sm font-semibold text-white">Tamamlanan Proje</p>
            <p class="mt-0.5 text-[11px] text-slate-400">Daire, Villa ve Ofis</p>
          </div>
          <div class="rounded-2xl border border-brand-anthracite-border bg-brand-black-soft/80 p-6">
            <div class="font-display text-3xl sm:text-4xl font-extrabold text-brand-gold">%100</div>
            <p class="mt-2 text-xs sm:text-sm font-semibold text-white">Sözleşmeli Teslim</p>
            <p class="mt-0.5 text-[11px] text-slate-400">Ceza Şartlı Şeffaf Garanti</p>
          </div>
          <div class="rounded-2xl border border-brand-anthracite-border bg-brand-black-soft/80 p-6">
            <div class="font-display text-3xl sm:text-4xl font-extrabold text-brand-gold">30 İlçe</div>
            <p class="mt-2 text-xs sm:text-sm font-semibold text-white">Yerinde Ücretsiz Keşif</p>
            <p class="mt-0.5 text-[11px] text-slate-400">Aynı Gün veya 24 Saatte</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Hikayemiz ve Vizyonumuz -->
    <section class="border-b border-brand-anthracite-border bg-brand-black py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <AppBadge variant="gold" size="sm" class="mb-3">
              Biz Kimiz?
            </AppBadge>
            <h2 class="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Sözünde Duran, Şantiyeyi Temiz Bırakan Gerçek Ustalık
            </h2>
            <div class="mt-6 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              <p>
                <strong class="text-white">Atalaylar Dekorasyon</strong>, temelleri sağlam işçilik ve dürüst esnaflık anlayışı üzerine kurulmuş, İzmir merkezli bir yapı ve dekorasyon firmasıdır.
              </p>
              <p>
                Sektörde karşılaşılan en büyük sorunlar olan <span class="text-brand-gold font-medium">"geciken teslimatlar, iş ortasında çıkarılan sürpriz ekstra masraflar ve arkasında moloz bırakan ekipler"</span> anlayışını tamamen reddediyoruz.
              </p>
              <p>
                İster 1 odanın boyası olsun, ister komple bir villanın çatı izolasyonu ve anahtar teslim tadilatı; her projeye resmi yazılı sözleşmeyle başlar, 1. sınıf markalı malzemeler kullanır ve şantiyeyi süpürüp temizleyerek teslim ederiz.
              </p>
            </div>

            <!-- Highlights -->
            <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex items-start gap-3 rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 p-4">
                <CheckCircle2 class="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <h3 class="text-xs font-bold text-white">1. Sınıf TSE Belgeli Malzeme</h3>
                  <p class="mt-1 text-[11px] text-slate-400">Jotun, Filli Boya, Knauf, Dalsan, Onduline standartları.</p>
                </div>
              </div>
              <div class="flex items-start gap-3 rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 p-4">
                <ShieldCheck class="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <h3 class="text-xs font-bold text-white">İşçilik ve İzolasyon Garantisi</h3>
                  <p class="mt-1 text-[11px] text-slate-400">Yalıtım ve su izolasyonunda su sızdırmazlık teminatı.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Görsel / Özellik Vitrini -->
          <div class="relative">
            <div class="aspect-[4/3] overflow-hidden rounded-3xl border border-brand-anthracite-border bg-brand-anthracite shadow-2xl relative">
              <img
                src="/images/hero-decoration.jpg"
                alt="Atalaylar Dekorasyon İzmir Ustalık Ekibi"
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
                class="h-full w-full object-cover"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/30 to-transparent" />
              <div class="absolute bottom-6 left-6 right-6">
                <div class="rounded-2xl border border-brand-gold/30 bg-brand-black/90 p-4 backdrop-blur-md">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold">
                      <Award class="h-5 w-5" />
                    </div>
                    <div>
                      <p class="text-xs font-bold text-white">İzmir'in Güvenilir Tadilat Çözüm Ortağı</p>
                      <p class="text-[11px] text-slate-400">Karşıyaka'dan Çeşme'ye, Bornova'dan Urla'ya kesintisiz keşif.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Temel İlkelerimiz (4 Sütun) -->
    <section class="border-b border-brand-anthracite-border bg-brand-black-soft/90 py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Çalışma Anlayışımız"
          title="Bizi Farklı Kılan 4 Temel İlke"
          subtitle="İzmir'de yüzlerce ailenin evini ve iş yerini güvenle teslim ettiği çalışma prensiplerimiz."
          align="center"
          class="mb-14"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AppCard class="p-6">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold mb-5">
              <Clock class="h-6 w-6" />
            </div>
            <h3 class="font-display text-base font-bold text-white">1. Zamanında Teslimat</h3>
            <p class="mt-2 text-xs text-slate-400 leading-relaxed">
              İş başlangıcında gün ve teslim saati sözleşmeyle netleştirilir. Belirtilen tarihte anahtarınızı gecikmesiz teslim alırsınız.
            </p>
          </AppCard>

          <AppCard class="p-6">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold mb-5">
              <Scale class="h-6 w-6" />
            </div>
            <h3 class="font-display text-base font-bold text-white">2. Sabit Fiyat Sözü</h3>
            <p class="mt-2 text-xs text-slate-400 leading-relaxed">
              Keşif esnasında onaylanan bütçe ne ise odur. İş başladıktan sonra "fiyatlar arttı, ekstra çıktı" bahaneleriyle ek ücret talep edilmez.
            </p>
          </AppCard>

          <AppCard class="p-6">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold mb-5">
              <Sparkles class="h-6 w-6" />
            </div>
            <h3 class="font-display text-base font-bold text-white">3. Temiz & Özenli Şantiye</h3>
            <p class="mt-2 text-xs text-slate-400 leading-relaxed">
              Mobilyalar, süpürgelikler ve zeminler koruyucu brandalarla sarılır. İş bitiminde kaba temizlik yapılıp molozlar taşınır.
            </p>
          </AppCard>

          <AppCard class="p-6">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold mb-5">
              <CheckCheck class="h-6 w-6" />
            </div>
            <h3 class="font-display text-base font-bold text-white">4. Doğru Malzeme Tercihi</h3>
            <p class="mt-2 text-xs text-slate-400 leading-relaxed">
              İzmir’in tuzlu havasına, yoğun nemine ve aşırı yaz sıcağına dayanıklı, sertifikalı ve marka değeri kanıtlanmış malzemeler kullanılır.
            </p>
          </AppCard>
        </div>
      </div>
    </section>

    <!-- 4 Adımlı İş Sürecimiz -->
    <section class="border-b border-brand-anthracite-border bg-brand-black py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Adım Adım Süreç"
          title="Bizimle Çalışmak Çok Kolay"
          subtitle="Keşiften anahtar teslimine kadar şeffaf, stressiz ve planlı bir yenileme deneyimi."
          align="center"
          class="mb-14"
        />

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="rounded-2xl border border-brand-anthracite-border bg-brand-anthracite/50 p-6 relative">
            <span class="font-mono text-2xl font-black text-brand-gold/40">01</span>
            <h3 class="mt-3 font-display text-sm font-bold text-white">Ücretsiz Keşif & Metraj</h3>
            <p class="mt-2 text-xs text-slate-400 leading-relaxed">
              Adresinize gelerek mekanı yerinde inceliyor, ölçüleri lazer metre ile net biçimde çıkarıyoruz.
            </p>
          </div>

          <div class="rounded-2xl border border-brand-anthracite-border bg-brand-anthracite/50 p-6 relative">
            <span class="font-mono text-2xl font-black text-brand-gold/40">02</span>
            <h3 class="mt-3 font-display text-sm font-bold text-white">Net Teklif & Sözleşme</h3>
            <p class="mt-2 text-xs text-slate-400 leading-relaxed">
              Kullanılacak malzemelerin markası, iş kapsamı ve teslim tarihi yazılı sözleşmeye dökülür.
            </p>
          </div>

          <div class="rounded-2xl border border-brand-anthracite-border bg-brand-anthracite/50 p-6 relative">
            <span class="font-mono text-2xl font-black text-brand-gold/40">03</span>
            <h3 class="mt-3 font-display text-sm font-bold text-white">Uygulama & İlerleme</h3>
            <p class="mt-2 text-xs text-slate-400 leading-relaxed">
              Usta kadromuz işe başlar, şantiye aşamaları fotoğraf ve videolarla tarafınıza düzenli iletilir.
            </p>
          </div>

          <div class="rounded-2xl border border-brand-anthracite-border bg-brand-anthracite/50 p-6 relative">
            <span class="font-mono text-2xl font-black text-brand-gold/40">04</span>
            <h3 class="mt-3 font-display text-sm font-bold text-white">Kontrol & Temiz Teslim</h3>
            <p class="mt-2 text-xs text-slate-400 leading-relaxed">
              Birlikte son kontrolleri yaparız. Şantiye temizlenir ve garantili olarak kullanımınıza sunulur.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Global CTA -->
    <ContactCtaSection />
  </div>
</template>

<script setup lang="ts">
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Award,
  Clock,
  Scale,
  CheckCheck
} from 'lucide-vue-next'
import AppBreadcrumb from '~/components/ui/AppBreadcrumb.vue'
import AppBadge from '~/components/ui/AppBadge.vue'
import AppCard from '~/components/ui/AppCard.vue'
import AppButton from '~/components/common/AppButton.vue'
import SectionHeading from '~/components/ui/SectionHeading.vue'
import ContactCtaSection from '~/components/common/ContactCtaSection.vue'

const breadcrumbItems = [
  { label: 'Hakkımızda' }
]

useAppSeo({
  title: 'Hakkımızda | İzmir Alçı, Boya, Yalıtım ve Tadilat Ustaları',
  description: 'Atalaylar Dekorasyon; 15 yılı aşkın tecrübesiyle İzmir genelinde alçı tavan, boya, çatı izolasyonu, su yalıtımı ve komple tadilat hizmetleri sunmaktadır. Şeffaf sözleşme ve garantili işçilik.',
  path: '/hakkimizda',
  image: '/images/hero-decoration.jpg',
  jsonLd: [
    buildBreadcrumbSchema([
      { name: 'Ana Sayfa', path: '/' },
      { name: 'Hakkımızda', path: '/hakkimizda' }
    ]),
    buildLocalBusinessSchema()
  ]
})
</script>
