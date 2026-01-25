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
    Sparkles
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
    component: HomePage
});

function HomePage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-950">
            <div className="container mx-auto max-w-6xl px-4 py-8">
                {/* Hero Section */}
                <section className="mb-16 text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        <Sparkles className="h-4 w-4" />
                        <span>Everything Search Web Client</span>
                    </div>

                    <h1 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl dark:text-white">
                        Tìm kiếm file{" "}
                        <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            siêu nhanh
                        </span>
                    </h1>

                    <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                        Web client hiện đại cho Everything HTTP Server. Tìm kiếm
                        hàng triệu file trong nháy mắt, xem trước nội dung và
                        điều hướng thư mục ngay trên trình duyệt.
                    </p>

                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Button
                            size="lg"
                            asChild>
                            <Link to="/everything-search">
                                <Search className="h-5 w-5" />
                                Bắt đầu tìm kiếm
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            asChild>
                            <Link to="/dashboard">
                                <Server className="h-5 w-5" />
                                Xem Dashboard
                            </Link>
                        </Button>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="mb-16">
                    <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-white">
                        Tính năng nổi bật
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                    <Card className="border-slate-200/50 bg-white/80 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/80">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                Hướng dẫn bắt đầu
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 md:grid-cols-3">
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
                    <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-white">
                        Mẹo tìm kiếm
                    </h2>

                    <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
                        <TipCard
                            code="*.pdf"
                            description="Tìm tất cả file PDF"
                        />
                        <TipCard
                            code="ext:mp4 movie"
                            description="Tìm video MP4 có chứa 'movie'"
                        />
                        <TipCard
                            code='path:"D:\Documents"'
                            description="Tìm trong thư mục cụ thể"
                        />
                        <TipCard
                            code="size:>100mb"
                            description="Tìm file lớn hơn 100MB"
                        />
                        <TipCard
                            code="dm:today"
                            description="Tìm file được sửa hôm nay"
                        />
                        <TipCard
                            code="folder:"
                            description="Chỉ hiện thư mục"
                        />
                    </div>
                </section>

                {/* Footer CTA */}
                <section className="rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 px-6 py-12 text-center text-white">
                    <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                        Sẵn sàng tìm kiếm?
                    </h2>
                    <p className="mx-auto mb-6 max-w-lg text-blue-100">
                        Khám phá tất cả file trên máy tính của bạn với tốc độ
                        bàn thờ.
                    </p>
                    <Button
                        size="lg"
                        variant="secondary"
                        asChild>
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
    color
}: FeatureCardProps) {
    const colorClasses = {
        yellow: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
        blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
        green: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
        purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
        orange: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
        pink: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"
    };

    return (
        <Card className="border-slate-200/50 bg-white/80 backdrop-blur-sm transition-shadow hover:shadow-lg dark:border-slate-700/50 dark:bg-slate-900/80">
            <CardContent className="pt-6">
                <div
                    className={`inline-flex rounded-xl p-3 ${colorClasses[color]} mb-4`}>
                    <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
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
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {step}
            </div>
            <div>
                <h4 className="mb-1 font-semibold text-slate-900 dark:text-white">
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
        <div className="flex items-center gap-4 rounded-xl border border-slate-200/50 bg-white/60 p-4 dark:border-slate-700/50 dark:bg-slate-800/60">
            <code className="shrink-0 rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-sm text-blue-600 dark:bg-slate-700 dark:text-blue-400">
                {code}
            </code>
            <span className="text-sm text-slate-600 dark:text-slate-400">
                {description}
            </span>
        </div>
    );
}
