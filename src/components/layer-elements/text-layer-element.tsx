import { JsonTextProperties, isSlateConfigChildren } from '@/types/banner-json'
import { useMemo } from 'react'
import {
  getBasePropertiesStyles,
  getTextStyles,
  safelyMergeStyles,
} from '../../utils/layer-styles'

type Props = {
  proprieties: JsonTextProperties
}

export const TextLayerElement = ({ proprieties }: Props) => {
  const textStyles = useMemo(() => {
    return safelyMergeStyles(
      getBasePropertiesStyles(proprieties),
      getTextStyles(proprieties)
    )
  }, [proprieties])

  // ~~ Very naive implementation ~~
  const textContent = useMemo(() => {
    return proprieties.config.nodes.map((node) =>
      node.children.map((child, index) => {
        if (isSlateConfigChildren(child)) {
          return (
            <p key={index} style={getTextStyles(child)}>
              {child.text}
            </p>
          )
        }

        return null
      })
    )
  }, [proprieties.config])

  return <div style={textStyles}>{textContent}</div>
}
