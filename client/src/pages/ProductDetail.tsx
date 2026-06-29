import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, ArrowRight, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useRoute } from "wouter";

export default function ProductDetail() {
  const { user, isAuthenticated } = useAuth();
  const [route, params] = useRoute("/product/:id");
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  const productId = params?.id ? parseInt(params.id) : null;
  const { data: product, isLoading } = trpc.products.getById.useQuery(productId || 0, {
    enabled: !!productId,
  });

  if (!productId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">منتج غير موجود</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">المنتج غير موجود</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="gap-2"
          >
            <ArrowRight size={16} />
            العودة
          </Button>
        </div>
      </div>

      {/* Product Content */}
      <main className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="w-full aspect-square bg-card rounded-lg overflow-hidden border border-border">
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.nameAr}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{product.nameAr}</h1>
                  <p className="text-lg text-muted-foreground mt-1">{product.nameEn}</p>
                </div>
                {product.badge && product.badge !== "none" && (
                  <div className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold">
                    {product.badge === "bestseller" && "الأكثر مبيعاً"}
                    {product.badge === "new" && "وصل حديثاً"}
                    {product.badge === "rare" && "مميز ونادر"}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">الوصف</h3>
              <p className="text-muted-foreground leading-relaxed">{product.descriptionAr}</p>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">اختر الحجم</h3>
              <div className="grid grid-cols-2 gap-3">
                {/* Placeholder for sizes - will be fetched from API */}
                <Button
                  variant={selectedSize === 1 ? "default" : "outline"}
                  onClick={() => setSelectedSize(1)}
                  className="h-auto py-3"
                >
                  <div className="text-center">
                    <div className="font-semibold">3 مل</div>
                    <div className="text-xs text-muted-foreground">50,000 د.ع</div>
                  </div>
                </Button>
                <Button
                  variant={selectedSize === 2 ? "default" : "outline"}
                  onClick={() => setSelectedSize(2)}
                  className="h-auto py-3"
                >
                  <div className="text-center">
                    <div className="font-semibold">5 مل</div>
                    <div className="text-xs text-muted-foreground">80,000 د.ع</div>
                  </div>
                </Button>
                <Button
                  variant={selectedSize === 3 ? "default" : "outline"}
                  onClick={() => setSelectedSize(3)}
                  className="h-auto py-3"
                >
                  <div className="text-center">
                    <div className="font-semibold">10 مل</div>
                    <div className="text-xs text-muted-foreground">150,000 د.ع</div>
                  </div>
                </Button>
                <Button
                  variant={selectedSize === 4 ? "default" : "outline"}
                  onClick={() => setSelectedSize(4)}
                  className="h-auto py-3"
                >
                  <div className="text-center">
                    <div className="font-semibold">30 مل</div>
                    <div className="text-xs text-muted-foreground">400,000 د.ع</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">الكمية</h3>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  −
                </Button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-semibold gap-2"
              disabled={!selectedSize}
            >
              <ShoppingBag size={20} />
              إضافة إلى السلة
            </Button>

            {/* Additional Info */}
            <Card className="bg-card/50 border-border p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">التوفر:</span>
                  <span className="text-green-500 font-semibold">متوفر</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الشحن:</span>
                  <span className="text-foreground">مجاني للطلبات فوق 500,000 د.ع</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الضمان:</span>
                  <span className="text-foreground">100% أصلي مضمون</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
