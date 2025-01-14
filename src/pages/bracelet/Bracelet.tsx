import React, { useEffect, useMemo, useRef, useState } from "react";

import Background1 from "../../assets/catalog1.jpg";
import Background2 from "../../assets/catalog2.png";
import Background3 from "../../assets/catalog3.jpg";

import { Button } from "primereact/button";
import { Photo, PhotoService } from "../../services/PhotoService";
import { Galleria } from "primereact/galleria";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { Avatar } from "primereact/avatar";

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

interface Card {
  title: String;
  description: String;
  Image: any;
}

interface Order {
  name: string;
  wa: string;
  address: string;
}

interface Product {
  id: number;
  model: string;
  jumlah: number;
  harga: number;
}
const cardList: Card[] = [
  {
    title: "Silver",
    description: "Elegan dan cocok untuk semua momen.",
    Image: Background1,
  },
  {
    title: "Gold",
    description: "Kilauan emas untuk tampilan mewah.",
    Image: Background2,
  },
  {
    title: "Rose Gold",
    description: "Warna rose gold yang anggun.",
    Image: Background3,
  },
];

export const Bracelet = () => {
  const [images, setImages] = useState<Photo[]>([]);
  const [trxType, setTrxType] = useState<string>("COD");
  const toast = useRef<Toast>(null);
  const [order, setOrder] = useState<Order>({
    name: "",
    address: "",
    wa: "",
  });
  const [product, setProduct] = useState<Product[]>([
    {
      id: 1,
      harga: 1000000,
      model: "SILVER",
      jumlah: 0,
    },
    {
      id: 2,
      harga: 1000000,
      model: "GOLD",
      jumlah: 0,
    },
    {
      id: 3,
      harga: 100000,
      model: "ROSE GOLD",
      jumlah: 0,
    },
  ]);

  const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const dateNow = new Date();
  dateNow.setDate(dateNow.getDate() + 1);
  const stringDate = dateNow.toLocaleDateString();

  const handleOrder = () => {
    if (!validateOrder()) {
      location.href = "#order";
      return;
    }

    confirm();
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setOrder((p) => ({
      ...p,
      [e.currentTarget.name]: e.currentTarget.value,
    }));
  };

  const handleChangeOrder = (id: number, type: string) => {
    setProduct((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              jumlah:
                type === "+"
                  ? product.jumlah + 1
                  : Math.max(product.jumlah - 1, 0),
            }
          : product
      )
    );
  };

  const handleReset = () => {
    setProduct((prev) =>
      prev.map((product: Product) => ({ ...product, jumlah: 0 }))
    );
  };

  const show = (message: String) => {
    toast.current?.show({
      life: 2000,
      severity: "info",
      summary: "Info",
      detail: `${message} ! 😊`,
    });
  };

  const total = useMemo(() => {
    return product.reduce((sum: number, cur) => sum + cur.jumlah * 59000, 0);
  }, product);

  const responsiveOptions = [
    {
      breakpoint: "200px",
      numVisible: 5,
    },
  ];

  useEffect(() => {
    PhotoService.getImages().then((data) => setImages(data));
  }, []);

  const validateOrder = () => {
    if (!order.name.trim()) {
      show("Mohon isi nama lengkap dulu !");
      return false;
    }
    if (!order.wa.trim() || order.wa.length < 8) {
      show("Mohon isi nomor whatsapp dulu !");
      return false;
    }
    if (!order.address.trim() || order.address.length < 10) {
      show("Mohon isi alamat lengkap dulu !");
      return false;
    }

    if (total <= 0) {
      show("Mohon pilih modelnya dulu !");
      return false;
    }

    return true;
  };

  const itemTemplate = (item: Photo) => {
    return (
      <div>
        <img
          src={`${item.itemImageSrc}`}
          alt={`${item.description}`}
          style={{ width: "100%", display: "block", height: "auto" }}
        />
      </div>
    );
  };

  const thumbnailTemplate = (item: Photo) => {
    return (
      <img
        src={`${item.itemImageSrc}`}
        alt={`${item.description}`}
        style={{ display: "block", maxWidth: "100px" }}
      />
    );
  };

  const caption = (item: Photo) => {
    return (
      <React.Fragment>
        <div className="text-xl text-center mb-2 font-bold">{item.title}</div>
        <p className="text-white text-center">{item.description}</p>
      </React.Fragment>
    );
  };

  // confirm
  const [visible, setVisible] = useState(false);
  const toastBC = useRef<Toast>(null);

  const clear = () => {
    toastBC.current?.clear();
    setVisible(false);
  };

  const confirm = () => {
    if (!visible) {
      setVisible(true);
      toastBC.current?.clear();
      toastBC.current?.show({
        severity: "success",
        summary: "Apakah anda yakin ingin memesan ?",
        sticky: true,
        content: (props) => (
          <div className="flex flex-col items-start" style={{ flex: "1" }}>
            <div className="flex align-items-center gap-2 w-full">
              <Avatar image={Background1} shape="circle" />
              <span className="font-bold text-900">Amy Elsner</span>
            </div>
            <div className=" flex gap-4 w-full">
              <div className="font-medium text-lg my-3 text-900">
                {props.message.summary}
              </div>
              <Button
                className="p-button-sm flex"
                label="Ya Pesan Sekarang"
                severity="success"
                onClick={submit}
              ></Button>
            </div>
          </div>
        ),
      });
    }
  };

  const submit = () => {
    clear();
    handleWhatsapp();
    alert(
      "Terima kasih sudah memesan , mohon tunggu barang sampai ke alamat anda 😊"
    );
    window.location.href = "";
  };

  const handleWhatsapp = () => {
    const phoneNumber = whatsappNumber; // Ganti dengan nomor WhatsApp tujuan (gunakan format internasional tanpa tanda "+")
    const message = encodeURIComponent(
      `Halo, saya ${order.name},
Saya baru saja melakukan pemesanan dan ingin memastikan bahwa detail alamat pengiriman saya adalah:
${order.address} a/n ${order.name} / ${order.wa}.

Detail Pembayaran : ${trxType}

Mohon untuk segera memproses pemesanan ini agar bisa segera sampai ke alamat saya.
Terima kasih banyak atas bantuan dan kerjasamanya! 🙏😊`
    );

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

    // Buka URL WhatsApp di tab baru
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="bg-gray-50 w-full max-w-screen-lg mx-auto">
      {/* Title Section */}
      <header className="text-center py-10 shadow-md text-blue-900">
        <h1 className="text-3xl font-bold">
          Roman Crystal: Gelang Mewah untuk Penampilan Sempurna
        </h1>
      </header>

      {/* Toast */}
      {/* <Toast ref={toast} /> */}
      <div className="card flex justify-content-center">
        <Toast ref={toast} position="center" />
      </div>

      <div className="card flex justify-content-center">
        <Toast ref={toastBC} position="bottom-center" onRemove={clear} />
      </div>

      {/* carousle */}
      <div class="container bg-black w-full flex justify-center">
        <div className="card">
          <Galleria
            value={images}
            responsiveOptions={responsiveOptions}
            numVisible={5}
            style={{ maxWidth: "640px" }}
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
            caption={caption}
            circular
            autoPlay
            transitionInterval={2000}
          />
        </div>
      </div>

      {/* Description Section */}
      <section className="p-10 text-blue-950 bg-blue-50">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Kenapa Memilih Gelang Ini?
          </h2>
          <p className="text-gray-700">
            Gelang ini dirancang dengan bahan berkualitas tinggi dan dilengkapi
            kristal berkilau yang memberikan sentuhan elegan untuk setiap momen
            spesial Anda.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="p-10 text-blue-950">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <i className="pi pi-check-circle text-orange-500 text-4xl mb-2"></i>
            <h3 className="text-xl font-semibold">Desain Eksklusif</h3>
            <p className="text-gray-600">
              Sentuhan kristal berkilau dengan material premium.
            </p>
          </div>
          <div>
            <i className="pi pi-gift text-orange-500 text-4xl mb-2"></i>
            <h3 className="text-xl font-semibold">Cocok untuk Segala Momen</h3>
            <p className="text-gray-600">
              Ideal untuk pesta, hadiah spesial, atau acara formal.
            </p>
          </div>
          <div>
            <i className="pi pi-credit-card text-orange-500 text-4xl mb-2"></i>
            <h3 className="text-xl font-semibold">Bayar di Tempat</h3>
            <p className="text-gray-600">
              Pilih metode pembayaran COD atau transfer.
            </p>
          </div>
        </div>
      </section>

      {/* Shipping Section */}
      <section className="p-10 bg-blue-50 text-blue-950">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Pengiriman Cepat</h2>
          <p className="text-gray-700">
            Kami menyediakan layanan pengiriman cepat ke seluruh Indonesia
            dengan packing aman.
          </p>
        </div>
      </section>

      {/* Card Section */}
      <section className="py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 p-10">
          {cardList.map((item: Card) => {
            return (
              <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={item.Image}
                  alt="Silver Bracelet"
                  className="w-full h-auto object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order" className="py-10 container text-blue-950">
        <div className="container mx-auto w-[90%]">
          <h2 className="text-2xl font-bold text-center mb-6">
            Pesan Sekarang
          </h2>
          <div class="text-center">
            <p class="text-">
              <s className="text-[#6c757d] text-lg">{currency.format(99000)}</s>{" "}
              <span class="text-[#ff5722] text-xl font-bold">
                {currency.format(59000)}
              </span>
            </p>
            <p className="font-bold italic underline text-red-600">
              Diskon 40% khusus sampai tanggal {stringDate}
            </p>
          </div>

          {/* Ceckbox */}
          <div className="card flex justify-content-center p-5 mt-5">
            <div className="flex flex-wrap w-full justify-center gap-5">
              <div className="flex align-items-center">
                <RadioButton
                  inputId="cod"
                  name="COD"
                  value="COD"
                  onChange={(e: RadioButtonChangeEvent) => setTrxType(e.value)}
                  checked={trxType === "COD"}
                />
                <label htmlFor="cod" className="ml-2">
                  COD
                </label>
              </div>
              <div className="flex align-items-center">
                <RadioButton
                  inputId="transfer"
                  name="Transfer"
                  value="TRANSFER"
                  onChange={(e: RadioButtonChangeEvent) => setTrxType(e.value)}
                  checked={trxType === "TRANSFER"}
                />
                <label htmlFor="transfer" className="ml-2">
                  Transfer
                </label>
              </div>
            </div>
          </div>

          {/* Table Product*/}
          <DataTable value={product} showGridlines>
            <Column field="model" header="Model" align={"center"}></Column>
            <Column
              align={"center"}
              field="jumlah"
              header="Jumlah"
              body={(row: Product) => {
                return (
                  <div className="flex justify-center items-start gap-4">
                    <i
                      className=" pi pi-minus-circle text-orange-500 text-xl mb-2 cursor-pointer"
                      onClick={() => handleChangeOrder(row.id, "-")}
                    ></i>
                    <p className="">{row.jumlah}</p>
                    <i
                      className="pi pi-plus-circle text-orange-500 text-xl mb-2 cursor-pointer"
                      onClick={() => handleChangeOrder(row.id, "+")}
                    ></i>
                  </div>
                );
              }}
            ></Column>
          </DataTable>
          <div class="w-full flex justify-center items-center flex-col bg-white p-4">
            <div class="w-full flex justify-end">
              <Button
                label="Reset"
                onClick={() => handleReset()}
                severity="danger"
              ></Button>
            </div>
            <p class="font-bold">Total Harga: {currency.format(total)} </p>
          </div>

          <form className="max-w-xl mx-auto space-y-4 mt-5">
            <div>
              <label htmlFor="name" className="block font-medium">
                Nama Lengkap
              </label>
              <input
                value={order.name}
                name="name"
                onChange={(e) => {
                  handleChange(e);
                }}
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Nama Lengkap"
              />
            </div>
            <div>
              <label htmlFor="whatsapp" className="block font-medium">
                Nomor WhatsApp
              </label>
              <input
                value={order.wa}
                onChange={(e) => {
                  handleChange(e);
                }}
                name="wa"
                type="number"
                id="whatsapp"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Nomor WhatsApp"
              />
            </div>
            <div>
              <label htmlFor="address" className="block font-medium">
                Alamat Pengiriman
              </label>
              <textarea
                name="address"
                value={order.address}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  handleChange(e);
                }}
                id="address"
                className="w-full border border-gray-300 rounded-lg p-2"
                rows={3}
                placeholder="Masukkan Alamat Lengkap Anda"
              ></textarea>
              <p className="text-gray-500">
                <span class="text-black font-bold">Contoh : </span>
                dk. Ndukuh, Desa Seliling RT 02 RW 06, Kecamatan Alian ,
                Kabupaten Kebumen , Jawa Tengah 54352
              </p>
            </div>
          </form>
        </div>
      </section>

      <div class="h-44"></div>

      {/* Sticky Order Button */}
      <div class="flex justify-center ml-[8.3%] fixed bottom-4 w-10/12">
        <Button
          label="PESAN SEKARANG"
          className="p-button-success w-8/12"
          onClick={() => handleOrder()}
        />
      </div>
    </div>
  );
};
