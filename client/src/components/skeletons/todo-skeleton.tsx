export default function TodoSkeleton() {
  return (
    <>
      <div className="flex justify-between p-6 gap-4 items-center">
        <div className="flex gap-6 items-center">
          <div className="skeleton h-8 w-8"></div>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-lg flex items-center gap-4">
              <div className="skeleton w-24 h-4"></div>
              <div className="flex gap-2 items-center text-xs opacity-50">
                <div className="skeleton h-4 w-4"></div>
                <div className="skeleton h-4 w-20"></div>
                <div className="sekeleton h-4 w-12"></div>
              </div>
            </h3>
            <div className="skeleton h-4 w-12"></div>
          </div>
        </div>
        <div className="flex gap-1">
            <div className="skeleton h-6 w-6"></div>
            <div className="skeleton h-6 w-6"></div>
            <div className="skeleton h-6 w-6"></div>
        </div>
      </div>
      <div className="divider"></div>
    </>
  );
}
