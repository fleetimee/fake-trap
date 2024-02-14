"use client"

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"

interface DocViewerClientProps {
  documents: {
    uri: string
  }[]
}

export function DocViewerClient({ documents }: DocViewerClientProps) {
  return (
    <DocViewer documents={documents} pluginRenderers={DocViewerRenderers} />
  )
}
