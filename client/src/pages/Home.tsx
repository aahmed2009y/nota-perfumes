import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Search, ShoppingBag, Menu, X } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const { data: products = [], isLoading: productsLoading } = trpc.products.getAll.useQuery();
  const { data: categories = [] } = trpc.categories.getAll.useQuery();

  const filteredProducts = selectedCategory
    ? products.filter((p: any) => p.categoryId === selectedCategory)
    : products;

  const searchedProducts = filteredProducts.filter((p: any) =>
    p.nameAr.includes(searchQuery) || p.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <button
            onClick={() => setSideMenuOpen(!sideMenuOpen)}
            className="lg:hidden p-2 hover:bg-accent/10 rounded-lg transition"
          >
            {sideMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex-1 flex justify-center">
            <h1 className="text-2xl font-bold text-accent">نوتا NOTA</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => (window.location.href = "/cart")}
              className="relative"
            >
              <ShoppingBag size={20} />
              <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>
            {isAuthenticated ? (
              <Button variant="outline" size="sm">
                {user?.name || "حسابي"}
              </Button>
            ) : (
              <Button size="sm" asChild>
                <a href={getLoginUrl()}>دخول</a>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Side Menu */}
      {sideMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSideMenuOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-64 bg-card border-l border-border p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-accent">نوتا NOTA</h2>
            <p className="text-sm text-muted-foreground">متجر العطور الفاخرة</p>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" onClick={() => setSelectedCategory(null)}>
                جميع المنتجات
              </Button>
              {categories.map((cat: any) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSideMenuOpen(false);
                  }}
                >
                  {cat.nameAr}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container py-8">
        {/* Hero Section */}
        <div className="mb-12 rounded-xl overflow-hidden bg-gradient-to-b from-primary/20 to-background border border-border">
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-accent mb-4">أفضل العطور الفاخرة</h2>
              <p className="text-lg text-muted-foreground">اكتشف مجموعتنا المميزة من العطور الأصلية</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute right-3 top-3 text-muted-foreground" size={20} />
            <Input
              placeholder="ابحث عن عطرك المفضل..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 bg-card border-border"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="whitespace-nowrap"
            >
              الكل
            </Button>
            {categories.map((cat: any) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.id)}
                className="whitespace-nowrap"
              >
                {cat.nameAr}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <h3 className="text-2xl font-bold mb-6">أحدث العطور</h3>
          {productsLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin" size={32} />
            </div>
          ) : searchedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">لم يتم العثور على منتجات</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchedProducts.map((product: any) => (
                <Card
                  key={product.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-card border-border"
                  onClick={() => (window.location.href = `/product/${product.id}`)}
                >
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    {product.imageUrl && (
                      <img
                        src={product.imageUrl}
                        alt={product.nameAr}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {product.badge && product.badge !== "none" && (
                      <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                        {product.badge === "bestseller" && "الأكثر مبيعاً"}
                        {product.badge === "new" && "وصل حديثاً"}
                        {product.badge === "rare" && "مميز ونادر"}
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-3">
                    <h4 className="font-semibold text-foreground line-clamp-2">{product.nameAr}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{product.descriptionAr}</p>
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      عرض التفاصيل
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-accent mb-4">عن المتجر</h4>
              <p className="text-sm text-muted-foreground">
                متخصصون في بيع العطور الفاخرة الأصلية بأسعار تنافسية
              </p>
            </div>
            <div>
              <h4 className="font-bold text-accent mb-4">الروابط السريعة</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition">من نحن</a></li>
                <li><a href="#" className="hover:text-accent transition">اتصل بنا</a></li>
                <li><a href="#" className="hover:text-accent transition">شروط الاستخدام</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-accent mb-4">التواصل</h4>
              <p className="text-sm text-muted-foreground">البريد: info@nota.com</p>
              <p className="text-sm text-muted-foreground">الهاتف: <a href="https://wa.me/+9640774706259" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">0774 706 2599</a></p>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 نوتا NOTA للعطور. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
