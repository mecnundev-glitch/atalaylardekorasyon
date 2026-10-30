<template>
  <div class="min-h-screen bg-brand-black text-slate-200">
    <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <AppBreadcrumb
        :items="[
          { label: 'Ana Sayfa', to: '/' },
          { label: 'Yasal' },
          { label: 'KVKK Aydınlatma Metni' }
        ]"
        class="mb-6"
      />

      <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite/60 p-8 sm:p-12 shadow-2xl backdrop-blur-md">
        <AppBadge variant="gold" size="sm" dot class="mb-4">
          6698 Sayılı KVKK Uyarınca
        </AppBadge>

        <h1 class="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Kişisel Verilerin Korunması ve Aydınlatma Metni
        </h1>

        <p class="mt-2 text-xs text-slate-400">
          Son Güncelleme: 04 Ekim 2026
        </p>

        <div class="mt-8 space-y-6 text-xs sm:text-sm leading-relaxed text-slate-300">
          <section>
            <h2 class="font-display text-base font-semibold text-white mb-2">
              1. Veri Sorumlusu ve Yasal Unvan
            </h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, veri sorumlusu sıfatıyla şahıs işletmesi kaydı bulunan <strong class="text-white">Mehmet Atalay — Atalay Dekorasyon</strong> (Vergi Levhası Kayıtlı Unvanı: Mehmet Atalay) olarak, web sitemiz üzerinden ilettiğiniz kişisel verilerinizi aşağıda açıklanan çerçevede işlemekteyiz. Ofisimiz bulunmamakta olup tüm hizmetler İzmir genelinde müşterilerimizin adresine gidilerek yerinde yürütülmektedir.
            </p>
          </section>

          <section>
            <h2 class="font-display text-base font-semibold text-white mb-2">
              2. İşlenen Kişisel Veriler
            </h2>
            <p>
              Teklif ve keşif formu kapsamında yalnızca hizmetin sunulabilmesi için zorunlu olan asgari kişisel veriler toplanmaktadır:
            </p>
            <ul class="list-disc list-inside mt-2 space-y-1 text-slate-400">
              <li><strong>Kimlik Bilgisi:</strong> Ad ve Soyad</li>
              <li><strong>İletişim Bilgisi:</strong> Telefon Numarası</li>
              <li><strong>Lokasyon Bilgisi:</strong> Uygulama yapılacak İlçe (İzmir)</li>
              <li><strong>Proje Bilgisi:</strong> İlgilenilen hizmet türü, tahmini metraj, talep notları ve ziyaretçinin kendi isteğiyle yüklediği ortam fotoğrafları</li>
            </ul>
          </section>

          <section>
            <h2 class="font-display text-base font-semibold text-white mb-2">
              3. Veri İşleme Amaçları ve Hukuki Sebepleri
            </h2>
            <p>
              Kişisel verileriniz;
            </p>
            <ul class="list-disc list-inside mt-2 space-y-1 text-slate-400">
              <li>Ücretsiz keşif randevusunun organize edilmesi ve telefonla teyidi,</li>
              <li>Mekana özel şeffaf malzeme ve işçilik fiyat teklifinin hazırlanması,</li>
              <li>Sözleşme ve uygulama süreçlerinin yürütülmesi,</li>
            </ul>
            <p class="mt-2">
              amaçlarıyla, KVKK Madde 5/2-c uyarınca <em>"Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması kaydıyla, sözleşmenin taraflarına ait kişisel verilerin işlenmesinin gerekli olması"</em> hukuki sebebine dayalı olarak işlenmektedir.
            </p>
          </section>

          <section>
            <h2 class="font-display text-base font-semibold text-white mb-2">
              4. Pazarlama ve Ticari Elektronik İleti İzni
            </h2>
            <p>
              Pazarlama veya duyuru izinleri, teklif talebinden bağımsız ayrı bir onay kutusu ile sunulmaktadır. Pazarlama onayını vermek <strong>kesinlikle zorunlu değildir</strong> ve teklif almanızı engellemez. İzninizi dilediğiniz zaman geri alabilirsiniz.
            </p>
          </section>

          <section>
            <h2 class="font-display text-base font-semibold text-white mb-2">
              5. Veri Güvenliği ve Üçüncü Kişilere Aktarım
            </h2>
            <p>
              Toplanan teklif ve keşif verileri kesinlikle kamuya açık değildir; üçüncü şahıslara veya reklam ortaklarına satılmaz ve aktarılmaz. Veritabanımız Row-Level Security (Satır Düzeyi Güvenlik) ve 256-bit SSL şifreleme protokolleriyle korunmaktadır.
            </p>
          </section>

          <section>
            <h2 class="font-display text-base font-semibold text-white mb-2">
              6. Veri Saklama ve İmha Süreci
            </h2>
            <p>
              Anlaşma sağlanamayan veya sonuçlandırılmayan teklif talepleri en geç <strong>1 (bir) yıl</strong> içerisinde sistemlerimizden güvenli biçimde silinir veya anonim hale getirilir. İşe dönüştürülen talepler ise Vergi Usul Kanunu ve Borçlar Kanunu kapsamındaki yasal zamanaşımı sürelerince (10 yıl) saklanır.
            </p>
          </section>

          <section>
            <h2 class="font-display text-base font-semibold text-white mb-2">
              7. İlgili Kişinin Hakları (KVKK Madde 11)
            </h2>
            <p>
              KVKK'nın 11. maddesi uyarınca dilediğiniz zaman kişisel verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini isteme hakkına sahipsiniz. Başvurularınızı <a :href="`mailto:${config.contact.email}`" class="text-brand-gold hover:underline">{{ config.contact.email }}</a> adresine iletebilirsiniz.
            </p>
          </section>
        </div>

        <div class="mt-8 border-t border-brand-anthracite-border pt-6">
          <AppButton to="/ucretsiz-kesif" variant="primary" size="sm">
            ← Keşif Formuna Geri Dön
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppBreadcrumb from '~/components/ui/AppBreadcrumb.vue'
import AppBadge from '~/components/ui/AppBadge.vue'
import AppButton from '~/components/common/AppButton.vue'
import { useSiteConfig } from '~/composables/useSiteConfig'

const { config } = useSiteConfig()

useAppSeo({
  title: 'KVKK Aydınlatma Metni | Atalay Dekorasyon',
  description: 'Atalay Dekorasyon 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamındaki aydınlatma metni, veri saklama ve silme prosedürleri.',
  path: '/yasal/kvkk-aydinlatma-metni',
  jsonLd: buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Yasal', path: '/yasal/kvkk-aydinlatma-metni' },
    { name: 'KVKK Aydınlatma Metni', path: '/yasal/kvkk-aydinlatma-metni' }
  ])
})
</script>
