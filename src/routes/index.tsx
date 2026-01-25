import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  Server,
  Zap,
  Shield,
  FolderOpen,
  Eye,
  Settings,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-950">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Everything Search Web Client</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Tìm kiếm file{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
              siêu nhanh
            </span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            Web client hiện đại cho Everything HTTP Server. Tìm kiếm hàng triệu
            file trong nháy mắt, xem trước nội dung và điều hướng thư mục ngay
            trên trình duyệt.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/everything-search">
                <Search className="h-5 w-5" />
                Bắt đầu tìm kiếm
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/dashboard">
                <Server className="h-5 w-5" />
                Xem Dashboard
              </Link>
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
            Tính năng nổi bật
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Zap}
              title="Tìm kiếm tức thì"
              description="Kết quả hiện ngay khi gõ, với khả năng tìm kiếm thông minh hỗ trợ regex và wildcard."
              color="yellow"
            />
            <FeatureCard
              icon={Eye}
              title="Xem trước file"
              description="Xem nội dung hình ảnh, video, PDF và văn bản ngay trong trình duyệt mà không cần tải về."
              color="blue"
            />
            <FeatureCard
              icon={FolderOpen}
              title="Điều hướng thư mục"
              description="Duyệt cây thư mục như File Explorer, click đúp để mở folder hoặc xem file."
              color="green"
            />
            <FeatureCard
              icon={Shield}
              title="Bảo mật"
              description="Hỗ trợ xác thực HTTP Basic Authentication với Everything Server."
              color="purple"
            />
            <FeatureCard
              icon={Server}
              title="Dynamic Server"
              description="Kết nối đến nhiều Everything Server khác nhau, có thể đổi ngay trên giao diện."
              color="orange"
            />
            <FeatureCard
              icon={Settings}
              title="Tùy chỉnh giao diện"
              description="Chế độ sáng/tối, nhiều theme màu sắc để phù hợp với phong cách của bạn."
              color="pink"
            />
          </div>
        </section>

        {/* Getting Started */}
        <section className="mb-16">
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Hướng dẫn bắt đầu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <StepCard
                  step={1}
                  title="Cài đặt Everything"
                  description="Tải và cài Everything từ voidtools.com. Bật HTTP Server trong Options > HTTP Server."
                />
                <StepCard
                  step={2}
                  title="Cấu hình kết nối"
                  description="Click vào biểu tượng bánh răng trên thanh điều hướng để nhập địa chỉ server (ví dụ: http://192.168.1.2:80)."
                />
                <StepCard
                  step={3}
                  title="Bắt đầu tìm kiếm"
                  description="Vào trang Tìm kiếm, nhập từ khóa và khám phá hàng triệu file trên máy tính của bạn!"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Search Tips */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
            Mẹo tìm kiếm
          </h2>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <TipCard code="*.pdf" description="Tìm tất cả file PDF" />
            <TipCard
              code="ext:mp4 movie"
              description="Tìm video MP4 có chứa 'movie'"
            />
            <TipCard
              code='path:"D:\Documents"'
              description="Tìm trong thư mục cụ thể"
            />
            <TipCard code="size:>100mb" description="Tìm file lớn hơn 100MB" />
            <TipCard code="dm:today" description="Tìm file được sửa hôm nay" />
            <TipCard code="folder:" description="Chỉ hiện thư mục" />
          </div>
        </section>

        {/* Footer CTA */}
        <section className="text-center py-12 px-6 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Sẵn sàng tìm kiếm?
          </h2>
          <p className="text-blue-100 mb-6 max-w-lg mx-auto">
            Khám phá tất cả file trên máy tính của bạn với tốc độ bàn thờ.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/everything-search">
              <Search className="h-5 w-5" />
              Mở trang tìm kiếm
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}

// Feature Card Component
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: "yellow" | "blue" | "green" | "purple" | "orange" | "pink";
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
}: FeatureCardProps) {
  const colorClasses = {
    yellow:
      "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    green:
      "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    purple:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    orange:
      "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    pink: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
  };

  return (
    <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div
          className={`inline-flex p-3 rounded-xl ${colorClasses[color]} mb-4`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

// Step Card Component
interface StepCardProps {
  step: number;
  title: string;
  description: string;
}

function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
        {step}
      </div>
      <div>
        <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
          {title}
        </h4>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

// Tip Card Component
interface TipCardProps {
  code: string;
  description: string;
}

function TipCard({ code, description }: TipCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
      <code className="shrink-0 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-mono text-sm">
        {code}
      </code>
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {description}
      </span>
    </div>
  );
}
