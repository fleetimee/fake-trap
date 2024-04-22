interface EditorProps {
  children?: React.ReactNode
}

export default function EditorLayout({ children }: EditorProps) {
  return (
    <div className="container mx-auto grid min-h-screen  min-w-full items-start gap-10 bg-white py-8">
      {children}
    </div>
  )
}
