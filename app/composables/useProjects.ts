import { PROJECTS_DATA } from '~/data/projects'
import type { ProjectItem, ProjectGalleryImage } from '~/types/project'

export interface ProjectCategoryOption {
  id: string
  label: string
}

export const PROJECT_CATEGORIES: ProjectCategoryOption[] = [
  { id: 'all', label: 'Tüm Projeler' },
  { id: 'alci', label: 'Alçı & Tavan' },
  { id: 'boya', label: 'İç & Dış Boya' },
  { id: 'siva', label: 'Sıva & Duvar' },
  { id: 'cati', label: 'Çatı İzolasyonu' },
  { id: 'yalitim', label: 'Su & Isı Yalıtımı' },
  { id: 'tadilat', label: 'Komple Tadilat' }
]

export const useProjects = () => {
  const projects = useState<ProjectItem[]>('projects_list', () => PROJECTS_DATA)

  const getAllProjects = (): ProjectItem[] => {
    return projects.value.sort((a, b) => a.displayOrder - b.displayOrder)
  }

  const getProjectBySlug = (slug: string): ProjectItem | undefined => {
    return projects.value.find(p => p.slug === slug)
  }

  const getProjectsByCategory = (category: string): ProjectItem[] => {
    if (!category || category === 'all') {
      return getAllProjects()
    }
    return projects.value.filter(p => p.category === category)
  }

  const getAllGalleryImages = (): (ProjectGalleryImage & { projectTitle: string; projectSlug: string; location: string })[] => {
    const list: (ProjectGalleryImage & { projectTitle: string; projectSlug: string; location: string })[] = []
    for (const p of projects.value) {
      for (const img of p.galleryImages) {
        list.push({
          ...img,
          projectTitle: p.title,
          projectSlug: p.slug,
          location: p.location
        })
      }
    }
    return list
  }

  return {
    categories: PROJECT_CATEGORIES,
    getAllProjects,
    getProjectBySlug,
    getProjectsByCategory,
    getAllGalleryImages
  }
}
