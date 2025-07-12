'use client'

import { Layout } from '../../components/Layout'
import { ProductDetailPage } from '../../components/ProductDetailPage'

export default function ProductDetail({ params }) {
  return (
    <Layout>
      <ProductDetailPage productId={params.id} />
    </Layout>
  )
}