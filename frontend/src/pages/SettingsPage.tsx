import { useState } from "react";
import { Layout } from "../components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Switch } from "../components/ui/switch";
import { User, Mail, Phone, MapPin, Moon, Sun } from "lucide-react";

export function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Anderson",
    email: "john.anderson@campus.edu",
    phone: "+1 (555) 123-4567",
    location: "Cambridge, MA"
  });

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-500">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                    <AvatarFallback>JA</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" className="mb-2">Change Avatar</Button>
                    <p className="text-sm text-gray-500">JPG, PNG or GIF (max. 2MB)</p>
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User size={16} className="text-[#1976D2]" />
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail size={16} className="text-[#1976D2]" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone size={16} className="text-[#1976D2]" />
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#1976D2]" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                  />
                </div>

                <Button 
                  onClick={handleSave}
                  className="w-full bg-[#1976D2] hover:bg-[#1565C0]"
                >
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preferences Card */}
          <div className="lg:col-span-1">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Theme Switcher */}
                <div className="space-y-4">
                  <Label>Theme</Label>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      {isDarkMode ? (
                        <Moon size={20} className="text-[#1976D2]" />
                      ) : (
                        <Sun size={20} className="text-[#FFC107]" />
                      )}
                      <div>
                        <p className="text-sm">{isDarkMode ? "Dark Mode" : "Light Mode"}</p>
                        <p className="text-xs text-gray-500">
                          {isDarkMode ? "Dark theme enabled" : "Light theme enabled"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={isDarkMode}
                      onCheckedChange={setIsDarkMode}
                    />
                  </div>
                </div>

                {/* Info Card */}
                <div className="p-4 bg-[#1976D2] bg-opacity-10 rounded-lg">
                  <h4 className="text-[#1976D2] mb-2">Account Status</h4>
                  <p className="text-sm text-gray-700">
                    Your account is active and all features are enabled.
                  </p>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  <h4 className="text-gray-900">Quick Stats</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Last Login</span>
                    <span className="text-sm">Today, 9:30 AM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Account Created</span>
                    <span className="text-sm">Jan 15, 2024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Role</span>
                    <span className="px-2 py-1 rounded-full bg-[#1976D2] bg-opacity-10 text-[#1976D2] text-sm">
                      Administrator
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
