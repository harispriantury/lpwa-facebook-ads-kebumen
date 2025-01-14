import B1 from "../assets/carousel1.jpg";
import B2 from "../assets/carousel2.jpg";
import B3 from "../assets/carousel3.jpg";
import B4 from "../assets/carousel4.jpg";
import B5 from "../assets/carousel5.jpg";
import B6 from "../assets/carousel6.jpg";

export interface Photo {
  itemImageSrc: String;
  description: String;
  title: String;
}

export const PhotoService = {
  getData(): Photo[] {
    return [
      {
        itemImageSrc: B1,
        description:
          "Tambahkan sentuhan mewah pada penampilan Anda dengan gelang kristal bergaya Romawi yang memikat",
        title: "Elegan dalam Setiap Momen",
      },
      {
        itemImageSrc: B2,
        description:
          "Tersedia dalam warna emas, perak, dan rose gold untuk melengkapi gaya Anda di setiap kesempatan",
        title: "Pilihan Warna yang Memukau",
      },
      {
        itemImageSrc: B3,
        description:
          "Gelang 925 sterling silver ini adalah pilihan sempurna untuk ulang tahun, pernikahan, atau hadiah spesial lainnya",
        title: "Hadiah Istimewa untuk Orang Tersayang",
      },
      {
        itemImageSrc: B4,
        description:
          "Gelang ini memadukan material alloy berkualitas tinggi dengan desain simpel namun elegan.",
        title: "Desain Kontrak dengan Sentuhan Modern",
      },
      {
        itemImageSrc: B5,
        description: "Ukuran Pas untuk Semua",
        title:
          "Dengan lingkar 18 cm, gelang ini nyaman dipakai dan cocok untuk berbagai ukuran pergelangan tangan",
      },
      {
        itemImageSrc: B6,
        description:
          "Diproduksi dengan teknik inlay flimming setting untuk memastikan setiap detail terlihat sempurna",
        title: "Kualitas Terbaik dari Guangdong, China",
      },
    ];
  },

  getImages() {
    return Promise.resolve(this.getData());
  },
};
