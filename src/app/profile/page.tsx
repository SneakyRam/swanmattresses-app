'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-secondary">
      <div className="container py-8">
        <h1 className="font-headline text-3xl font-bold md:text-4xl">My Account</h1>
        <p className="mt-2 text-muted-foreground">Manage your profile, orders, and settings.</p>
        
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="https://picsum.photos/seed/profile-avatar/200" alt="User Name" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <CardTitle>John Doe</CardTitle>
                <CardDescription>john.doe@example.com</CardDescription>
              </CardHeader>
              <CardContent>
                <Separator />
                <div className="mt-4">
                  <Button variant="ghost" className="w-full justify-start">My Orders</Button>
                  <Button variant="ghost" className="w-full justify-start">My Wishlist</Button>
                  <Button variant="ghost" className="w-full justify-start">Address Book</Button>
                  <Button variant="ghost" className="w-full justify-start">Account Settings</Button>
                  <Button variant="destructive" className="w-full justify-start mt-4">Sign Out</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Check the status of your recent orders.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-48 text-center border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">You have no recent orders.</p>
                    <Button variant="link" className="mt-2">Start Shopping</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
