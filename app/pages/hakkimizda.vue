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
              İzmir'de 15+ Yıllık Güven ve Zanaat: <span class="bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-muted bg-clip-text text-transparent">Atalay Dekorasyon</span>
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

    <!-- Value Pillars Section (Doğrulanmış Değerler) -->
    <section class="border-b border-brand-anthracite-border bg-brand-anthracite/40 py-10">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div class="rounded-2xl border border-brand-anthracite-border bg-brand-black-soft/80 p-6 flex flex-col justify-between">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-anthracite border border-brand-gold/30 text-brand-gold mb-3">
              <Search class="h-5 w-5" />
            </div>
            <div>
              <h3 class="text-sm font-bold text-white">Yerinde Ücretsiz Keşif</h3>
              <p class="mt-1 text-xs text-slate-300 leading-relaxed">İzmir genelinde adresinize gelerek lazer metre ile net alan ölçümü ve hasar tespiti yapıyoruz.</p>
            </div>
          </div>
          <div class="rounded-2xl border border-brand-anthracite-border bg-brand-black-soft/80 p-6 flex flex-col justify-between">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-anthracite border border-brand-gold/30 text-brand-gold mb-3">
              <ShieldCheck class="h-5 w-5" />
            </div>
            <div>
              <h3 class="text-sm font-bold text-white">TSE Standartlarında Malzeme</h3>
              <p class="mt-1 text-xs text-slate-300 leading-relaxed">Uygulamalarımızda yalnızca kalitesi tescilli, kendini kanıtlamış marka boya ve yalıtım ürünleri kullanıyoruz.</p>
            </div>
          </div>
          <div class="rounded-2xl border border-brand-anthracite-border bg-brand-black-soft/80 p-6 flex flex-col justify-between">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-anthracite border border-brand-gold/30 text-brand-gold mb-3">
              <FileText class="h-5 w-5" />
            </div>
            <div>
              <h3 class="text-sm font-bold text-white">Yazılı İş Sözleşmesi</h3>
              <p class="mt-1 text-xs text-slate-300 leading-relaxed">İşin kapsamını, teslim takvimini ve ödeme planını yazılı sözleşmeye bağlayarak sürprizleri önlüyoruz.</p>
            </div>
          </div>
          <div class="rounded-2xl border border-brand-anthracite-border bg-brand-black-soft/80 p-6 flex flex-col justify-between">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-anthracite border border-brand-gold/30 text-brand-gold mb-3">
              <Sparkles class="h-5 w-5" />
            </div>
            <div>
              <h3 class="text-sm font-bold text-white">Temiz ve Titiz Teslimat</h3>
              <p class="mt-1 text-xs text-slate-300 leading-relaxed">Mobilya ve zeminleri koruyucu naylonlarla maskeliyor, iş bitiminde alanı süpürüp temiz teslim ediyoruz.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hikayemiz ve Vizyonumuz -->
    <section id="mehmet-usta" class="border-b border-brand-anthracite-border bg-brand-black py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <AppBadge variant="gold" size="sm" class="mb-3">
              Biz Kimiz? · Mehmet Usta
            </AppBadge>
            <h2 class="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Sözünde Duran, Şantiyeyi Temiz Bırakan Gerçek Ustalık
            </h2>
            <div class="mt-6 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              <p>
                <strong class="text-white">Atalay Dekorasyon</strong>, ustası <strong class="text-brand-gold">Mehmet Usta</strong> önderliğinde İzmir ve çevre ilçelerde müşterilerinin adresine giderek hizmet veren bir uygulama firmasıdır.
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
                src="/images/projects/prj-apartment-renovation.jpg"
                alt="Atalay Dekorasyon Mehmet Usta ve Deneyimli Uygulama Ekibi"
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
                class="h-full w-full object-cover"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-black/40 to-transparent" />
              <div class="absolute bottom-6 left-6 right-6">
                <div class="rounded-2xl border border-brand-gold/40 bg-brand-black/90 p-4 backdrop-blur-md">
                  <div class="flex items-center gap-3">
                    <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
                      <Award class="h-6 w-6" />
                    </div>
                    <div>
                      <p class="text-xs font-bold text-white">Usta: Mehmet Usta · Atalay Dekorasyon</p>
                      <p class="text-[11px] text-slate-300">18+ yıllık deneyimle İzmir genelinde doğrudan adresinizde keşif ve uygulama.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mehmet Usta E-E-A-T Biyografi & Uzmanlık Bölümü -->
        <div class="mt-16 rounded-3xl border border-brand-gold/30 bg-gradient-to-b from-brand-black-soft via-brand-black to-brand-black-soft p-8 sm:p-12 shadow-2xl">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-8 space-y-4">
              <div class="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-3 py-1 text-xs font-semibold text-brand-gold">
                <UserCheck class="h-4 w-4" />
                <span>Usta Profili & Mesleki Deneyim</span>
              </div>
              <h3 class="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Mehmet Usta Kimdir? Tecrübesi ve Uzmanlık Alanları
              </h3>
              <p class="text-sm leading-relaxed text-slate-300">
                Mehmet Usta (Mehmet Atalay), inşaat ve dekorasyon sektöründe <strong>18 yılı aşkın fiili şantiye ve uygulama tecrübesine</strong> sahip bir zanaatkardır. Çıraklıktan ustalığa edindiği derin mesleki birikimiyle; alçıpan asma tavan, gizli LED ışık bantları, pürüzsüz saten alçı perdahı, profesyonel iç ve dış cephe boya badana uygulamaları ile çatı ve teras su izolasyonunda İzmir'in en güvenilir isimlerinden biri haline gelmiştir.
              </p>
              <p class="text-sm leading-relaxed text-slate-300">
                Mehmet Usta, işleri taşerona veya yabancı aracılara devretmez. Her keşfe bizzat gider, lazer metreyle milimetrik metraj çıkarır, kullanılacak malzeme markalarını (Jotun, Filli Boya, Knauf, Dalsan, Onduline) sözleşmeye yazar ve kendi çekirdek usta kadrosunun başında bizzat durarak projeyi temizlenmiş halde anahtar teslim tamamlar.
              </p>
              <div class="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div class="rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 p-3">
                  <div class="font-mono text-xl font-bold text-brand-gold">18+ Yıl</div>
                  <div class="text-[11px] text-slate-400 mt-1">Saha Tecrübesi</div>
                </div>
                <div class="rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 p-3">
                  <div class="font-mono text-xl font-bold text-brand-gold">450+</div>
                  <div class="text-[11px] text-slate-400 mt-1">Teslim Edilen Proje</div>
                </div>
                <div class="rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 p-3">
                  <div class="font-mono text-xl font-bold text-brand-gold">%100</div>
                  <div class="text-[11px] text-slate-400 mt-1">Sözleşmeli Güvence</div>
                </div>
                <div class="rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 p-3">
                  <div class="font-mono text-xl font-bold text-brand-gold">İzmir</div>
                  <div class="text-[11px] text-slate-400 mt-1">Tüm İlçelere Servis</div>
                </div>
              </div>
            </div>

            <div class="lg:col-span-4 rounded-2xl border border-brand-anthracite-border bg-brand-anthracite/70 p-6 space-y-4">
              <h4 class="font-display text-sm font-bold uppercase tracking-wider text-white border-b border-brand-anthracite-border pb-3">
                Doğrudan Uzmanlık Başlıkları
              </h4>
              <ul class="space-y-2.5 text-xs text-slate-300">
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="h-4 w-4 text-brand-gold shrink-0" />
                  <span>Alçıpan Asma Tavan & Gizli Işık Bandı</span>
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="h-4 w-4 text-brand-gold shrink-0" />
                  <span>İç & Dış Cephe Silinebilir Boya Badana</span>
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="h-4 w-4 text-brand-gold shrink-0" />
                  <span>Çatı İzolasyonu, Membran & Su Yalıtımı</span>
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="h-4 w-4 text-brand-gold shrink-0" />
                  <span>Isı Yalıtımı (Dış Cephe Mantolama)</span>
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="h-4 w-4 text-brand-gold shrink-0" />
                  <span>Saten Alçı, Sıva ve Duvar Düzeltme</span>
                </li>
                <li class="flex items-center gap-2">
                  <CheckCircle2 class="h-4 w-4 text-brand-gold shrink-0" />
                  <span>Komple Ev & Villa Anahtar Teslim Tadilat</span>
                </li>
              </ul>
              <div class="pt-2">
                <AppButton to="/ucretsiz-kesif" variant="primary" size="sm" class="w-full">
                  Mehmet Usta'dan Keşif İste
                </AppButton>
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
  CheckCheck,
  UserCheck,
  Search,
  FileText
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
  title: 'Hakkımızda | Mehmet Usta (Mehmet Atalay) - Atalay Dekorasyon İzmir',
  description: 'Atalay Dekorasyon; Mehmet Usta (Mehmet Atalay) liderliğinde 15 yılı aşkın tecrübesiyle İzmir genelinde alçı tavan, boya, çatı izolasyonu, su yalıtımı ve komple tadilat hizmetleri sunmaktadır. Şeffaf sözleşme ve garantili işçilik.',
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
