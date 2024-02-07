import { JsonImageProperties } from '@/types/banner-json'
import {
  getBasePropertiesStyles,
  getImageStyles,
  safelyMergeStyles,
} from '@/utils/layer-styles'
import { useMemo } from 'react'

type Props = {
  proprieties: JsonImageProperties
}

export const ImageLayerElement = ({ proprieties }: Props) => {
  const imageStyles = useMemo(() => {
    return safelyMergeStyles(
      getBasePropertiesStyles(proprieties),
      getImageStyles(proprieties)
    )
  }, [proprieties])

  return <div style={imageStyles} />
}
