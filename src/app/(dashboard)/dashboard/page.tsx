import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Tablero",
	description: "Dashboard",
};

export default function DashboardPage() {
	return (
		<div className="flex-col flex-1 hidden h-auto md:flex">
			<div className="flex-1 py-10 space-y-4">
				<div className="flex items-center justify-between space-y-2">
					<h2 className="text-3xl font-bold tracking-tight">Tablero</h2>
					<div className="flex items-center space-x-2">
						<CalendarDateRangePicker />
					</div>
				</div>
				<Tabs defaultValue="overview" className="space-y-4">
					<TabsList>
						<TabsTrigger value="overview">General</TabsTrigger>
						<TabsTrigger value="analytics" disabled>
							Analíticas
						</TabsTrigger>
						<TabsTrigger value="reports" disabled>
							Reportes
						</TabsTrigger>
						<TabsTrigger value="notifications" disabled>
							Notificaciones
						</TabsTrigger>
					</TabsList>
					<TabsContent value="overview" className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
									<CardTitle className="text-sm font-medium">
										Total Revenue
									</CardTitle>
									<DollarSign className="w-4 h-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">$45,231.89</div>
									<p className="text-xs text-muted-foreground">
										+20.1% from last month
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
									<CardTitle className="text-sm font-medium">
										Subscriptions
									</CardTitle>
									<Users className="w-4 h-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">+2350</div>
									<p className="text-xs text-muted-foreground">
										+180.1% from last month
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
									<CardTitle className="text-sm font-medium">Sales</CardTitle>
									<CreditCard className="w-4 h-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">+12,234</div>
									<p className="text-xs text-muted-foreground">
										+19% from last month
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
									<CardTitle className="text-sm font-medium">
										Active Now
									</CardTitle>
									<Activity className="w-4 h-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">+573</div>
									<p className="text-xs text-muted-foreground">
										+201 since last hour
									</p>
								</CardContent>
							</Card>
						</div>
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
							<Card className="col-span-2">
								<CardHeader>
									<CardTitle>Overview</CardTitle>
								</CardHeader>
								<CardContent>Hello</CardContent>
							</Card>
							<Card className="col-span-3">
								<CardHeader>
									<CardTitle>Recent Sales</CardTitle>
									<CardDescription>
										You made 265 sales this month.
									</CardDescription>
								</CardHeader>
								<CardContent>Hello</CardContent>
							</Card>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
