<template>
  <footer class="border-t border-brand-anthracite-border bg-brand-black-soft text-slate-400">
    <!-- Main Footer Content -->
    <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        <!-- Brand Summary -->
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-brand-gold/40 bg-brand-black p-1 shadow-gold-sm">
              <img
                src="/logo.png"
                alt="Atalaylar Dekorasyon Logo"
                width="40"
                height="40"
                class="h-full w-full object-contain"
              >
            </div>
            <div>
              <span class="block font-display text-base font-bold text-white">
                ATALAYLAR
              </span>
              <span class="block text-[9px] uppercase tracking-widest text-brand-gold-light">
                Dekorasyon & Yapı
              </span>
            </div>
          </div>
          <p class="text-xs leading-relaxed text-slate-400">
            {{ config.description }}
          </p>
          <div class="pt-2 space-y-2">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Usta & Yetkili:
              </p>
              <p class="text-xs font-bold text-brand-gold-light">
                Mehmet Atalay (Mehmet Usta)
              </p>
            </div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Hizmet Bölgesi:
              </p>
              <p class="text-xs text-brand-gold-light">
                İzmir (Tüm Merkez ve Çevre İlçeler)
              </p>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Hızlı Bağlantılar
          </h3>
          <ul class="mt-4 space-y-2 text-xs">
            <li>
              <NuxtLink to="/" class="transition-colors hover:text-brand-gold">Ana Sayfa</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/hakkimizda" class="transition-colors hover:text-brand-gold">Hakkımızda</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/projeler" class="transition-colors hover:text-brand-gold">Projelerimiz</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/galeri" class="transition-colors hover:text-brand-gold">Uygulama Galerisi</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/musteri-yorumlari" class="transition-colors hover:text-brand-gold">Müşteri Yorumları</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/ucretsiz-kesif" class="text-brand-gold hover:underline">Ücretsiz Keşif Formu</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h3 class="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Hizmetlerimiz
          </h3>
          <ul class="mt-4 space-y-2 text-xs">
            <li>
              <NuxtLink to="/hizmetlerimiz/alci-uygulamalari" class="transition-colors hover:text-brand-gold">Alçı & Asma Tavan</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/hizmetlerimiz/ic-cephe-boya" class="transition-colors hover:text-brand-gold">İç Cephe Boya</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/hizmetlerimiz/dis-cephe-boya" class="transition-colors hover:text-brand-gold">Dış Cephe Boya</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/hizmetlerimiz/siva-ve-duvar-uygulamalari" class="transition-colors hover:text-brand-gold">Sıva & Duvar İşleri</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/hizmetlerimiz/cati-izolasyonu" class="transition-colors hover:text-brand-gold">Çatı İzolasyonu</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/hizmetlerimiz/su-yalitimi" class="transition-colors hover:text-brand-gold">Su Yalıtımı</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/hizmetlerimiz/isi-yalitimi" class="transition-colors hover:text-brand-gold">Isı Yalıtımı (Mantolama)</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/hizmetlerimiz/dekorasyon-ve-tadilat" class="transition-colors hover:text-brand-gold">Komple Tadilat & Dekorasyon</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact & Hours -->
        <div class="space-y-3 text-xs">
          <h3 class="font-display text-sm font-semibold uppercase tracking-wider text-white">
            İletişim & Keşif
          </h3>
          <p class="flex items-start space-x-2">
            <MapPin class="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
            <span>{{ config.contact.address }}</span>
          </p>
          <p class="flex items-center space-x-2">
            <Phone class="h-4 w-4 shrink-0 text-brand-gold" />
            <a
              v-if="isPhoneConfigured"
              :href="getPhoneCallUrl()"
              class="hover:text-brand-gold"
            >
              {{ config.contact.phoneFormatted }}
            </a>
            <span
              v-else
              class="text-[11px] text-amber-400/90"
            >
              Telefon Yapılandırılmadı
            </span>
          </p>
          <p class="flex items-center space-x-2">
            <Mail class="h-4 w-4 shrink-0 text-brand-gold" />
            <a :href="`mailto:${config.contact.email}`" class="hover:text-brand-gold">{{ config.contact.email }}</a>
          </p>
          <p class="flex items-start space-x-2 pt-1 text-slate-400">
            <Clock class="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
            <span>{{ config.contact.workingHours }}</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-white/5 bg-brand-black py-5 text-center text-xs text-slate-400">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 sm:flex-row sm:px-6 lg:px-8">
        <p>© {{ currentYear }} {{ config.name }}. Tüm Hakları Saklıdır.</p>
        <div class="mt-3 flex space-x-4 text-[11px] sm:mt-0">
          <NuxtLink to="/yasal/gizlilik-politikasi" class="hover:text-brand-gold">Gizlilik Politikası</NuxtLink>
          <span>•</span>
          <NuxtLink to="/yasal/kvkk-aydinlatma-metni" class="hover:text-brand-gold">KVKK Metni</NuxtLink>
          <span>•</span>
          <NuxtLink to="/yasal/cerez-politikasi" class="hover:text-brand-gold">Çerez Politikası</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ShieldCheck, MapPin, Phone, Mail, Clock } from 'lucide-vue-next'
import { useSiteConfig } from '~/composables/useSiteConfig'

const { config, isPhoneConfigured, getPhoneCallUrl } = useSiteConfig()
const currentYear = new Date().getFullYear()
</script>
