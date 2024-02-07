import { ReactNode, useMemo } from 'react'
import { JsonDesignProperties } from '@/types/banner-json'
import {
  getBackgroundStyles,
  getBorderStyles,
  safelyMergeStyles,
} from '../utils/layer-styles'

type Props = {
  proprieties: JsonDesignProperties
  children: ReactNode | ReactNode[]
}

export const Banner = ({ children, proprieties }: Props) => {
  const bannerStyles = useMemo(() => {
    return safelyMergeStyles(
      {
        position: 'relative',
        overflow: 'hidden',
        width: proprieties.width,
        height: proprieties.height,
      },
      getBackgroundStyles(proprieties.backgroundColor),
      proprieties.backgroundColor?.useBorder &&
        proprieties.backgroundColor?.borderColor
        ? getBorderStyles({
            color: proprieties.backgroundColor.borderColor,
            weight: 1,
            radius: 0,
          })
        : undefined
    )
  }, [proprieties])

  return <div style={bannerStyles}>{children}</div>
}
