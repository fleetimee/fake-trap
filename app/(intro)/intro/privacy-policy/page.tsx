import { Shell } from "@/components/shell/lobby-shell"

export default function Home() {
  return (
    <Shell className=" bg-gray-50" variant="markdown">
      <div className=" p-4 text-gray-800">
        <h1 className="mb-6 text-3xl font-bold">Aturan Privasi</h1>

        <p>
          Kebijakan Privasi berikut ini menjelaskan bagaimana kami mengumpulkan,
          menggunakan, memindahkan, mengungkapkan dan melindungi informasi
          pribadi anda yang dapat diidentifikasi yang diperoleh melalui Aplikasi
          kami (sebagaimana didefinisikan di bawah). Mohon anda membaca
          Kebijakan Privasi ini dengan seksama untuk memastikan bahwa anda
          memahami bagaimana ketentuan Kebijakan Privasi ini kami berlakukan.
          Kebijakan Privasi ini disertakan sebagai bagian dari Ketentuan
          Penggunaan kami.
        </p>

        <p className="mt-4 font-semibold">
          Penggunaan anda atas aplikasi dan layanan kami tunduk pada Ketentuan
          Penggunaan dan Kebijakan Privasi ini dan mengindikasikan persetujuan
          anda terhadap Ketentuan Penggunaan dan Kebijakan Privasi tersebut.
        </p>

        <h2 className="mt-4 font-bold">Informasi Yang Kami Kumpulkan</h2>
        <p>
          Kami mengumpulkan Informasi Pribadi tertentu dari anda agar Aplikasi
          dapat menemukan Layanan dari Penyedia Layanan. Anda akan langsung
          memberikan Informasi Pribadi (sebagai contoh, saat anda mendaftar) dan
          beberapa informasi akan secara otomatis dikumpulkan ketika anda
          menggunakan Aplikasi.
        </p>

        <h2 className="mt-4 font-bold">Keamanan</h2>
        <p>
          Kami tidak menjamin keamanan database kami dan kami juga tidak
          menjamin bahwa data yang anda berikan tidak akan ditahan/terganggu
          ketika sedang dikirimkan kepada kami. Setiap pengiriman informasi oleh
          anda kepada kami merupakan risiko anda sendiri. Anda tidak boleh
          mengungkapkan sandi anda kepada siapapun. Bagaimanapun efektifnya
          suatu teknologi, tidak ada sistem keamanan yang tidak dapat ditembus.
        </p>

        <h2 className="mt-4 font-bold">Perubahan atas Kebijakan Privacy Ini</h2>
        <p>
          Kami dapat mengubah Kebijakan Privasi ini untuk mencerminkan perubahan
          dalam kegiatan kami. Jika kami mengubah Kebijakan Privasi ini, kami
          akan memberitahu anda melalui email atau dengan cara pemberitahuan di
          Situs web 1 hari sebelum perubahan berlaku. Kami menghimbau anda untuk
          meninjau halaman ini secara berkala untuk mengetahui informasi terbaru
          tentang bagaimana ketentuan Kebijakan Privasi ini kami berlakukan.
        </p>

        <h2 className="mt-4 font-bold">Pengakuan dan Persetujuan</h2>
        <p>
          Dengan menggunakan Aplikasi, anda mengakui bahwa anda telah membaca
          dan memahami Kebijakan Privasi ini dan Ketentuan Penggunaan dan setuju
          dan sepakat terhadap penggunaan, praktek, pemrosesan dan pengalihan
          informasi pribadi anda oleh kami sebagaimana dinyatakan di dalam
          Kebijakan Privasi ini.
        </p>
        <p>
          Anda juga menyatakan bahwa anda memiliki hak untuk membagikan seluruh
          informasi yang telah anda berikan kepada kami dan untuk memberikan hak
          kepada kami untuk menggunakan dan membagikan informasi tersebut kepada
          Penyedia Layanan.
        </p>
      </div>
    </Shell>
  )
}
