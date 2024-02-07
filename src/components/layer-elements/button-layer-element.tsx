import { JsonButtonProperties } from '@/types/banner-json'
import {
  getBasePropertiesStyles,
  safelyMergeStyles,
  getBackgroundStyles,
  getBorderStyles,
  getTextStyles,
} from '@/utils/layer-styles'
import { useMemo } from 'react'

type Props = {
  proprieties: JsonButtonProperties
}

export const ButtonLayerElement = ({ proprieties }: Props) => {
  const buttonStyles = useMemo(() => {
    return safelyMergeStyles(
      getBasePropertiesStyles(proprieties),
      getBackgroundStyles(proprieties.backgroundColor),
      getBorderStyles(proprieties.border),
      getTextStyles(proprieties.labelStyle)
    )
  }, [proprieties])

  return (
    <button
      type="button"
      style={buttonStyles}
      dangerouslySetInnerHTML={
        proprieties.html ? { __html: proprieties.html } : undefined
      }
    />
  )
}
