import { Layout } from "../components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Users, BookOpen, Building2, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { mockStudents, mockCourses, mockUniversities, mockEnrollmentData } from "../data/mockData";

export function DashboardPage() {
  const totalEnrollments = mockStudents.reduce((sum, student) => sum + student.enrolledCourses, 0);
  const recentStudents = mockStudents.slice(0, 5);

  const stats = [
    {
      title: "Total Students",
      value: mockStudents.length,
      icon: Users,
      color: "#1976D2"
    },
    {
      title: "Total Courses",
      value: mockCourses.length,
      icon: BookOpen,
      color: "#1976D2"
    },
    {
      title: "Universities",
      value: mockUniversities.length,
      icon: Building2,
      color: "#FFC107"
    },
    {
      title: "Enrollments",
      value: totalEnrollments,
      icon: TrendingUp,
      color: "#FFC107"
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-gray-900 mb-2">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome to your campus management dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="border-none shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardDescription>{stat.title}</CardDescription>
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Students Table */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Recent Students</CardTitle>
            <CardDescription>Latest student registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Avatar</TableHead>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>University</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{student.firstName[0]}{student.lastName[0]}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{student.firstName}</TableCell>
                    <TableCell>{student.lastName}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      <span className="px-3 py-1 rounded-full bg-[#1976D2] bg-opacity-10 text-[#1976D2]">
                        {student.university}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Enrollments Chart */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Enrollments by Category</CardTitle>
            <CardDescription>Student distribution across different categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockEnrollmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="category" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #E0E0E0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="enrollments" fill="#1976D2" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
