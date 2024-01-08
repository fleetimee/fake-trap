export function Card(props: {
  variant?: string
  extra?: string
  children?: JSX.Element | any[]
  [x: string]: any
}) {
  const { variant, extra, children, ...rest } = props
  return (
    <div
      className={`!z-5 shadow-3xl relative flex flex-col rounded-[20px] bg-white bg-clip-border ${
        props.default
          ? "shadow-shadow-500 dark:shadow-none"
          : "shadow-shadow-100 dark:shadow-none"
      }  dark:!bg-navy-800 dark:text-white  ${extra}`}
      {...rest}
    >
      {children}
    </div>
  )
}

const Widget = (props: {
  icon: JSX.Element
  title: string
  subtitle: string
}) => {
  const { icon, title, subtitle } = props
  return (
    <Card extra="!flex-row flex-grow items-center rounded-[20px]">
      <div className="me-4 flex h-[90px] w-auto flex-row items-center">
        <div className="bg-lightPrimary dark:bg-navy-700 rounded-full p-3">
          <span className="text-brand-500 flex items-center dark:text-white">
            {icon}
          </span>
        </div>
      </div>

      <div className="h-50 me-4 flex w-auto flex-col justify-center">
        <p className="font-dm text-sm font-medium text-gray-600">{title}</p>
        <h4 className="text-navy-700 text-xl font-bold dark:text-white">
          {subtitle}
        </h4>
      </div>
    </Card>
  )
}

export default Widget
