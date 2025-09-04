import Skeleton from "./Skeleton";

export default function CoinTableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-t border-slate-700/50">
            <th className="px-4 py-4 w-12"><Skeleton className="h-5 w-5" /></th>
            <th className="px-6 py-4"><Skeleton className="h-4 w-8" /></th>
            <th className="px-6 py-4"><Skeleton className="h-4 w-24" /></th>
            <th className="px-6 py-4"><Skeleton className="h-4 w-16" /></th>
            <th className="px-6 py-4"><Skeleton className="h-4 w-12" /></th>
            <th className="px-6 py-4"><Skeleton className="h-4 w-24" /></th>
            <th className="px-6 py-4"><Skeleton className="h-4 w-24" /></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index} className="border-b border-slate-800">
              <td className="px-4 py-5"><Skeleton className="h-5 w-5" /></td>
              <td className="px-6 py-5"><Skeleton className="h-4 w-8" /></td>
              <td className="px-6 py-5"><div className="flex items-center gap-4"><Skeleton className="h-7 w-7 rounded-full" /><Skeleton className="h-4 w-20" /></div></td>
              <td className="px-6 py-5"><Skeleton className="h-4 w-16" /></td>
              <td className="px-6 py-5"><Skeleton className="h-4 w-12" /></td>
              <td className="px-6 py-5"><Skeleton className="h-10 w-36" /></td>
              <td className="px-6 py-5"><Skeleton className="h-4 w-24" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}