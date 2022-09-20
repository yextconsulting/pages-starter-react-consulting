import { Address, Hours } from "@yext/types"
import { ProductProfile } from "src/types/entities";

export declare interface DirectoryCardContent {
  address: Address;
  name: string;
  slug: string;
  hours?: Hours;
}

export declare interface FeaturedCardContent<ProfileType> {
  profile: ProfileType
}

/**
 * The props provided to every {@link CardComponent}.
 *
 * @public
 */
export interface CardProps {
  /** The result data provided to the card for rendering. */
  content: DirectoryCardContent
  relativePrefixToRoot: string;
}

/**
 * The props provided to every {@link CardComponent}.
 *
 * @public
 */
 export interface FeaturedCardProps<ProfileType> {
  /** The result data provided to the card for rendering. */
  content: FeaturedCardContent<ProfileType>
}

/**
 * A functional component that can be used to render a result card.
 *
 * @public
 */
export type CardComponent = (props: CardProps) => JSX.Element;

/**
 * A functional component that can be used to render a result card.
 *
 * @public
 */
 export type FeaturedCardComponent<ProfileType> = (props: FeaturedCardProps<ProfileType>) => JSX.Element;