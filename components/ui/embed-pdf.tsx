import Embed from "react-embed"

interface EmbedPdfProps {
  link: string
}

export function EmbedPdf({ link }: EmbedPdfProps) {
  return <Embed url={link} />
}
