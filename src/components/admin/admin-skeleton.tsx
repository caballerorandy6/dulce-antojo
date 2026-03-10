import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function AdminFormSkeleton() {
  return (
    <div className="min-h-screen bg-pink-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-gray-200 rounded-full animate-pulse mb-4" />
          <div className="h-7 bg-gray-200 rounded w-48 mx-auto animate-pulse" />
          <div className="h-4 bg-gray-100 rounded w-64 mx-auto mt-2 animate-pulse" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-100 rounded w-16 animate-pulse" />
            <div className="h-10 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-100 rounded w-20 animate-pulse" />
            <div className="h-10 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-100 rounded w-24 animate-pulse" />
            <div className="h-10 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="h-10 bg-pink-200 rounded animate-pulse" />
        </CardContent>
      </Card>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-pink-bg p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
            <div className="h-4 bg-gray-100 rounded w-32 mt-2 animate-pulse" />
          </div>
          <div className="h-9 bg-gray-200 rounded w-24 animate-pulse" />
        </div>

        {/* Tabs skeleton */}
        <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm">
          <div className="h-9 bg-gray-200 rounded w-28 animate-pulse" />
          <div className="h-9 bg-gray-100 rounded w-28 animate-pulse" />
          <div className="h-9 bg-gray-100 rounded w-28 animate-pulse" />
        </div>

        {/* Content skeleton */}
        <Card>
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-40 animate-pulse" />
            <div className="h-4 bg-gray-100 rounded w-64 mt-1 animate-pulse" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-10 bg-gray-100 rounded animate-pulse" />
            <div className="h-10 bg-gray-100 rounded animate-pulse" />
            <div className="h-10 bg-gray-100 rounded animate-pulse" />
            <div className="h-10 bg-pink-200 rounded animate-pulse" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function PaymentHistorySkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-200 rounded-lg animate-pulse" />
                <div>
                  <div className="h-3 bg-gray-100 rounded w-16 animate-pulse" />
                  <div className="h-5 bg-gray-200 rounded w-20 mt-1 animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* History skeleton */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <div className="h-6 bg-gray-200 rounded w-40 animate-pulse" />
            <div className="h-4 bg-gray-100 rounded w-56 mt-1 animate-pulse" />
          </div>
          <div className="h-9 bg-gray-200 rounded w-24 animate-pulse" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg animate-pulse">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-32" />
                  <div className="h-4 bg-gray-100 rounded w-48 mt-2" />
                  <div className="h-3 bg-gray-100 rounded w-24 mt-2" />
                </div>
                <div className="text-right">
                  <div className="h-6 bg-green-100 rounded w-20" />
                  <div className="h-8 bg-gray-200 rounded w-28 mt-2" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
