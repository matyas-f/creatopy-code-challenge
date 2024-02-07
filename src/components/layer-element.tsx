import { JsonElement } from '@/types/banner-json'
import { ButtonLayerElement } from './layer-elements/button-layer-element'
import { ImageLayerElement } from './layer-elements/image-layer-element'
import { TextLayerElement } from './layer-elements/text-layer-element'

type Props = {
  element: JsonElement
}

export const LayerElement = ({ element }: Props) => {
  switch (element.layerType) {
    case 'text':
      return <TextLayerElement proprieties={element.properties} />
    case 'image':
      return <ImageLayerElement proprieties={element.properties} />
    case 'button':
      return <ButtonLayerElement proprieties={element.properties} />
    default:
      return null
  }
}
