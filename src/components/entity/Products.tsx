import { LocationProfile, ProductProfile } from "src/types/entities";
import Featured from "src/components/entity/Featured";
import ProductCard from "src/components/cards/ProductCard";
import { useTemplateData } from "src/common/useTemplateData";
import ErrorBoundaryWithAnalytics from "../common/ErrorBoundaryWithAnalytics";

type ProductsProps = {
  itemsToShow?: number;
};

const Products = (props: ProductsProps) => {
  const templateData = useTemplateData();
  const profile = templateData.document as LocationProfile;
  const products = profile.c_featuredProductsSection;

  if (products?.title && products?.products) {
    return (
      <ErrorBoundaryWithAnalytics name="products">
        <ProductsLayout
          title={products.title}
          items={products.products}
          itemsToShow={props.itemsToShow}
        />
      </ErrorBoundaryWithAnalytics>
    );
  }

  return null;
};

type ProductsLayoutProps = ProductsProps & {
  title: string;
  items: ProductProfile[];
};

const ProductsLayout = (props: ProductsLayoutProps) => {
  const { title, items } = props;
  return (
    <Featured
      title={title}
      items={items}
      CardComponent={ProductCard}
      itemsToShow={props.itemsToShow || 3}
    />
  );
};

export default Products;
