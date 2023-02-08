/**
 * The props provided to every {@link CardComponent}.
 *
 * @public
 */
export interface CardProps<ProfileType> {
  /** The result data provided to the card for rendering. */
  profile: ProfileType;
}

/**
 * A functional component that can be used to render a result card.
 *
 * @public
 */
export type CardComponent<ProfileType> = (
  props: CardProps<ProfileType>
) => JSX.Element;
