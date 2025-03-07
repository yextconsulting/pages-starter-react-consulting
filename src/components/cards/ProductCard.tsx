import { Image, Link } from "@yext/pages-components";
import { ProductProfile } from "src/types/entities";
import { CardComponent } from "src/models/cardComponent";

const ProductCard: CardComponent<ProductProfile> = function productCard(
  props
): JSX.Element {
  const { profile } = props;

  return (
    <>
      {profile.primaryPhoto?.image && (
        <div className="flex justify-center h-[187px] mb-8">
          <Image layout="fill" image={profile.primaryPhoto.image} />
        </div>
      )}
      <div className="heading heading-sub mx-8">{profile.name}</div>
      {profile.richTextDescription && (
        <div className="mx-8 mt-4">{profile.richTextDescription}</div>
      )}
      {profile.c_primaryCTA && (
        <div className="flex mx-8 mt-8 mb-4">
          <Link
            className="self-start button button-secondary"
            cta={profile.c_primaryCTA}
          />
        </div>
      )}
    </>
  );
};

export default ProductCard;
