import Image from 'next/image';
import ProductForm from '../organisms/ProductForm';
import bg_ship from '@/assets/bg_ship.jpg';

export default function HomeTemplate() {
  return (
    <div className="h-dvh w-full overflow-hidden">
      <Image
        src={bg_ship}
        alt="bg ship"
        className="w-full h-full object-cover"
      />
      <div className="absolute w-full h-full inset-0 p-[20px] flex items-center justify-center">
        <div className="bg-white md:w-[50%] w-full h-full overflow-x-hidden overflow-y-auto p-[30px] rounded-[30px]">
          <div className="mb-[50px]">
            <h1 className="font-bold text-gray-800 text-2xl">Cargo Pricing</h1>
            <p className="text-lg text-gray-500">
              Silakan pilih negara, pelabuhan, dan barang untuk melihat
              informasi produk
            </p>
          </div>

          <ProductForm />
        </div>
      </div>
    </div>
  );
}
