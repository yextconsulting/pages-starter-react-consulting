export interface StandardProps {
  yaTrack?: string
  yaScope?: string
}

export namespace Yext {
  export type LinkType = 'URL' | 'Email' | 'Phone'

  export interface CTA {
    link: string
    label: string
    linkType?: LinkType
  }
}