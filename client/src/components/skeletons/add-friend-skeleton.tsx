export default function AddFriendSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="skeleton w-14 h-14 rounded-full shrink-0"></div>
        <div>
          <div className="skeleton w-24 h-4 mb-1"></div>
          <div className="skeleton w-40 h-4"></div>
        </div>
      </div>
      <div className="skeleton w-[7.4rem] h-8 rounded-md"></div>
    </div>
  );
}
