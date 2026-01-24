export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-pink-bg">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-medium border-t-pink-accent" />
        </div>
        <p className="text-lg text-pink-text">Loading...</p>
      </div>
    </div>
  )
}
