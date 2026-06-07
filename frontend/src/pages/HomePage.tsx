import { Link } from "react-router-dom";
import { Users, BookOpen, Building2, MessageSquare, ArrowRight, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { mockStudents, mockCourses, mockUniversities, recentUpdates } from "../data/mockData";

const navigationCards = [
  {
    title: "Students",
    description: "Manage student records and enrollments",
    icon: Users,
    path: "/students",
    color: "#1976D2"
  },
  {
    title: "Courses",
    description: "Browse and manage course catalog",
    icon: BookOpen,
    path: "/courses",
    color: "#1976D2"
  },
  {
    title: "Universities",
    description: "View all partner universities",
    icon: Building2,
    path: "/universities",
    color: "#1976D2"
  },
  {
    title: "Chatbot",
    description: "AI-powered campus assistant",
    icon: MessageSquare,
    path: "/chatbot",
    color: "#FFC107"
  }
];

export function HomePage() {
  const totalEnrollments = mockStudents.reduce((sum, student) => sum + student.enrolledCourses, 0);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#1976D2] to-[#1565C0]"
          style={{
            backgroundImage: `linear-gradient(rgba(25, 118, 210, 0.85), rgba(21, 101, 192, 0.85)), url('https://images.unsplash.com/photo-1719342399567-4b31027198b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wdXMlMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYzNDA0ODQ3fDA&ixlib=rb-4.1.0&q=80&w=1080')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-white mb-4">Campus Management Dashboard</h1>
          <p className="text-xl mb-8 opacity-90">Access student records, courses, and much more.</p>
          <Link to="/dashboard">
            <Button 
              size="lg" 
              className="bg-[#FFC107] hover:bg-[#FFB300] text-gray-900 px-8 py-6 shadow-lg"
            >
              Get Started
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-center mb-12 text-gray-900">Quick Access</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {navigationCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.path} to={card.path}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-none h-full">
                  <CardHeader>
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${card.color}15` }}
                    >
                      <Icon size={24} style={{ color: card.color }} />
                    </div>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Stats Cards */}
        <h2 className="text-center mb-12 text-gray-900">Platform Statistics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardDescription>Total Students</CardDescription>
              <CardTitle className="text-[#1976D2]">{mockStudents.length}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardDescription>Total Courses</CardDescription>
              <CardTitle className="text-[#1976D2]">{mockCourses.length}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardDescription>Active Enrollments</CardDescription>
              <CardTitle className="text-[#1976D2]">{totalEnrollments}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardDescription>Active Universities</CardDescription>
              <CardTitle className="text-[#1976D2]">{mockUniversities.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Updates */}
        <h2 className="text-center mb-12 text-gray-900">Recent Updates</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="text-[#1976D2]" size={20} />
                New Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUpdates.newStudents.map((student, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.university}</p>
                    </div>
                    <p className="text-sm text-gray-400">{student.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="text-[#1976D2]" size={20} />
                New Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUpdates.newCourses.map((course, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-900">{course.name}</p>
                      <p className="text-sm text-gray-500">{course.instructor}</p>
                    </div>
                    <p className="text-sm text-gray-400">{course.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600">© 2025 Campus Management System</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-[#1976D2] transition-colors">Contact</a>
              <a href="#" className="text-gray-600 hover:text-[#1976D2] transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-[#1976D2] transition-colors">About Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
