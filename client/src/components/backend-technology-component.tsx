import { useEffect } from "react";
import { useTabState } from "../hooks/use-tab-state";
import DocumentationLayout from "../layouts/documentation-layout";
import IconExpress from "./svg/express-svg";
import IconPrisma from "./svg/prisma-svg";
import IconMysql from "./svg/mysql-svg";

export const BackendTechnologyComponent = () => {
  const { setState } = useTabState();

  useEffect(() => {
    setState(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DocumentationLayout>
      <div className="w-full h-full flex flex-col px-2 py-4 gap-6 justify-start items-start">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <IconExpress className="h-10 w-10" />
            <p className="font-bold">ExpressJS</p>
          </div>
          <div className="bg-base-300 w-full p-4 rounded-md">
            <p className="font-bold mb-1">Compact and Efficient</p>
            <p>
              ExpressJS adalah kerangka web untuk Node.js yang memungkinkan
              akses cepat dan cepat pengembangan aplikasi web dan API yang
              efisien, memberikan kejelasan metode untuk perutean, permintaan
              HTTP, dan pencatatan.
            </p>
          </div>
          <div className="bg-base-300 w-full p-4 rounded-md">
            <p className="font-bold mb-1">Middleware Flexibility</p>
            <p>
              Integration of various middleware for purposes such as
              authentication, logging, and error handling. Request handling can
              be easily managed through middleware.
            </p>
          </div>
          <div className="bg-base-300 w-full p-4 rounded-md">
            <p className="font-bold mb-1">Efficient Route Management</p>
            <p>
              Proses pengorganisasian rute dalam aplikasi yang terorganisir
              disederhanakan melalui integrasi yang baik dengan komponen lain
              untuk pengembangan aplikasi yang kompleks.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <IconPrisma className="h-10 w-10" />
            <p className="font-bold">Prisma ORM</p>
          </div>
          <div className="bg-base-300 w-full p-4 rounded-md">
            <p className="font-bold mb-1">Model Schematics Easily</p>
            <p>
              Prisma ORM memungkinkan pemodelan skema database dengan cepat
              menggunakan JavaScript atau TypeScript, menangani fitur seperti
              manajemen relik dan pemilihan bidang yang diinginkan.
            </p>
          </div>
          <div className="bg-base-300 w-full p-4 rounded-md">
            <p className="font-bold mb-1">Automation Migration Database</p>
            <p>
              Fasilitas migrasi basis data membantu modifikasi struktur basis
              data tanpa rekonsiliasi bank data, mengintegrasikan beberapa basis
              data seperti MySQL.
            </p>
          </div>
          <div className="bg-base-300 w-full p-4 rounded-md">
            <p className="font-bold mb-1">Convenient Programming</p>
            <p>
              Enables convenient and intuitive programming with the use of
              commonly used programming languages.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <IconMysql className="h-10 w-10" />
            <p className="font-bold">MySQL</p>
          </div>
          <div className="bg-base-300 w-full p-4 rounded-md">
            <p className="font-bold mb-1">Database Management System (RDBMS)</p>
            <p>
              MySQL adalah sistem manajemen basis data relasional (RDBMS) yang
              dikenal luas dan efisien yang dirancang untuk aplikasi web yang
              memerlukan manajemen data efisien.
            </p>
          </div>
          <div className="bg-base-300 w-full p-4 rounded-md">
            <p className="font-bold mb-1">High Performance</p>
            <p>
              MySQL menawarkan kinerja luar biasa dan kueri SQL yang
              dioptimalkan, menjadikannya ideal untuk aplikasi dengan volume
              data besar dan permintaan tinggi.
            </p>
          </div>
          <div className="bg-base-300 w-full p-4 rounded-md">
            <p className="font-bold mb-1">Integration with Prisma ORM</p>
            <p>
              Alat ini memfasilitasi integrasi tanpa batas dengan Prisma ORM,
              memungkinkan pengembang mengelola data secara efisien melalui
              aplikasi ExpressJS.
            </p>
          </div>
        </div>
      </div>
    </DocumentationLayout>
  );
};
