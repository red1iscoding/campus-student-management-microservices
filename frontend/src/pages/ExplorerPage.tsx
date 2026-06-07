import { useState } from "react";
import { Layout } from "../components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { mockCourseEnrollments } from "../data/mockData";

export function ExplorerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedUniversity, setSelectedUniversity] = useState("all");
  const [expandedCourses, setExpandedCourses] = useState<string[]>([]);

  const toggleCourse = (courseId: string) => {
    setExpandedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const filteredData = mockCourseEnrollments.filter((course) => {
    const matchesSearch = 
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.students.some(student => 
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    return matchesSearch;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-gray-900 mb-2">Courses & Enrolled Students (GraphQL)</h1>
          <p className="text-gray-500">Explore course enrollments with student details</p>
          <Badge className="mt-2 bg-[#1976D2]">
            GraphQL join between Student Service and Course Service
          </Badge>
        </div>

        {/* Filters */}
        <Card className="border-none shadow-md">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search courses or students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                  <SelectItem value="Medicine">Medicine</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="University" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Universities</SelectItem>
                  <SelectItem value="MIT">MIT</SelectItem>
                  <SelectItem value="Stanford">Stanford</SelectItem>
                  <SelectItem value="Harvard">Harvard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Course Enrollments Table */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Course Enrollments</CardTitle>
            <CardDescription>Click on a course to view enrolled students</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Course ID</TableHead>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((course) => {
                  const isExpanded = expandedCourses.includes(course.courseId);
                  
                  return (
                    <>
                      {/* Course Row */}
                      <TableRow 
                        key={course.courseId}
                        className="bg-[#1976D2] bg-opacity-5 cursor-pointer hover:bg-opacity-10"
                        onClick={() => toggleCourse(course.courseId)}
                      >
                        <TableCell>
                          {isExpanded ? (
                            <ChevronDown size={20} className="text-[#1976D2]" />
                          ) : (
                            <ChevronRight size={20} className="text-[#1976D2]" />
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded bg-[#1976D2] text-white">
                            {course.courseId}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span>{course.courseName}</span>
                        </TableCell>
                        <TableCell colSpan={3}>
                          <span className="text-gray-500">
                            {course.students.length} student{course.students.length !== 1 ? 's' : ''} enrolled
                          </span>
                        </TableCell>
                      </TableRow>
                      
                      {/* Student Rows */}
                      {isExpanded && course.students.map((student) => (
                        <TableRow key={`${course.courseId}-${student.id}`}>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell className="pl-8 text-gray-500">↳ Student</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded bg-[#FFC107] bg-opacity-20 text-[#F57F17]">
                              {student.id}
                            </span>
                          </TableCell>
                          <TableCell>{student.firstName}</TableCell>
                          <TableCell>{student.lastName}</TableCell>
                        </TableRow>
                      ))}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
