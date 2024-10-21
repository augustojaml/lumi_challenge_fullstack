interface FileItem {
  name: string
  size: string
  type: string
  status: 'success' | 'error'
}

export const filesFake: FileItem[] = [
  {
    name: 'Biodata.pdf',
    size: '1.2 MB / 1.2 MB',
    type: 'PDF',
    status: 'success',
  },
  {
    name: 'User reports.xls',
    size: '1.05 MB / 1.05 MB',
    type: 'XLS',
    status: 'success',
  },
  {
    name: 'Drawing.ai',
    size: '1.5 MB / 2.3 MB',
    type: 'AI',
    status: 'error',
  },
  {
    name: 'Profile.jpg',
    size: '180 KB / 200 KB',
    type: 'JPG',
    status: 'error',
  },
  {
    name: 'Data.doc',
    size: '1.6 MB / 1.9 MB',
    type: 'DOC',
    status: 'error',
  },
  {
    name: 'Social Media Banner.png',
    size: '45 KB / 60 KB',
    type: 'PNG',
    status: 'success',
  },
]
