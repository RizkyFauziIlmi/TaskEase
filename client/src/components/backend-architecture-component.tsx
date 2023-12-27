import { useEffect } from "react";
import DocumentationLayout from "../layouts/documentation-layout";
import { useTabState } from "../hooks/use-tab-state";

export const BackendArchitectureComponent = () => {
  const { setState } = useTabState();

  useEffect(() => {
    setState(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DocumentationLayout>
        <div className="flex flex-col gap-2 justify-center items-center w-full h-full">
            <img
                src="https://app.eraser.io/workspace/0ylz9c25vVJfdtwTVilT/preview?elements=7i99cVpKEw0MshvzxFsBnA&type=embed"
                className="w-full h-3/4 rounded-md"
            />
            <p className="font-semibold text-sm">
                Dalam backend aplikasi ini, Express.js berperan sebagai server yang
                menangani permintaan HTTP dari aplikasi frontend. Prisma dan MySQL
                digunakan untuk berinteraksi dengan database, menyediakan model data,
                dan mengeksekusi query. Firebase memberikan layanan otentikasi OAuth,
                mempermudah proses login dan mengelola identitas pengguna. Alur dimulai
                dari permintaan HTTP, melibatkan middleware Express, logika bisnis,
                otentikasi Firebase, dan interaksi dengan database, sebelum mengirimkan
                respon HTTP ke aplikasi frontend. Keselamatan dan penanganan kesalahan
                juga diperhatikan dalam backend untuk memastikan aplikasi berjalan
                dengan efisien dan aman.
            </p>
        </div>
    </DocumentationLayout>
  );
};
