import { createFileRoute, Link } from "@tanstack/react-router";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ConnectionStatus from "@/components/ConnectionStatus";
import {
    Activity,
    Database,
    FileBox,
    HardDrive,
    Clock,
    TrendingUp,
    FileImage,
    FileVideo,
    FileAudio,
    FileText,
    Search,
    ArrowRight,
    MoreHorizontal
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, Pie, PieChart } from "recharts";
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart";

export const Route = createFileRoute("/dashboard")({
    component: Dashboard
});

// Mock Data
const stats = [
    {
        title: "Total Indexed Items",
        value: "2,543,129",
        change: "+12.4%",
        icon: Database,
        color: "text-blue-500"
    },
    {
        title: "Database Size",
        value: "450.2 MB",
        change: "+2.1%",
        icon: HardDrive,
        color: "text-purple-500"
    },
    {
        title: "Last Index Update",
        value: "2 mins ago",
        change: "Live",
        icon: Clock,
        color: "text-green-500"
    }
];

// Updated activity data with month format
const activityData = [
    { day: "Mon", items: 2340 },
    { day: "Tue", items: 2600 },
    { day: "Wed", items: 3100 },
    { day: "Thu", items: 2900 },
    { day: "Fri", items: 3500 },
    { day: "Sat", items: 4100 },
    { day: "Sun", items: 3800 }
];

const activityChartConfig = {
    items: {
        label: "Items",
        color: "hsl(var(--chart-1))"
    }
} satisfies ChartConfig;

// File type data for pie chart
const fileTypeData = [
    { name: "images", value: 35, fill: "var(--chart-1)" },
    { name: "documents", value: 25, fill: "var(--chart-2)" },
    { name: "videos", value: 20, fill: "var(--chart-3)" },
    { name: "audio", value: 10, fill: "var(--chart-4)" },
    { name: "others", value: 10, fill: "var(--chart-5)" }
];

const fileTypeChartConfig = {
    value: {
        label: "Percentage"
    },
    images: {
        label: "Images",
        color: "hsl(var(--chart-1))"
    },
    documents: {
        label: "Documents",
        color: "hsl(var(--chart-2))"
    },
    videos: {
        label: "Videos",
        color: "hsl(var(--chart-3))"
    },
    audio: {
        label: "Audio",
        color: "hsl(var(--chart-4))"
    },
    others: {
        label: "Others",
        color: "hsl(var(--chart-5))"
    }
} satisfies ChartConfig;

const recentFiles = [
    {
        name: "Project_Proposal_v2.pdf",
        path: "D:\\Work\\Projects\\2025\\Q1",
        size: "2.4 MB",
        date: "10 mins ago",
        icon: FileText
    },
    {
        name: "Summer_Vacation_001.jpg",
        path: "E:\\Photos\\2024\\Summer",
        size: "4.8 MB",
        date: "25 mins ago",
        icon: FileImage
    },
    {
        name: "funny_cat_video.mp4",
        path: "D:\\Downloads",
        size: "154 MB",
        date: "1 hr ago",
        icon: FileVideo
    },
    {
        name: "meeting_recording.mp3",
        path: "D:\\Work\\Recordings",
        size: "45 MB",
        date: "3 hrs ago",
        icon: FileAudio
    },
    {
        name: "backup_config.json",
        path: "C:\\System\\Backups",
        size: "12 KB",
        date: "5 hrs ago",
        icon: FileBox
    }
];

function Dashboard() {
    return (
        <div className="animate-in fade-in container mx-auto max-w-7xl space-y-8 p-6 duration-500">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="from-foreground to-foreground/60 bg-linear-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                        Dashboard
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Dữ liệu tổng quan ở đây chỉ demo cho đỡ trống trải.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-muted/50 hidden items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium md:flex">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                        </span>
                        System Operational
                    </div>
                    <Link to="/everything-search">
                        <Button>
                            <Search className="h-4 w-4" />
                            Start Search
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <Card
                        key={i}
                        className="transition-shadow hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stat.value}
                            </div>
                            <p className="text-muted-foreground mt-1 text-xs">
                                <span className={stat.color}>
                                    {stat.change}
                                </span>{" "}
                                from last check
                            </p>
                        </CardContent>
                    </Card>
                ))}
                {/* Connection Status Card */}
                <Card className="border-l-4 border-l-blue-500 transition-shadow hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Connection
                        </CardTitle>
                        <Activity className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="mt-1 flex items-center">
                            <ConnectionStatus />
                        </div>
                        <p className="text-muted-foreground mt-2 text-xs">
                            Proxy Status: Active
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Info */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Charts Section - Area Chart */}
                <Card className="col-span-4 transition-shadow hover:shadow-md">
                    <CardHeader>
                        <CardTitle>Indexing Activity</CardTitle>
                        <CardDescription>
                            Number of files indexed over the last 7 days.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={activityChartConfig}
                            className="h-[300px] w-full">
                            <AreaChart
                                accessibilityLayer
                                data={activityData}
                                margin={{ left: 12, right: 12 }}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="day"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent indicator="line" />
                                    }
                                />
                                <Area
                                    dataKey="items"
                                    type="natural"
                                    fillOpacity={0.4}
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* File Type Distribution - Pie Chart */}
                <Card className="col-span-3 transition-shadow hover:shadow-md">
                    <CardHeader>
                        <CardTitle>File Distribution</CardTitle>
                        <CardDescription>
                            Breakdown by file category.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={fileTypeChartConfig}
                            className="mx-auto aspect-square max-h-[250px]">
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={fileTypeData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={50}
                                    strokeWidth={5}
                                />
                                <ChartLegend
                                    content={
                                        <ChartLegendContent nameKey="name" />
                                    }
                                    className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                                />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 transition-shadow hover:shadow-md lg:col-span-5">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>
                                Files modified or indexed recently.
                            </CardDescription>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="hidden sm:flex">
                            View All <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentFiles.map((file, i) => (
                                <div
                                    key={i}
                                    className="hover:bg-muted/50 group flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors">
                                    <div className="flex items-center gap-4 overflow-hidden">
                                        <div className="bg-primary/10 text-primary rounded-full p-2">
                                            <file.icon className="h-5 w-5" />
                                        </div>
                                        <div className="flex min-w-0 flex-col">
                                            <span className="truncate font-medium">
                                                {file.name}
                                            </span>
                                            <span className="text-muted-foreground truncate text-xs">
                                                {file.path}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-muted-foreground flex shrink-0 items-center gap-6 text-sm">
                                        <div className="hidden sm:block">
                                            {file.size}
                                        </div>
                                        <div>{file.date}</div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="from-card to-muted/20 col-span-3 bg-linear-to-br transition-shadow hover:shadow-md lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>
                            Jump to common searches
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                        <Link
                            to="/everything-search"
                            search={{ search: "ext:jpg;png;gif" } as never}>
                            <Button
                                variant="outline"
                                className="h-12 w-full justify-start border-l-4 border-l-blue-500">
                                <FileImage className="mr-2 h-4 w-4 text-blue-500" />
                                Find Images
                            </Button>
                        </Link>
                        <Link
                            to="/everything-search"
                            search={{ search: "ext:mp4;mkv;avi" } as never}>
                            <Button
                                variant="outline"
                                className="h-12 w-full justify-start border-l-4 border-l-pink-500">
                                <FileVideo className="mr-2 h-4 w-4 text-pink-500" />
                                Find Videos
                            </Button>
                        </Link>
                        <Link
                            to="/everything-search"
                            search={{ search: "ext:doc;docx;pdf" } as never}>
                            <Button
                                variant="outline"
                                className="h-12 w-full justify-start border-l-4 border-l-purple-500">
                                <FileText className="mr-2 h-4 w-4 text-purple-500" />
                                Find Documents
                            </Button>
                        </Link>
                        <Link
                            to="/everything-search"
                            search={{ search: "size:>100mb" } as never}>
                            <Button
                                variant="outline"
                                className="h-12 w-full justify-start border-l-4 border-l-amber-500">
                                <TrendingUp className="mr-2 h-4 w-4 text-amber-500" />
                                {"Large Files (>100MB)"}
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
