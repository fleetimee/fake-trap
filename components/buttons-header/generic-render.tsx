import Embed from "react-embed"

interface GenericRenderProps {
  link: string
}

export function GenericRender({ link }: GenericRenderProps) {
  return <Embed url={link} />
}
