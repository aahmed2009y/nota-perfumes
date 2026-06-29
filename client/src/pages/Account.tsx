import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, LogOut, ShoppingBag, User } from "lucide-react";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";

export default function Account() {
  const { user, isAuthenticated, logout } = useAuth();
  const logoutMutation = trpc.auth.logout.useMutation();

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
          <h1 className="text-3xl font-bold text-foreground mb-4">حسابي</h1>
          <p className="text-muted-foreground mb-8">يجب تسجيل الدخول لعرض حسابك</p>
          <Button asChild size="lg">
            <a href={getLoginUrl()}>تسجيل الدخول</a>
          </Button>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    logout();
    window.location.href = "/";
  };

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

      {/* Account Content */}
      <main className="container py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">حسابي</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="bg-card border-border p-6 md:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                <User size={32} className="text-accent-foreground" />
              </div>
              <div>
                <h2 className="font-bold text-foreground">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-2 mb-6 pb-6 border-b border-border">
              <div className="text-sm">
                <span className="text-muted-foreground">طريقة الدخول: </span>
                <span className="text-foreground">{user?.loginMethod}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">تاريخ الانضمام: </span>
                <span className="text-foreground">
                  {new Date(user?.createdAt || "").toLocaleDateString("ar-IQ")}
                </span>
              </div>
            </div>

            <Button
              variant="destructive"
              className="w-full gap-2"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              <LogOut size={18} />
              {logoutMutation.isPending ? "جاري تسجيل الخروج..." : "تسجيل الخروج"}
            </Button>
          </Card>

          {/* Quick Actions */}
          <div className="md:col-span-2 space-y-6">
            <Card className="bg-card border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">الطلبات</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-accent">0</p>
                  <p className="text-muted-foreground">طلبات سابقة</p>
                </div>
                <ShoppingBag size={48} className="text-accent opacity-20" />
              </div>
              <Button className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                عرض الطلبات
              </Button>
            </Card>

            <Card className="bg-card border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">الإحصائيات</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-accent">0 د.ع</p>
                  <p className="text-sm text-muted-foreground">إجمالي الإنفاق</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">0</p>
                  <p className="text-sm text-muted-foreground">المنتجات المفضلة</p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">الإجراءات السريعة</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  تحديث بيانات الملف الشخصي
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  تغيير كلمة المرور
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  عناويني المحفوظة
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  تفضيلاتي
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
