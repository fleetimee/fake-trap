export const storeSubscriptionPlans = [
  {
    id: "basic",
    name: "Pengetahuan",
    description: "Approve pengetahuan yang sudah dibuat oleh pembuat materi",
    features: [
      "Konfirmasi atau tolak pengetahuan yang dibuat oleh pemberi pengetahuan",
      "Mengatur status pengetahuan yang sudah dibuat oleh pemberi pengetahuan",
      "Track progress pengetahuan yang sudah anda approve",
      "Track progress pengetahuan yang sudah anda tolak",
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
