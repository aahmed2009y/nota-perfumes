import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Trash2 } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function Cart() {
  const { isAuthenticated } = useAuth();

  // Placeholder cart items
  const cartItems: any[] = [];

  const total = cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
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

        <div className="container py-16 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">سلة المشتريات</h1>
          <p className="text-muted-foreground mb-8">يجب تسجيل الدخول لعرض السلة</p>
          <Button asChild size="lg">
            <a href={getLoginUrl()}>تسجيل الدخول</a>
          </Button>
        </div>
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

      {/* Cart Content */}
      <main className="container py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">سلة المشتريات</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-8">السلة فارغة</p>
            <Button asChild>
              <a href="/">العودة للتسوق</a>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {(cartItems as any[]).map((item: any) => (
                <Card key={item.id} className="bg-card border-border p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-muted rounded-lg flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.size}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">−</Button>
                          <span>{item.quantity}</span>
                          <Button variant="outline" size="sm">+</Button>
                        </div>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-accent">{item.price * item.quantity} د.ع</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="bg-card border-border p-6 sticky top-4">
                <h2 className="text-xl font-bold text-foreground mb-4">ملخص الطلب</h2>
                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">المجموع الفرعي</span>
                    <span>{total} د.ع</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">الشحن</span>
                    <span>مجاني</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">الضريبة</span>
                    <span>{Math.round(total * 0.1)} د.ع</span>
                  </div>
                </div>
                <div className="flex justify-between mb-6 text-lg font-bold">
                  <span>الإجمالي</span>
                  <span className="text-accent">{Math.round(total * 1.1)} د.ع</span>
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  متابعة الدفع
                </Button>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
