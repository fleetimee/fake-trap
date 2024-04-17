export const storeSubscriptionPlans = [
  {
    id: "basic",
    name: "Materi",
    description: "Approve materi yang sudah dibuat oleh pembuat materi",
    features: [
      "Konfirmasi atau tolak materi yang dibuat oleh pemberi materi",
      "Mengatur status materi yang sudah dibuat oleh pemberi materi",
      "Track progress materi yang sudah anda approve",
      "Track progress materi yang sudah anda tolak",
    ],
    price: 0,
    link: "/supervisor-area/approval/approve-knowledge",
  },
  {
    id: "standard",
    name: "Pembelajaran",
    description: "Approve pembelajaran yang sudah dibuat oleh pembuat materi",
    features: [
      "Konfirmasi atau tolak pembelajaran yang dibuat oleh pemberi pembelajaran",
      "Mengatur status pembelajaran yang sudah dibuat oleh pemberi pembelajaran",
      "Track progress pembelajaran yang sudah anda approve",
      "Track progress pembelajaran yang sudah anda tolak",
    ],
    price: 10,
    link: "/supervisor-area/approval/approve-course",
  },
]
