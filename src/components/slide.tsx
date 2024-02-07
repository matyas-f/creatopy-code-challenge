import { JsonSlideProperties } from '@/types/banner-json'

type Props = {
  properties: JsonSlideProperties
  children: React.ReactNode
}

export const Slide = ({ children }: Props) => {
  // This component could handle some animations although it would probably
  // require a different component tree to do it properly...

  return children
}
