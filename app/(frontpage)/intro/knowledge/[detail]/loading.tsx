const LoadingSkeleton = () => (
  <>
    <div className="size-full min-h-full border shadow-sm">
      <div className="aspect-video size-full shadow-md">
        <iframe width="100%" height="100%"></iframe>
      </div>
    </div>
  </>
)

const SandboxPreview = () => (
  <div className="flex size-full justify-center p-10">
    <LoadingSkeleton />
  </div>
)

export default SandboxPreview
