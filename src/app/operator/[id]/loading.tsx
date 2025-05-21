import { Spinner } from "@/components/ui/spinner"
import { Shell } from "@/components/shell"

export default async function Page() {
  return (
    <Shell className="flex size-full flex-1 items-center justify-center gap-2">
      <Spinner />
    </Shell>
  )
}

// export default function Loading() {
//   return (
//     <Shell className="gap-2">
//       <div className="flex flex-col gap-6">
//         <Card>
//           <div className="flex h-[70px] gap-[14px]">
//             <Skeleton className="size-[68px] rounded-lg" />
//             <div className="flex w-full flex-col gap-[12px]">
//               <div className="flex flex-col items-start gap-2">
//                 <Skeleton className="h-7 w-48" />
//                 <div className="flex items-center gap-1">
//                   <Skeleton className="h-[30px] w-20" />
//                   <Skeleton className="h-[30px] w-20" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <Skeleton className="h-10 w-full" />

//           <div className="flex items-center gap-6 align-sub">
//             <div className="h-[52px] flex-1">
//               <Skeleton className="h-5 w-16" />
//               <Skeleton className="mt-2 h-6 w-24" />
//             </div>
//             <div className="h-full border-r border-gray-500" />
//             <div className="h-[52px] flex-1">
//               <Skeleton className="h-5 w-40" />
//               <Skeleton className="mt-2 h-6 w-32" />
//             </div>
//             <div className="h-full border-r border-gray-500" />
//             <div className="h-[52px] flex-1">
//               <Skeleton className="h-5 w-24" />
//               <Skeleton className="mt-2 h-6 w-16" />
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <DataTableSkeleton
//             columnCount={6}
//             rowCount={5}
//             searchableColumnCount={1}
//             filterableColumnCount={2}
//           />
//         </Card>
//       </div>
//     </Shell>
//   )
// }
