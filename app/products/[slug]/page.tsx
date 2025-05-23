import { notFound } from "next/navigation";

import { allProducts } from "@shsfwork/.content-collections/generated";

import ProductDetailPage from "@shsfwork/modules/product-detail-page";
import { Metadata } from "next";
import { absoluteUrl } from "@shsfwork/lib/absoluteUrl";
import { SITE } from "@shsfwork/constants/common";

type ProductDetailsProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const resolvedParams = await params;
  const product = allProducts.find((p) => p._meta.path === resolvedParams.slug);
  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}

export async function generateMetadata({
  params,
}: ProductDetailsProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = allProducts.find((p) => p._meta.path === resolvedParams.slug);

  if (!product) {
    return {};
  }

  return {
    title: product.title,
    description: product.excerpt,
    openGraph: {
      title: product.title,
      description: product.excerpt,
      type: "article",
      url: absoluteUrl(product.url),
      images: [
        {
          url: product.og,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.excerpt,
      images: [product.image],
      creator: SITE.author,
    },
  };
}
