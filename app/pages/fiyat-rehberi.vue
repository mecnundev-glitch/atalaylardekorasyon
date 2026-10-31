<template>
  <div class="relative overflow-hidden text-left bg-brand-black min-h-screen">
    <!-- Header Section -->
    <section class="border-b border-brand-anthracite-border bg-brand-black-soft/90 py-10 sm:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AppBreadcrumb
          :items="[
            { label: 'Ana Sayfa', to: '/' },
            { label: 'Fiyat Rehberi' }
          ]"
          class="mb-6"
        />

        <div class="max-w-3xl">
          <AppBadge variant="gold" size="sm" dot class="mb-3">
            Şeffaf Maliyet Yaklaşımı
          </AppBadge>
          <h1 class="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            İzmir Tadilat ve Dekorasyon <span class="bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-muted bg-clip-text text-transparent">Fiyat Rehberi</span>
          </h1>
          <p class="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
            Ezbere verilen standart metrekare fiyatları neden yanıltıcıdır? Boya badana, asma tavan, çatı izolasyonu ve komple daire tadilatında gerçek bütçeyi belirleyen unsurlar.
          </p>
        </div>
      </div>
    </section>

    <!-- Why No Static Fake Price Banner -->
    <section class="border-b border-brand-anthracite-border bg-brand-black-soft/40 py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="rounded-2xl border border-brand-gold/30 bg-brand-anthracite-card p-6 sm:p-8">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="max-w-3xl">
              <span class="text-xs font-semibold uppercase tracking-wider text-brand-gold">Dürüst Ustalık İlkesi</span>
              <h2 class="mt-1 font-display text-xl sm:text-2xl font-bold text-white">
                Neden Sitemizde Sabit veya Sahte Fiyat Tabloları Bulunmuyor?
              </h2>
              <p class="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                İzmir'de Karşıyaka sahilindeki 40 yıllık bir binanın tuzlu nem almış duvarı ile Bornova Evka-3'teki yeni bir dairenin alçı ihtiyacı aynı değildir. Yeri görmeden verilen "m²'si 150 TL" gibi ezbere rakamlar; işe başlandıktan sonra "burada astar lazımmış, tavan ayrıymış" denilerek 2 katına çıkarılır. <strong>Atalay Dekorasyon</strong> olarak yerinde lazer metre ile net ölçü alıyor; kullanılacak TSE belgeli malzemelerin markasını ve işçiliği yazılı sözleşmeye bağlayarak sürpriz maliyetleri engelliyoruz.
              </p>
            </div>
            <AppButton to="/ucretsiz-kesif" variant="primary" size="lg" class="shrink-0 w-full sm:w-auto">
              <ClipboardCheck class="h-5 w-5" />
              <span>Ücretsiz Keşif İste</span>
            </AppButton>
          </div>
        </div>
      </div>
    </section>

    <!-- 5 Service Cost Factor Breakdowns -->
    <section class="border-b border-brand-anthracite-border bg-brand-black py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Kategori Bazlı İnceleme"
          title="Hizmetlere Göre Maliyet Kriterleri"
          description="Eviniz veya binanız için yaptıracağınız uygulamalarda fiyatı nelerin yükseltip nelerin düşürdüğünü öğrenin."
          align="left"
          size="md"
          class="mb-12"
        />

        <div class="space-y-12">
          <!-- 1. Boya Badana -->
          <div class="rounded-2xl border border-brand-anthracite-border bg-brand-anthracite-card p-6 sm:p-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-anthracite border border-brand-gold/30 text-brand-gold">
                <Paintbrush class="h-5 w-5" />
              </div>
              <div>
                <h3 class="font-display text-xl font-bold text-white">1. Boya Badana Maliyet Kriterleri</h3>
                <p class="text-xs text-brand-gold-muted">İç mekan ve dış cephe boyama</p>
              </div>
            </div>

            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              100 m² tabanlı bir dairenin ortalama 300 m² duvar ve tavan boya yüzeyi bulunur. Fiyatı doğrudan belirleyen ana unsurlar şunlardır:
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
              <div class="rounded-xl border border-brand-anthracite-border/60 bg-brand-black/50 p-4">
                <strong class="text-white block mb-1">Eşyalı vs Boş Daire:</strong>
                Eşyalı evlerde mobilyaların odaya toplanması, zeminlerin çift kat koruma naylonuyla maskelenmesi ve süpürgeliklerin bantlanması ekstra titiz işçilik süresi gerektirir.
              </div>
              <div class="rounded-xl border border-brand-anthracite-border/60 bg-brand-black/50 p-4">
                <strong class="text-white block mb-1">Alçı Tamiratı ve Zemin Hazırlığı:</strong>
                Duvarda derin çatlaklar, kabarmalar veya rutubet lekeleri varsa saten alçı perdahı ve zımparalama yapılmadan sürülen boya kısa sürede dökülür.
              </div>
              <div class="rounded-xl border border-brand-anthracite-border/60 bg-brand-black/50 p-4">
                <strong class="text-white block mb-1">Renk Değişimi ve Astar:</strong>
                Koyu renkten açık renge geçişlerde kapatıcı transfer astarı kullanılmalıdır; aksi takdirde 3-4 katta bile alttaki renk kusabilir.
              </div>
              <div class="rounded-xl border border-brand-anthracite-border/60 bg-brand-black/50 p-4">
                <strong class="text-white block mb-1">Boya Sınıfı:</strong>
                Ekonomik plastik boya, tam silinebilir teflonlu ipek mat boya ve İtalyan efekt/mermer boya arasında metrekare malzeme maliyeti değişkenlik gösterir.
              </div>
            </div>
          </div>

          <!-- 2. Alçıpan ve Asma Tavan -->
          <div class="rounded-2xl border border-brand-anthracite-border bg-brand-anthracite-card p-6 sm:p-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-anthracite border border-brand-gold/30 text-brand-gold">
                <Layers class="h-5 w-5" />
              </div>
              <div>
                <h3 class="font-display text-xl font-bold text-white">2. Alçıpan & Asma Tavan Maliyet Kriterleri</h3>
                <p class="text-xs text-brand-gold-muted">Düz asma tavan, gizli ışık bandı ve bölme duvar</p>
              </div>
            </div>

            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Alçıpan uygulamalarında yalnızca levha değil, tavana asılan galvaniz karkasın sağlamlığı ve lazer gönye işçiliği fiyata yön verir:
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
              <div class="rounded-xl border border-brand-anthracite-border/60 bg-brand-black/50 p-4">
                <strong class="text-white block mb-1">Tavan Tasarımının Geometrisi:</strong>
                Düz beyaz asma tavan ile kademeli, kavisli veya gizli LED havuzlu mimari asma tavanlar arasında profil bükme ve köşe bandı işçilik farkı vardır.
              </div>
              <div class="rounded-xl border border-brand-anthracite-border/60 bg-brand-black/50 p-4">
                <strong class="text-white block mb-1">Kullanılan Alçıpan Tipi:</strong>
                Standart beyaz levha kuru alanlarda kullanılırken; banyo ve mutfaklarda neme dayanıklı yeşil (suya dayanıklı), yangın kaçışlarında ise kırmızı levha kullanılır.
              </div>
              <div class="rounded-xl border border-brand-anthracite-border/60 bg-brand-black/50 p-4">
                <strong class="text-white block mb-1">Galvaniz Profil Sac Kalınlığı:</strong>
                Piyasada ucuz 0.35 mm profiller esneme yaparken; standart 0.50 - 0.60 mm et kalınlığındaki tavan C ve U profilleri sarkma ve çatlamayı önler.
              </div>
              <div class="rounded-xl border border-brand-anthracite-border/60 bg-brand-black/50 p-4">
                <strong class="text-white block mb-1">Ses & Isı Yalıtımı Dolgusu:</strong>
                Bölme duvarlarda veya tavan arasına 5 cm taşyünü şilte serilmesi akustik konfor sağlarken malzeme bütçesine yansır.
              </div>
            </div>
          </div>

          <!-- 3. Çatı İzolasyonu -->
          <div class="rounded-2xl border border-brand-anthracite-border bg-brand-anthracite-card p-6 sm:p-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-anthracite border border-brand-gold/30 text-brand-gold">
                <Home class="h-5 w-5" />
              </div>
              <div>
                <h3 class="font-display text-xl font-bold text-white">3. Çatı İzolasyonu ve Tamiri Maliyet Kriterleri</h3>
                <p class="text-xs text-brand-gold-muted">Kiremit altı membran, gizli dere sacları ve shingle</p>
              </div>
            </div>

            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Çatı tamirinde en büyük maliyet hatası, suyun aktığı yeri bulmadan gelişi güzel zift sürmektir. Gerçek maliyeti belirleyen etkenler:
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
              <div class="rounded-xl border border-brand-anthracite-border/60 bg-brand-black/50 p-4">
                <strong class="text-white block mb-1">Karkas Ahşap Durumu:</strong>
                Taşıyıcı ızgaralarda veya OSB kaplamada çürüme varsa yenilenmesi gerekir. Çürük tahta üzerine membran kaynak yapılamaz.
              </div>
              <div class="rounded-xl border border-brand-anthracite-border/60 bg-brand-black/50 p-4">
                <strong class="text-white block mb-1">Membran Kalınlığı ve Taşıyıcısı:</strong>
                Cam tülü taşıyıcılı membranlar lodos fırtınasında yırtılabilir. Polyester keçe taşıyıcılı 3.5 - 4 mm kalınlıkta kaliteli membranlar tercih edilmelidir.
              </div>
              <div class="rounded-xl border border-brand-anthracite-border/60 bg-brand-black/50 p-4">
                <strong class="text-white block mb-1">Yağmur Oluğu ve Gizli Dere Sacları:</strong>
                Eski paslanmış galvaniz derelerin eksiz alüminyum veya çinko derelerle yenilenmesi ve pürmüz kaynağıyla havuzlanması su sızdırmazlığın anahtarıdır.
              </div>
              <div class="rounded-xl border border-brand-anthracite-border/60 bg-brand-black/50 p-4">
                <strong class="text-white block mb-1">Çatı Eğimi ve Kat Yüksekliği:</strong>
                Eğimli çatılarda güvenlik halatları, vinçle malzeme indirme-bindirme ve iş güvenliği iskeleleri maliyete dahil edilir.
              </div>
            </div>
          </div>

          <!-- 4. Mantolama -->
          <div class="rounded-2xl border border-brand-anthracite-border bg-brand-anthracite-card p-6 sm:p-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-anthracite border border-brand-gold/30 text-brand-gold">
                <Flame class="h-5 w-5" />
              </div>
              <div>
                <h3 class="font-display text-xl font-bold text-white">4. Dış Cephe Isı Yalıtımı (Mantolama) Kriterleri</h3>
                <p class="text-xs text-brand-gold-muted">Taşyünü ve karbonlu EPS paket sistemler</p>
              </div>
            </div>

            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Mantolama bir paket sistemdir; yapıştırıcısından dekoratif sıvasına kadar birbiriyle uyumlu ürünler kullanılmalıdır:
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
              <div class="rounded-xl border border-brand-anthracite-border/60 bg-brand-black/50 p-4">
                <strong class="text-white block mb-1">Taşyünü vs EPS Tercihi:</strong>
                Taşyünü A1 sınıfı yanmazlık ve ses yalıtımı sunar; EPS ise yüksek ısı verimi ve hafiflik sağlar. Taşyünü maliyeti %30-40 daha yüksektir.
              </div>
              <div class="rounded-xl border border-brand-anthracite-border/60 bg-brand-black/50 p-4">
                <strong class="text-white block mb-1">Levha Kalınlığı (4 cm vs 5 cm):</strong>
                İzmir iklim şartlarında dış duvarlarda en az 4-5 cm kalınlıkta levha tavsiye edilir. Kalınlık arttıkça enerji tasarrufu yükselir.
              </div>
              <div class="rounded-xl border border-brand-anthracite-border/60 bg-brand-black/50 p-4">
                <strong class="text-white block mb-1">Çelik Çivili Dübel ve Donatı Filesi:</strong>
                M² başına en az 6 adet tırnaklı dübel atılmalı ve 160 gr/m² alkali dayanımlı file kullanılmalıdır; aksi takdirde rüzgarda cephe kabarma yapar.
              </div>
              <div class="rounded-xl border border-brand-anthracite-border/60 bg-brand-black/50 p-4">
                <strong class="text-white block mb-1">Güvenlikli İskele Kurulumu:</strong>
                Bina yüksekliğine göre emniyetli çelik iskele kurulumu, branda çekimi ve belediye işgaliye harçları bütçede yer alır.
              </div>
            </div>
          </div>

          <!-- 5. Komple Daire Tadilatı -->
          <div class="rounded-2xl border border-brand-anthracite-border bg-brand-anthracite-card p-6 sm:p-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-anthracite border border-brand-gold/30 text-brand-gold">
                <Palette class="h-5 w-5" />
              </div>
              <div>
                <h3 class="font-display text-xl font-bold text-white">5. Komple Daire / Villa Tadilatı Kriterleri</h3>
                <p class="text-xs text-brand-gold-muted">Anahtar teslim mimari yenileme</p>
              </div>
            </div>

            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Mutfak, banyo, elektrik, su tesisatı, zemin seramikleri ve boyayı içeren anahtar teslim projelerde bütçe müşteri isteklerine göre şekillenir:
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
              <div class="rounded-xl border border-brand-anthracite-border/60 bg-brand-black/50 p-4">
                <strong class="text-white block mb-1">Kırım ve Moloz Atımı:</strong>
                Eski fayansların, ara duvarların kırılması ve belediye izinli hafriyat alanına nakliyesi ilk bütçe kalemidir.
              </div>
              <div class="rounded-xl border border-brand-anthracite-border/60 bg-brand-black/50 p-4">
                <strong class="text-white block mb-1">Elektrik ve Sıhhi Tesisat Revizyonu:</strong>
                Eski binalarda paslı demir su borularının PPRC ile değiştirilmesi ve sigorta panosu kablolamasının yenilenmesi dairenin can damarıdır.
              </div>
              <div class="rounded-xl border border-brand-anthracite-border/60 bg-brand-black/50 p-4">
                <strong class="text-white block mb-1">Mutfak & Banyo İmalatları:</strong>
                MDF gövdeli akrilik kapak mutfak dolapları, porselen veya granit tezgahlar, gömme rezervuar ve duşakabin kalitesi bütçeyi belirler.
              </div>
              <div class="rounded-xl border border-brand-anthracite-border/60 bg-brand-black/50 p-4">
                <strong class="text-white block mb-1">Tek Elden Ustalık Avantajı:</strong>
                Her iş için ayrı usta aramak yerine tek elden sözleşmeli yönetim; zaman, para ve iletişim karmaşasını önler.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pitfalls Checklist -->
    <section class="border-b border-brand-anthracite-border bg-brand-black-soft/50 py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Dikkat Edilmesi Gerekenler"
          title="Ucuz Fiyat Verenlerin Gizlediği 5 Saha Tuzağı"
          description="Tadilat ve izolasyon yaptırırken mağdur olmamanız için dikkat etmeniz gereken püf noktaları."
          align="center"
          size="md"
          class="mb-12"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="rounded-2xl border border-red-500/30 bg-brand-anthracite-card p-5">
            <span class="text-xs font-bold text-red-400">Tuzak 01</span>
            <h4 class="mt-2 font-display text-base font-bold text-white">Yazılı Sözleşme Yapmamak</h4>
            <p class="mt-2 text-xs text-slate-300 leading-relaxed">
              Sözlü fiyatta anlaşılır, işin ortasında "bu fiyata kapılar dahil değildi, tavan alçısı hariçti" denilerek sürekli ek para talep edilir.
            </p>
          </div>

          <div class="rounded-2xl border border-red-500/30 bg-brand-anthracite-card p-5">
            <span class="text-xs font-bold text-red-400">Tuzak 02</span>
            <h4 class="mt-2 font-display text-base font-bold text-white">Marka Belirtmeden Malzeme Almak</h4>
            <p class="mt-2 text-xs text-slate-300 leading-relaxed">
              Teklifte yalnızca "1. sınıf boya" yazar; uygulama günü piyasanın en ucuz, silinmeyen ve tozutan kireçli boyası getirilir.
            </p>
          </div>

          <div class="rounded-2xl border border-red-500/30 bg-brand-anthracite-card p-5">
            <span class="text-xs font-bold text-red-400">Tuzak 03</span>
            <h4 class="mt-2 font-display text-base font-bold text-white">Astar ve Zımparayı Atlamak</h4>
            <p class="mt-2 text-xs text-slate-300 leading-relaxed">
              Eski kabarık duvar kazınmadan direkt boya vurulur. İlk ay güzel görünür, 3 ay sonra tüm boya tabaka halinde dökülür.
            </p>
          </div>

          <div class="rounded-2xl border border-red-500/30 bg-brand-anthracite-card p-5">
            <span class="text-xs font-bold text-red-400">Tuzak 04</span>
            <h4 class="mt-2 font-display text-base font-bold text-white">Maskeleme Yapmadan Çalışmak</h4>
            <p class="mt-2 text-xs text-slate-300 leading-relaxed">
              Zeminler, prizler ve mobilyalar korunmaz. Boya bittiğinde harcanan temizlik masrafı boyacının ücretini geçer.
            </p>
          </div>

          <div class="rounded-2xl border border-red-500/30 bg-brand-anthracite-card p-5">
            <span class="text-xs font-bold text-red-400">Tuzak 05</span>
            <h4 class="mt-2 font-display text-base font-bold text-white">Tüm Parayı Peşin İstemek</h4>
            <p class="mt-2 text-xs text-slate-300 leading-relaxed">
              İşe başlamadan tüm ücreti alan güvenilmez ekipler işi yarım bırakabilir veya teslim gününü haftalarca erteleyebilir.
            </p>
          </div>

          <div class="rounded-2xl border border-brand-gold/30 bg-brand-gold/10 p-5 flex flex-col justify-between">
            <div>
              <span class="text-xs font-bold text-brand-gold">Bizim Yaklaşımımız</span>
              <h4 class="mt-2 font-display text-base font-bold text-white">Atalay Dekorasyon Güvencesi</h4>
              <p class="mt-2 text-xs text-slate-300 leading-relaxed">
                Yazılı sözleşme, açık marka beyanı, titiz koruyucu maskeleme ve kademeli hakediş modeli ile çalışıyoruz.
              </p>
            </div>
            <NuxtLink to="/ucretsiz-kesif" class="mt-4 text-xs font-bold text-brand-gold hover:underline">
              Ücretsiz Keşif Randevusu Alın →
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Price FAQs -->
    <section class="border-b border-brand-anthracite-border bg-brand-black py-16">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Merak Edilenler"
          title="Fiyatlandırma Hakkında Sıkça Sorulan Sorular"
          description="Ödeme planı, keşif süreci ve malzeme temini ile ilgili yanıtlar."
          align="center"
          size="md"
          class="mb-10"
        />

        <AppAccordion :items="priceFaqs" default-open-id="pfaq-1" />
      </div>
    </section>

    <!-- Bottom CTA Banner -->
    <section class="py-16 sm:py-24 bg-gradient-to-b from-brand-black to-brand-black-soft">
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
          Evinizin Gerçek Maliyetini Birlikte Çıkaralım
        </h2>
        <p class="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
          İzmir merkez ve ilçelerinde Mehmet Usta ile adresinize geliyor, lazer metreyle ölçüm yapıp şeffaf yazılı teklifimizi ücretsiz sunuyoruz.
        </p>
        <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <AppButton to="/ucretsiz-kesif" variant="primary" size="lg">
            <ClipboardCheck class="h-5 w-5" />
            <span>Ücretsiz Keşif Talebi</span>
          </AppButton>
          <AppButton :to="getWhatsAppUrl()" variant="whatsapp" size="lg">
            <MessageCircle class="h-5 w-5" />
            <span>WhatsApp ile Fiyat Sor</span>
          </AppButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  ClipboardCheck,
  MessageCircle,
  Paintbrush,
  Layers,
  Home,
  Flame,
  Palette
} from 'lucide-vue-next'
import AppBreadcrumb from '~/components/ui/AppBreadcrumb.vue'
import AppBadge from '~/components/ui/AppBadge.vue'
import AppButton from '~/components/common/AppButton.vue'
import SectionHeading from '~/components/ui/SectionHeading.vue'
import AppAccordion from '~/components/ui/AppAccordion.vue'
import { useAppSeo } from '~/composables/useAppSeo'
import { useSiteConfig } from '~/composables/useSiteConfig'

const { getWhatsAppUrl } = useSiteConfig()

const priceFaqs = [
  {
    id: 'pfaq-1',
    title: 'Yerinde keşif ve fiyat teklifi için ücret alıyor musunuz?',
    content: 'Hayır. İzmir merkez ve tüm çevre ilçelerinde (Karşıyaka, Bornova, Buca, Konak, Çiğli, Urla, Çeşme, Gaziemir, Bayraklı vb.) yerinde keşif ve yazılı fiyat teklifi hazırlama hizmetimiz tamamen ücretsizdir. Herhangi bir iş taahhüdü zorunluluğunuz bulunmaz.'
  },
  {
    id: 'pfaq-2',
    title: 'Ödeme süreci ve hakediş planı nasıl işliyor?',
    content: 'İş başlangıcında malzeme alımı için makul bir peşinat/avans belirlenir. Büyük projelerde aşama aşama (örneğin kırım-tesisat bitimi, sıva-alçı bitimi) kademeli ödeme yapılır. Kalan son bakiye ise iş tamamen bitirilip müşteriyle birlikte kontrol edildikten sonra tahsil edilir.'
  },
  {
    id: 'pfaq-3',
    title: 'Malzemeyi kendimiz alsak yalnızca işçilik hizmeti verir misiniz?',
    content: 'Evet, hem anahtar teslim (malzeme + işçilik) hem de sadece usta işçilik seçeneğimiz mevcuttur. Malzemeyi siz temin ettiğinizde sarfiyat miktarlarını ve doğru malzeme teknik özelliklerini ustanız olarak size bildiririz.'
  },
  {
    id: 'pfaq-4',
    title: 'İş sırasında sonradan ek masraf çıkar mı?',
    content: 'Keşif aşamasında lazer metre ile net ölçü alındığı ve yapının mevcut durumu yerinde incelendiği için yazılı sözleşmedeki iş kalemleri için sonradan kesinlikle ek maliyet çıkarılmaz. Ancak müşteri iş sürecinde proje dışı yeni bir talepte bulunursa (örneğin kapıların da boyanması gibi), bunun maliyeti önceden onayınıza sunulur.'
  }
]

useAppSeo({
  title: 'İzmir Tadilat ve Dekorasyon Fiyat Rehberi | Atalay Dekorasyon',
  description: 'İzmir\'de ev tadilatı, boya badana, alçıpan asma tavan ve çatı izolasyonu maliyet faktörleri. Şeffaf metraj, dürüst ustalık ve ücretsiz yerinde keşif.',
  path: '/fiyat-rehberi',
  image: '/images/hero-decoration.jpg',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: priceFaqs.map(item => ({
        '@type': 'Question',
        name: item.title,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.content
        }
      }))
    }
  ]
})
</script>

