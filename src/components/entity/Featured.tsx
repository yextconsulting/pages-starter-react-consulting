import React from "react";
import { FeaturedCardContent, FeaturedCardComponent } from "src/models/cardComponent";

interface FeaturedProps<ProfileType> {
  title: string;
  items: ProfileType[];
  FeaturedCardComponent: FeaturedCardComponent<ProfileType>;
}

const Featured = <ProfileType,>(props: FeaturedProps<ProfileType>) => {
  const { title, items, FeaturedCardComponent } = props;
  if (!items.length) {
    return null;
  }

  return (
    <div className="FeaturedProduct py-8 sm:py-16 bg-brand-gray-100">
      <div className="container">
        <div className="pb-2 m-4 Heading Heading--head">
          {title}
        </div>
        <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items?.map((item, i) => (
            <li className="bg-white" key={i}>
             {renderCard<ProfileType>(FeaturedCardComponent, {profile: item})}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

function renderCard<T>(
  FeaturedCardComponent: FeaturedCardComponent<T>,
  childContent: FeaturedCardContent<T>,
): JSX.Element {
  return (
    <FeaturedCardComponent content={childContent} />
  )
}

export {
  Featured,
  FeaturedProps,
}
