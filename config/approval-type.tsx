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
    name: "Pelatihan",
    description: "Approve pelatihan yang sudah dibuat oleh pembuat materi",
    features: [
      "Konfirmasi atau tolak pelatihan yang dibuat oleh pemberi pelatihan",
      "Mengatur status pelatihan yang sudah dibuat oleh pemberi pelatihan",
      "Track progress pelatihan yang sudah anda approve",
      "Track progress pelatihan yang sudah anda tolak",
    ],
    price: 10,
    link: "/supervisor-area/approval/approve-course",
  },
]
