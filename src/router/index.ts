import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView },
  {
    path: '/work/arcgis',
    name: 'case-arcgis',
    component: () => import('@/views/CaseStudyView.vue'),
    props: { slug: 'arcgis' },
  },
  {
    path: '/work/vue',
    name: 'case-vue',
    component: () => import('@/views/CaseStudyView.vue'),
    props: { slug: 'vue' },
  },
  {
    path: '/work/umbraco',
    name: 'case-umbraco',
    component: () => import('@/views/CaseStudyView.vue'),
    props: { slug: 'umbraco' },
  },
]
