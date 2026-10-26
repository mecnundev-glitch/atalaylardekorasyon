<template>
  <div class="min-h-screen bg-brand-black text-slate-100 flex flex-col antialiased">
    <!-- Admin Topbar -->
    <header class="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-brand-anthracite-border/80 bg-brand-black/95 px-4 sm:px-6 backdrop-blur-md">
      <div class="flex items-center space-x-3">
        <!-- Mobile Sidebar Toggle -->
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 text-slate-300 hover:text-white lg:hidden"
          aria-label="Menüyü aç/kapat"
          @click="isMobileSidebarOpen = !isMobileSidebarOpen"
        >
          <Menu v-if="!isMobileSidebarOpen" class="h-5 w-5" />
          <X v-else class="h-5 w-5 text-brand-gold" />
        </button>

        <!-- Brand Title -->
        <NuxtLink to="/admin" class="flex items-center space-x-2.5">
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-gold to-brand-gold-dark text-brand-black font-display font-black text-sm shadow-gold-sm">
            AD
          </div>
          <div>
            <span class="block font-display text-sm font-bold tracking-tight text-white">
              ATALAYLAR
            </span>
            <span class="block text-[9px] uppercase tracking-widest text-brand-gold font-semibold">
              Yönetim Paneli
            </span>
          </div>
        </NuxtLink>
      </div>

      <!-- Right Top Actions -->
      <div class="flex items-center space-x-3">
        <!-- Siteyi Görüntüle Link -->
        <NuxtLink
          to="/"
          target="_blank"
          class="hidden sm:inline-flex items-center space-x-1.5 rounded-lg border border-brand-anthracite-border bg-brand-anthracite/40 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-brand-gold/40 hover:text-white"
        >
          <ExternalLink class="h-3.5 w-3.5 text-brand-gold" />
          <span>Siteyi Aç</span>
        </NuxtLink>

        <!-- User Profile Pill -->
        <div v-if="profile" class="hidden md:flex items-center space-x-2 rounded-lg border border-brand-anthracite-border/60 bg-brand-anthracite/50 px-3 py-1 text-xs">
          <span class="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span class="font-medium text-slate-200">{{ profile.full_name }}</span>
          <span class="text-[10px] uppercase font-semibold text-brand-gold px-1.5 py-0.5 rounded bg-brand-gold/10">
            {{ profile.role }}
          </span>
        </div>

        <!-- Logout Button -->
        <button
          type="button"
          class="inline-flex h-9 items-center justify-center rounded-lg border border-brand-anthracite-border bg-brand-anthracite/70 px-3 text-xs font-semibold text-rose-300 transition-colors hover:bg-rose-500/20 hover:border-rose-500/40 hover:text-rose-200 min-h-[36px]"
          title="Güvenli Çıkış Yap"
          @click="handleLogout"
        >
          <LogOut class="h-3.5 w-3.5 sm:mr-1.5" />
          <span class="hidden sm:inline">Çıkış</span>
        </button>
      </div>
    </header>

    <div class="flex flex-1">
      <!-- Desktop Sidebar -->
      <aside class="hidden lg:flex w-64 flex-col border-r border-brand-anthracite-border/80 bg-brand-black-soft/90 p-4 shrink-0">
        <nav class="space-y-1.5 text-xs font-medium" aria-label="Yönetim Menüsü">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center justify-between rounded-xl px-3.5 py-2.5 transition-colors"
            :class="isActiveRoute(item.to)
              ? 'bg-gradient-to-r from-brand-gold/20 via-brand-gold/10 to-transparent border-l-2 border-brand-gold text-brand-gold font-bold shadow-sm'
              : 'text-slate-300 hover:bg-brand-anthracite/50 hover:text-white'"
          >
            <div class="flex items-center space-x-3">
              <component :is="item.icon" class="h-4 w-4 shrink-0 text-slate-400 group-hover:text-brand-gold" :class="{ 'text-brand-gold': isActiveRoute(item.to) }" />
              <span>{{ item.label }}</span>
            </div>
          </NuxtLink>
        </nav>

        <div class="mt-auto pt-6 border-t border-brand-anthracite-border/60 text-[11px] text-slate-500">
          <p class="font-medium text-slate-400">Atalaylar Dekorasyon</p>
          <p class="mt-0.5">Sistem Sürümü v2.6 · 2026</p>
        </div>
      </aside>

      <!-- Mobile Drawer Backdrop -->
      <div
        v-if="isMobileSidebarOpen"
        class="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
        @click="isMobileSidebarOpen = false"
      />

      <!-- Mobile Drawer Sidebar -->
      <aside
        v-if="isMobileSidebarOpen"
        class="fixed inset-y-0 left-0 z-50 w-72 flex-col border-r border-brand-anthracite-border bg-brand-black p-4 shadow-2xl lg:hidden flex"
      >
        <div class="flex items-center justify-between pb-4 border-b border-brand-anthracite-border/70">
          <span class="font-display text-sm font-bold text-white">Yönetim Menüsü</span>
          <button
            type="button"
            class="rounded-lg p-1.5 text-slate-400 hover:text-white"
            @click="isMobileSidebarOpen = false"
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <nav class="mt-4 space-y-1 text-sm font-medium">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center space-x-3 rounded-xl px-3.5 py-3 transition-colors min-h-[44px]"
            :class="isActiveRoute(item.to)
              ? 'bg-brand-gold/15 text-brand-gold font-bold border-l-2 border-brand-gold'
              : 'text-slate-300 hover:bg-brand-anthracite/50 hover:text-white'"
            @click="isMobileSidebarOpen = false"
          >
            <component :is="item.icon" class="h-5 w-5 shrink-0" :class="{ 'text-brand-gold': isActiveRoute(item.to) }" />
            <span>{{ item.label }}</span>
          </NuxtLink>
        </nav>

        <div class="mt-auto border-t border-brand-anthracite-border/70 pt-4">
          <NuxtLink
            to="/"
            target="_blank"
            class="flex items-center justify-center space-x-2 rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 py-2.5 text-xs font-semibold text-slate-200 min-h-[44px]"
          >
            <ExternalLink class="h-4 w-4 text-brand-gold" />
            <span>Siteyi Görüntüle</span>
          </NuxtLink>
        </div>
      </aside>

      <!-- Main Admin Content Area -->
      <main class="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  LayoutDashboard,
  ClipboardList,
  Layers,
  FolderKanban,
  Images,
  MessageSquareHeart,
  Sliders,
  ExternalLink,
  LogOut,
  Menu,
  X
} from 'lucide-vue-next'
import { useAdminAuth } from '~/composables/useAdminAuth'

const route = useRoute()
const { profile, logout } = useAdminAuth()
const isMobileSidebarOpen = ref(false)

const navItems = [
  { label: 'Genel Bakış', to: '/admin', icon: LayoutDashboard },
  { label: 'Teklif Talepleri', to: '/admin/quotes', icon: ClipboardList },
  { label: 'Hizmet Yönetimi', to: '/admin/services', icon: Layers },
  { label: 'Projeler / Portföy', to: '/admin/projects', icon: FolderKanban },
  { label: 'Görsel Galerisi', to: '/admin/gallery', icon: Images },
  { label: 'Müşteri Yorumları', to: '/admin/testimonials', icon: MessageSquareHeart },
  { label: 'Site & İletişim Ayarları', to: '/admin/settings', icon: Sliders }
]

const isActiveRoute = (path: string) => {
  if (path === '/admin') {
    return route.path === '/admin'
  }
  return route.path.startsWith(path)
}

const handleLogout = async () => {
  if (confirm('Yönetim panelinden çıkmak istediğinize emin misiniz?')) {
    await logout()
  }
}
</script>
