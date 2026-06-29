import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";

export default function Checkout() {
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

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
          <h1 className="text-3xl font-bold text-foreground mb-4">إتمام الطلب</h1>
          <p className="text-muted-foreground mb-8">يجب تسجيل الدخول لإتمام الطلب</p>
          <Button asChild size="lg">
            <a href={getLoginUrl()}>تسجيل الدخول</a>
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // هنا سيتم إضافة logic إرسال الطلب
      setTimeout(() => {
        setOrderPlaced(true);
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Error placing order:", error);
      setIsSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <CheckCircle size={64} className="text-accent mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">تم استقبال طلبك</h1>
          <p className="text-muted-foreground mb-8">شكراً لك! سنتواصل معك قريباً لتأكيد الطلب</p>
          <Button asChild>
            <a href="/">العودة للرئيسية</a>
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

      {/* Checkout Content */}
      <main className="container py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">إتمام الطلب</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Delivery Form */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-6">بيانات التوصيل</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    الاسم الكامل
                  </label>
                  <Input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    required
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    رقم الهاتف
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+964 7xx xxx xxxx"
                    required
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    العنوان
                  </label>
                  <Input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="الشارع والحي"
                    required
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    المدينة
                  </label>
                  <Input
                    type="text"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    placeholder="بغداد"
                    required
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    ملاحظات إضافية (اختياري)
                  </label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="مثلاً: توصيل في وقت معين"
                    className="bg-background border-border"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-lg font-semibold"
                >
                  {isSubmitting ? "جاري المعالجة..." : "تأكيد الطلب"}
                </Button>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="bg-card border-border p-6 sticky top-4">
              <h2 className="text-xl font-bold text-foreground mb-6">ملخص الطلب</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">عدد المنتجات</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">المجموع الفرعي</span>
                  <span>0 د.ع</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">الشحن</span>
                  <span>مجاني</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">الضريبة</span>
                  <span>0 د.ع</span>
                </div>
              </div>

              <div className="flex justify-between mb-6 text-lg font-bold">
                <span>الإجمالي</span>
                <span className="text-accent">0 د.ع</span>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground">
                <p>✓ شحن آمن</p>
                <p>✓ منتجات أصلية مضمونة</p>
                <p>✓ استرجاع مجاني خلال 7 أيام</p>
                <p className="mt-4 pt-4 border-t border-border">للتواصل: <a href="https://wa.me/9647747062599" target="_blank" rel="noopener noreferrer" className="hover:text-accent">0774 706 2599</a></p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
