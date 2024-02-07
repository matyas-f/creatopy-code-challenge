import {
  JsonBackground,
  JsonBaseElementProperties,
  JsonBorder,
  JsonButtonLabelStyle,
  JsonImageProperties,
  JsonShadow,
  JsonTextProperties,
  JsonTextSlateConfigChildren,
} from '@/types/banner-json'
import { CSSProperties } from 'react'

// There might be a battle-tested npm package solution for this
export const safelyMergeStyles = (
  ...styleArgs: (CSSProperties | undefined)[]
): CSSProperties => {
  const mergedStyles: Record<string, any> = {}
  const additiveStyles = ['filter', 'transform']

  styleArgs.forEach((styles) => {
    if (styles) {
      Object.entries(styles).forEach(([cssProperty, value]) => {
        if (additiveStyles.includes(cssProperty)) {
          mergedStyles[cssProperty] = mergedStyles[cssProperty]
            ? `${mergedStyles[cssProperty]} ${value}`
            : value
        } else {
          mergedStyles[cssProperty] = value
        }
      })
    }
  })

  return mergedStyles as CSSProperties
}

export const getShadowCssValue = (
  shadowProperties: JsonShadow | undefined,
  shadowType: 'text' | 'filter' | 'box'
) => {
  if (!shadowProperties?.useShadow) {
    return undefined
  }

  const { hShadow, vShadow, blur, spread, color } = shadowProperties

  switch (shadowType) {
    case 'box':
      return `${hShadow}px ${vShadow}px ${blur}px ${spread}px ${color}`
    case 'filter':
      return `drop-shadow(${hShadow}px ${vShadow}px ${blur}px ${color})`
    case 'text':
      return `${hShadow}px ${vShadow}px ${blur}px ${color}`
    default:
      return undefined
  }
}

export const getBasePropertiesStyles = ({
  visible,
  width,
  height,
  x,
  y,
  dropShadow,
  rotation,
  blur,
}: JsonBaseElementProperties): CSSProperties => {
  return {
    position: 'absolute',
    display: !visible ? 'none' : undefined,
    width,
    height,
    left: x ? `${x}px` : undefined,
    top: y ? `${y}px` : undefined,
    boxShadow: getShadowCssValue(dropShadow, 'box'),
    transform: rotation ? `rotate(${rotation}deg)` : undefined,
    filter: blur?.useBlur ? `blur(${blur.pixels}px)` : undefined,
  } as const
}

export const getTextStyles = (
  textProperties:
    | JsonButtonLabelStyle
    | JsonTextSlateConfigChildren
    | JsonTextProperties
): CSSProperties => {
  return {
    transformOrigin: 'top left',
    fontSize: textProperties.fontSize,
    color: (
      textProperties as JsonButtonLabelStyle | JsonTextSlateConfigChildren
    ).color,
    lineHeight: (textProperties as JsonTextProperties).lineHeight,
    letterSpacing: (textProperties as JsonButtonLabelStyle | JsonTextProperties)
      .letterSpacing,
    textAlign: (textProperties as JsonTextProperties).alignment,
    verticalAlign: (textProperties as JsonTextProperties).verticalAlign,
    direction: (textProperties as JsonButtonLabelStyle | JsonTextProperties)
      .textDirection as 'rtl' | 'ltr',
    fontFamily:
      (textProperties as JsonButtonLabelStyle).fontFamily ||
      (textProperties as JsonTextSlateConfigChildren).fontSettings?.fontFamily,
    fontWeight:
      (textProperties as JsonButtonLabelStyle).fontWeight ||
      (textProperties as JsonTextSlateConfigChildren).fontSettings?.fontWeight,
    transform: (textProperties as JsonTextProperties).scale
      ? `scale(${(textProperties as JsonTextProperties).scale})`
      : undefined,
  }
}

export const getBackgroundStyles = (backgroundProperties?: JsonBackground) => {
  if (!backgroundProperties) {
    return {}
  }

  switch (backgroundProperties.type) {
    case 'solid':
      return {
        backgroundColor: backgroundProperties.scolor,
      }
    case 'none':
    default:
      return {}
  }
}

export const getBorderStyles = (borderProperties?: JsonBorder) => {
  return borderProperties
    ? {
        borderWidth: borderProperties.weight,
        borderColor: borderProperties.color,
        borderRadius: borderProperties.radius,
      }
    : undefined
}

// Could use an environment variable
const BANNER_ASSETS_BASE_URL =
  'https://d2gla4g2ia06u2.cloudfront.net/assets/media'

export const getImageStyles = (
  imageProperties: JsonImageProperties
): CSSProperties => {
  const { contentOffsetX, contentOffsetY, contentScale, url } = imageProperties

  return {
    backgroundSize: 'cover',
    backgroundImage: `url(${BANNER_ASSETS_BASE_URL}/${url})`,
    backgroundPositionX: contentOffsetX ? `${contentOffsetX}%` : undefined,
    backgroundPositionY: contentOffsetY ? `${contentOffsetY}%` : undefined,
    filter: contentScale ? `scale(${contentScale})` : undefined,
  } as const
}
