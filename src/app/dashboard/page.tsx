import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Calendar, User, Edit } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="container py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold md:text-4xl">Your Dashboard</h1>
        <p className="mt-2 text-lg text-muted-foreground">Welcome back, User!</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Subscription</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Family Box</div>
            <p className="text-xs text-muted-foreground">7 items per day</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Edit className="mr-2 h-4 w-4" /> Manage Plan
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Delivery</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">Out for Delivery</div>
            <p className="text-xs text-muted-foreground">
              Expected arrival: 2:00 PM - 4:00 PM
            </p>
          </CardContent>
           <CardFooter>
            <p className="text-xs text-muted-foreground">Your box includes: Apples, Bananas, Spinach...</p>
          </CardFooter>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Profile</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">John Doe</div>
            <p className="text-xs text-muted-foreground">john.doe@example.com</p>
          </CardContent>
          <CardFooter>
             <Button variant="outline" className="w-full">
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
